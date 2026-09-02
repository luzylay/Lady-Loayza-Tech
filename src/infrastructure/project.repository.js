/**
 * @file project.repository.js
 * @module infrastructure/project.repository
 * @description Repositorio de proyectos con Índice Invertido en memoria para consultas O(1).
 * Implementa el Patrón Repositorio según Clean Architecture.
 */

import { ProjectEntity } from '../domain/project.entity.js';

const RAW_PROJECTS_SOURCE = [
  {
    id: 'nutricred-pwa',
    title: 'NutriCRED — Monitoreo Infantil',
    badge: '1.er Puesto Hackathon',
    badgeType: 'lime',
    categoryTag: 'Health Tech · PWA',
    categories: ['featured', 'frontend', 'salud'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&h=420&fit=crop&auto=format',
    imageAlt: 'NutriCRED PWA - Monitoreo Nutricional Infantil',
    description: 'Plataforma inteligente de monitoreo nutricional infantil para consultorios CRED. Combate la anemia y conecta en tiempo real a las familias con su equipo médico. Offline-first.',
    techStack: ['TypeScript', 'PWA Offline', 'React'],
    liveUrl: 'https://nutricred-crecer-mejor-nutrivision.vercel.app/',
    repoUrl: 'https://github.com/luzylay/NutriCRED-PWA'
  },
  {
    id: 'predict-customer-churn',
    title: 'Predicción de Churn (XGBoost)',
    badge: 'Top 28% Kaggle',
    badgeType: 'lime',
    categoryTag: 'Machine Learning · Analytics',
    categories: ['featured', 'datos', 'ia'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=420&fit=crop&auto=format',
    imageAlt: 'Modelo Machine Learning de Predicción de Churn',
    description: 'Modelo predictivo de fuga de clientes con XGBoost, optimización de hiperparámetros y explicabilidad SHAP. Posicionado en el Top 28% en Kaggle Competitions.',
    techStack: ['Python', 'XGBoost', 'Scikit-Learn'],
    liveUrl: 'https://www.kaggle.com/ladyloayza',
    liveLabel: 'Kaggle Perfil ↗',
    repoUrl: 'https://github.com/luzylay/predict-customer-churn-luzylay'
  },
  {
    id: 'datamart-palta-hass-bi',
    title: 'Data Mart Palta Hass BI',
    badge: 'BI & Data Mart',
    badgeType: 'lime',
    categoryTag: 'Data Engineering · Power BI',
    categories: ['featured', 'datos'],
    image: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=700&h=420&fit=crop&auto=format',
    imageAlt: 'Data Mart Palta Hass Business Intelligence',
    description: 'Arquitectura Data Mart dimensional (2016-2024) para análisis de rentabilidad y exportaciones agroindustriales. Pipeline ETL con PostgreSQL y tableros en Power BI.',
    techStack: ['Power BI', 'PostgreSQL', 'ETL'],
    liveUrl: null,
    repoUrl: 'https://github.com/luzylay/datamart-palta-hass-bi'
  },
  {
    id: 'cryptography-interactive',
    title: 'Cryptography Interactive Learning',
    badge: 'Security & EduTech',
    badgeType: 'lime',
    categoryTag: 'TypeScript · Web Interactiva',
    categories: ['featured', 'frontend', 'software'],
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=700&h=420&fit=crop&auto=format',
    imageAlt: 'Cryptography Interactive Learning Platform',
    description: 'Plataforma interactiva para aprender criptografía moderna de forma visual. Ejecución y visualización de algoritmos y cifrados directamente en el navegador.',
    techStack: ['TypeScript', 'Criptografía', 'Vite'],
    liveUrl: 'https://luzylay.github.io/Cryptography-Interactive-Learning/',
    repoUrl: 'https://github.com/luzylay/Cryptography-Interactive-Learning'
  },
  {
    id: 'app-school-homework',
    title: 'App School Homework',
    badge: 'Kotlin Nativo',
    badgeType: 'lime',
    categoryTag: 'Android Nativo · Mobile',
    categories: ['featured', 'software'],
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=700&h=420&fit=crop&auto=format',
    imageAlt: 'Aplicación Android Kotlin School Homework',
    description: 'Aplicación móvil nativa en Kotlin para gestión y seguimiento escolar de tareas académicas, agenda diaria y comunicación entre docentes y alumnos.',
    techStack: ['Kotlin', 'Android SDK', 'Mobile UI'],
    liveUrl: null,
    repoUrl: 'https://github.com/luzylay/App-School-Homework'
  },
  {
    id: 'helen-ia-turistica',
    title: 'Helen — Asistente IA Turístico',
    badge: 'Top 3 MINCETUR',
    badgeType: 'lime',
    categoryTag: 'IA Conversacional · Accesibilidad',
    categories: ['featured', 'ia', 'salud'],
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=700&h=420&fit=crop&auto=format',
    imageAlt: 'Helen Asistente Turístico con IA Conversacional',
    description: 'Asistente conversacional con voz y geolocalización para personas con discapacidad visual. Seleccionado Top 3 entre 66 propuestas en la Hackathon Sin Barreras.',
    techStack: ['Python', 'Flask NLU', 'TTS Voz'],
    liveUrl: 'https://github.com/luzylay',
    liveLabel: 'Ver proyecto →',
    repoUrl: 'https://github.com/luzylay'
  },
  {
    id: 'observatorio-laboral-epen',
    title: 'Observatorio Laboral EPEN',
    badge: 'Samsung Capstone',
    badgeType: 'lime',
    categoryTag: 'Data Pipeline · +10K Registros',
    categories: ['featured', 'datos'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&h=420&fit=crop&auto=format',
    imageAlt: 'Observatorio Laboral EPEN Samsung Innovation Campus',
    description: 'Pipeline de datos en Python sobre microdatos del INEI con más de 10,000 registros procesados y tableros interactivos en Power BI y Looker Studio.',
    techStack: ['Python', 'Pandas', 'Power BI'],
    liveUrl: null,
    repoUrl: 'https://github.com/luzylay'
  },
  {
    id: 'ibm-ecommerce-logistics',
    title: 'IBM E-Commerce Logistics & Reviews',
    badge: 'IBM / Guayerd',
    badgeType: 'snow',
    categoryTag: 'Data Analytics · Logística',
    categories: ['datos'],
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=700&h=420&fit=crop&auto=format',
    imageAlt: 'Análisis de logística y reseñas e-commerce',
    description: 'Análisis de e-commerce: relación entre stock, tiempos de entrega y reputación a partir de análisis de reseñas con Python, Power BI y Jupyter Notebooks.',
    techStack: ['Jupyter', 'Python ETL', 'Power BI'],
    liveUrl: null,
    repoUrl: 'https://github.com/luzylay/guayerd-ibm-ecommerce-shipping-customer-reviews-analysis'
  },
  {
    id: 'sap-abap-fiori-dev',
    title: 'Enterprise Backend & QA Testing',
    badge: 'Enterprise QA',
    badgeType: 'snow',
    categoryTag: 'Backend · Testing & QA',
    categories: ['software'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=700&h=420&fit=crop&auto=format',
    imageAlt: 'Backend Testing y QA Automatizado',
    description: 'Arquitectura con Java, MS SQL Server, modelado UML con Visual Paradigm, pruebas unitarias con JUnit y automatización funcional con Selenium.',
    techStack: ['Java', 'JUnit', 'Selenium'],
    liveUrl: null,
    repoUrl: 'https://github.com/luzylay/sap-abap-fiori-dev-Learning'
  },
  {
    id: 'lady-loayza-tech',
    title: 'Lady Loayza Tech — Portal Inclusivo',
    badge: 'Cloudflare Edge',
    badgeType: 'lime',
    categoryTag: 'Accesibilidad Web · UI/UX',
    categories: ['frontend', 'salud'],
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=700&h=420&fit=crop&auto=format',
    imageAlt: 'Lady Loayza Tech Portal Inclusivo',
    description: 'Portal de herramientas, servicios y recursos accesibles para personas con discapacidad, diseñado con arquitectura web ultraligera y rendimiento 100/100.',
    techStack: ['HTML5/CSS3', 'WCAG 2.1', 'Cloudflare'],
    liveUrl: 'https://lady-loayza-tech.pages.dev/',
    repoUrl: 'https://github.com/luzylay/Lady-Loayza-Tech'
  },
  {
    id: 'learning-platform-pipd',
    title: 'PIPD Learning Platform',
    badge: 'EduTech Inclusiva',
    badgeType: 'snow',
    categoryTag: 'TypeScript · Plataforma',
    categories: ['frontend'],
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=700&h=420&fit=crop&auto=format',
    imageAlt: 'PIPD Learning Platform',
    description: 'Plataforma interactiva orientada a la formación continua, inclusión y educación digital accesible con componentes modulares en TypeScript.',
    techStack: ['TypeScript', 'Frontend'],
    liveUrl: null,
    repoUrl: 'https://github.com/luzylay/learning-platform-PIPD'
  },
  {
    id: 'la-taberna',
    title: 'La Taberna de Roly — Sistema de Gestión',
    badge: 'Desktop Software',
    badgeType: 'snow',
    categoryTag: 'Java · POO',
    categories: ['software'],
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=700&h=420&fit=crop&auto=format',
    imageAlt: 'Sistema de Gestión La Taberna de Roly',
    description: 'Sistema de escritorio para control de inventarios, pedidos y punto de venta comercial con arquitectura orientada a objetos en Java.',
    techStack: ['Java', 'POO'],
    liveUrl: null,
    repoUrl: 'https://github.com/luzylay/La-taberna'
  },
  {
    id: 'game-gato',
    title: 'Game Gato & Transformaciones 2D/3D',
    badge: 'C# / Algoritmos',
    badgeType: 'snow',
    categoryTag: 'C# · Gráficos & Algoritmos',
    categories: ['software'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=700&h=420&fit=crop&auto=format',
    imageAlt: 'Game Gato y Gráficos Matriciales',
    description: 'Desarrollo de lógica de juego interactiva y algoritmos de rotación, traslación y transformación matricial en entorno C# .NET.',
    techStack: ['C#', '.NET'],
    liveUrl: null,
    repoUrl: 'https://github.com/luzylay/Game-Gato'
  },
  {
    id: 'sistemas-operativos-grupo1',
    title: 'Simulador de Planificación de CPU',
    badge: 'Sistemas Operativos',
    badgeType: 'snow',
    categoryTag: 'Python · Concurrencia',
    categories: ['software'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&h=420&fit=crop&auto=format',
    imageAlt: 'Simulador de Planificación de CPU',
    description: 'Simulación y análisis de algoritmos de planificación de procesos de CPU (Round Robin, FCFS, SJF) y gestión concurrente de recursos.',
    techStack: ['Python', 'Algoritmos OS'],
    liveUrl: null,
    repoUrl: 'https://github.com/luzylay/Sistemas-operativos-Grupo1'
  }
];

export class ProjectRepository {
  constructor() {
    this.projects = [];
    this.categoryIndex = new Map(); // Índice Invertido O(1)
    this.idIndex = new Map();

    this.initialize();
  }

  /**
   * Construye las entidades y el Índice Invertido en memoria O(N) una sola vez
   */
  initialize() {
    this.projects = RAW_PROJECTS_SOURCE.map((raw) => new ProjectEntity(raw));
    Object.freeze(this.projects);

    // Inicializar el índice para 'all'
    this.categoryIndex.set('all', new Set(this.projects));

    // Construir índice invertido Map<category, Set<ProjectEntity>>
    this.projects.forEach((proj) => {
      this.idIndex.set(proj.id, proj);
      proj.categories.forEach((cat) => {
        if (!this.categoryIndex.has(cat)) {
          this.categoryIndex.set(cat, new Set());
        }
        this.categoryIndex.get(cat).add(proj);
      });
    });
  }

  /**
   * Retorna todos los proyectos en tiempo O(1)
   * @returns {readonly ProjectEntity[]}
   */
  findAll() {
    return this.projects;
  }

  /**
   * Retorna los proyectos de una categoría en tiempo O(1) usando el Índice Invertido
   * @param {string} category
   * @returns {ProjectEntity[]}
   */
  findByCategory(category) {
    if (!category || category === 'all') {
      return this.projects;
    }
    const matchSet = this.categoryIndex.get(category);
    return matchSet ? Array.from(matchSet) : [];
  }

  /**
   * Búsqueda por ID en tiempo O(1)
   * @param {string} id
   * @returns {ProjectEntity|undefined}
   */
  findById(id) {
    return this.idIndex.get(id);
  }
}

// Exportación Singleton del repositorio
export const projectRepository = new ProjectRepository();
