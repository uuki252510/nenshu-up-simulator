# Design QA

## Comparison setup

- Source visual truth: `design-system/nenshu-up-simulator/references/selected-white-forecast.png`
- Source pixels: 1484 × 1060
- Implementation evidence: `implementation-white-1440-pass2.png`
- Implementation viewport and pixels: 1440 × 1024 CSS px, DPR 1
- Combined comparison evidence: `design-system/nenshu-up-simulator/references/design-qa-pass2-comparison.png`
- Compared state: initial simulator form, no selections, locked forecast
- Normalization: both captures were fitted into equal 1440:1024 comparison frames. Their source aspect ratios differ by less than 0.1%.

The full desktop view kept all fidelity-critical regions readable in one comparison: headline, form controls, reason chips, CTA, forecast dial, and outcome list. A separate crop was not required. The mobile and result-state captures were reviewed separately for behavior and responsiveness.

## Comparison history

### Pass 1

- [P2][Typography] The implementation headline wrapped earlier than the selected visual, weakening the editorial hierarchy. Fixed in `Hero.tsx` with a desktop single-line treatment and adjusted large-screen scale.
- [P2][Layout] Reason chips wrapped 4+1 instead of the selected 3+2 rhythm. Fixed by constraining the chip group width.
- [P2][Color/state] The disabled CTA was too pale compared with the visual target. Fixed with a stable deep-blue locked state while preserving native disabled semantics and the lock icon.

### Pass 2

- Layout, spacing, typography, white/navy/gold palette, borders, radii, and visual hierarchy match the selected direction.
- The generated forecast dial is a real image asset with declared dimensions and an appropriate crop. Visible icons use one Phosphor icon family.
- Copy is coherent in the standalone simulator context. The locked CTA intentionally uses a lock rather than the source arrow so its unavailable state is not misleading.
- No actionable P0, P1, P2, or P3 fidelity findings remain.

## Responsive and interaction checks

- 375 × 812 small phone: no horizontal overflow.
- 844 × 390 landscape: no horizontal overflow.
- 768 × 1024 tablet: no horizontal overflow.
- Mobile controls: selects are 56px high; reason chips are 44px high; primary CTA is 64px high.
- All four selects expose visible labels. The primary CTA remains disabled until required inputs and a reason are selected.
- Form submission shows the loading state, produces the result state, and exposes the “条件を変えてもう一度診断する” recovery action.
- Reduced-motion emulation reduces animation and transition durations to effectively zero.
- A 125% root text-size check introduced no horizontal overflow.
- Browser console: 0 error-level messages during the tested journey.

## Validation

- UI/UX Pro Max validation covered loading feedback, disabled loading buttons, stacking contexts, z-index discipline, font loading, reduced motion, and animation timing.
- Production build: passed.
- ESLint: passed.

final result: passed
