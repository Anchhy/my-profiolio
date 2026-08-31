# ET ANCHHY — Personal Portfolio

A modern, responsive personal portfolio website built with **Vue 3**, **Vite**, **Tailwind CSS v4**, and **TypeScript**.

![Vue 3](https://img.shields.io/badge/Vue-3-4FC08D?logo=vuedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)

## ✨ Features

- 💼 **Recruiter-Focused Profile** — Fifth-year status, CCN internship evidence, availability, and focused project outcomes
- 🎨 **Dark / Light Mode** — Persistent toggle with system-preference fallback
- 🗂️ **Project Filtering** — Filter featured work by technical focus
- 🧾 **Project Case Studies** — Accessible detail dialogs with contributions, features, and links
- 🎓 **Free Learning Center** — Seven practical courses with lessons, examples, quizzes, projects, and cheat sheets
- ✉️ **Contact Composer** — Validated form that prepares a complete email enquiry
- 🖨️ **Downloadable Résumé** — One-page A4 PDF with profile photo, experience, projects, and contact links
- 📱 **Mobile-First Design** — Fully responsive with hamburger menu
- 🎯 **Scroll Spy Navigation** — Active section highlighting in navbar
- 📈 **Reading Progress** — Subtle page-progress indicator in the navigation
- ♿ **Accessible** — Semantic HTML, ARIA labels, focus management, and keyboard-friendly interactions
- 🔍 **SEO and Sharing** — Route-aware metadata, structured data, canonical URLs, and a custom social card
- 🧭 **Resilient Routing** — Branded 404 page and a static-host SPA fallback

## 🗂️ Project Structure

```
src/
├── assets/style.css          # Tailwind import + design system
├── components/
│   ├── NavBar.vue            # Sticky navbar + dark mode toggle
│   ├── HeroSection.vue       # Hero + print résumé action
│   ├── AboutSection.vue      # About + working principles
│   ├── ExperienceSection.vue # CCN internship experience
│   ├── SkillsSection.vue     # Skill categories
│   ├── ProjectsSection.vue   # Filterable project showcase
│   ├── ProjectModal.vue      # Accessible project case-study dialog
│   ├── EducationSection.vue  # Education summary
│   ├── ContactSection.vue    # Email composer + contact details
│   └── FooterSection.vue     # Footer with links + back-to-top
├── composables/
│   ├── useDarkMode.ts        # Dark/light mode composable
│   └── useScrollAnimation.ts # Intersection Observer composable
├── data/
│   ├── portfolio.ts          # Portfolio content and project data
│   └── learning.ts           # Course, quiz, and cheat-sheet data
├── layouts/
│   └── DefaultLayout.vue     # Main layout wrapper
├── router/
│   └── index.ts              # Routes, smooth scroll, and page metadata
├── views/
│   ├── HomeView.vue          # Main portfolio page
│   ├── LearningHubView.vue   # Course catalog and filters
│   ├── CourseLearningView.vue # Reusable course experience
│   ├── NestJsLearningView.vue # Extended NestJS learning path
│   └── NotFoundView.vue      # Branded 404 route
├── App.vue                   # Root component
└── main.ts                   # Entry point

resume/                       # Editable HTML résumé source
social/                       # Editable 1200×630 social-card source
public/                       # PDF résumé, social image, and custom domain
```

## 🚀 Getting Started

### Prerequisites

- Node.js ^20.19.0 or ≥22.12.0
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

### Static hosting and GitHub Pages

`npm run build` creates the deployable `dist/` folder and copies the app shell to
`dist/404.html`, so direct links such as `/learn/vue` work on static hosts. The
custom domain is defined in `public/CNAME`; update that file if the domain changes.

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Vue 3 (Composition API) |
| Build Tool | Vite 8 |
| Language | TypeScript 6 |
| Styling | Tailwind CSS 4 |
| Router | Vue Router 4 |
| Icons | Lucide Vue Next |

## 📄 License

MIT © ET ANCHHY
