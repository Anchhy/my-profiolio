import flowStateImage from '../assets/flowstate.png'
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
    email: string
    phone: string
  }
}

export const personalInfo: PersonalInfo = {
  name: 'Et Anchhy',
  title: 'Full-Stack Web Developer',
  intro:
    'I build clear interfaces and dependable APIs, with hands-on backend experience in authentication, workflow, and notification systems.',
  location: 'Phnom Penh, Cambodia',
  availability: 'Open to junior developer opportunities',
  resumeUrl: '/Et-Anchhy-Resume.pdf',
  socialLinks: {
    github: 'https://github.com/Anchhy',
    email: 'etanchhy@gmail.com',
    phone: '+855 93610886',
  },
}

// ────────── About ──────────
export const aboutPoints: string[] = [
  'Year 4 Information & Communication Engineering student at ITC.',
  'Backend Developer Intern contributing to the Cambodia Council of Nurses platform.',
  'Hands-on experience with secure authentication, workflow APIs, and real-time notifications.',
  'Comfortable working across frontend, backend, relational databases, and collaborative Git workflows.',
]

// ────────── Skills ──────────
export interface Skill {
  name: string
  level: number // 0-100
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
      { name: 'HTML5', level: 90 },
      { name: 'CSS3', level: 85 },
      { name: 'JavaScript', level: 85 },
      { name: 'TypeScript', level: 80 },
      { name: 'Vue 3', level: 85 },
      { name: 'Tailwind CSS', level: 80 },
    ],
  },
  {
    title: 'Backend',
    icon: 'server',
    skills: [
      { name: 'Java', level: 75 },
      { name: 'Spring Boot', level: 72 },
      { name: 'Node.js', level: 80 },
      { name: 'NestJS', level: 82 },
      { name: 'Laravel', level: 70 },
      { name: 'REST API', level: 85 },
      { name: 'Sequelize', level: 78 },
      { name: 'TypeORM', level: 75 },
      { name: 'JWT Authentication', level: 78 },
    ],
  },
  {
    title: 'Database',
    icon: 'database',
    skills: [
      { name: 'PostgreSQL', level: 80 },
      { name: 'MySQL', level: 75 },
    ],
  },
  {
    title: 'DevOps & Tools',
    icon: 'wrench',
    skills: [
      { name: 'Git', level: 85 },
      { name: 'GitHub', level: 85 },
      { name: 'Docker', level: 70 },
      { name: 'Jenkins', level: 68 },
      { name: 'Postman', level: 80 },
      { name: 'Linux', level: 75 },
      { name: 'VS Code', level: 90 },
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
    liveUrl: 'http://flowstate.et-anchhy.me/',
    imageUrl: flowStateImage,
  },
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
    githubFrontendUrl: 'https://github.com/Anchhy/skill-bridge-frontend',
    githubBackendUrl: 'https://github.com/Anchhy/skill-bridge-backend',
    imageUrl: skillBridgeImage,
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
    status: 'Year 4 Student',
    years: '2022 – Present',
    description:
      'Studying core engineering concepts including software development, networking, and system design with a focus on web technologies.',
  },
]
