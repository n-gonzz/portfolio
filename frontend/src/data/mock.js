export const personalInfo = {
  name: "Nicolás González Dobarro",
  title: "Full-Stack Developer | Web & IT Solutions",
  tagline: "Building fast, modern & professional web solutions — from clean code to reliable deployment",
  location: "Lalín, Galicia, Spain",
  email: "contacto@ngonzz.eu",
  github: "https://github.com/ngonzz",
  githubHandle: "ngonzz",
  linkedin: "https://www.linkedin.com/in/ngonzz",
  linkedinHandle: "ngonzz",
  bio: "Full-Stack Developer with a passion for creating fast, modern, and professional web solutions. Experienced in frontend and backend development, server management, and project deployment. Focused on writing clean code and building reliable applications.",
  level: 22,
  currentXP: 6200,
  maxXP: 10000,
};

export const typewriterTexts = [
  "Full-Stack Developer",
  "Web & IT Solutions",
  "WordPress Expert",
  "Founder of NGONZZ",
];

export const stats = [
  { label: "Projects Built", value: 12, icon: "LayoutGrid" },
  { label: "GitHub Repos", value: 15, icon: "GitFork" },
  { label: "Lines of Code", value: "50K+", icon: "Code" },
  { label: "Clients Served", value: 5, icon: "Users" },
];

export const achievements = [
  {
    name: "First Deploy",
    description: "Launched the first live website",
    rarity: "COMMON",
    color: "#6b7280",
  },
  {
    name: "Business Founder",
    description: "Founded NGONZZ Soluciones",
    rarity: "LEGENDARY",
    color: "#ffd700",
  },
  {
    name: "SEO Specialist",
    description: "Optimized sites for local search rankings",
    rarity: "RARE",
    color: "#3b82f6",
  },
  {
    name: "Full Stack",
    description: "Mastered both frontend & backend",
    rarity: "EPIC",
    color: "#a855f7",
  },
  {
    name: "WordPress Pro",
    description: "Customized themes & plugins professionally",
    rarity: "RARE",
    color: "#3b82f6",
  },
  {
    name: "Open Source",
    description: "Active contributor on GitHub",
    rarity: "COMMON",
    color: "#6b7280",
  },
  {
    name: "Server Admin",
    description: "Managed Linux servers & deployments",
    rarity: "EPIC",
    color: "#a855f7",
  },
  {
    name: "Code Daily",
    description: "Consistent daily coding habit",
    rarity: "COMMON",
    color: "#6b7280",
  },
];

export const skillCategories = {
  Frontend: {
    icon: "Monitor",
    skills: [
      { name: "HTML5", percent: 95, xp: 4800, rank: "Master" },
      { name: "CSS3", percent: 95, xp: 4800, rank: "Master" },
      { name: "JavaScript", percent: 82, xp: 3600, rank: "Expert" },
      { name: "React", percent: 78, xp: 3200, rank: "Expert" },
      { name: "Tailwind CSS", percent: 80, xp: 3400, rank: "Expert" },
    ],
  },
  Backend: {
    icon: "Server",
    skills: [
      { name: "Node.js", percent: 80, xp: 3400, rank: "Expert" },
      { name: "PHP", percent: 78, xp: 3200, rank: "Expert" },
      { name: "Express", percent: 76, xp: 3000, rank: "Expert" },
    ],
  },
  Databases: {
    icon: "Database",
    skills: [
      { name: "MySQL", percent: 78, xp: 3200, rank: "Expert" },
      { name: "MongoDB", percent: 60, xp: 2200, rank: "Advanced" },
    ],
  },
  "DevOps & Tools": {
    icon: "Wrench",
    skills: [
      { name: "Git", percent: 92, xp: 4600, rank: "Master" },
      { name: "GitHub", percent: 92, xp: 4600, rank: "Master" },
      { name: "VS Code", percent: 95, xp: 4800, rank: "Master" },
      { name: "WordPress", percent: 82, xp: 3600, rank: "Expert" },
      { name: "Linux", percent: 65, xp: 2600, rank: "Advanced" },
    ],
  },
};

export const totalSkillXP = 55000;

export const rankColors = {
  Master: "#ffd700",
  Expert: "#00d4aa",
  Advanced: "#3b82f6",
  Intermediate: "#a855f7",
  Learning: "#6b7280",
};

export const projects = [
  {
    id: 1,
    name: "NGONZZ Portfolio",
    difficulty: "Medium",
    xp: 750,
    status: "completed",
    description:
      "Personal portfolio website showcasing projects, skills, and professional experience with interactive sections and a modern, gamified design.",
    challenge:
      "Needed a portfolio that felt professional yet visually engaging to stand out from typical developer portfolios.",
    solution:
      "Implemented interactive skill bars, gamified achievement badges, smooth scroll animations, and a dark theme with teal/gold accents for a unique developer identity.",
    tech: ["React", "Tailwind CSS", "JavaScript", "HTML", "CSS"],
    github: "https://github.com/ngonzz",
    live: "#",
  },
  {
    id: 2,
    name: "Lalín Hoy",
    difficulty: "Medium",
    xp: 600,
    status: "completed",
    description:
      "A static digital newspaper website for a local publication, built with SEO optimization and lightweight performance as top priorities.",
    challenge:
      "Structuring content for strong SEO rankings while keeping the site lightweight, fast-loading, and easy to maintain without a CMS.",
    solution:
      "Implemented a clean folder structure with metadata templates, semantic HTML for search engine visibility, and minimal JavaScript for blazing-fast page loads.",
    tech: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
    github: "https://github.com/ngonzz",
    live: "#",
  },
  {
    id: 3,
    name: "NGONZZ Soluciones",
    difficulty: "Medium",
    xp: 700,
    status: "completed",
    description:
      "Business website for my IT services company, designed to attract local clients and showcase web development, server management, and IT consulting services.",
    challenge:
      "Needed a fast, professional setup with strong branding that communicates trust and expertise to potential clients in the local market.",
    solution:
      "Customized a WordPress theme with tailored branding, optimized content for local SEO, and implemented clear CTAs and service pages for client conversion.",
    tech: ["WordPress", "PHP", "CSS", "JavaScript"],
    github: null,
    live: "https://ngonzz.eu",
  },
  {
    id: 4,
    name: "Client Project Starter",
    difficulty: "Hard",
    xp: 850,
    status: "in-progress",
    description:
      "A reusable boilerplate template system for quickly spinning up client websites with consistent structure, responsive layouts, and optimized defaults.",
    challenge:
      "Repeatedly setting up similar project scaffolds for clients was time-consuming and error-prone.",
    solution:
      "Built a modular starter kit with pre-configured Tailwind, reusable components, SEO defaults, and deployment scripts for rapid project delivery.",
    tech: ["HTML", "Tailwind CSS", "JavaScript", "Node.js", "Git"],
    github: "https://github.com/ngonzz",
    live: null,
  },
];

export const totalProjectXP = 2900;

export const difficultyConfig = {
  Hard: { color: "#ef4444", icon: "Flame", multiplier: "3x" },
  Medium: { color: "#f59e0b", icon: "Target", multiplier: "2x" },
  Easy: { color: "#22c55e", icon: "Shield", multiplier: "1x" },
};

export const experience = [
  {
    title: "Founder & CEO",
    company: "NGONZZ Soluciones",
    period: "2025 — Present",
    description:
      "Managing end-to-end web projects including client websites, server administration, domain management, and IT consulting for local businesses.",
    tech: ["WordPress", "PHP", "JavaScript", "Linux", "Git"],
  },
];

export const education = [
  {
    title: "FP Superior — Desarrollo de Aplicaciones Web",
    institution: "Instituto de Formación Profesional",
    period: "2024 — 2026",
    description:
      "Specialized in full-stack web development covering frontend technologies, backend programming, database management, and deployment practices.",
    badges: ["Web Development", "Database Design", "Server Deployment"],
  },
];

export const certifications = [
  {
    name: "WordPress Certified Developer",
    issuer: "WordPress",
    year: "2025",
  },
  {
    name: "Git & GitHub Proficiency",
    issuer: "GitHub",
    year: "2025",
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];
