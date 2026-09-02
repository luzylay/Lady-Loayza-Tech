/**
 * @file portfolio-content.repository.js
 * @module infrastructure/portfolio-content.repository
 * @description Repositorio centralizado de contenidos inmutables del portafolio.
 */

export const PORTFOLIO_CONTENT = Object.freeze({
  ABOUT: Object.freeze([
    {
      id: 'design',
      iconKey: 'layers',
      title: 'Diseño lo que ves',
      description: 'Colores, botones, menús — todo lo que aparece en pantalla y hace que sea fácil e intuitivo de usar para cualquier persona.'
    },
    {
      id: 'engineering',
      iconKey: 'code',
      title: 'Construyo lo que no ves',
      description: 'La lógica detrás de todo: que tu búsqueda funcione, que los datos se guarden seguros y que las respuestas lleguen al instante.'
    },
    {
      id: 'accessibility',
      iconKey: 'accessibility',
      title: 'Inclusión & Accesibilidad',
      description: 'Adapto interfaces para personas con discapacidad visual o motora, asegurando que nadie quede atrás.'
    }
  ]),

  EXPERIENCE: Object.freeze([
    {
      index: '01',
      period: 'Ago 2026',
      role: 'Desarrolladora Frontend & PWA (1.er Puesto)',
      company: 'Hackathon INSNSB • PUCP & ESAN',
      summary: 'Diseño e implementación de Progressive Web App accesible para el consultorio CRED infantil (0 a 3 años) en el Niño San Borja. Digitalizó el seguimiento nutricional y eliminó errores manuales de enfermería.',
      tags: ['React', 'Vite', 'PWA', 'JavaScript']
    },
    {
      index: '02',
      period: 'Jun 2026',
      role: 'Desarrolladora IA Conversacional (Top 3 Nacional)',
      company: 'Hackathon Sin Barreras • MINCETUR (Entre 66 propuestas)',
      summary: 'Arquitectura del asistente Helen con backend en Flask, clasificador NLU, geolocalización y síntesis de voz para turistas con discapacidad visual.',
      tags: ['Python', 'Flask', 'NLU', 'TTS']
    },
    {
      index: '03',
      period: 'May – Nov 2025',
      role: 'Data Analyst & ETL (Capstone EPEN)',
      company: 'Samsung Innovation Campus',
      summary: 'Pipeline ETL sobre microdatos del INEI con más de 10,000 registros procesados y tableros interactivos en Power BI y Looker Studio.',
      tags: ['Python', 'Pandas', 'Power BI']
    },
    {
      index: '04',
      period: 'Ene – Abr 2026',
      role: 'Deputy Campus Director',
      company: 'Hult Prize UTP 2026',
      summary: 'Estandarización de procesos remotos y presenciales, adaptación de rúbricas oficiales y coordinación del evento presencial final.',
      tags: ['Liderazgo', 'Gestión']
    }
  ]),

  TECH_STACK: Object.freeze([
    {
      category: '01 / Frontend & Mobile',
      title: 'React, TypeScript, Kotlin',
      description: 'PWA offline-first, Vite, Next.js, HTML5 semántico, CSS moderno y Android Nativo en Kotlin.'
    },
    {
      category: '02 / Data & IA',
      title: 'Python, XGBoost, Power BI',
      description: 'Pipelines ETL, Pandas, Scikit-Learn, PostgreSQL, Data Marts y visualizaciones en Looker Studio.'
    },
    {
      category: '03 / Accesibilidad & Cloud',
      title: 'WCAG 2.1, Cloudflare, QA',
      description: 'Estándares de accesibilidad universal, lectores de pantalla, pruebas con JUnit y Selenium, Git y despliegue CI/CD.'
    }
  ]),

  ROI_METRICS: Object.freeze([
    {
      category: 'Eficiencia & Rendimiento',
      number: '-40%',
      title: 'Costos de Infraestructura',
      description: 'Arquitectura web estática en el Edge (Cloudflare / GitHub Pages) con tiempos de carga ultrarrápidos, reduciendo la necesidad de servidores dedicados y costos mensuales de nube.'
    },
    {
      category: 'Inclusión Comercial',
      number: '+15%',
      title: 'Expansión de Mercado Útil',
      description: 'Cumplimiento riguroso de accesibilidad WCAG 2.1 AA, permitiendo que personas con discapacidad visual o motora utilicen la plataforma y asegurando cumplimiento legal corporativo.'
    },
    {
      category: 'Modelos Predictivos',
      number: 'Top 28%',
      title: 'Retención de Clientes (ML)',
      description: 'Modelos con XGBoost para predecir fugas de clientes antes de que ocurran, permitiendo estrategias preventivas de fidelización que protegen los ingresos recurrentes (LTV).'
    }
  ]),

  LINKEDIN_POSTS: Object.freeze([
    {
      id: 'post-hackathon-insnsb',
      title: '1.er Puesto en Hackatón Niño San Borja',
      embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7498032689288073216?collapsed=1',
      tag: '1.er Puesto · INSNSB'
    },
    {
      id: 'post-hackathon-mincetur',
      title: 'Top 3 en Hackathon Sin Barreras MINCETUR',
      embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7474145608497500161?collapsed=1',
      tag: 'Top 3 Nacional · MINCETUR'
    },
    {
      id: 'post-featured-1',
      title: 'Hito y Proyecto Destacado en LinkedIn',
      embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7420281179368501248?collapsed=1',
      tag: 'Destacado · Comunidad'
    },
    {
      id: 'post-featured-2',
      title: 'Solución Tecnológica y Aprendizajes',
      embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7405556732388720640?collapsed=1',
      tag: 'Destacado · Trayectoria'
    },
    {
      id: 'post-featured-3',
      title: 'Inclusión Digital & Accesibilidad',
      embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7359864691701022720?collapsed=1',
      tag: 'Destacado · Accesibilidad'
    }
  ]),

  CONTACT_CHANNELS: Object.freeze([
    {
      id: 'cal',
      iconKey: 'calendarCard',
      label: 'Reunión Virtual',
      value: 'cal.com/lady-loayza ↗',
      url: 'https://cal.com/lady-loayza-incyug/30min',
      isLink: true,
      conversionType: 'CAL_BOOKING'
    },
    {
      id: 'sla',
      iconKey: 'bolt',
      label: 'Respuesta rápida',
      value: 'Menos de 24 horas',
      isLink: false
    },
    {
      id: 'linkedin',
      iconKey: 'linkedinCard',
      label: 'LinkedIn Oficial',
      value: '/in/ladyloayzarodriguez ↗',
      url: 'https://www.linkedin.com/in/ladyloayzarodriguez/',
      isLink: true,
      conversionType: 'REPO_VIEW'
    },
    {
      id: 'github',
      iconKey: 'github',
      label: 'GitHub Repositorios',
      value: 'github.com/luzylay ↗',
      url: 'https://github.com/luzylay',
      isLink: true,
      conversionType: 'REPO_VIEW'
    }
  ])
});

