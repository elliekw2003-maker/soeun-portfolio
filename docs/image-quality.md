# Image diagnosis — 2026-09-08

All 11 project PNG paths are retained; the agent did not edit the image files. Four Lunchie files were replaced externally during this task and the final measurements use those replacements. Machine-readable measurements, currentSrc, sizes, DPR, output dimensions, compression format and transfer bytes are in [image-audit.json](image-audit.json).

## Method and results

- Baseline browser measurements: 1440px at DPR 1 and 2; 390px at DPR 2. Reloaded after DPR changes to avoid stale currentSrc selection.
- Final browser measurements: 360, 390, 768 and 1440px at DPR 2, all 11 slides. The final desktop landscape frame measures 768.25 CSS px with a 15px browser scrollbar, versus 730.625 previously; portrait frames remain 320px. At 360/390px the frames measure 294/324px (portrait capped at 320px).
- sizes follows the actual 64% desktop grid after container padding, gap and frame padding. The viewport-unit calculation is approximately 9.6px larger on a desktop with a classic 15px scrollbar; it is not artificially inflated to request larger images.
- The baseline sizes was already consistent with its CSS layout. The primary problems were small UI text at overview scale, lossy compression, and softness in the Lunchie source captures.
- Visually compared q75/q90 and originals at the same display size using Sharp WebP samples. Also requested actual Next.js q75/q90/q95 responses for all 11 files; the measurements below are actual endpoint results, not simulated transfer sizes.
- q90 is selected for ordinary gallery views: a moderate improvement to small edges/text without q95's additional payload. This does not make tiny overview text fully readable. Original PNG is loaded only when the viewer opens; Fit to screen and Actual size allow detailed reading without image alteration. No gallery image has priority/preload.
- ACE originals have crisp UI edges but substantial downscaling makes table text small. ShiftPilot originals have readable UI and are capped by their intrinsic resolution (1510 / 1838px), even when the optimizer URL requests 1920px.
- The initial Lunchie files (678–683px wide) were visibly soft, particularly screen 1. During the task they were replaced externally with sharper-looking 474–501px-wide captures. These were opened and inspected again: screen 2 now shows a cafe photo collage, so its alt text was updated. The final table and final browser measurements use the new files, while the baseline records the old files. The newer files improve visible text edges but cannot supply 640 native pixels for a 320px frame at DPR 2. Higher-resolution real-app captures or original-frame exports would still help high-DPR and enlarged viewing. No AI enhancement or sharpening was applied.

| Image | Original pixels | Original KB | q75 / q90 / q95 KB at desktop DPR 2 |
|---|---:|---:|---:|
| ace-1.png | 3274 × 2048 | 284.2 | 44.4 / 67.9 / 88.5 |
| ace-2.png | 3274 × 2048 | 231.5 | 34.7 / 53.0 / 68.4 |
| ace-3.png | 3274 × 2048 | 218.3 | 34.4 / 50.8 / 67.3 |
| ace-4.png | 3274 × 2048 | 297.8 | 48.6 / 73.7 / 94.7 |
| ace-5.png | 3274 × 2048 | 279.2 | 44.5 / 67.1 / 85.8 |
| lunchie-1.png | 482 × 974 | 300.5 | 26.9 / 47.4 / 67.4 |
| lunchie-2.png | 501 × 971 | 626.4 | 60.2 / 108.2 / 144.9 |
| lunchie-3.png | 488 × 973 | 426.7 | 45.8 / 77.6 / 102.7 |
| lunchie-4.png | 474 × 975 | 343.7 | 36.3 / 61.4 / 83.8 |
| shiftpilot-1.png | 1510 × 875 | 130.9 | 66.6 / 103.6 / 128.4 |
| shiftpilot-2.png | 1838 × 925 | 135.1 | 39.2 / 61.4 / 78.0 |


## Limits

Sharp samples are a controlled visual comparison, not a human acuity study. Browser image decoding and compressed bytes were measured, but no network-speed benchmark or physical mobile-device test was performed.
