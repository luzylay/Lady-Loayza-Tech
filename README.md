# Lady-Loayza-Tech

Portafolio profesional, catálogo de proyectos de ingeniería de software, analítica de datos, accesibilidad web y soluciones tecnológicas desarrollado por **Lady Luz Loayza Rodriguez**.

Desplegado en producción sobre arquitectura Edge con alta disponibilidad, rendimiento optimizado y arquitectura de software limpia (**Clean Architecture**).

---

## Enlaces de Producción

- **Producción Principal (Cloudflare Pages):** [https://lady-loayza-tech.pages.dev](https://lady-loayza-tech.pages.dev)
- **Despliegue Alternativo (GitHub Pages):** [https://luzylay.github.io/Lady-Loayza-Tech/](https://luzylay.github.io/Lady-Loayza-Tech/)

---

## Logros Destacados

- **1.er Puesto Hackathon INSNSB (2026):** Desarrollo de la Progressive Web App *NutriCRED* para el Instituto Nacional de Salud del Niño San Borja, digitalizando la atención y seguimiento del consultorio CRED.
- **Top 3 Nacional Hackathon Sin Barreras MINCETUR (2026):** Desarrollo del asistente conversacional con inteligencia artificial accesible *Helen* para personas con discapacidad visual, seleccionado entre 66 propuestas a nivel nacional.
- **Top 28% Global en Kaggle:** Modelo predictivo de retención y fuga de clientes (*Customer Churn*) utilizando XGBoost y análisis explicativo SHAP.
- **Samsung Innovation Campus:** Pipeline ETL en Python con procesamiento de más de 10,000 registros del INEI y tableros interactivos en Power BI.

---

## Arquitectura de Software & Algoritmos

El proyecto implementa los principios de **Clean Architecture (Onion Architecture)**, **SOLID** y **Estructuras de Datos Eficientes**:

- **`src/domain/`**: Entidades inmutables (`ProjectEntity`) y Value Objects (`ConversionValueObject`) con validación estricta de invariantes.
- **`src/use-cases/`**: Casos de uso desacoplados (`FilterProjectsUseCase`, `RecordConversionUseCase`).
- **`src/infrastructure/`**: 
  - **Patrón Repositorio con Índice Invertido $O(1)$ (`project.repository.js`):** Filtrado instantáneo en tiempo constante mediante tablas hash indexadas.
  - **Patrón Observer / Event Bus (`event-bus.js`):** Comunicación reactiva desacoplada entre capas.
  - **Bóveda Criptográfica (`crypto.vault.js`):** Cifrado en reposo con AES-GCM-256 y PBKDF2.
- **`src/presentation/`**: Componentes de UI reactivos y controladores de navegación accesibles.
- **`assets/css/`**: Sistema de diseño modular en 4 capas (variables, layout, hero y components).

Para consultar el análisis arquitectónico y de complejidad formal, revise [ARCHITECTURE.md](docs/ARCHITECTURE.md).

---

## Proyectos y Repositorios

| Proyecto | Categoría | Tecnologías Principales | Enlace |
| :--- | :--- | :--- | :--- |
| **NutriCRED PWA** | Health Tech / PWA | React, TypeScript, PWA Offline | [Demo](https://nutricred-crecer-mejor-nutrivision.vercel.app/) / [GitHub](https://github.com/luzylay/NutriCRED-PWA) |
| **Predicción de Churn** | Data Science / ML | Python, XGBoost, Scikit-Learn | [Kaggle](https://www.kaggle.com/ladyloayza) / [GitHub](https://github.com/luzylay/predict-customer-churn-luzylay) |
| **Data Mart Palta Hass BI** | Data Engineering | PostgreSQL, Power BI, Modelado Dimensional | [GitHub](https://github.com/luzylay/datamart-palta-hass-bi) |
| **Helen (IA Turística)** | IA Conversacional | Python, Flask, NLU, Síntesis de Voz | [GitHub](https://github.com/luzylay) |
| **Cryptography Learning** | EduTech / Seguridad | TypeScript, Vite, Web Crypto | [Demo](https://luzylay.github.io/Cryptography-Interactive-Learning/) / [GitHub](https://github.com/luzylay/Cryptography-Interactive-Learning) |
| **App School Homework** | Mobile Nativo | Kotlin, Android SDK | [GitHub](https://github.com/luzylay/App-School-Homework) |
| **Observatorio Laboral EPEN**| Data Pipeline | Python, Pandas, Looker Studio | [GitHub](https://github.com/luzylay) |
| **IBM Logistics Analysis** | Data Analytics | Jupyter Notebooks, Python ETL, Power BI | [GitHub](https://github.com/luzylay/guayerd-ibm-ecommerce-shipping-customer-reviews-analysis) |
| **Backend & QA Testing** | Enterprise Software | Java, MS SQL Server, JUnit, Selenium | [GitHub](https://github.com/luzylay/sap-abap-fiori-dev-Learning) |
| **Lady Loayza Tech** | Frontend & A11y | HTML5 Semántico, CSS Moderno, Cloudflare | [Demo](https://lady-loayza-tech.pages.dev) / [GitHub](https://github.com/luzylay/Lady-Loayza-Tech) |
| **PIPD Learning Platform** | Frontend / EduTech | TypeScript, UI Components | [GitHub](https://github.com/luzylay/learning-platform-PIPD) |
| **La Taberna de Roly** | Software Desktop | Java, POO, SQL | [GitHub](https://github.com/luzylay/La-taberna) |
| **Game Gato & Gráficos** | Software / Algoritmos| C#, .NET | [GitHub](https://github.com/luzylay/Game-Gato) |
| **Simulador de CPU (SO)** | Sistemas Operativos | Python, Planificación de Procesos | [GitHub](https://github.com/luzylay/Sistemas-operativos-Grupo1) |

---

## Stack Tecnológico

- **Frontend & UI/UX:** HTML5 Semántico, CSS3 Moderno (CSS Custom Properties, Flexbox, CSS Grid), JavaScript ES6+, TypeScript, React, Vite, PWA.
- **Data & Machine Learning:** Python, Pandas, Scikit-Learn, XGBoost, Power BI, PostgreSQL, Jupyter Notebooks.
- **Mobile & Backend:** Kotlin (Android Nativo), Java, C#, Flask REST APIs, JUnit, Selenium QA.
- **Despliegue & DevOps:** Cloudflare Pages, GitHub Pages, CI/CD con GitHub Actions, Git.

---

## Seguridad y Privacidad

Para conocer la política de divulgación responsable y reporte de seguridad, consulte [SECURITY.md](SECURITY.md).

---

## Contacto Profesional

- **LinkedIn:** [linkedin.com/in/ladyloayzarodriguez](https://www.linkedin.com/in/ladyloayzarodriguez/)
- **Agendar Reunión (Cal.com):** [cal.com/lady-loayza-incyug/30min](https://cal.com/lady-loayza-incyug/30min)
- **GitHub:** [github.com/luzylay](https://github.com/luzylay)

---

## Licencia

Este proyecto se encuentra bajo la Licencia MIT. Para más detalles, consulte el archivo [LICENSE](LICENSE).
