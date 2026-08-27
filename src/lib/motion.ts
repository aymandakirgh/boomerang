// Motion vocabulary. Values measured from a production reference (bakai.me/lab),
// not invented. Curve is chosen by what the element is DOING:
//   arriving -> ease-out-expo, morphing in place -> ease-in-out, leaving -> custom out.
export const EASE_OUT_EXPO = [0.19, 1, 0.22, 1] as const
export const EASE_IN_OUT_QUART = [0.77, 0, 0.175, 1] as const
export const EASE_EXIT = [0.32, 0.72, 0, 1] as const

export const IN = { type: 'spring', visualDuration: 0.34, bounce: 0.16 } as const
export const OUT = { duration: 0.24, ease: EASE_EXIT } as const
export const OUT_FADE = { duration: 0.24, ease: [0.5, 0, 1, 1] } as const
export const MORPH = { type: 'spring', visualDuration: 0.3, bounce: 0.06 } as const
export const SLIDE = { type: 'spring', visualDuration: 0.26, bounce: 0.16 } as const

export const SEGMENT_SPRING = { type: 'spring', stiffness: 420, damping: 30, mass: 0.85 } as const
export const SURFACE_SPRING = { type: 'spring', stiffness: 520, damping: 44, mass: 0.9 } as const

// Two-beat confirmation: the ring closes fully, THEN the check traces. No overlap.
export const RING_MS = 460
export const TRACE_MS = 500
