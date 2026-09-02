# Arquitectura de Software & Especificación de Algoritmos

Este documento describe la arquitectura formal del sistema construida bajo los principios de **Clean Architecture (Onion Architecture)**, **Domain-Driven Design (DDD)**, **Principios SOLID**, **Patrones GoF** y **Estructuras de Datos y Algoritmos Óptimos ($O(1)$)**.

---

## 1. Diagrama Canónico de Capas (Clean Architecture)

```text
Lady-Loayza-Tech/
│
├── src/                                  # Código fuente modularizado por capas
│   ├── domain/                           # [Capa 1: Dominio] Entidades puras y Value Objects
│   │   ├── project.entity.js             # Entidad inmutable con validación de invariantes
│   │   └── conversion.entity.js          # Value Object para eventos y scoring de leads
│   │
│   ├── use-cases/                        # [Capa 2: Casos de Uso] Lógica de negocio orquestada
│   │   ├── filter-projects.use-case.js   # Filtrado de proyectos en O(1) vía Repositorio
│   │   └── record-conversion.use-case.js # Procesamiento de conversiones y telemetría
│   │
│   ├── infrastructure/                   # [Capa 3: Infraestructura] Adaptadores y Repositorios
│   │   ├── project.repository.js         # Repositorio con Índice Invertido en memoria O(1)
│   │   ├── portfolio-content.repository.js # Contenidos estructurados e inmutables
│   │   ├── crypto.vault.js               # Adaptador criptográfico (SubtleCrypto AES-GCM-256)
│   │   ├── telemetry.service.js          # Telemetría de alta precisión (Page Visibility API)
│   │   └── event-bus.js                  # Observer / PubSub Pattern desacoplado
│   │
│   ├── presentation/                     # [Capa 4: Presentación] Controladores de UI y Componentes
│   │   ├── icons.js                      # Repositorio central de iconos vectoriales SVG
│   │   ├── navigation.controller.js      # Controlador de navegación y accesibilidad WCAG
│   │   ├── scroll-spy.controller.js      # IntersectionObserver para enlaces activos
│   │   ├── about-list.component.js       # Componente de sección Sobre Mí
│   │   ├── experience-list.component.js  # Componente de Experiencia Profesional
│   │   ├── tech-list.component.js        # Componente de Tecnologías
│   │   ├── roi-list.component.js         # Componente de Impacto Comercial y ROI
│   │   ├── contact-panel.component.js    # Componente de Canales de Contacto
│   │   ├── filter-bar.component.js       # Componente de filtros (emite a casos de uso)
│   │   ├── project-list.component.js     # Componente reactivo suscrito al EventBus
│   │   └── conversion-tracker.component.js # Event Delegation para captura de interacciones
│   │
│   └── main.js                           # Composition Root (Inyección de Dependencias)
│
├── assets/                               # Recursos estáticos y estilos visuales
│   ├── css/                              # Hojas de estilo desacopladas por responsabilidades
│   │   ├── variables.css                 # Tokens de diseño, variables CSS y tipografía
│   │   ├── layout.css                    # Header, navegación, contenedores y footer
│   │   ├── hero.css                      # Hero cinemático, tipografía y llamadas a la acción
│   │   ├── components.css                # Tarjetas, grillas ROI y responsive (6 breakpoints)
│   │   └── main.css                      # Manifiesto maestro de estilos
│   ├── docs/                             # Documentación y currículum vitae
│   │   └── cv-lady-loayza-rodriguez.docx
│   └── images/                           # Fotografías y galería
│       ├── profile-hd.png
│       ├── profile-transparent.webp
│       ├── profile-transparent-opt.png
│       └── gallery/
│           ├── certificado-excelencia.jpg
│           └── foto-grupal.jpeg
│
├── docs/                                 # Documentación técnica
│   └── ARCHITECTURE.md
│
├── index.html                            # Layout shell ultra limpio, declarativo y semántico
├── README.md                             # Documentación formal del proyecto
├── SECURITY.md                           # Políticas de divulgación responsable y criptografía
├── LICENSE                               # Licencia MIT
├── robots.txt                            # Directivas para rastreadores de búsqueda
└── sitemap.xml                           # Mapa de indexación SEO
```

---

## 2. Ventajas del Esqueleto Declarativo en `index.html`

1. **Separación Total de Contenido, Presentación y Lógica:** `index.html` ya no alberga bloques de texto rígidos ni decenas de SVGs inline. Solo define la estructura semántica de accesibilidad y los contenedores de hidratación.
2. **Cero Duplicación de Código (DRY):** Todo cambio en contenidos de experiencia, proyectos, métricas de ROI o tecnologías se realiza en una sola fuente de la verdad (`src/infrastructure/`).
3. **Mantenibilidad Extrema:** Nuevos componentes o secciones pueden crearse simplemente extendiendo `src/presentation/` e inyectándolos en `src/main.js`.
