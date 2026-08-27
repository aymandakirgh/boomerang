import { useEffect, useRef } from 'react'

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260715_090628_7052d8a6-a094-4341-a4a2-ad58493a67a9.mp4'

const CAPTURE_MAX_WIDTH = 960
const PLAYBACK_FPS = 30

// requestVideoFrameCallback shipped after some installed lib.dom versions;
// typed optionally so the rAF fallback stays honest at the type level too.
type VideoWithRVFC = HTMLVideoElement & {
  requestVideoFrameCallback?: (cb: () => void) => number
  cancelVideoFrameCallback?: (handle: number) => void
}

export default function BoomerangVideoBg() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const displayRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const video = videoRef.current as VideoWithRVFC | null
    const display = displayRef.current
    if (!video || !display) return

    const frames: HTMLCanvasElement[] = []
    let lastCapturedTime = -1
    let capturing = true
    let disposed = false
    let rvfcHandle = 0
    let rafHandle = 0
    let playbackTimer = 0

    const captureFrame = () => {
      if (!capturing || disposed || video.videoWidth === 0) return
      // Deduplicate: rVFC/rAF can fire without a new presented frame
      if (video.currentTime === lastCapturedTime) return
      lastCapturedTime = video.currentTime

      const scale = Math.min(1, CAPTURE_MAX_WIDTH / video.videoWidth)
      const frame = document.createElement('canvas')
      frame.width = Math.round(video.videoWidth * scale)
      frame.height = Math.round(video.videoHeight * scale)
      const ctx = frame.getContext('2d')
      if (!ctx) return
      ctx.drawImage(video, 0, 0, frame.width, frame.height)
      frames.push(frame)
    }

    const scheduleCapture = () => {
      if (typeof video.requestVideoFrameCallback === 'function') {
        const loop = () => {
          captureFrame()
          if (capturing && !disposed) rvfcHandle = video.requestVideoFrameCallback!(loop)
        }
        rvfcHandle = video.requestVideoFrameCallback(loop)
      } else {
        const loop = () => {
          captureFrame()
          if (capturing && !disposed) rafHandle = requestAnimationFrame(loop)
        }
        rafHandle = requestAnimationFrame(loop)
      }
    }

    const startPingPong = () => {
      if (disposed || frames.length === 0) return
      const ctx = display.getContext('2d')
      if (!ctx) return

      display.width = frames[0].width
      display.height = frames[0].height
      video.style.display = 'none'
      display.style.display = 'block'

      if (frames.length === 1) {
        ctx.drawImage(frames[0], 0, 0)
        return
      }

      let index = 0
      let direction = 1
      playbackTimer = window.setInterval(() => {
        ctx.drawImage(frames[index], 0, 0)
        if (index >= frames.length - 1) direction = -1
        else if (index <= 0) direction = 1
        index += direction
      }, 1000 / PLAYBACK_FPS)
    }

    const onEnded = () => {
      capturing = false
      if (rvfcHandle && video.cancelVideoFrameCallback) video.cancelVideoFrameCallback(rvfcHandle)
      if (rafHandle) cancelAnimationFrame(rafHandle)
      startPingPong()
    }

    // Idempotent under StrictMode's dev double-invoke: restart from frame zero
    video.style.display = ''
    display.style.display = 'none'
    video.currentTime = 0

    video.addEventListener('ended', onEnded)
    scheduleCapture()
    video.play().catch(() => {
      // Autoplay rejected; the muted video stays as a poster-like first frame.
    })

    return () => {
      disposed = true
      capturing = false
      video.pause()
      video.removeEventListener('ended', onEnded)
      if (rvfcHandle && video.cancelVideoFrameCallback) video.cancelVideoFrameCallback(rvfcHandle)
      if (rafHandle) cancelAnimationFrame(rafHandle)
      if (playbackTimer) clearInterval(playbackTimer)
    }
  }, [])

  return (
    <div className="absolute inset-0 z-0">
      <div className="w-full h-full scale-[1.15] origin-top overflow-hidden">
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          muted
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          className="w-full h-full object-cover object-top"
        />
        <canvas
          ref={displayRef}
          className="w-full h-full object-cover object-top"
          style={{ display: 'none' }}
        />
      </div>
    </div>
  )
}
