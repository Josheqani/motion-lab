# Motion Lab — Production Framer Motion Showcase

<div align="center">

![Motion Lab Banner](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=400&q=80)

**A portfolio showcase of production-grade animation patterns built with React 19, Framer Motion, Tailwind CSS v4, and strict TypeScript.**

[![React 19](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev)
[![Framer Motion](https://img.shields.io/badge/Motion-13-black?style=flat-square&logo=framer)](https://motion.dev)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Vite 6](https://img.shields.io/badge/Vite-6-646cff?style=flat-square&logo=vite)](https://vite.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=flat-square)](./LICENSE)

[Live Demo](https://josheqani.github.io/motion-lab/) • [Documentation](#the-five-production-demos) • [Getting Started](#getting-started) • [Architecture](#architecture--quality-bar)

</div>

---

## Overview

**Motion Lab** is a modern reference laboratory and portfolio piece demonstrating how to architect fluid, tactile, accessible, and high-performance animation patterns for modern web applications. 

Rather than isolated gimmicks, each demonstration solves a tangible product engineering challenge: preserving spatial continuity during view changes, choreographing scroll narratives without frame drops, facilitating natural drag-and-drop reordering, and translating multi-touch gestures into rotational torque.

### Core Tenets
- **GPU Acceleration First**: Transforms (`translate3d`, `scale`, `rotate`) and `opacity` are targeted exclusively to ensure animations execute on compositor threads without triggering layout recalculations (reflows).
- **Strict Accessibility Compliance**: First-class support for `prefers-reduced-motion` across every pattern, providing graceful, instant opacity transitions for vestibular safety.
- **Strict TypeScript**: 100% strict TypeScript mode with zero `any` types, typed pan interactions, and strongly-typed motion variants.
- **Granular Code-Splitting**: Modular architecture leveraging `React.lazy()` and Rollup chunking to ensure near-instant initial page loads.

---

## The Five Production Demos

### 1. Directional Page Transitions
> **Route:** `/demos/page-transitions` • **Key API:** `AnimatePresence`, `custom` direction props

Seamless multi-route transitions combining directional horizontal slide, velocity-aware springs, and subtle blur softening. Automatically computes whether the target page index is forward or backward to slide from the appropriate edge.

```
┌────────────────────────────────────────────────────────┐
│ [Screenshot / Animated GIF Placeholder: Page Transitions]│
│  • Bidirectional slide (+/- X)                         │
│  • Blur softening + alpha cross-fade                   │
│  • Mode toggle: sequential 'wait' vs cross 'popLayout' │
└────────────────────────────────────────────────────────┘
```

- **Features:** Direction-aware spatial translation, spring damping tuning, sequential vs cross-dissolve mode toggles, and zero-vertigo reduced motion fallback.
- **Source:** [`src/demos/page-transitions/PageTransitionsDemo.tsx`](./src/demos/page-transitions/PageTransitionsDemo.tsx)

---

### 2. Shared Layout Animation (Grid to Modal)
> **Route:** `/demos/shared-layout` • **Key API:** `layoutId`, FLIP bounding rect calculation

An Instagram / Dribbble-style media gallery where clicking any thumbnail card seamlessly morphs its container, hero image, and typography into a high-fidelity modal view, and smoothly collapses back to the exact grid cell on dismissal.

```
┌────────────────────────────────────────────────────────┐
│ [Screenshot / Animated GIF Placeholder: Shared Layout] │
│  • layoutId geometry delta calculations                │
│  • Coordinated container, image, and typography morph  │
│  • Escape key and backdrop dismissal                   │
└────────────────────────────────────────────────────────┘
```

- **Features:** Coordinate delta calculation via FLIP (First, Last, Invert, Play), backdrop blur synchronization with `AnimatePresence`, keyboard `Escape` listening, and like state preservation.
- **Source:** [`src/demos/shared-layout/SharedLayoutDemo.tsx`](./src/demos/shared-layout/SharedLayoutDemo.tsx)

---

### 3. Scroll-Triggered Reveal & Telemetry
> **Route:** `/demos/scroll-reveal` • **Key API:** `whileInView`, `useInView`, `staggerChildren`, `useScroll`

A choreographed narrative section demonstrating entrance mechanics as elements scroll into the viewport. Features a continuous scroll progress meter, staggered variant children, and imperative telemetry triggers.

```
┌────────────────────────────────────────────────────────┐
│ [Screenshot / Animated GIF Placeholder: Scroll Reveal] │
│  • Spring-driven scroll progress bar at top            │
│  • Staggered child variants on viewport intersection   │
│  • Programmatic useInView real-time metric reveals     │
└────────────────────────────────────────────────────────┘
```

- **Features:** Staggered child variants (`staggerChildren`), negative root margin thresholds (`-60px`), live scroll percentage spring bar, and interactive toggle between single-fire and dynamic re-triggering.
- **Source:** [`src/demos/scroll-reveal/ScrollRevealDemo.tsx`](./src/demos/scroll-reveal/ScrollRevealDemo.tsx)

---

### 4. Drag-to-Reorder Sprint Backlog
> **Route:** `/demos/drag-reorder` • **Key API:** `Reorder.Group`, `Reorder.Item`, `axis="y"`

A production-style task prioritization queue utilizing Framer Motion’s dedicated reorder primitives. Includes vertical drag constraints, elevation lift with spring scaling, and real-time state synchronization.

```
┌────────────────────────────────────────────────────────┐
│ [Screenshot / Animated GIF Placeholder: Drag Reorder]  │
│  • Reorder.Group and Reorder.Item components           │
│  • Elevation lift, drop shadow, and grabbing cursor    │
│  • Live state array inspector & item additions/deletions│
└────────────────────────────────────────────────────────┘
```

- **Features:** Axis-locked Y dragging, neighboring item FLIP displacement, live JSON state inspector, item removal animations with `AnimatePresence`, and task priority badges.
- **Source:** [`src/demos/drag-reorder/DragReorderDemo.tsx`](./src/demos/drag-reorder/DragReorderDemo.tsx)

---

### 5. Gesture Swipe Cards (Tinder Physics)
> **Route:** `/demos/gesture-swipe` • **Key API:** `drag="x"`, `useMotionValue`, `useTransform`, `onDragEnd`

A physical card deck stack mapping continuous pointer drag displacement to rotational tilt torque and dynamic stamp verdict opacities ("LIKE", "NOPE", "SUPERLIKE"). Uses velocity-based detection to eject swiped cards off-screen while smoothly interpolating background cards forward.

```
┌────────────────────────────────────────────────────────┐
│ [Screenshot / Animated GIF Placeholder: Gesture Swipe] │
│  • Continuous useMotionValue drag tracking             │
│  • Dynamic useTransform for rotational torque & stamps │
│  • Velocity & distance threshold detection onDragEnd   │
└────────────────────────────────────────────────────────┘
```

- **Features:** 2D elastic dragging, rotational torque curves, dynamic verdict stamp reveals, background card depth interpolation (scale + Y offset), full undo/rewind history, and circular action buttons.
- **Source:** [`src/demos/gesture-swipe/GestureSwipeDemo.tsx`](./src/demos/gesture-swipe/GestureSwipeDemo.tsx)

---

## Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [React 19](https://react.dev) | Latest React release with standard root rendering |
| **Animation Engine** | [Motion (Framer Motion 13)](https://motion.dev) | Hardware-accelerated physics, gestures, FLIP layout, and AnimatePresence |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) | Modern `@theme` tokens and selector-based dark mode |
| **Routing** | [React Router v7](https://reactrouter.com) | Client-side routing with animated route wrappers |
| **Syntax Highlighting** | [React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) | Prism syntax formatting for key animation snippets |
| **Icons** | [Lucide React](https://lucide.dev) | Clean, tree-shakeable SVG icons |
| **Bundler** | [Vite 6](https://vite.dev) + [TypeScript 5.8](https://www.typescriptlang.org) | Sub-second HMR and strict compiler typechecking |

---

## Getting Started

### Prerequisites
- Node.js 20+
- pnpm (recommended), npm, or yarn

### Installation & Development

```bash
# 1. Clone repository
git clone https://github.com/Josheqani/motion-lab.git
cd motion-lab

# 2. Install dependencies
pnpm install

# 3. Start development server
pnpm dev
```

Visit `http://localhost:5173` to explore the interactive showcase.

### Production Build

```bash
# Type check and build static bundle for production
pnpm build

# Preview production build locally
pnpm preview
```

The output is written to `dist/`, fully optimized and ready for zero-configuration static deployment on **Vercel**, **Cloudflare Pages**, or **Netlify**.

---

## Project Structure

```
motion-lab/
├── public/
├── src/
│   ├── components/
│   │   ├── CodePanel.tsx          # Syntax-highlighted snippet viewer with copy feedback
│   │   ├── DemoLayout.tsx         # Shared shell: metadata, live canvas, explanation, code
│   │   ├── MiniPreviews.tsx       # Interactive mini-preview cards for Home page
│   │   └── Nav.tsx                # Sticky navbar with theme toggle & reduced motion mode
│   ├── context/
│   │   └── ThemeContext.tsx       # Dark/light mode & prefers-reduced-motion provider
│   ├── demos/
│   │   ├── demosData.ts           # Central metadata registry for all showcase demos
│   │   ├── page-transitions/      # Directional slide + fade transitions
│   │   ├── shared-layout/         # Instagram-style grid to modal layoutId morph
│   │   ├── scroll-reveal/         # whileInView, staggered cascade & useInView
│   │   ├── drag-reorder/          # Reorder.Group & Reorder.Item list reordering
│   │   └── gesture-swipe/         # Tinder-style card stack with velocity dismissal
│   ├── pages/
│   │   └── HomePage.tsx           # Showcase landing page with filters & mini-previews
│   ├── App.tsx                    # Animated route transitions & code-split routes
│   ├── main.tsx                   # StrictMode and BrowserRouter root
│   ├── index.css                  # Tailwind v4 import, fonts & dark mode variants
│   └── types.ts                   # Strongly-typed demo interfaces
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Architecture & Quality Bar

### 1. Zero Jank Performance (60fps / 120fps)
Every pattern is designed to avoid mutating CSS geometry properties (`width`, `height`, `top`, `left`, `margin`) during runtime loops. All transitions utilize GPU-accelerated `transform` matrices and `opacity`.

### 2. Accessible by Default (prefers-reduced-motion)
Users with vestibular sensitivities can experience severe motion sickness from large sliding transitions. Motion Lab provides an interactive reduced-motion mode toggle in the navigation header, and automatically adheres to system OS preferences:
```tsx
const { reducedMotion } = useTheme()

const variants: Variants = {
  enter: (dir: number) => ({
    x: reducedMotion ? 0 : dir > 0 ? 48 : -48,
    opacity: 0,
    filter: reducedMotion ? 'none' : 'blur(4px)',
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px)',
  },
}
```

### 3. Dark Mode & Responsive Layouts
Tailwind CSS v4 custom variant selectors (`@custom-variant dark`) ensure crisp dark and light theme styles with no flash of unstyled content (FOUC). Fully tested and responsive across viewport widths from **375px** (mobile) to **1440px** (ultrawide desktop).

---

## License

MIT © [Josheqani](https://github.com/Josheqani)
