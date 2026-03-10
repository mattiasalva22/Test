# Sapra.AI Design System — Decision Log

Source analyzed: `index.html` + `style.css` (onboarding wireframe, commit in repository).
The Figma file required authentication; all tokens were extracted directly from the
existing implementation, which is considered the source of truth for this iteration.

---

## 1. Color palette

### Decision: pure black (#000000) as page background
The wireframe uses `#000000` for the root `<body>` and `#0E0E0E` / `#1A1A1A` / `#242424`
for layered surfaces.  We keep this unchanged — the pure-black base is an intentional
brand choice for maximum contrast and premium feel in a journalist tool.

### Decision: alpha-white for all borders
All borders use `rgba(255, 255, 255, 0.06–0.88)` instead of separate hex values.
This is the correct approach for dark UIs: borders remain neutral regardless of the
underlying surface color, and they automatically adapt if the surface is ever changed.

### Decision: amber (#D4890A) for AI/info hints
Two shades of amber appear in the wireframe for inline AI hints, the setup banner,
and the profile hint.  We consolidated these to a single `amber` token family with
sub-keys for `bg`, `bg-md`, `bg-strong`, `border`, `border-md`, `text`.

### Decision: no light mode
The design is fully dark-mode only.  Adding a light mode was explicitly rejected
to avoid premature complexity.  If light mode is added in future, a second CSS
property block should be introduced under `@media (prefers-color-scheme: light)`.

---

## 2. Typography

### Decision: three font families (serif + sans + mono)
- **Playfair Display** (serif) — display titles, section headings, loading title,
  success message, logo. Signals editorial quality.
- **Satoshi** (sans-serif) — all body copy, form labels, buttons. Chosen for its
  modern geometric feel that complements Playfair.
- **IBM Plex Mono** (monospace) — badges, meta info, timestamps, field labels,
  step counters.  Reinforces the "data intelligence" personality of the product.

### Decision: h1 = display (same size)
The wireframe does not use a distinct `h1` outside of the welcome screen, where it
is identical to the `display` style (Playfair 26px/400).  We define both as aliases
pointing to the same values for semantic HTML compliance.

### Decision: mono font for all uppercase labels
Any text that is uppercase + small-caps is always set in IBM Plex Mono.  This is
consistent across the wireframe and gives a "terminal/data" read to metadata.

---

## 3. Spacing

### Decision: 4px base grid (with 2px micro-steps)
The wireframe uses gaps of 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 28, 32, 40, 48, 60px.
The underlying rhythm is clearly 4px (multiples of 4 dominate).  The 2px micro-steps
(e.g. `gap: 2px` for dot-lines, `padding: 2px` for small badges) are kept as
`0.5` token.

### Decision: named semantic aliases for common patterns
`micro`, `tight`, `small`, `default`, `medium`, `large`, `xl`, `page`, `section`
are defined as aliases in `semanticSpacing` to help developers communicate intent
rather than values.

---

## 4. Border Radius

### Decision: `full` (9999px) for pill shapes, `xl` (18px) for primary CTA
Tags, chips, badges, nav buttons → `full` (pill).
Primary button, article cards, illustration boxes → `xl` (18px).
Inputs, role cards, source lists → `lg` (14px).
Sidebar items, stats bar, ai-hint → `md` (10px).
Small badges, hint inlines → `sm` (6px) / `xs` (4px).

---

## 5. Components

### Decision: Button has 4 variants, not 2
The wireframe shows primary, secondary and ghost.  We added `link` (text-only, monospace)
because it appears explicitly as `btn-link-sm` ("Vai al risultato →") in the loading step.
This is not creative invention — it is a documented pattern in the source.

### Decision: ScoreBadge auto-selects variant by score threshold
Thresholds: ≥90 → green (success), ≥85 → blue (info), <85 → grey (muted).
This matches the score-high / score-mid / score-ok pattern in the wireframe.

### Decision: RoleCard uses dangerouslySetInnerHTML for label line breaks
The role card labels use `\n` to indicate line breaks (e.g. "Giornalista\neditoriale").
`dangerouslySetInnerHTML` is safe here because labels are internal constants, never
user-supplied content.  Alternative: accept `label` as `React.ReactNode`.
**TODO**: Revisit to use ReactNode if labels become dynamic.

### Decision: AiHint supports 4 semantic variants
The wireframe only shows amber hints.  We added `info`, `success`, `error` variants
by interpolating from the colour tokens — the structural pattern is identical, only
the colour values differ.

### Decision: Tooltip has two modes (hover + contextual always-visible)
The dashboard shows a persistent one-time tooltip on the first article.  This is
different from a standard hover tooltip.  We expose both:
- `Tooltip` — hover-triggered, wraps any child
- `ContextualTooltip` — always visible, with dismiss button

### Decision: SourceRow uses native checkbox with `accent-color: white`
The wireframe uses a native checkbox styled with `accent-color`.  We keep this
approach (no custom checkbox) to maximise accessibility and reduce complexity.

### Decision: Sidebar uses `<button>` not `<a>` for nav items
Sapra is a SPA.  Navigation is handled via JS state, not href links.  Using `<button>`
is more semantically correct here than an `<a>` with `href="#"`.

---

## 6. Missing patterns (interpolated)

The following states are **not** explicitly shown in the wireframe but were implemented
following existing design rules:

| Pattern | Decision |
|---------|----------|
| `Button` disabled state | surface-3 bg, text-muted text — same as `btn-disabled` class |
| `Button` loading state | Spinner replaces iconLeft; button disabled |
| `Input` error state | red border (`border-error`), error message in caption-sm |
| `Input` hint text | caption-sm in text-muted below field |
| `Tag` ghost variant | dashed border, transparent bg — matches `tag-ghost` class |
| `Badge` error/warning variants | interpolated from success badge + error/warning tokens |
| `AiHint` info/success/error variants | interpolated from amber variant |
| `Tooltip` hover variant | standard hover tooltip wrapping existing ContextualTooltip logic |
| `StepProgress` halfLast | half-filled dot — matches `dot.half` in wireframe |
| `Logo` sm/md/lg sizes | proportional scaling of icon + text |

---

## 7. What is not in this design system (intentional exclusions)

- **Modal / Dialog** — not shown in the wireframe; excluded to avoid speculation.
  Add when a concrete design exists.
- **Select / Dropdown** — `category-pills` in Step 2 act as category selectors but
  they are custom pill buttons, not native selects.  A `Dropdown` component is
  deferred.
- **Toast / Notification** — the banner serves as the primary notification pattern.
  A transient toast component is deferred.
- **Table** — no tabular data in the wireframe.
- **Form validation** — Input exposes `error` prop but form-level validation logic
  is outside the scope of the design system.
- **Dark/light theme switching** — intentionally excluded (see § 1 above).

---

## 8. File structure rationale

```
design-system/
├── tokens/          ← Pure data: no React, no CSS-in-JS
├── components/      ← One folder per component, always: Foo.tsx + index.ts
├── styles/          ← globals.css for Tailwind @import + CSS custom properties
├── tailwind.config.ts ← Single source of truth for Tailwind extension
└── index.ts         ← Barrel export
```

Each component folder exports via `index.ts` so consumers can write:
```ts
import { Button } from '@sapra/design-system/components/Button';
// or
import { Button } from '@sapra/design-system';
```

---

*Last updated: March 2026 — initial extraction from onboarding wireframe.*
