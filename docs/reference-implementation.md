# Reference implementation notes — 2026-09-08

Sources: [Ewan](https://ewan-kerboas.fr/), [Rob About](https://robbowen.digital/about/), [Rob public CSS](https://robbowen.digital/assets/css/styles.css).

## What was actually inspected

Desktop references were opened at 1440 × 900. Ewan initially failed with a WebGL-context error in a GPU-disabled browser: that blank page was **not** counted as an observation. A separate Chromium instance with software WebGL rendered the site. Hero, intermediate scroll positions, project list, preview, pointer movement and project hover were then inspected. Rob's About introduction, scrolled two-column story/illustration, pointer response and real menu-button activation were inspected. Both references were also rendered at 390px; Rob was scrolled on mobile.

Ewan's served home JavaScript was inspected to establish numeric GSAP parameters. Rob's served CSS and running animation keyframes established menu and illustration parameters. Durations below come from that public implementation, not a stopwatch measurement of the software renderer. No reference photographs, illustrations, logo assets, biographies or project content were copied into this repository.

## Effect comparison

| Effect | Reference trigger / target / direction / duration / scroll relationship | Local implementation and status |
|---|---|---|
| Ewan character entrance | Page mount; individual title characters; y=100 → 0 and opacity 0 → 1; 2s, 0.02s stagger, power4.out; independent of scroll | Same GSAP parameters and character split. **재현 완료** for this animation mechanism; the font and words are Soeun's. |
| Ewan Hero composition | At 1440px: title x=60, y=298, font=120px, two 120px lines; second line indented 40px; name upper-left, location lower-right | Left alignment, 120px scale and 40px indent retained. Syne's glyph widths, own introduction and extra project link change the title bounds/vertical position. **차이 있음**; not a pixel-identical Hero. |
| Ewan Hero scroll | Hero top/top → bottom/top; scale 1 → .95, opacity 1 → .3; scrub=1 | Same scroll range and target values. **재현 완료** for this transformation. Native scrolling retained. |
| Ewan rotating scroll ornament | Continuous opposite rotations, 10s per revolution | One own mint ornament rotates in 10s; circular scroll lettering/opposite ring are not reproduced. **차이 있음**. |
| Ewan project exploration | Left sticky list, right sequential previews; preview entering viewport selects corresponding item; item hover changes active counter; title/arrow slide right | Sticky index, scroll selection, hover/focus counter and separate image controls implemented. Each right-hand project includes persistent description/contributions. Index links scroll to projects instead of opening missing detail pages. **차이 있음** in dimensions and destination; the navigation pattern is retained. |
| Ewan project entrance | Section title x=-100, 1s power3.out at top/80%; list x=-50, .8s, .1s stagger at top/70%; previews scale=.9, 1.2s power3.out at top/80% | Title/list parameters matched; article scale begins at top/85% to include its visible introduction. **차이 있음** in trigger and animated area. |
| Ewan hover/cursor | Pointer-following ring and five diminishing trail dots; enlarged ring on links; heading/arrow translation; parallax wrapper in public code moves/rotates according to normalized pointer coordinates | Teal ring, five dots, hover enlargement and title/arrow movement implemented. Native cursor remains, project previews do not tilt, easing/trail latency are tuned locally. **차이 있음**, not an exact cursor/parallax reproduction. |
| Rob About composition | Wide left-aligned heading and lead introduction, scroll cue, then left body and right layered illustration | Same sequence and two-column story layout, stacked on small screens. Own text and new code-window illustration; Syne rather than Rob's Bitter and different text lengths. **차이 있음**. |
| Rob illustration entrance | Viewport activation; 1.125s baked non-uniform spring scale; striped circle scale-in .5s; layered pointer movement and floating parts | 1.125s elastic non-uniform scale and independent layered pointer/floating motion implemented. Exact baked keyframe curve, stripe entrance and reference character-specific animation are not reproduced. **차이 있음**. |
| Rob menu | Click menu; full-screen mint mask translateY(-100%) → 0, .7s cubic-bezier(.165,.84,.44,1); four links y=-5 → 0 over .7s, delays .75/1/1.25/1.5s | Same entrance direction/easing and item timings; full-screen native dialog with own four destinations. Close button has .7s upward exit; Escape and anchor selection close immediately for access/navigation. Rob's social-icon and label-specific transitions are absent. **차이 있음** for the complete transition. |
| Reference mobile interaction details | 390px rendering observed; desktop pointer effects unavailable on touch | Local pointer effects disabled on coarse pointers and project index becomes non-sticky. Exact reference mobile project-selection sequence and physical touch behavior were not fully observed. **확인 불가** for a 1:1 mobile interaction match. |

The long Ewan technology-scroll interlude and WebGL background are not recreated. The portfolio goes directly from Hero to Projects, so absolute section scroll coordinates differ. These are explicit remaining differences, not effects claimed as reproduced by a fade-in.

## Accessibility and content

- Server-rendered body remains visible without JavaScript. No CSS rule keeps uninitialized content hidden; scroll animations use `immediateRender: false`. A no-JavaScript navigation fallback is present.
- Reduced motion disables GSAP animations, cursor, CSS animations and transitions. Touch uses native vertical scrolling/pinch zoom. No automatic carousel playback or scroll interception.
- Galleries retain all 11 images, independent indices, captions, polite status, wrapping buttons and locally scoped arrow keys. Original-image dialog supports native focus trapping, Escape and focus return; original is fetched only on opening.
- Existing project descriptions, contributions, contacts, metadata and **Expected 2026** are preserved from the local starting state. No resume or project URLs were invented.

## Remaining materials for a tighter match

The initial blurry Lunchie files were replaced externally during the task. Their clearer but smaller replacements were preserved and rechecked; captures at least 640px wide would improve DPR-2 viewing. For frame-exact remaining effects, useful recordings would be: Ewan at 1440 × 900 from initial title through one project hover (pointer visible), and Ewan at 390px tapping a project and scrolling between projects. These would resolve the unverified mobile selection sequence and allow closer timing/geometry comparison; no recording is needed for the already verified character/scroll parameters.

## Executed validation

- Final `npm run build`, `npm run lint`, `npx tsc --noEmit`: passed. An intermediate build rejected image revision queries; the final configuration permits project-local revisions and the rebuilt result passed.
- Chromium at 360, 390, 768, 1440px: all 11 images decoded, contain fit, stable gallery height, no horizontal page overflow, next/previous wrapping and dialog Escape/focus return passed. Repeated after the external Lunchie replacements.
- Browser keyboard events: Tab, Enter, Space, scoped arrows, persistent focus and scroll position passed for all projects; arrows outside a gallery do not navigate it.
- Emulated touch: horizontal swipe, vertical scroll without slide changes, independent states and pinch zoom (observed viewport scale 3.92) passed. This is not a physical-device test.
- Motion: 18 Hero characters, scroll scale/opacity change, scroll-linked project selection, five cursor trails, About pointer transform and menu close transition observed. Reduced-motion produced no active browser animations. With JavaScript disabled, all three project articles and Hero remained visible with fallback navigation.
- Original viewer: new Lunchie screen 1 displayed at its native 482px width in Actual size; dialog Tab containment and return to the invoking image button passed.
- Numeric browser results: [browser-validation.json](browser-validation.json). Image measurements: [image-quality.md](image-quality.md), [image-audit.json](image-audit.json).
- Remaining limits: physical touch devices, cross-browser behavior and frame-exact mobile reference transitions were not validated. A passed build is not evidence of a pixel/animation-identical reference match.
