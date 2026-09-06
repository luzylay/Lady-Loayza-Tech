<div align="center">

# Lady-Loayza-Tech

### *Portafolio de Ingeniería de Software, Datos & Accesibilidad Universal*

[![Cloudflare Pages](https://img.shields.io/badge/Deployed%20on-Cloudflare%20Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://lady-loayza-tech.pages.dev)
[![PWA Ready](https://img.shields.io/badge/PWA-100%25%20Offline%20Ready-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](https://lady-loayza-tech.pages.dev)
[![WCAG 2.1 AA](https://img.shields.io/badge/A11y-WCAG%202.1%20AA%20Compliant-10b981?style=for-the-badge&logo=w3c&logoColor=white)](https://lady-loayza-tech.pages.dev)
[![Clean Architecture](https://img.shields.io/badge/Architecture-Clean%20%2F%20DDD-c4f135?style=for-the-badge&logo=codefactor&logoColor=black)](docs/ARCHITECTURE.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-38bdf8?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](LICENSE)

<br />

<p align="center">
  <a href="https://lady-loayza-tech.lady-loayza.workers.dev/"><strong>🌐 Explorar Portafolio en Vivo »</strong></a>
  <br />
  <br />
  <a href="#arquitectura-de-software--ingeniería">Arquitectura</a> •
  <a href="#canales-oficiales-de-contacto">Contacto</a> •
  <a href="#seguridad-y-reportes">Seguridad</a> •
  <a href="#licencia">Licencia</a>
</p>

</div>

---

## Arquitectura de Software & Ingeniería

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

---

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

## Canales Oficiales de Contacto

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

## Seguridad y Reportes

Para consultar la política de divulgación responsable y reporte de incidentes, revise [SECURITY.md](SECURITY.md).

## Licencia

Este proyecto está licenciado bajo los términos de la [Licencia MIT](LICENSE).  
Copyright &copy; 2026 **Lady Luz Loayza Rodriguez**.
