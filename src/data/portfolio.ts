import ccnImage from '../assets/ccn.webp'
import englishPathImage from '../assets/englishpath.webp'
import flowStateImage from '../assets/flowstate.webp'
import skillBridgeImage from '../assets/skillbridge-kh.png'

// ────────── Personal Info ──────────
export interface PersonalInfo {
  name: string
  title: string
  intro: string
  location: string
  availability: string
  resumeUrl?: string
  socialLinks: {
    github: string
    telegram: string
    email: string
    phone: string
  }
}

export const personalInfo: PersonalInfo = {
  name: 'Et Anchhy',
  title: 'Full-Stack Web Developer',
  intro:
    'I’m a fifth-year engineering student and full-stack developer building clear interfaces, dependable APIs, and secure workflow-driven systems.',
  location: 'Phnom Penh, Cambodia',
  availability: 'Open to junior full-stack and backend roles',
  resumeUrl: '/Et-Anchhy-Resume.pdf',
  socialLinks: {
    github: 'https://github.com/Anchhy',
    telegram: 'https://t.me/anchhyet',
    email: 'etanchhy@gmail.com',
    phone: '+855 93610886',
  },
}

// ────────── About ──────────
export const aboutPoints: string[] = [
  'Fifth-year Information & Communication Engineering student at ITC.',
  'Backend Developer Intern contributing to the Cambodia Council of Nurses platform.',
  'Hands-on experience with secure authentication, workflow APIs, relational data, and real-time systems.',
  'Comfortable working across frontend, backend, relational databases, and collaborative Git workflows.',
]

// ────────── Skills ──────────
export interface Skill {
  name: string
}

export interface SkillCategory {
  title: string
  icon: string // lucide icon name
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: 'monitor',
    skills: [
      { name: 'TypeScript' },
      { name: 'Vue 3' },
      { name: 'Angular' },
      { name: 'React' },
      { name: 'JavaScript' },
      { name: 'Tailwind CSS' },
      { name: 'Responsive UI' },
      { name: 'Accessibility' },
    ],
  },
  {
    title: 'Backend',
    icon: 'server',
    skills: [
      { name: 'NestJS' },
      { name: 'Node.js' },
      { name: 'REST API design' },
      { name: 'Spring Boot' },
      { name: 'Java' },
      { name: 'Socket.IO' },
      { name: 'JWT & RBAC' },
    ],
  },
  {
    title: 'Database',
    icon: 'database',
    skills: [
      { name: 'PostgreSQL' },
      { name: 'MySQL' },
      { name: 'Prisma' },
      { name: 'Sequelize' },
      { name: 'TypeORM' },
      { name: 'Database migrations' },
    ],
  },
  {
    title: 'DevOps & Tools',
    icon: 'wrench',
    skills: [
      { name: 'Git & GitHub' },
      { name: 'Docker' },
      { name: 'Jest' },
      { name: 'Postman' },
      { name: 'Linux' },
      { name: 'Jenkins' },
      { name: 'Vite' },
    ],
  },
]

// ────────── Experience ──────────
export interface Experience {
  organization: string
  role: string
  employmentType: string
  period: string
  location: string
  summary: string
  achievements: string[]
  techStack: string[]
  imageUrl?: string
  imageAlt?: string
}

export const experience: Experience[] = [
  {
    organization: 'Cambodia Council of Nurses (CCN)',
    role: 'Backend Developer Intern',
    employmentType: 'Internship',
    period: '2026 — Present',
    location: 'Phnom Penh, Cambodia',
    summary:
      'Contributing to a production-oriented nursing council platform with a focus on API reliability, authentication, authorization, and notification workflows.',
    imageUrl: ccnImage,
    imageAlt: 'Cambodian Council of Nurses web platform login interface',
    achievements: [
      'Developed and maintained NestJS REST APIs for login, OTP verification, password recovery, session validation, and role-based access.',
      'Improved personal and actionable-work notifications across workflow, CPD, and Presentation processes, including unread counts and read-state handling.',
      'Diagnosed a polymorphic notification-reference database constraint and delivered a repeatable PostgreSQL remediation with focused automated verification.',
      'Validated backend behavior with Jest, Postman, TypeScript builds, and API contract checks for web and mobile clients.',
    ],
    techStack: ['NestJS', 'TypeScript', 'PostgreSQL', 'Sequelize', 'JWT', 'Socket.IO', 'Jest', 'Postman'],
  },
]

// ────────── Projects ──────────
export interface Project {
  title: string
  eyebrow: string
  category: 'Full stack' | 'Frontend' | 'Backend' | 'Java'
  description: string
  contribution: string
  features: string[]
  techStack: string[]
  githubUrl?: string
  githubBackendUrl?: string
  githubFrontendUrl?: string
  liveUrl?: string
  isGroupProject?: boolean
  teamInfo?: string
  imageUrl?: string
}

export const projects: Project[] = [
  {
    title: 'SkillBridge-KH',
    eyebrow: 'Student opportunity platform',
    category: 'Full stack',
    description:
      'A student-focused platform that connects Cambodian university students with internships, project teammates, and beginner-friendly freelance opportunities.',
    contribution:
      'Designed and built the Angular frontend and NestJS API, including secure role-based workflows, marketplace discovery, applications, team collaboration, administration, and production-ready deployment infrastructure.',
    features: [
      'Internship discovery, saving, applications, and interview scheduling',
      'Student project teammate matching, tasks, and milestones',
      'Beginner freelance jobs, proposals, deliverables, and reviews',
      'Student, company, client, and administrator roles',
      'Secure JWT sessions with rotating HttpOnly refresh cookies',
      'Notifications, reporting, moderation, and audit records',
      'Responsive Angular interface with unified search and dashboards',
    ],
    techStack: ['Angular 22', 'NestJS 11', 'TypeScript', 'Prisma 7', 'PostgreSQL 17', 'Docker'],
    imageUrl: skillBridgeImage,
  },
  {
    title: 'EnglishPath',
    eyebrow: 'Free adaptive English-learning platform',
    category: 'Full stack',
    description:
      'A free English-learning platform that helps learners find their CEFR level, follow a personalized path, practice skills, and track progress from Pre-A1 through C2.',
    contribution:
      'Designed and built the Vue learner experience and NestJS API, including adaptive placement scoring, secure authentication, curriculum data, progress and mastery tracking, automated tests, and deployment configuration.',
    features: [
      'Adaptive Pre-A1–C2 placement assessment',
      'Personalized learning roadmap and lesson player',
      'Listening, speaking, reading, and writing practice',
      'Progress, mastery, vocabulary, and achievements',
      'Secure rotating refresh-token sessions',
      'Responsive learner dashboard and onboarding',
      'Free access with no ads, subscriptions, or paid API keys',
    ],
    techStack: ['Vue 3', 'Pinia', 'NestJS', 'Prisma', 'PostgreSQL', 'TypeScript', 'Docker', 'Playwright'],
    githubUrl: 'https://github.com/et-anchhy/start-english',
    imageUrl: englishPathImage,
  },
  {
    title: 'FlowState',
    eyebrow: 'Focus and productivity app',
    category: 'Frontend',
    description:
      'A calm, privacy-first productivity app that combines a customizable focus timer, layered ambient soundscapes, and locally stored progress tracking.',
    contribution:
      'Designed and built the responsive React experience, including focus and break workflows, a browser-based ambient sound mixer, animated interactions, and local session analytics.',
    features: [
      'Customizable 15–90 minute focus sessions',
      'Focus and break timer workflows',
      'Eight mixable ambient soundscapes',
      'Weekly activity and focus streaks',
      'Recent session history and averages',
      'Private browser-local data storage',
      'Responsive, motion-rich interface',
    ],
    techStack: ['React 19', 'Vite', 'Zustand', 'Framer Motion', 'Web Audio API', 'LocalStorage'],
    githubUrl: 'https://github.com/et-anchhy/FlowState',
    imageUrl: flowStateImage,
  },
  {
    title: 'NearMe Social',
    eyebrow: 'Social platform',
    category: 'Full stack',
    description:
      'Location-based social platform designed for secure nearby discovery and community interaction.',
    contribution:
      'Built notification backend architecture and core social interfaces, including private chat, posts, discussions, and moderation tools.',
    features: [
      'Notification backend architecture',
      'REST APIs',
      'Private Chat UI',
      'Create Post & Discussion UI',
      'Real-time notifications',
      'UserBlock and Report systems',
      'Admin Dashboard',
    ],
    techStack: ['Vue 3', 'NestJS', 'PostgreSQL', 'TypeORM'],
    githubBackendUrl: 'https://github.com/NearMe-Social/nms_backend',
    githubFrontendUrl: 'https://github.com/NearMe-Social/nms_frontend',
    liveUrl: 'https://nmsfrontend.vercel.app/',
    isGroupProject: true,
  },
  {
    title: 'Course Enrollment & Scheduling',
    eyebrow: 'Academic system',
    category: 'Backend',
    description:
      'Course enrollment and classroom scheduling system built with Spring Boot, featuring secure authentication, database migrations, and collaborative team workflow.',
    contribution:
      'Collaborated in a five-person team on secure enrollment workflows, database migrations, and server-rendered interfaces.',
    features: [
      'Spring Security authentication',
      'Flyway database migrations',
      'Course enrollment management',
      'Classroom scheduling system',
      'Thymeleaf server-side rendering',
      'Spring Data JPA with MySQL',
      'Maven build system',
    ],
    techStack: ['Java 21', 'Spring Boot 3', 'MySQL', 'Thymeleaf', 'Flyway', 'Maven'],
    githubUrl: 'https://github.com/Ascendant-7/course_enrollment',
    isGroupProject: true,
    teamInfo: 'GIC Department — Group 3 (5 members)',
  },
  {
    title: 'Library Management System',
    eyebrow: 'Java application',
    category: 'Java',
    description:
      'Java OOP console application for managing book borrowing and returning with Admin and General User roles, using CSV-based data persistence.',
    contribution:
      'Applied object-oriented design to role-based book, user, and transaction management with persistent CSV storage.',
    features: [
      'Admin & User role system',
      'Browse books by category',
      'Borrow & return books',
      'Add, edit & delete books',
      'User management (CRUD)',
      'Transaction history tracking',
      'CSV file data persistence',
    ],
    techStack: ['Java', 'OOP', 'CSV Storage'],
    githubUrl: 'https://github.com/Hak-Sengkea/teamProject',
    isGroupProject: true,
  },
]

// ────────── Education ──────────
export interface Education {
  institution: string
  degree: string
  field: string
  status: string
  years: string
  description: string
}

export const education: Education[] = [
  {
    institution: 'Institute of Technology of Cambodia (ITC)',
    degree: 'Engineer Degree Program',
    field: 'Information & Communication Engineering',
    status: 'Fifth-Year Student',
    years: '2022 – Present',
    description:
      'Completing an engineering curriculum spanning software development, networking, and system design, with a practical focus on full-stack web systems.',
  },
]
