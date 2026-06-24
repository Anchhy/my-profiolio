// ────────── Personal Info ──────────
export interface PersonalInfo {
  name: string
  title: string
  intro: string
  resumeUrl: string
  socialLinks: {
    github: string
    email: string
    phone: string
  }
}

export const personalInfo: PersonalInfo = {
  name: 'ET ANCHHY',
  title: 'Web Developer',
  intro:
    'Year 4 Information & Communication Engineering student passionate about building modern web applications with Vue.js and NestJS.',
  resumeUrl: '#',
  socialLinks: {
    github: 'https://github.com/Anchhy',
    email: 'etanchhy@gmail.com',
    phone: '+855 93610886',
  },
}

// ────────── About ──────────
export const aboutPoints: string[] = [
  'Highly motivated Year 4 Information & Communication Engineering student.',
  'Strong foundation in software engineering and problem solving.',
  'Interested in Full Stack Development using Vue.js and NestJS.',
  'Looking for Web Development Internship opportunities.',
]

// ────────── Typing Effect Titles ──────────
export const typingTitles: string[] = [
  'Web Developer',
  'Vue.js Enthusiast',
  'Full Stack Developer',
  'NestJS Backend Developer',
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
  description: string
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
    title: 'NearMe Social',
    description:
      'Location-based social platform designed for secure nearby discovery and community interaction.',
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
    description:
      'Course enrollment and classroom scheduling system built with Spring Boot, featuring secure authentication, database migrations, and collaborative team workflow.',
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
    description:
      'Java OOP console application for managing book borrowing and returning with Admin and General User roles, using CSV-based data persistence.',
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

// ────────── Particles Config ──────────
export const particlesOptions = {
  fullScreen: { enable: false },
  background: { color: { value: 'transparent' } },
  fpsLimit: 60,
  particles: {
    number: {
      value: 60,
      density: { enable: true, width: 1920, height: 1080 },
    },
    color: { value: '#6366f1' },
    shape: { type: 'circle' },
    opacity: {
      value: { min: 0.1, max: 0.4 },
      animation: { enable: true, speed: 0.8, sync: false },
    },
    size: {
      value: { min: 1, max: 3 },
    },
    links: {
      enable: true,
      distance: 150,
      color: '#6366f1',
      opacity: 0.15,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1,
      direction: 'none' as const,
      outModes: { default: 'bounce' as const },
    },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: 'grab' },
    },
    modes: {
      grab: { distance: 140, links: { opacity: 0.3 } },
    },
  },
  detectRetina: true,
}
