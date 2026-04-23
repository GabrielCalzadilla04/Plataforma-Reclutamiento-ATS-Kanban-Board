// Mock Database Simulation
export const mockVacantes = [
  {
    id: 1,
    titulo: "Desarrollador Full Stack Senior",
    descripcion: "Buscamos un desarrollador full stack con experiencia en React y Node.js para unirse a nuestro equipo de innovación.",
    empresa: "TechCorp SV",
    ubicacion: "San Salvador",
    tipo: "Tiempo completo",
    salario: {
      minimo: 2500,
      maximo: 3500,
      moneda: "USD"
    },
    requisitos: ["React", "Node.js", "PostgreSQL", "Docker", "Senior", "Tiempo completo"],
    descripcionLarga: "Somos una empresa líder en tecnología buscando talento excepcional. Necesitamos un desarrollador full stack con al menos 5 años de experiencia que pueda liderar proyectos de alto impacto.",
    beneficios: ["Salario competitivo", "Home office flexible", "Seguro médico", "Bonificación anual"],
    estaActiva: true,
    fechaCreacion: "2024-01-15"
  },
  {
    id: 2,
    titulo: "Frontend Developer Junior",
    descripcion: "¡Tu primer paso en el mundo tech! Buscamos desarrolladores junior apasionados por crear interfaces hermosas.",
    empresa: "DesignLab",
    ubicacion: "San Salvador",
    tipo: "Tiempo completo",
    salario: {
      minimo: 800,
      maximo: 1200,
      moneda: "USD"
    },
    requisitos: ["React", "JavaScript", "CSS", "Junior", "Remoto"],
    descripcionLarga: "DesignLab es una agencia creativa donde aprenderás y crecerás. Buscamos programadores junior con ganas de aprender y creatividad.",
    beneficios: ["Mentoreo personalizado", "Capacitación continua", "Ambiente colaborativo"],
    estaActiva: true,
    fechaCreacion: "2024-02-01"
  },
  {
    id: 3,
    titulo: "Backend Engineer - APIs REST",
    descripcion: "Diseña y desarrolla APIs REST escalables usando tecnologías modernas. Remoto para toda Latinoamérica.",
    empresa: "CloudSync Solutions",
    ubicacion: "Remoto",
    tipo: "Remoto",
    salario: {
      minimo: 2000,
      maximo: 3000,
      moneda: "USD"
    },
    requisitos: ["Node.js", "Express", "MongoDB", "AWS", "API REST", "Remoto"],
    descripcionLarga: "CloudSync Solutions busca un Backend Engineer para desarrollar infraestructura de APIs en la nube. Trabajarás con tecnologías de punta.",
    beneficios: ["Trabajo remoto 100%", "Flexibilidad horaria", "Bonificación por desempeño"],
    estaActiva: true,
    fechaCreacion: "2024-02-05"
  },
  {
    id: 4,
    titulo: "QA Automation Engineer",
    descripcion: "Automatiza y mejora nuestros procesos de testing. Oportunidad de crecimiento en un equipo técnico.",
    empresa: "Quality First Labs",
    ubicacion: "La Libertad",
    tipo: "Tiempo completo",
    salario: {
      minimo: 1500,
      maximo: 2200,
      moneda: "USD"
    },
    requisitos: ["Selenium", "Python", "Testing", "CI/CD", "Automation"],
    descripcionLarga: "Quality First Labs necesita un QA Automation Engineer experimentado para garantizar la calidad de nuestros productos.",
    beneficios: ["Bonificación trimestral", "Oportunidades de certificación", "Team building"],
    estaActiva: true,
    fechaCreacion: "2024-02-10"
  },
  {
    id: 5,
    titulo: "Data Analyst",
    descripcion: "Analiza datos y crea dashboards para tomar decisiones empresariales. Posición en crecimiento.",
    empresa: "InsightData Corp",
    ubicacion: "San Salvador",
    tipo: "Tiempo completo",
    salario: {
      minimo: 1800,
      maximo: 2600,
      moneda: "USD"
    },
    requisitos: ["SQL", "Python", "Tableau", "Analytics", "Excel"],
    descripcionLarga: "InsightData Corp busca un Data Analyst para transformar datos en información valiosa para la empresa.",
    beneficios: ["Formación en Power BI", "Flexible scheduling", "Bonus performance"],
    estaActiva: true,
    fechaCreacion: "2024-02-12"
  },
  {
    id: 6,
    titulo: "Freelance Web Developer",
    descripcion: "Proyectos variados de desarrollo web. Flexibilidad total y trabajar desde cualquier lugar.",
    empresa: "WebFlow Agency",
    ubicacion: "Remoto",
    tipo: "Freelance",
    salario: {
      minimo: 25,
      maximo: 60,
      moneda: "USD/hora"
    },
    requisitos: ["HTML", "CSS", "JavaScript", "Freelance", "Remoto", "Responsive Design"],
    descripcionLarga: "WebFlow Agency ofrece proyectos freelance variados para desarrolladores web talentosos. Trabajarás en proyectos internacionales.",
    beneficios: ["Horario flexible", "Trabajar remoto", "Proyectos internacionales"],
    estaActiva: true,
    fechaCreacion: "2024-02-14"
  },
  {
    id: 7,
    titulo: "Product Manager",
    descripcion: "Lidera la visión y estrategia de nuestros productos. Oportunidad de impacto alto.",
    empresa: "InnovateTech",
    ubicacion: "San Salvador",
    tipo: "Tiempo completo",
    salario: {
      minimo: 2200,
      maximo: 3200,
      moneda: "USD"
    },
    requisitos: ["Product Management", "Agile", "Analytics", "Leadership", "Senior"],
    descripcionLarga: "InnovateTech busca un Product Manager experimentado para liderar el desarrollo de nuevos productos.",
    beneficios: ["Equipo multidisciplinario", "Recursos ilimitados", "Bonus por KPIs"],
    estaActiva: true,
    fechaCreacion: "2024-02-16"
  },
  {
    id: 8,
    titulo: "Prácticas Profesionales - Desarrollo Web",
    descripcion: "Oportunidad de prácticas remuneradas en una empresa tecnológica consolidada.",
    empresa: "TalentFlow Academy",
    ubicacion: "Cuscatlan",
    tipo: "Prácticas",
    salario: {
      minimo: 300,
      maximo: 500,
      moneda: "USD"
    },
    requisitos: ["Web Development", "Prácticas", "Junior", "Estudiante"],
    descripcionLarga: "TalentFlow Academy ofrece un programa de prácticas con tutoreo de profesionales experientes.",
    beneficios: ["Mentoría personalizada", "Certificado de prácticas", "Posible contratación"],
    estaActiva: true,
    fechaCreacion: "2024-02-18"
  },
  {
    id: 9,
    titulo: "DevOps Engineer",
    descripcion: "Gestiona infraestructura en la nube y automatiza procesos. Posición estratégica.",
    empresa: "CloudInfra Pro",
    ubicacion: "Remoto",
    tipo: "Remoto",
    salario: {
      minimo: 2600,
      maximo: 3800,
      moneda: "USD"
    },
    requisitos: ["Kubernetes", "Docker", "AWS", "Linux", "CI/CD", "Remoto"],
    descripcionLarga: "CloudInfra Pro busca un DevOps Engineer para escalar nuestra infraestructura global.",
    beneficios: ["100% Remoto", "Equipo internacional", "Certificaciones pagadas"],
    estaActiva: true,
    fechaCreacion: "2024-02-20"
  },
  {
    id: 10,
    titulo: "UI/UX Designer",
    descripcion: "Diseña experiencias digitales increíbles. Trabaja con un equipo creativo.",
    empresa: "CreativeStudio SV",
    ubicacion: "San Salvador",
    tipo: "Tiempo completo",
    salario: {
      minimo: 1400,
      maximo: 2100,
      moneda: "USD"
    },
    requisitos: ["Figma", "UX Design", "UI Design", "User Research", "Design Systems"],
    descripcionLarga: "CreativeStudio SV necesita un UI/UX Designer apasionado por crear interfaces bellas y funcionales.",
    beneficios: ["Libertad creativa", "Proyectos internacionales", "Equipo colaborativo"],
    estaActiva: true,
    fechaCreacion: "2024-02-22"
  }
];

export const mockPostulaciones = [
  {
    id: 1,
    vacanteId: 1,
    usuarioId: "user1",
    nombre: "Carlos García",
    email: "carlos@example.com",
    fechaPostulacion: "2024-02-23",
    estado: "En revisión"
  },
  {
    id: 2,
    vacanteId: 2,
    usuarioId: "user2",
    nombre: "María López",
    email: "maria@example.com",
    fechaPostulacion: "2024-02-23",
    estado: "Entrevista programada"
  },
  {
    id: 3,
    vacanteId: 3,
    usuarioId: "user3",
    nombre: "Juan Pérez",
    email: "juan@example.com",
    fechaPostulacion: "2024-02-22",
    estado: "En revisión"
  },
  {
    id: 4,
    vacanteId: 1,
    usuarioId: "user4",
    nombre: "Ana Martínez",
    email: "ana@example.com",
    fechaPostulacion: "2024-02-21",
    estado: "Aceptado"
  },
  {
    id: 5,
    vacanteId: 4,
    usuarioId: "user5",
    nombre: "Roberto Sánchez",
    email: "roberto@example.com",
    fechaPostulacion: "2024-02-20",
    estado: "En revisión"
  }
];

// Simulate async API behavior with delays
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
