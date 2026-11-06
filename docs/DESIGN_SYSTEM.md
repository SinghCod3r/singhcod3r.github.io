# DESIGN_SYSTEM.md — SinghCod3r Portfolio Design System Reference

> **Purpose**: Exact, production-ready documentation of the current portfolio's visual language, motion system, component patterns, and implementation details. This document is derived *from* the shipped codebase — not aspirations. Every value below is traced to a source file.

---

## 1. Color Palette

**Source**: `app/globals.css:5-13`, `tailwind.config.js:9-17`

### Core Semantic Colors (CSS Variables)

| Token | Hex / Value | Usage |
|-------|-------------|-------|
| `--ink` | `#07080a` | Page background, primary dark surface |
| `--paper` | `#f0f0e9` | Primary text, high-contrast foreground |
| `--muted` | `#989c99` | Secondary text, placeholders, disabled states |
| `--lime` | `#d8ff58` | Primary accent, CTAs, active states, selection bg |
| `--violet` | `#a786ff` | Secondary accent, speaking section, tags |
| `--coral` | `#ff806d` | Tertiary accent, full-stack projects, contact |
| `--cyan` | `#7ff3da` | Quaternary accent, tech stack, OpenPrinting |
| `--line` | `rgba(240, 240, 233, 0.12)` | Hairline borders, dividers |
| `--ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | Default easing for macro animations |

### Tailwind Color Aliases (Direct Mapping)

```js
// tailwind.config.js
colors: {
  ink: "#07080a",      // bg-ink, text-ink, border-ink
  paper: "#f0f0e9",    // bg-paper, text-paper
  muted: "#989c99",    // text-muted, placeholder-muted
  lime: "#d8ff58",     // bg-lime, text-lime, border-lime
  violet: "#a786ff",   // bg-violet, text-violet
  coral: "#ff806d",    // bg-coral, text-coral
  cyan: "#7ff3da",     // bg-cyan, text-cyan
}
```

### Usage Patterns (from components)

| Context | Color | Example |
|---------|-------|---------|
| Primary CTA bg | `lime` | `bg-[#d8ff58] text-[#07080a]` |
| Primary CTA hover | `lime` + opacity | `hover:opacity-90` |
| Active nav indicator | `lime` | `bg-[#d8ff58] shadow-[0_0_6px_#d8ff58]` |
| Speaking section accent | `coral` | `text-[#ff806d]`, `border-[#ff806d]/30` |
| Tech stack / OpenPrinting | `cyan` | `text-[#7ff3da]`, `bg-[#7ff3da]/10` |
| AI/Security category | `lime` | `categoryColor: "#d8ff58"` |
| OpenPrinting category | `cyan` | `categoryColor: "#7ff3da"` |
| Open Source category | `violet` | `categoryColor: "#a786ff"` |
| Selection highlight | `lime` bg + `ink` text | `selection:bg-[#d8ff58] selection:text-[#0c0d0e]` |
| Scrollbar thumb | `rgba(255,255,255,0.15)` → `lime` on hover | `::-webkit-scrollbar-thumb` |
| Glass border | `rgba(240,240,233,0.15)` | `border border-white/15` |

### Opacity Scale (Observed in Code)

| Opacity | Use Case |
|---------|----------|
| `/5` (0.05) | Subtle hover backgrounds |
| `/10` (0.10) | Card backgrounds, input bg |
| `/15` (0.15) | Glass borders |
| `/20` (0.20) | Focus borders |
| `/30` (0.30) | Active pill borders |
| `/40` (0.40) | Hover border accents |
| `/60` (0.60) | Glass panel base opacity |
| `/80` (0.80) | Backdrop overlays |
| `/90` (0.90) | Mobile drawer backdrop |
| `/95` (0.95) | Expanded island backdrop |

---

## 2. Typography

**Source**: `app/globals.css:15-18, 37-39`, `tailwind.config.js:18-23`, `app/layout.tsx:172-175`

### Font Families (CSS Variables + Tailwind)

| Token | Font Stack | Tailwind Class | Usage |
|-------|------------|----------------|-------|
| `--font-jakarta` | `"Plus Jakarta Sans", sans-serif` | `font-sans` | Body text, UI labels, buttons, mono fallback |
| `--font-syne` | `"Syne", sans-serif` | `font-display` | Headlines, titles, numbers, emphasis |
| `--font-serif` | `"Instrument Serif", serif` | `font-serif` | Italic accent words in headlines |
| `--font-mono` | `"JetBrains Mono", monospace` | `font-mono` | Code, labels, numbers, nav items, timestamps |

### Font Weights Loaded (Google Fonts)

| Family | Weights |
|--------|---------|
| Plus Jakarta Sans | 400, 500, 600, 700 |
| Syne | 500, 600, 700, 800 |
| Instrument Serif | 400 (regular), 400 (italic) |
| JetBrains Mono | 400, 500, 600 |

### Type Scale (Observed in Components)

| Element | Size / Class | Weight | Line Height | Letter Spacing |
|---------|--------------|--------|-------------|----------------|
| Hero H1 (home) | `text-3xl sm:text-5xl lg:text-6xl` | `font-display font-medium` | `leading-tight` | `tracking-tight` |
| Section H2 | `text-2xl sm:text-4xl md:text-5xl` | `font-display font-medium` | `leading-tight` | `tracking-tight` |
| Card Title | `text-xl` / `text-lg sm:text-xl` | `font-display font-bold` / `font-semibold` | `leading-snug` | `tracking-tight` |
| Body Text | `text-sm sm:text-base` / `text-base` | `font-light` / normal | `leading-relaxed` (1.6) | normal |
| UI Label (mono) | `text-xs` / `text-[11px]` / `text-[10px]` | `font-mono` `font-bold` / `font-medium` | normal | `tracking-wider` / `tracking-widest` uppercase |
| Nav Label (Rolling) | `text-[11px] sm:text-xs` | `font-mono font-bold` | — | `tracking-wider` uppercase |
| Tag / Badge | `text-[10px]` / `text-xs` | `font-mono` | — | normal |
| Code / Technical | `text-xs font-mono` | 400 | — | — |

### Special Typography Patterns

```tsx
// Italic serif accent word inside display headline (Home, Projects)
<span className="italic font-serif font-normal text-[#d8ff58]">Scale</span>

// Mono uppercase tracking-widest for section labels
<span className="text-xs font-mono uppercase tracking-widest text-[#d8ff58]">
  Portfolio
</span>

// Numbered nav items
<span className="font-mono text-[10px] text-white/35">01</span>
```

---

## 3. Spacing & Layout System

**Source**: `app/page.tsx` (section containers), `components/*.tsx`, `tailwind.config.js` (no custom spacing)

### Container Widths

| Context | Max Width | Padding |
|---------|-----------|---------|
| Home sections | `max-w-[1720px]` | `px-4 sm:px-12 lg:px-16 2xl:px-20` |
| Blog / Projects Index | `max-w-[1240px]` | `px-4 sm:px-8` |
| Project Detail | `max-w-5xl` (~1280px) | `px-4 sm:px-6` |
| Mobile drawer | `inset-0` (full viewport) | `p-6 pt-24` |

### Section Vertical Rhythm

```tsx
// Standard section padding (Home)
py-12 sm:py-24 md:py-36  // 48px → 96px → 144px

// Blog/Projects index
py-10 sm:py-16  // 40px → 64px
```

### Grid Systems

| Layout | Columns | Gap | Responsive |
|--------|---------|-----|------------|
| Home About | `lg:grid-cols-12` (5/7 split) | `gap-8 lg:gap-16` | Stack on mobile |
| Home Projects Showcase | Custom (ProjectsShowcase) | — | — |
| Blog Main Grid | `lg:grid-cols-12` (8/4 split) | `gap-8 lg:gap-12` | Stack on mobile |
| Projects Index Grid | `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` | `gap-6` | 1→2→3 |
| Project Detail Main | `lg:grid-cols-3` (2/1 split) | `gap-10` | Stack on mobile |
| Metrics Grid | `grid-cols-2 sm:grid-cols-4` | `gap-3 sm:gap-4` | 2→4 |

### Component Spacing Patterns

| Pattern | Value |
|---------|-------|
| Card internal padding | `p-4 sm:p-6` / `p-5 sm:p-8` |
| Card gap (grid) | `gap-5 sm:gap-6` / `gap-6` |
| Section divider connector | Fixed height `h-[120px] sm:h-[180px]` |
| Nav island border radius | `rounded-full` (compact) / `rounded-3xl` (expanded) |
| Button border radius | `rounded-full` (pills) / `rounded-xl` / `rounded-2xl` |
| Input border radius | `rounded-full` |

---

## 4. Glassmorphism & Surface System

**Source**: `app/globals.css:140-147`, `components/DynamicIslandNav.tsx`, `components/BlogView.tsx`, `components/ProjectsIndexView.tsx`, `components/MobileMenuDrawer.tsx`

### Glass Panel Utility (`.glass-panel`)

```css
.glass-panel {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.015));
  backdrop-filter: blur(30px) saturate(190%);
  -webkit-backdrop-filter: blur(30px) saturate(190%);
  border: 1px solid rgba(240, 240, 233, 0.15);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
}
```

### Observed Glass Variants in Components

| Variant | Backdrop Blur | Background | Border | Shadow | Used In |
|---------|---------------|------------|--------|--------|---------|
| **Compact Island** | `backdrop-blur-2xl` | `bg-[#08090c]/92` | `border-white/15` | `shadow-[0_12px_36px_rgba(0,0,0,0.85)]` | DynamicIslandNav collapsed |
| **Expanded Island** | `backdrop-blur-3xl` | `bg-[#090a0e]/95` | `border-white/15` | `shadow-[0_24px_64px_rgba(0,0,0,0.9)]` | DynamicIslandNav expanded |
| **Mobile Drawer** | `backdrop-blur-2xl` | `bg-[#07080a]/96` | — | — | MobileMenuDrawer |
| **Card (Blog/Projects)** | `backdrop-blur-[24px]` | `bg-[#121316]/75` | `border-white/10` | `shadow-xl` | BlogView, ProjectsIndexView |
| **Sidebar Card** | `backdrop-blur-[24px]` | `bg-[#121316]/75` | `border-white/10` | `shadow-xl` | BlogView sidebar |
| **Secondary Sidebar** | `backdrop-blur-[20px]` | `bg-[#121316]/50` | `border-white/10` | `shadow-lg` | BlogView publications card |
| **Header/Top Bar** | `backdrop-blur-xl` / `backdrop-blur-2xl` | `bg-[#07080a]/80` / `/85` | `border-b border-white/10` | — | All page headers |
| **Project Detail Hero** | — | `bg-black/70` | `border-white/15` | `shadow-2xl` | Project detail image |

### Glass Border Tokens

| Token | Value | Usage |
|-------|-------|-------|
| Primary glass border | `rgba(240, 240, 233, 0.15)` / `border-white/15` | Island, drawer |
| Subtle card border | `rgba(255, 255, 255, 0.1)` / `border-white/10` | Cards, headers |
| Hover border accent | `border-[#d8ff58]/40` | Interactive cards, island compact hover |
| Active border accent | `border-[#d8ff58]/35` / `border-[#d8ff58]` | Active nav items, active pills |

### Specular Sheen (Top Highlight)

```tsx
// Compact island
<div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />

// Expanded island
<div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-3xl bg-gradient-to-r from-transparent via-[#d8ff58]/60 to-transparent" />
```

---

## 5. Motion & Animation System

**Source**: `app/globals.css:111-183, 185-226`, `components/DynamicIslandNav.tsx`, `components/MobileMenuDrawer.tsx`, `components/BlogView.tsx`, `app/page.tsx`

### CSS Keyframes (globals.css)

| Animation | Keyframes | Duration | Easing | Use Case |
|-----------|-----------|----------|--------|----------|
| `floatGentle` | `translateY(0) → -8px → 0` | 6s | `ease-in-out` infinite | Ambient floating elements |
| `glowPulse` | `opacity 0.6→0.95, drop-shadow 15px→30px` | 4s | `ease-in-out` infinite | Lime glow accents |
| `pulseSubtle` | `opacity 0.85→1, scale 1→1.04` | 5s | `ease-in-out` infinite | Subtle breathing elements |
| `spinSlow` | `rotate(0) → rotate(360)` | 24s | `linear` infinite | Decorative rotation |
| `rollIn` | `translateY(100%), opacity 0 → translateY(0), opacity 1` | 0.38s | `cubic-bezier(0.16, 1, 0.3, 1)` | Rolling text entrance |
| `islandExpand` | `scale(0.92), opacity 0 → scale(1), opacity 1` | 0.32s | `cubic-bezier(0.16, 1, 0.3, 1)` | Island expansion |

### Tailwind Animation Classes

```css
.animate-float-gentle   { animation: floatGentle 6s ease-in-out infinite; }
.animate-glow-pulse     { animation: glowPulse 4s ease-in-out infinite; }
.animate-pulse-subtle   { animation: pulseSubtle 5s ease-in-out infinite; }
.animate-spin-slow      { animation: spinSlow 24s linear infinite; }
.animate-roll-in        { animation: rollIn 0.38s cubic-bezier(0.16,1,0.3,1) forwards; }
.animate-island-expand  { animation: islandExpand 0.32s cubic-bezier(0.16,1,0.3,1) forwards; }
```

### GSAP Animation Patterns (BlogView, Home)

```tsx
// Entrance stagger (BlogView hero)
gsap.fromTo(".blog-hero-anim", { y: 24, opacity: 0 }, {
  y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out"
});

// Card stagger on filter change (BlogView)
gsap.fromTo(cards, { y: 20, opacity: 0, scale: 0.985 }, {
  y: 0, opacity: 1, scale: 1, duration: 0.45, stagger: 0.06, ease: "power2.out"
});

// ScrollTrigger reveal (Home sections)
gsap.fromTo(el, { y: 35, opacity: 0 }, {
  y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
  scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play reverse play reverse" }
});

// Hero tagline word stagger (Home)
gsap.fromTo(words, { y: 30, opacity: 0 }, {
  y: 0, opacity: 1, stagger: 0.05, duration: 0.9, delay: 0.65, ease: "power3.out"
});
```

### Lenis Smooth Scroll (Home only, Desktop)

```tsx
// app/page.tsx:51-65
const lenis = new Lenis({
  duration: 1.0,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  syncTouch: false,  // Critical: disable on touch devices
});
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis?.raf(time * 1000));

// Mobile/touch: NO Lenis — native 120Hz scroll preserved
const isMobileOrTouch = window.innerWidth < 768 || 
  window.matchMedia("(pointer: coarse)").matches || 
  "ontouchstart" in window || navigator.maxTouchPoints > 0;
```

### Transition Durations (Observed)

| Context | Duration | Easing |
|---------|----------|--------|
| Island expand/collapse | 700ms | `cubic-bezier(0.16,1,0.3,1)` |
| Island compact hover | 300ms | default |
| Rolling text transition | 380ms | `cubic-bezier(0.16,1,0.3,1)` |
| Mobile drawer open/close | 500ms | `cubic-bezier(0.16,1,0.3,1)` |
| Nav item stagger delay | 45ms × index | — |
| Card hover lift | 300ms | default |
| Button/Link transitions | 200ms | default |
| Filter pill transitions | 200ms | default |
| GSAP ScrollTrigger | 800ms | `power3.out` |

### Reduced Motion (`prefers-reduced-motion: reduce`)

```css
/* globals.css:217-226 */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

```tsx
// All GSAP effects check this
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
```

---

## 6. Component Anatomy: Dynamic Island Navigation

**Source**: `components/DynamicIslandNav.tsx`

### States

| State | Description | Key Classes |
|-------|-------------|-------------|
| **Compact** | Floating pill, shows avatar + rolling section label + chevron | `rounded-full px-2.5 sm:px-3 py-1.5` |
| **Expanded** | Full nav panel with profile, 6 sections, 3 action buttons | `w-[92vw] max-w-[340px] sm:max-w-[380px] rounded-3xl p-4 sm:p-5` |
| **Backdrop** | Dimmed overlay when expanded | `fixed inset-0 z-40 bg-black/60 backdrop-blur-md` |

### Compact State Anatomy

```
┌─────────────────────────────────────┐
│  ┌──┐  ┌─────────────┐  ┌──┐ ┌─┐   │
│  │👤│  │   HOME      │  │● │ │▼│   │  ← RollingSectionText
│  └──┘  └─────────────┘  └──┘ └─┘   │
│  Specular sheen (top 1px gradient)  │
└─────────────────────────────────────┘
```

- Avatar: `w-6 h-6 sm:w-7 sm:h-7` rounded-full, border `white/25` → `lime` hover
- Rolling text: `h-4.5`, `font-mono text-[11px] sm:text-xs font-bold tracking-wider uppercase`
- Active beacon: `w-1.5 h-1.5 rounded-full bg-lime animate-pulse`
- Chevron: `w-3 h-3` rotates on hover

### Expanded State Anatomy

```
┌─────────────────────────────────────┐
│  ═════════════════════════════════  │  ← Lime specular sheen (top)
│  ┌──┐  Ayush Singh                  │
│  │👤│  OpenPrinting Maintainer      │  ← Profile header
│  └──┘                    ┌───┐     │     (w-11 h-11 avatar + close btn)
│  01 HOME          ● →    │   │     │
│  02 ABOUT                │   │     │  ← Nav sections (6 items)
│  03 PROJECTS             │   │     │
│  04 SPEAKING             │   │     │
│  05 TECH STACK           │   │     │
│  06 CONTACT              │   │     │
│  ═════════════════════════════════  │
│  [Projects]  [Blog]  [Resume]       │  ← Action buttons (3 equal width)
└─────────────────────────────────────┘
```

- Active section: `bg-[#d8ff58]/10 border border-[#d8ff58]/35 text-white` + pulse beacon
- Inactive: `hover:bg-white/[0.04] text-[#989c99] hover:text-[#f0f0e9]`
- Action buttons: `flex-1`, `font-mono text-[11px]`, icons (Code, BookOpen, FileText)

### Scrollspy (IntersectionObserver)

```tsx
rootMargin: "-20% 0px -55% 0px",  // Activates when section enters upper 20%
threshold: 0.1
```

### NAV_SECTIONS Configuration

```tsx
const NAV_SECTIONS: NavSection[] = [
  { id: "hero", label: "HOME", num: "01" },
  { id: "about", label: "ABOUT", num: "02" },
  { id: "projects", label: "PROJECTS", num: "03" },
  { id: "signal", label: "SPEAKING", num: "04" },
  { id: "stack", label: "TECH STACK", num: "05" },
  { id: "contact", label: "CONTACT", num: "06" },
];
```

---

## 7. Component Anatomy: Mobile Menu Drawer

**Source**: `components/MobileMenuDrawer.tsx`

### Trigger (Hamburger)

```tsx
// 3 lines morphing to X
// Line 1: w-5 → w-5 rotate-45 translate-y-1.5 bg-lime
// Line 2: w-3.5 → w-0 opacity-0
// Line 3: w-4 → w-5 -rotate-45 -translate-y-1.5 bg-lime
// Container: w-10 h-10 rounded-xl border-white/15 bg-white/5
```

### Drawer Panel

```
┌─────────────────────────────────────┐
│  ● AVAILABLE FOR ROLES    Navigation │  ← Status badge
├─────────────────────────────────────┤
│  01  About                    ↗     │  ← Staggered entrance (45ms × index)
│  02  Selected Projects        ↗     │
│  03  Talks & Community        ↗     │
│  04  Tech Stack               ↗     │
│  05  Contact                  ↗     │
├─────────────────────────────────────┤
│  [Resume (PDF)]    [Email Ayush]    │  ← Bottom actions (2-col grid)
│  GitHub • LinkedIn                │  ← Social links
└─────────────────────────────────────┘
```

- Backdrop: `bg-[#07080a]/96 backdrop-blur-2xl`
- Nav items: `py-3 border-b border-white/5`, `text-2xl font-display`
- Item colors: `lime`, `violet`, `coral`, `cyan`, `lime` (per NAV_SECTIONS variant)
- Stagger: `transitionDelay: ${i * 45}ms`

---

## 8. Component Anatomy: BlogView (Medium Archive)

**Source**: `components/BlogView.tsx`, `lib/rss.ts`

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│  Header (sticky)                                            │
│  [← Portfolio]    [● Medium RSS  /medium-blog/rss.xml] [Follow on Medium] │
├─────────────────────────────────────────────────────────────┤
│  Hero: "Technical Writings." + description                  │
├─────────────────────────────────────────────────────────────┤
│  Filter Bar: [All] [AI & Security] [Open Source] [OpenPrinting]  [Search...] │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────┐  ┌────────────────────┐  │
│  │ Post Feed (8/12 cols)        │  │ Sidebar (4/12)     │  │
│  │                              │  │                    │  │
│  │  ┌────────────────────────┐  │  │ ┌──────────────┐  │  │
│  │  │ Blog Card              │  │  │ │ Author Card  │  │  │
│  │  │ [Thumb] Title + Meta   │  │  │ │ 👤 Ayush     │  │  │
│  │  │ Tags · Read on Medium  │  │  │ │ Follow btn   │  │  │
│  │  └────────────────────────┘  │  │ │ RSS link     │  │  │
│  │  ... (staggered GSAP)        │  │ │ Social badges│  │  │
│  │                              │  │ └──────────────┘  │  │
│  │                              │  │ ┌──────────────┐  │  │
│  │                              │  │ │ Publications │  │  │
│  │                              │  │ │ Followed     │  │  │
│  │                              │  │ └──────────────┘  │  │
│  └──────────────────────────────┘  └────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  Footer: © 2026 · ← Return to Portfolio                     │
└─────────────────────────────────────────────────────────────┘
```

### Blog Card Anatomy

```tsx
// Card: group relative rounded-2xl border border-white/10 bg-[#121316]/75
// Hover: bg-[#121316]/95 border-[#d8ff58]/40 -translate-y-1.5 shadow-[0_20px_40px_rgba(0,0,0,0.6)]

// Left Column (flex-1):
//   Meta: Avatar + "Ayush Singh" • Date • Clock + ReadTime • Category pill (categoryColor)
//   Title: text-lg sm:text-xl font-display font-semibold, group-hover:text-lime underline
//   Excerpt: text-xs sm:text-sm text-muted line-clamp-3
//   Tags: #tag pills (text-[10px] font-mono)
//   Action: "Read on Medium" + ExternalLink (lime, translate-x on hover)

// Right Column (w-full sm:w-[140px] md:w-[160px] h-[100px]):
//   Thumbnail image (object-cover, group-hover:scale-105)
//   Gradient overlay (from-black/60)
//   Number badge: "01", "02"...
```

### Filter Pills

```tsx
// Active: bg-lime text-ink font-bold border-lime shadow-[0_0_20px_rgba(216,255,88,0.2)]
// Inactive: border-white/10 bg-white/[0.03] text-muted hover:text-paper hover:border-white/25
// Count badge: Active → bg-black/25 text-ink | Inactive → bg-white/10 text-muted
```

### Sidebar Cards

- **Author Card**: `rounded-2xl border-white/10 bg-[#121316]/75 backdrop-blur-[24px] p-5 sm:p-6 shadow-xl`
- **Publications Card**: `rounded-2xl border-white/10 bg-[#121316]/50 backdrop-blur-[20px] p-5 shadow-lg`

---

## 9. Component Anatomy: ProjectsIndexView

**Source**: `components/ProjectsIndexView.tsx`

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│  Header (sticky)                                            │
│  [← Back to Portfolio]                    [Read Blog →]     │
├─────────────────────────────────────────────────────────────┤
│  Hero: "Engineered for Scale, Reliability & Speed."         │
│  [Engineering Projects Archive // 8 Case Studies]           │
├─────────────────────────────────────────────────────────────┤
│  Filters: [All] [Linux & Systems] [Languages] [Full Stack]  [Search...] │
├─────────────────────────────────────────────────────────────┤
│  Grid (1/2/3 cols)                                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ Project Card│  │ Project Card│  │ Project Card│  ...    │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
├─────────────────────────────────────────────────────────────┤
│  Footer: © 2026 · Home · Blog · GitHub                      │
└─────────────────────────────────────────────────────────────┘
```

### Project Card Anatomy

```tsx
// Article: rounded-2xl border border-white/10 bg-[#121316]/70 hover:border-white/20

// Image Container: h-48 relative overflow-hidden
//   Image: fill object-cover group-hover:scale-105 opacity-90→100
//   Gradient: from-black/80 via-transparent to-transparent
//   Top-left: "01" badge (accent color) + Category pill
//   Bottom-right: Year badge (lime)

// Body: p-5
//   Title: Link → /projects/slug/, text-xl font-display font-bold, group-hover:text-lime
//   Tagline: text-xs font-mono font-medium (accent color)
//   Description: text-xs text-muted line-clamp-3
//   Tags: text-[10px] font-mono px-2 py-0.5 rounded-full border-white/10 bg-white/[0.03]

// Footer: p-5 pt-0 border-t border-white/5
//   Left: "Read Case Study" + ArrowRight (lime, group-hover:translate-x)
//   Right: ExternalLink (live) + GithubIcon (github)
```

### Filter Pills (Same pattern as BlogView)

- Categories: All, Linux & Systems, Languages & Runtimes, Full Stack Web
- Count badges on each pill

---

## 10. Component Anatomy: Project Detail Page

**Source**: `app/projects/[slug]/page.tsx`

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│  Header (sticky): [← All Projects]  [Portfolio Home]        │
├─────────────────────────────────────────────────────────────┐
│  Breadcrumb: Home → Projects → Title                        │
├─────────────────────────────────────────────────────────────┤
│  Title Header                                               │
│  [Category] [Year] [Role]                                   │
│  H1: Project Title                                          │
│  Tagline (mono, accent color)                               │
│  [Live Demo] [GitHub]                                       │
├─────────────────────────────────────────────────────────────┤
│  Hero Image: h-[280px] sm:h-[460px] rounded-2xl             │
├─────────────────────────────────────────────────────────────┤
│  Metrics Grid (2/4 cols): 4 metric cards                    │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────┐  ┌─────────────────────────┐  │
│  │ Main Content (2/3)      │  │ Sidebar (1/3, sticky)   │  │
│  │                         │  │                         │  │
│  │ System Overview         │  │ Technologies (tags)     │  │
│  │ Architecture            │  │ Developer Info          │  │
│  │ Key Deliverables        │  │ Context                 │  │
│  │ Additional Images       │  │ [Explore Live]          │  │
│  │                         │  │ [GitHub Repository]     │  │
│  └─────────────────────────┘  └─────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  Adjacent Projects: [← Prev] [Next →]                       │
├─────────────────────────────────────────────────────────────┤
│  Footer: Portfolio · Projects · Medium Blog · GitHub        │
└─────────────────────────────────────────────────────────────┘
```

### Section Cards

```tsx
// Rounded-2xl border-white/10 bg-[#121316]/40 p-6 sm:p-8
// H2: text-xl font-display font-bold + icon (Cpu/Layers/Sparkles) in accent color
// Content: text-sm sm:text-base text-muted leading-relaxed font-light
```

### Accent Colors per Project (from lib/projects.ts)

| Project Category | Accent | Hex |
|------------------|--------|-----|
| Linux & Systems / Open Source | `lime` | `#d8ff58` |
| Languages & Runtimes | `violet` | `#a786ff` |
| Full Stack Web | `coral` or `cyan` | `#ff806d` / `#7ff3da` |

---

## 11. Home Page Section Architecture

**Source**: `app/page.tsx`

### Section Order & IDs

| Order | Section ID | Label | Divider Color |
|-------|------------|-------|---------------|
| 1 | `hero` | HOME | — |
| 2 | `about` | ABOUT | `violet` (`#a786ff`) |
| 3 | `projects` | PROJECTS | `coral` (`#ff806d`) |
| 4 | `signal` | SPEAKING | `cyan` (`#7ff3da`) |
| 5 | `stack` | TECH STACK | `lime` (`#d8ff58`) |
| 6 | `contact` | CONTACT | — |

### Key Components (Imported)

- `IntroLoader` — Calligraphic "SinghCod3r" intro animation
- `AuroraCanvas` — WebGL fluid background (canvas)
- `HeroLanding` — Redesigned experimental hero
- `VelocityRibbon` — Scroll-aware horizontal scrolling text (2 instances)
- `PortraitCard` — Circular portrait with theme shadows
- `ProjectsShowcase` — Curated project cards (3 featured)
- `SectionDividerConnector` — SVG line connecting sections with labels
- `TechStackGrid` — Categorized technology badges
- `ContactCard` — Contact form / links
- `KineticFooter` — Large animated footer

### VelocityRibbon

```tsx
<VelocityRibbon
  direction={1}  // or -1 for reverse
  color="#d8ff58"  // or "#a786ff"
  items={["Open Source Developer", "Python Tooling", ...]}  // 6 items
/>
```

---

## 12. Data Structures

### Project (lib/projects.ts)

```ts
interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  fullDescription: string;
  architecture: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  image: string;
  additionalImages?: string[];
  tags: string[];
  category: string;  // "Linux & Systems" | "Open Source & Systems" | "Languages & Runtimes" | "Full Stack Web"
  accent: "lime" | "violet" | "coral" | "cyan";
  year: string;
  live: string;
  github: string;
  role: string;
}
```

### MediumPost (lib/rss.ts)

```ts
interface MediumPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;      // "Sep 30"
  year: string;      // "2026"
  readTime: string;  // "8 min read"
  category: "AI & Security" | "Open Source" | "OpenPrinting";
  categoryColor: string;  // "#d8ff58" | "#a786ff" | "#7ff3da"
  tags: string[];
  thumbnail: string;
  mediumUrl: string;
}
```

### FALLBACK_POSTS (5 hardcoded posts in lib/rss.ts:16-87)

Used when Medium RSS fetch fails or times out (6s timeout).

---

## 13. RSS Feed System

**Source**: `scripts/generate-rss.mjs`, `lib/rss.ts:89-223`, `app/medium-blog/page.tsx`, `app/layout.tsx:21-22`

### Build-Time Generation (`scripts/generate-rss.mjs`)

- Runs at build, writes `public/medium-blog/rss.xml`
- 5 hardcoded items matching FALLBACK_POSTS
- Output: RSS 2.0 with Atom, Dublin Core, Content namespaces
- Includes `<enclosure>` for images (length="0", type="image/png")
- Channel image: `https://singhcod3r.github.io/my_image.webp`

### Runtime Fetching (`lib/rss.ts:fetchMediumRssPosts`)

- Fetches `https://singhcod3r.medium.com/feed` with 6s timeout
- Parses XML with regex (no XML parser dependency)
- Transforms Medium CDN URLs: `/max/1024/` → `/v2/resize:fit:800/`
- Categorizes by keywords: "agent/ai/security" → AI & Security, "openprinting/printer/splix" → OpenPrinting, else Open Source
- Returns `{ posts: MediumPost[], isLiveRss: boolean }`
- Falls back to `FALLBACK_POSTS` on error

### RSS Autodiscovery

```tsx
// app/layout.tsx alternates
alternates: {
  canonical: "/",
  types: { "application/rss+xml": "/medium-blog/rss.xml" }
}

// app/medium-blog/page.tsx metadata
alternates: {
  canonical: "/medium-blog/",
  types: { "application/rss+xml": "/medium-blog/rss.xml" }
}
```

---

## 14. SEO & Metadata

**Source**: `app/layout.tsx`, `app/page.tsx`, `app/projects/[slug]/page.tsx`, `app/medium-blog/page.tsx`

### Root Metadata (layout.tsx)

```ts
metadataBase: new URL("https://singhcod3r.github.io")
title: "Ayush Singh (SinghCod3r) — Linux Systems Engineer & Full-Stack Developer"
description: "Official portfolio of Ayush Singh..."
verification: { google: "...", other: { "msvalidate.01": "..." } }
robots: { index: true, follow: true, googleBot: {...} }
openGraph: { type: "website", locale: "en_US", url, siteName, title, description, images: [{url, width:1200, height:630}] }
twitter: { card: "summary_large_image", site: "@SinghCod3r", creator: "@SinghCod3r" }
```

### JSON-LD Structured Data (layout.tsx)

```json
{
  "@graph": [
    { "@type": "Person", "@id": "#person", name, alternateName, url, image, jobTitle, description, worksFor, alumniOf, sameAs[], knowsAbout[], knowsLanguage[], mainEntityOfPage },
    { "@type": "WebSite", "@id": "#website", url, name, description, publisher: "#person", inLanguage: "en-US" },
    { "@type": "ProfilePage", "@id": "#profilepage", url, name, mainEntity: "#person" }
  ]
}
```

### Project Detail JSON-LD

```json
// SoftwareApplication
{ "@type": "SoftwareApplication", name, headline, description, applicationCategory, operatingSystem, url, codeRepository, author: "#person", keywords, datePublished, image }

// BreadcrumbList
{ "@type": "BreadcrumbList", itemListElement: [ {position:1, name:"Home"}, {position:2, name:"Projects"}, {position:3, name:project.title} ] }
```

---

## 15. Build & Deployment Configuration

**Source**: `next.config.mjs`, `package.json`, `.github/workflows/deploy.yml` (referenced)

### Next.js Config (`next.config.mjs`)

```js
const nextConfig = {
  output: "export",           // Static HTML export
  trailingSlash: true,        // All URLs end with /
  images: { unoptimized: true }  // No Image Optimization API (static host)
};
```

### Package.json Key Dependencies

```json
{
  "next": "15.5.6",
  "react": "^19",
  "react-dom": "^19",
  "gsap": "^3.12.7",
  "@gsap/react": "^2.1.2",
  "lenis": "^1.1.20",
  "lucide-react": "^0.475.0",
  "tailwindcss": "^3.4.17",
  "typescript": "^5"
}
```

### Scripts

```json
{
  "dev": "next dev",
  "build": "next build && node scripts/generate-rss.mjs",
  "start": "npx serve@latest out",
  "lint": "next lint"
}
```

### Deployment

- **Platform**: GitHub Pages
- **Workflow**: `.github/workflows/deploy.yml` (static export → deploy)
- **Base Path**: `/` (custom domain `singhcod3r.github.io`)
- **Output Directory**: `out/`

---

## 16. Implementation Notes & Gotchas

### Critical Behaviors

1. **No Lenis on Mobile/Touch**: `app/page.tsx:41-46` explicitly detects touch/coarse pointer and disables Lenis to preserve native 120Hz scroll. This is intentional — do not "fix" it.

2. **GSAP Context Cleanup**: All GSAP animations use `gsap.context(() => {...}, containerRef)` with cleanup via `ctx.revert()` in `useEffect` return.

3. **ScrollTrigger Bidirectional**: Home sections use `toggleActions: "play reverse play reverse"` for enter/leave/re-enter/re-leave.

4. **RSS Image URL Transformation**: Medium's `/max/` URLs are rewritten to `/v2/resize:fit:800/` for direct CDN access (`lib/rss.ts:181-186`).

5. **Static Export Constraints**: 
   - `output: "export"` + `trailingSlash: true` means all routes generate `index.html` in subdirectories
   - `images.unoptimized: true` required for `next/image` on static hosts
   - No server-side functions, ISR, or API routes

6. **Font Loading**: All fonts loaded via `<link rel="preconnect">` + Google Fonts stylesheet in `layout.tsx:170-175`. CSS variables defined in `globals.css:15-18`.

7. **Reduced Motion**: Global CSS media query disables ALL animations/transitions. GSAP effects check `matchMedia("(prefers-reduced-motion: reduce)")` before running.

8. **Dynamic Island URL State**: `?menu=open` query param opens expanded island on load (`DynamicIslandNav.tsx:82-84`).

9. **Category Colors**: Hardcoded in `lib/rss.ts` (fallback) and inferred from RSS categories at runtime. BlogView filter pills use same color mapping.

10. **Accordion Nav Sections**: `NAV_SECTIONS` array is single source of truth for both DynamicIslandNav (6 items) and MobileMenuDrawer (5 items — no HOME).

### File Reference Map

| Concern | Primary Files |
|---------|---------------|
| Colors, CSS variables, base styles | `app/globals.css` |
| Tailwind theme tokens | `tailwind.config.js` |
| Root layout, fonts, SEO, JSON-LD | `app/layout.tsx` |
| Home page composition | `app/page.tsx` |
| Dynamic Island Nav | `components/DynamicIslandNav.tsx` |
| Mobile Drawer | `components/MobileMenuDrawer.tsx` |
| Blog View (Medium archive) | `components/BlogView.tsx` |
| Projects Index | `components/ProjectsIndexView.tsx` |
| Project Detail | `app/projects/[slug]/page.tsx` |
| Medium Blog Page | `app/medium-blog/page.tsx` |
| Project Data | `lib/projects.ts` |
| RSS Types & Fetching | `lib/rss.ts` |
| RSS Generation Script | `scripts/generate-rss.mjs` |
| Icons | `components/Icons.tsx` |
| Next.js Config | `next.config.mjs` |

---

*Generated from codebase inspection. All values are exact as of commit `a88942c`.*