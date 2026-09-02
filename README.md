# Lady-Loayza-Tech

Portafolio profesional, catálogo de proyectos de ingeniería de software, analítica de datos, accesibilidad web universal y soluciones tecnológicas desarrollado por **Lady Luz Loayza Rodriguez**.

Construido con **Clean Architecture**, optimización algorítmica de consultas ($\mathcal{O}(1)$) y telemetría de rendimiento en tiempo real sobre arquitectura Edge.

---

## Despliegue en Producción

- **Producción Principal (Cloudflare Pages):** [https://lady-loayza-tech.pages.dev](https://lady-loayza-tech.pages.dev)
- **Despliegue Alternativo (GitHub Pages):** [https://luzylay.github.io/Lady-Loayza-Tech/](https://luzylay.github.io/Lady-Loayza-Tech/)

---

## Logros Técnicos y Reconocimientos

- **1.er Puesto Hackathon INSNSB (2026):** Desarrollo de la Progressive Web App *NutriCRED* para el Instituto Nacional de Salud del Niño San Borja, digitalizando la atención y el monitoreo nutricional de la primera infancia (0 a 3 años).
- **Top 3 Nacional Hackathon Sin Barreras MINCETUR (2026):** Desarrollo del asistente conversacional accesible con inteligencia artificial *Helen* para personas con discapacidad visual (clasificado entre 66 propuestas a nivel nacional).
- **Top 28% Global en Kaggle:** Modelo predictivo de retención y fuga de clientes (*Customer Churn*) con optimización de hiperparámetros en XGBoost y análisis explicativo SHAP.
- **Samsung Innovation Campus:** Pipeline de datos ETL en Python con procesamiento de más de 10,000 registros del INEI y tableros interactivos en Power BI y Looker Studio.

---

## Arquitectura de Software & Algoritmos

El sistema sigue los principios de **Clean Architecture (Onion Architecture)**, **Domain-Driven Design (DDD)**, **SOLID** y **Estructuras de Datos Eficientes**:

```text
src/
├── domain/                          # Entidades inmutables (ProjectEntity, ConversionValueObject)
├── use-cases/                       # Casos de uso desacoplados (FilterProjects, RecordConversion)
├── infrastructure/                  # Repositorio con Índice Invertido O(1), Criptografía & EventBus
├── presentation/                    # Componentes modulares reactivos y controladores de interfaz
└── main.js                          # Composition Root (Punto de Inyección de Dependencias)
```

- **Filtrado en Tiempo Constante ($\mathcal{O}(1)$):** La búsqueda por categorías utiliza un Índice Invertido en memoria basado en tablas hash (`Map<string, Set<ProjectEntity>>`).
- **Bóveda Criptográfica:** Telemetría protegida con la Web Crypto API (`window.crypto.subtle`) mediante cifrado **AES-GCM (256 bits)** y derivación de claves **PBKDF2**, garantizando privacidad por diseño (*Zero PII*).
- **Telemetría Nativa de GitHub:** Integración directa con la API oficial de GitHub para métricas en vivo de repositorios, actividad y distribución de lenguajes.

Para consultar el análisis arquitectónico formal, revise [ARCHITECTURE.md](docs/ARCHITECTURE.md).

---

## Catálogo de Proyectos y Repositorios

| Proyecto | Categoría | Tecnologías Principales | Enlaces |
| :--- | :--- | :--- | :--- |
| **NutriCRED PWA** | Health Tech / PWA | React, TypeScript, PWA Offline | [Demo en vivo](https://nutricred-crecer-mejor-nutrivision.vercel.app/) · [GitHub](https://github.com/luzylay/NutriCRED-PWA) |
| **Predicción de Churn** | Data Science / ML | Python, XGBoost, Scikit-Learn | [Kaggle](https://www.kaggle.com/ladyloayza) · [GitHub](https://github.com/luzylay/predict-customer-churn-luzylay) |
| **Data Mart Palta Hass BI** | Data Engineering | PostgreSQL, Power BI, ETL | [GitHub](https://github.com/luzylay/datamart-palta-hass-bi) |
| **Helen (IA Turística)** | IA Conversacional | Python, Flask, NLU, TTS | [GitHub](https://github.com/luzylay) |
| **Cryptography Learning** | EduTech / Seguridad | TypeScript, Vite, Web Crypto | [Demo en vivo](https://luzylay.github.io/Cryptography-Interactive-Learning/) · [GitHub](https://github.com/luzylay/Cryptography-Interactive-Learning) |
| **App School Homework** | Mobile Nativo | Kotlin, Android SDK | [GitHub](https://github.com/luzylay/App-School-Homework) |
| **Observatorio Laboral EPEN**| Data Pipeline | Python, Pandas, Looker Studio | [GitHub](https://github.com/luzylay) |
| **IBM Logistics Analysis** | Data Analytics | Jupyter, Python ETL, Power BI | [GitHub](https://github.com/luzylay/guayerd-ibm-ecommerce-shipping-customer-reviews-analysis) |
| **Enterprise Backend & QA** | Enterprise Software | Java, MS SQL Server, JUnit, Selenium | [GitHub](https://github.com/luzylay/sap-abap-fiori-dev-Learning) |
| **Lady Loayza Tech** | Frontend & A11y | HTML5 Semántico, CSS Moderno, Cloudflare | [Demo en vivo](https://lady-loayza-tech.pages.dev) · [GitHub](https://github.com/luzylay/Lady-Loayza-Tech) |
| **PIPD Learning Platform** | Frontend / EduTech | TypeScript, UI Components | [GitHub](https://github.com/luzylay/learning-platform-PIPD) |
| **La Taberna de Roly** | Software Desktop | Java, POO, SQL | [GitHub](https://github.com/luzylay/La-taberna) |
| **Game Gato & Gráficos** | Software / Algoritmos| C#, .NET | [GitHub](https://github.com/luzylay/Game-Gato) |
| **Simulador de CPU (SO)** | Sistemas Operativos | Python, Planificación de Procesos | [GitHub](https://github.com/luzylay/Sistemas-operativos-Grupo1) |

---

## Stack Tecnológico

- **Frontend & UI/UX:** HTML5 Semántico, CSS3 Moderno (Custom Properties, Flexbox, Grid), JavaScript ES6+, TypeScript, React, Vite, PWA, Accesibilidad Universal (WCAG 2.1 AA).
- **Data & Machine Learning:** Python, Pandas, Scikit-Learn, XGBoost, Power BI, PostgreSQL, Modelado Dimensional ETL.
- **Mobile & Backend:** Kotlin (Android Nativo), Java, C#, Flask REST APIs, JUnit, Selenium QA.
- **DevOps & Seguridad:** Cloudflare Pages, GitHub Pages, CI/CD GitHub Actions, SubtleCrypto (AES-GCM-256).

---

## Canales Oficiales de Contacto

- **LinkedIn:** [linkedin.com/in/ladyloayzarodriguez](https://www.linkedin.com/in/ladyloayzarodriguez/)
- **Agendar Reunión (Cal.com):** [cal.com/lady-loayza-incyug/30min](https://cal.com/lady-loayza-incyug/30min)
- **GitHub:** [github.com/luzylay](https://github.com/luzylay)
- **Compromiso de Respuesta:** Menos de 24 horas.

---

## Seguridad y Divulgación Responsable

Para consultar la política de seguridad y reporte técnico, revise [SECURITY.md](SECURITY.md).

---

## Licencia

Este proyecto está licenciado bajo los términos de la Licencia MIT. Consulte el archivo [LICENSE](LICENSE) para más información.
