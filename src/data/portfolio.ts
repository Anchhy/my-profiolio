import arenaClashImage from '../assets/Arena-clash.png'

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
    'I turn product ideas into clear interfaces and dependable APIs using Vue, NestJS, and Spring Boot.',
  location: 'Phnom Penh, Cambodia',
  availability: 'Open to internship opportunities',
  socialLinks: {
    github: 'https://github.com/Anchhy',
    email: 'etanchhy@gmail.com',
    phone: '+855 93610886',
  },
}

// ────────── About ──────────
export const aboutPoints: string[] = [
  'Year 4 Information & Communication Engineering student at ITC.',
  'Comfortable working across frontend, backend, and relational databases.',
  'Experienced in collaborative projects, Git workflows, and API integration.',
  'Currently looking for a web development internship where I can learn and contribute.',
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

// ────────── Projects ──────────
export interface Project {
  title: string
  eyebrow: string
  category: 'Full stack' | 'Backend' | 'Java'
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
    title: 'Arena Clash',
    eyebrow: 'Multiplayer browser game',
    category: 'Full stack',
    description:
      'Server-authoritative multiplayer fighting game for 1–4 players, featuring private rooms, CPU opponents, responsive controls, and Khmer-inspired visuals.',
    contribution:
      'Built the real-time game client and authoritative server, including party management, combat simulation, reconnect flows, persistence, and responsive keyboard and touch controls.',
    features: [
      'Real-time 1–4 player battles',
      'Four game modes with CPU opponents',
      'Private room codes and persistent parties',
      'Server-authoritative combat and anti-cheat validation',
      'Keyboard and multi-touch mobile controls',
      'Signed player reconnection',
      'Match results and player statistics',
    ],
    techStack: ['TypeScript', 'Phaser', 'NestJS', 'Socket.IO', 'Prisma', 'PostgreSQL', 'Redis'],
    githubUrl: 'https://github.com/Anchhy/ARENA-CLASH',
    liveUrl: 'https://arena-clash-mnxo.onrender.com/',
    imageUrl: arenaClashImage,
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
