# ET ANCHHY — Personal Portfolio

A modern, responsive personal portfolio website built with **Vue 3**, **Vite**, **Tailwind CSS v4**, and **TypeScript**.

![Vue 3](https://img.shields.io/badge/Vue-3-4FC08D?logo=vuedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)

## ✨ Features

- 🎨 **Dark / Light Mode** — Persistent toggle with system-preference fallback
- ⌨️ **Typing Animation** — Cycles through developer titles in the hero section
- 🌌 **Particle Background** — Interactive constellation effect (tsParticles)
- 📊 **Animated Skill Bars** — Progress bars animate on scroll
- 📱 **Mobile-First Design** — Fully responsive with hamburger menu
- 🎯 **Scroll Spy Navigation** — Active section highlighting in navbar
- 💎 **Glassmorphism UI** — Modern frosted-glass navbar and cards
- ♿ **Accessible** — Semantic HTML, ARIA labels, keyboard-friendly
- 🔍 **SEO Optimized** — Meta tags, Open Graph, structured headings

## 🗂️ Project Structure

```
src/
├── assets/style.css          # Tailwind import + design system
├── components/
│   ├── NavBar.vue            # Sticky navbar + dark mode toggle
│   ├── HeroSection.vue       # Hero with particles + typing effect
│   ├── AboutSection.vue      # About me with icon cards
│   ├── SkillsSection.vue     # Skill categories + progress bars
│   ├── ProjectsSection.vue   # Featured project showcase
│   ├── EducationSection.vue  # Education timeline
│   ├── ContactSection.vue    # Contact form + info cards
│   └── FooterSection.vue     # Footer with links + back-to-top
├── composables/
│   ├── useDarkMode.ts        # Dark/light mode composable
│   ├── useTypewriter.ts      # Typing animation composable
│   └── useScrollAnimation.ts # Intersection Observer composable
├── data/
│   └── portfolio.ts          # All portfolio data objects
├── layouts/
│   └── DefaultLayout.vue     # Main layout wrapper
├── router/
│   └── index.ts              # Vue Router with smooth scroll
├── views/
│   └── HomeView.vue          # Main page composing all sections
├── App.vue                   # Root component + loading screen
└── main.ts                   # Entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Install & Run

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (follow prompts)
vercel

# Deploy to production
vercel --prod
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) for automatic deployments on push.

### Netlify

```bash
# Build first
npm run build

# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

Or drag-and-drop the `dist/` folder at [app.netlify.com](https://app.netlify.com).

### GitHub Pages

1. Install the plugin:
   ```bash
   npm install -D vite-plugin-gh-pages
   ```
2. Set `base` in `vite.config.ts`:
   ```ts
   base: '/your-repo-name/'
   ```
3. Build and deploy:
   ```bash
   npm run build
   npx gh-pages -d dist
   ```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Vue 3 (Composition API) |
| Build Tool | Vite 8 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Router | Vue Router 4 |
| Particles | @tsparticles/vue3 |
| Icons | Lucide Vue Next |

## 📄 License

MIT © ET ANCHHY
