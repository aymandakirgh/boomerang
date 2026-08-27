# Reference research for the Boomerang marketing site

Scraped 2026-08-27 via firecrawl (markdown) plus one raw-HTML pass on jakubantalik.com. Focus: compositions, interactions, and canvas tricks that survive translation to pure white, #191919 ink, #F4F3F3 tiles, P22 Mackinac display, Inter UI, 200ms color transitions, ArrowRight as the only icon.

## 1. jakubantalik.com (motion designer portfolio)

The page opens with two sentences of prose, not a hero headline. Bio first, name in the header, no tagline. It reads as confidence: the work carries the page.

Section compositions worth stealing:
- A live "Customize" panel controls the page you are looking at: font select (Inter, Suisse, Georgia, Times, Arial, Helvetica), text color, a corner-radius slider (default 16), logo size, and nine background presets (Default, Sunset, Ocean, Forest, Lavender, Dots, Grid, Waves, Noise), with a Reset all. Desktop it is a fixed side panel; mobile it collapses to a bottom sheet (classes `sheet-overlay`, `sheet-handle`). The mechanic to steal is "a small control cluster mutates a live surface in real time", not the skinning itself.
- Work is tabbed (`work-tabs`, `work-tab-panel is-active`): tab one is a projects list, tab two is a grid of 14 looping motion clips (`video-item`), each a muted autoplaying video with a static jpg poster fallback. A grid of small looping demos is far more alive than screenshots and costs nothing beyond the video files.
- Project cards are minimal: a 72px icon image, title, one-line description, and an arrow (`project-arrow`). The icon ships in light and dark variants swapped by class (`project-icon-img--light` / `--dark`). Maps directly onto Boomerang's ArrowRight-only icon rule.

Interaction notes precise enough to code:
- Theme toggle swaps paired image assets by toggling a class on the root, no reload, images preloaded so the swap is instant.
- The radius slider writes a CSS custom property that every card and button reads, so one input restyles the entire page. Cheap to implement: one `--radius` variable, `input` event, done.

## 2. canvasui.dev (html-in-canvas / WebGL component library)

The library is 35 effects that draw live HTML onto canvas. Most are WebGL, but the text-based ones reduce cleanly to 2D canvas, which matters because Boomerang already has a canvas video hero and a 2D pipeline.

Canvas tricks doable cheaply in 2D:
- Decrypt Reveal: text renders as cipher glyphs that resolve to crisp characters near the cursor or on viewport entry. Pure glyph swapping, no shaders. For a conversational-AI brand this is the single most on-message effect: noise resolving into understanding.
- ASCII Sweep: a band of glyphs sweeps across text lines and swaps one message for another. A clean way to morph one chat utterance into its structured result.
- Particle Scroll: content below a chosen line dissolves into fine particles that reassemble on scroll. Draw text to an offscreen canvas, read pixels, animate points. Thousands of ink-colored points on white is trivial at 60fps.
- Laser: a horizontal line near the bottom of the viewport reveals content from behind it on scroll. Effectively a scroll-linked clip path, doable with zero canvas.

Section compositions worth stealing:
- Stats strip directly under the hero: three flat numeric tiles (35 components, 100% open source, one command). Number huge, label small.
- The full component list renders as a vertical dual-column infinite marquee (the markdown shows the list duplicated, the standard loop technique). Two columns of name + one-line description scrolling continuously reads as abundance without a carousel.
- The product demo is a fake agent chat: a framed window titled "Agent, MCP connected", a user message, tool output, a terminal line, and a completion message, laid out as a static transcript. For a company that sells conversational AI, showing the product as a scripted transcript in a window frame is the obvious hero-adjacent move.
- How it works as three numbered steps (01, 02, 03), heading plus two sentences each, nothing more.
- Testimonial wall as a two-row horizontal marquee of small quote cards, again via list duplication.

Engineering discipline stated on the page and worth adopting as spec: effects initialize only when mounted, pause off-screen, clean up on unmount, and respect prefers-reduced-motion.

## 3. bakai.me/lab (layout and composition only)

Motion constants for this site are already held in /liquid-ui; this pass is composition.

- The lab is a chronological tile feed, newest first, each tile captioned only with a title and a date (QR reveal, Aug 20; Loom, Aug 19; Molten wordmark, Aug 18). No descriptions, no tags. The caption discipline is the point: two pieces of metadata, small type, bottom of tile.
- Tiles mix live embedded UI with static images at varied sizes, masonry-style. The live ones are real: a working login card, a kanban pipeline with plausible names and phone numbers, a chart with 7D/14D/30D/90D range tabs and a "+33 joined" annotation, a gooey dropdown listing actual pricing tiers, a button shown in four variants side by side (Glossy, Glow, Bevel, Different type). Real data at real fidelity inside a tile beats any mockup.
- One tile is nothing but a color: a hex value (#1f7fc4) and its name (Cerulean) presented as a specimen. Treating a single token as exhibit-worthy content is a very stealable move for a brand-heavy site.
- The full-bleed sidebar screenshots between tiles act as palate cleansers, breaking the grid rhythm every 4 to 5 tiles.

## 4. originkit.dev (component kit, categories only)

298 components. Categories with counts: Background 72, Text 64, Interactive Elements 41, Image Gallery 30, Image 26, Cursor 21, Button 21, Animations 19, Border 4. Sorting tabs: Trending, Recommended, Recently Added, Most Copied (last 7 days). Cards show a video poster, name, and copy count.

Two lessons. First, Background and Text dominate the catalogue, and the most-copied components are big showpiece effects (Tornado 14.9k, Spin Image 10.3k): what marketing sites actually consume is backgrounds and text treatments, not widgets. Second, on a pure-white brand the background category translates to near-invisible texture, a faint warp or wave grid rendered in #F4F3F3 at 2 to 3 percent contrast, never a colored field.

## Recommended for Boomerang

1. Home below-fold: settle-in headlines. Section headings enter as scrambled glyphs that resolve into crisp P22 Mackinac over roughly 600ms as they cross the viewport line (CanvasUI Decrypt Reveal, span-per-character or 2D canvas). Ink on white only, each character's color settling through the standard 200ms transition. This is the one effect that literally is the product story.
2. Home below-fold: stats strip. Three flat #F4F3F3 tiles immediately after the canvas hero, one oversized Mackinac numeral each (resolution rate, response time, institutions served), Inter label beneath, no borders, no icons.
3. Product: scripted transcript window. A framed chat surface where a customer message, the agent's typed reply, and a structured tool result appear on a timed stagger, replaying on scroll re-entry (CanvasUI agent mock). ArrowRight as the send affordance; the frame sits on a #F4F3F3 tile.
4. Product: live capability tiles, lab-style. Each capability is a real embedded component running inside a tile (a routing table, an escalation card, a mini analytics chart with 7D/30D/90D tabs), captioned Bakai-style with only a name and small label. No screenshots anywhere on the page.
5. Solutions: dual-column vertical marquee of use cases. Two columns scrolling in opposite directions, each row a use-case name in Mackinac plus one Inter line, loop via duplicated lists, pause on hover, ArrowRight appearing on the hovered row.
6. Pricing: live configurator panel. Antalik's customize mechanic pointed at price: a seat slider and a conversation-volume slider write CSS variables and recompute a large Mackinac price figure in place, with the 200ms transition on every value change. One panel, one live number, no pricing-table wall until below it.
7. Company: prose-first opening. No hero headline; the page opens with two sentences of large Mackinac prose about why Boomerang exists (Antalik's bio-first pattern), then the team grid, each person a flat tile with a single light/dark portrait swap.
8. Home or Product section divider: particle dissolve. At one section boundary, the outgoing content dissolves into fine #191919 particles on the existing canvas layer and the incoming section assembles from them on scroll (CanvasUI Particle Scroll in 2D). Mount-only init, paused off-screen, fully disabled under prefers-reduced-motion.
