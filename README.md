<div align="center">

# ⚡ Lady-Loayza-Tech

### *Portafolio de Ingeniería de Software, Datos & Accesibilidad Universal*

[![Cloudflare Pages](https://img.shields.io/badge/Deployed%20on-Cloudflare%20Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://lady-loayza-tech.pages.dev)
[![PWA Ready](https://img.shields.io/badge/PWA-100%25%20Offline%20Ready-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](https://lady-loayza-tech.pages.dev)
[![WCAG 2.1 AA](https://img.shields.io/badge/A11y-WCAG%202.1%20AA%20Compliant-10b981?style=for-the-badge&logo=w3c&logoColor=white)](https://lady-loayza-tech.pages.dev)
[![Clean Architecture](https://img.shields.io/badge/Architecture-Clean%20%2F%20DDD-c4f135?style=for-the-badge&logo=codefactor&logoColor=black)](docs/ARCHITECTURE.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-38bdf8?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](LICENSE)

<br />

<p align="center">
  <strong>Construyendo aplicaciones y plataformas accesibles, rápidas y escalables para millones de personas.</strong><br />
  Desarrollado por <strong>Lady Luz Loayza Rodriguez</strong> — Ganadora 1.er Puesto Hackatón INSNSB 2026 & Top 3 Nacional MINCETUR.
</p>

<p align="center">
  <a href="https://lady-loayza-tech.pages.dev"><strong>🌐 Explorar Portafolio en Vivo »</strong></a>
  <br />
  <br />
  <a href="#-despliegue-en-producción">Despliegue</a> •
  <a href="#-logros-técnicos-y-reconocimientos">Logros</a> •
  <a href="#-arquitectura-de-software--ingeniería">Arquitectura</a> •
  <a href="#-catálogo-de-proyectos-y-soluciones">Proyectos</a> •
  <a href="#-stack-tecnológico">Stack</a> •
  <a href="#-canales-oficiales-de-contacto">Contacto</a>
</p>

---

</div>

## 🌐 Despliegue en Producción

| Entorno | Plataforma | URL de Acceso | Estado |
| :--- | :--- | :--- | :--- |
| **Producción Principal** | **Cloudflare Pages** (Edge Network) | [**lady-loayza-tech.pages.dev**](https://lady-loayza-tech.pages.dev) | ![Status](https://img.shields.io/badge/Online-10b981?style=flat-square&logo=cloudflare) |
| **Mirror / Respaldo** | **GitHub Pages** (CDN Global) | [**luzylay.github.io/Lady-Loayza-Tech**](https://luzylay.github.io/Lady-Loayza-Tech/) | ![Status](https://img.shields.io/badge/Mirror-38bdf8?style=flat-square&logo=github) |

---

## 🏆 Logros Técnicos y Reconocimientos

> [!TIP]
> ### Hitos Destacados
> - 🥇 **1.er Puesto — Hackathon Instituto Nacional de Salud del Niño San Borja (INSNSB 2026):**  
>   Liderazgo técnico y arquitectura de **NutriCRED PWA**, digitalizando el control y monitoreo nutricional de la primera infancia (0 a 3 años) para reducir el riesgo de anemia y desnutrición crónica.
> - 🥈 **Top 3 Nacional — Hackathon Sin Barreras MINCETUR (2026):**  
>   Diseño y desarrollo de **Helen**, asistente conversacional inclusivo potenciado por Inteligencia Artificial para el turismo accesible de personas con discapacidad visual (clasificado en el top nacional entre 66 propuestas).
> - 📊 **Top 28% Global en Kaggle Competitions:**  
>   Modelado predictivo de *Customer Churn* mediante XGBoost, optimización de hiperparámetros con Scikit-Learn y análisis de interpretabilidad con SHAP values.
> - 💡 **Samsung Innovation Campus:**  
>   Pipeline de datos ETL en Python para el procesamiento de más de 10,000 registros demográficos del INEI con tableros de inteligencia de negocios en Power BI y Looker Studio.

---

## 📐 Arquitectura de Software & Ingeniería

El portafolio implementa **Clean Architecture (Arquitectura Limpia / Onion)** y patrones de diseño orientados a dominio (**DDD**), garantizando cero dependencias pesadas, mantenibilidad extrema y desacoplamiento total:

```text
src/
├── domain/                          # Entidades y Objetos de Valor inmutables (ProjectEntity, ConversionEntity)
├── use-cases/                       # Casos de uso desacoplados e independientes de la UI (FilterProjects, RecordConversion)
├── infrastructure/                  # Implementaciones concretas: Repositorios, Bóveda Crypto & EventBus
│   ├── project.repository.js        # Índice Invertido O(1) en memoria para filtrado ultrarrápido
│   ├── crypto.vault.js              # Bóveda Web Crypto API (AES-GCM-256 + PBKDF2)
│   ├── telemetry.service.js         # Telemetría reactiva Edge con Zero PII
│   └── readme-media.service.js      # Consumo y parsing de multimedia dinámica de GitHub API
├── presentation/                    # Componentes Data-Driven reactivos y controladores de interfaz
└── main.js                          # Composition Root (Inyección e hidratación de dependencias)
```

### Pilares de Ingeniería Implementados:

1. **Búsqueda & Filtrado en Tiempo Constante ($\mathcal{O}(1)$):**  
   El catálogo de proyectos utiliza un **Índice Invertido** indexado por categorías en tablas hash (`Map<string, Set<ProjectEntity>>`), eliminando barridos $\mathcal{O}(N)$ en cada interacción de filtrado.
2. **Bóveda Criptográfica y Privacidad Zero-PII:**  
   Telemetría segura mediante **Web Crypto API nativa** (`window.crypto.subtle`) con cifrado simétrico **AES-GCM (256 bits)** y derivación de llaves **PBKDF2 (100,000 iteraciones)**, resguardando la privacidad sin rastreo de datos personales.
3. **PWA Offline-First & Service Worker Inteligente:**  
   Estrategia híbrida: *Network-First* para código fuente (asegurando siempre la última versión) y *Cache-First* para multimedia pesada optimizada en formato WebP.
4. **Accesibilidad Universal (WCAG 2.1 Nivel AA):**  
   Navegación 100% por teclado, ratios de contraste superiores a 7:1, atributos ARIA dinámicos (`aria-live`, `aria-label`), skip-links y soporte estricto a preferencias del sistema (`prefers-reduced-motion` y `forced-colors`).

> [!NOTE]
> Para consultar la especificación técnica y diagramas arquitectónicos completos, visita [ARCHITECTURE.md](docs/ARCHITECTURE.md).

---

## 🚀 Catálogo de Proyectos y Soluciones

| Proyecto | Categoría | Stack Tecnológico | Enlaces & Repositorios |
| :--- | :--- | :--- | :--- |
| **NutriCRED PWA** | 🏥 Health Tech / PWA | React, TypeScript, PWA Offline, Tailwind | [🔗 Demo](https://nutricred-crecer-mejor-nutrivision.vercel.app/) · [💻 Repo](https://github.com/luzylay/NutriCRED-PWA) |
| **Customer Churn Predictor** | 🤖 Machine Learning | Python, Scikit-Learn, XGBoost, SHAP | [📊 Kaggle](https://www.kaggle.com/ladyloayza) · [💻 Repo](https://github.com/luzylay/predict-customer-churn-luzylay) |
| **Data Mart Palta Hass BI** | 📈 Data Engineering | PostgreSQL, Power BI, Python ETL | [💻 Repo](https://github.com/luzylay/datamart-palta-hass-bi) |
| **Helen (IA Conversacional)** | ♿ Accesibilidad / IA | Python, Flask, NLU, Web Speech TTS | [💻 Repo](https://github.com/luzylay) |
| **Cryptography Learning** | 🔐 Ciberseguridad | TypeScript, Vite, Web Crypto API | [🔗 Demo](https://luzylay.github.io/Cryptography-Interactive-Learning/) · [💻 Repo](https://github.com/luzylay/Cryptography-Interactive-Learning) |
| **App School Homework** | 📱 Android Nativo | Kotlin, Android SDK, Material 3 | [💻 Repo](https://github.com/luzylay/App-School-Homework) |
| **Observatorio Laboral EPEN** | 📊 Data Analytics | Python, Pandas, Looker Studio | [💻 Repo](https://github.com/luzylay) |
| **IBM Logistics & Shipping** | 📦 BI & Logística | Python ETL, Jupyter, Power BI | [💻 Repo](https://github.com/luzylay/guayerd-ibm-ecommerce-shipping-customer-reviews-analysis) |
| **Enterprise Backend & QA** | 🏢 Enterprise Java | Java, SQL Server, JUnit 5, Selenium | [💻 Repo](https://github.com/luzylay/sap-abap-fiori-dev-Learning) |
| **Lady-Loayza-Tech** | ⚡ Frontend & A11y | Vanilla JS ES6+, Clean Arch, PWA | [🔗 Demo](https://lady-loayza-tech.pages.dev) · [💻 Repo](https://github.com/luzylay/Lady-Loayza-Tech) |
| **PIPD Learning Platform** | 🎓 EduTech | TypeScript, CSS Grid, UI Design | [💻 Repo](https://github.com/luzylay/learning-platform-PIPD) |
| **La Taberna de Roly** | ☕ Software Desktop | Java Swing, POO, MySQL | [💻 Repo](https://github.com/luzylay/La-taberna) |
| **Game Gato & Algoritmos** | 🎮 Algoritmia | C#, .NET Framework | [💻 Repo](https://github.com/luzylay/Game-Gato) |
| **Simulador de CPU & SO** | ⚙️ Sistemas Operativos | Python, Algoritmos de Planificación | [💻 Repo](https://github.com/luzylay/Sistemas-operativos-Grupo1) |

---

## 🛠️ Stack Tecnológico

<div align="center">

### Lenguajes & Core
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Kotlin](https://img.shields.io/badge/Kotlin-7F52FF?style=for-the-badge&logo=kotlin&logoColor=white)
![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![C#](https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=csharp&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

### Frontend, Frameworks & UI
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![PWA](https://img.shields.io/badge/Progressive_Web_Apps-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)
![WCAG](https://img.shields.io/badge/WCAG_2.1_AA-005A9C?style=for-the-badge&logo=w3c&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Datos, Machine Learning & Analytics
![Pandas](https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white)
![Scikit-Learn](https://img.shields.io/badge/scikit_learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)
![XGBoost](https://img.shields.io/badge/XGBoost-111111?style=for-the-badge&logoColor=white)
![Power BI](https://img.shields.io/badge/Power_BI-F2C811?style=for-the-badge&logo=powerbi&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Looker Studio](https://img.shields.io/badge/Looker_Studio-4285F4?style=for-the-badge&logo=google&logoColor=white)

### Cloud, Infraestructura & Seguridad
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![Web Crypto](https://img.shields.io/badge/Web_Crypto_API-000000?style=for-the-badge&logo=shield&logoColor=c4f135)

</div>

---

## ⚡ Métricas de Rendimiento & Auditoría

```
┌──────────────────────────────────────────────────────────┐
│  Auditoría Lighthouse & Core Web Vitals                  │
├──────────────────────────────────────────────────────────┤
│  ⚡ Performance:          100 / 100                      │
│  ♿ Accesibilidad (A11y):  100 / 100 (WCAG 2.1 AA)        │
│  🛡️ Buenas Prácticas:     100 / 100                      │
│  🔍 SEO Técnico:          100 / 100                      │
│  📱 PWA Installable:      100 / 100 (Offline Ready)      │
└──────────────────────────────────────────────────────────┘
```

---

## 📬 Canales Oficiales de Contacto

¿Tienes una propuesta laboral, proyecto en mente o consulta de consultoría?

- 💼 **LinkedIn Oficial:** [linkedin.com/in/ladyloayzarodriguez](https://www.linkedin.com/in/ladyloayzarodriguez/)
- 📅 **Agendar Reunión (30 min):** [cal.com/lady-loayza-incyug/30min](https://cal.com/lady-loayza-incyug/30min)
- 🐙 **Perfil de GitHub:** [github.com/luzylay](https://github.com/luzylay)
- ⏱️ **Tiempo promedio de respuesta:** Menos de 24 horas.

---

> [!IMPORTANT]
> ### ⭐ ¿Te pareció útil o interesante este proyecto?
> Si este repositorio te sirvió como referencia de arquitectura, aprendiste algo nuevo o te inspiró:
> 1. Sube a la esquina superior derecha de esta página.
> 2. Haz clic en el botón **`⭐ Star`** (Estrella).
> 
> *¡Muchísimas gracias por apoyar el desarrollo de software accesible y de alto rendimiento!* ✨

---

## 🔒 Seguridad y Reportes

Para consultar la política de divulgación responsable y reporte de incidentes, revise [SECURITY.md](SECURITY.md).

## 📄 Licencia

Este proyecto está licenciado bajo los términos de la [Licencia MIT](LICENSE).  
Copyright &copy; 2026 **Lady Luz Loayza Rodriguez**.
