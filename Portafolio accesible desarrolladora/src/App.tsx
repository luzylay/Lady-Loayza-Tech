import { useState, useEffect } from "react";

const C = {
  ink: "#0c0c0f",
  ink2: "#13131a",
  ink3: "#1c1c26",
  lime: "#c4f135",
  snow: "#f0f0f5",
  mist: "#72728a",
  mist2: "#4a4a60",
  border: "#1e1e2e",
};
const FONT = "'Outfit', sans-serif";
const MONO = "'DM Mono', monospace";

const projects = [
  { cat: "Web", title: "Jardín de Recetas", desc: "App que te sugiere recetas con los ingredientes que ya tienes en casa. Sin desperdicio, sin complicaciones.", img: "https://images.unsplash.com/photo-1543353071-10c8ba85a904?w=700&h=420&fit=crop&auto=format", tags: ["Búsqueda inteligente", "Favoritos", "Recetas"], demo: "https://github.com", code: "https://github.com" },
  { cat: "App", title: "Mi Biblioteca Personal", desc: "Registra libros leídos, en curso y pendientes. Como Goodreads pero tuyo, sin anuncios.", img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=700&h=420&fit=crop&auto=format", tags: ["Listas", "Notas", "Progreso"], demo: "https://github.com", code: "https://github.com" },
  { cat: "Web", title: "El Tiempo Sin Complicaciones", desc: "El clima de hoy en una sola frase. ¿Llevas paraguas o no? Sin gráficas confusas.", img: "https://images.unsplash.com/photo-1504608524841-42584120d693?w=700&h=420&fit=crop&auto=format", tags: ["Clima en vivo", "Simple", "Útil"], demo: "https://github.com", code: "https://github.com" },
  { cat: "App", title: "Gastos Claros", desc: "Anota tus gastos y descubre a dónde va tu dinero. Gráficas bonitas, sin hojas de cálculo.", img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=700&h=420&fit=crop&auto=format", tags: ["Finanzas", "Gráficas", "Categorías"], demo: "https://github.com", code: "https://github.com" },
  { cat: "Herramienta", title: "Conversor de Monedas", desc: "Convierte entre monedas en tiempo real. Útil para viajes, compras internacionales o pura curiosidad.", img: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=700&h=420&fit=crop&auto=format", tags: ["Tiempo real", "Divisas", "Viajes"], demo: "https://github.com", code: "https://github.com" },
  { cat: "Herramienta", title: "Generador de Paletas", desc: "Crea combinaciones de colores que se ven bien juntos. Para diseñadores, artistas o quien decora su casa.", img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=700&h=420&fit=crop&auto=format", tags: ["Colores", "Diseño", "Creatividad"], demo: "https://github.com", code: "https://github.com" },
];

const experience = [
  { role: "Desarrolladora Frontend", company: "Agencia Pixel", period: "2024 — hoy", desc: "Construyo las partes de las apps que los usuarios ven y tocan. Trabajo en equipo para que todo sea rápido, bonito y fácil de usar." },
  { role: "Desarrolladora Web Freelance", company: "Proyectos propios", period: "2023 — 2024", desc: "Diseñé y construí páginas web para pequeñas empresas y emprendedores. De la idea al producto final." },
  { role: "Practicante de Desarrollo", company: "StartupMx", period: "2022 — 2023", desc: "Mi primer trabajo real en tecnología. Aprendí a trabajar en equipo y a escribir código limpio y profesional." },
];

const techs = [
  { code: "JS", name: "JavaScript", human: "Hace que los botones y páginas cobren vida" },
  { code: "PY", name: "Python", human: "Automatiza tareas y organiza datos complejos" },
  { code: "HTML", name: "HTML & CSS", human: "Diseña todo lo que ves en pantalla" },
  { code: "DB", name: "Bases de datos", human: "Donde vive y se organiza toda la información" },
  { code: "RCT", name: "React", human: "Herramientas para construir apps modernas" },
  { code: "GIT", name: "Git", human: "Historial con deshacer infinito para el código" },
];

const CATS = ["Todos", "Web", "App", "Herramienta"];

/* ── SVG Icons ── */
function IconLayers() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}
function IconCode() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
function IconWrench() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
function IconBolt() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
function IconGlobe() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
function IconCalendar() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function IconChat() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function IconMenu() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
function IconClose() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function Pill({ label }: { label: string }) {
  return (
    <span style={{ fontFamily: MONO, fontSize: "0.67rem", padding: "4px 10px", borderRadius: 999, background: C.ink3, color: C.mist, border: `1px solid ${C.border}`, letterSpacing: "0.03em", whiteSpace: "nowrap" }}>
      {label}
    </span>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
      <span style={{ fontFamily: MONO, fontSize: "0.67rem", color: C.lime, letterSpacing: "0.12em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{text}</span>
      <div style={{ flex: 1, height: 1, background: C.border }} />
    </div>
  );
}

const css = `
  .hero-split { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: flex-end; width: 100%; }
  .about-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1px; background: #1e1e2e; border: 1px solid #1e1e2e; }
  .exp-row { display: grid; grid-template-columns: 72px 1fr 120px; gap: 0 20px; align-items: start; }
  .exp-period-col { display: block; }
  .exp-period-inline { display: none; }
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
  .contact-info-panel { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: #1e1e2e; border: 1px solid #1e1e2e; }
  .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
  .tech-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: #1e1e2e; border: 1px solid #1e1e2e; }
  .nav-links { display: flex; gap: 32px; }
  .nav-cta { display: inline-block; }
  .nav-burger { display: none; }
  .scroll-cue { display: flex; }

  @media (max-width: 768px) {
    .hero-split { grid-template-columns: 1fr; gap: 28px; }
    .about-grid { grid-template-columns: 1fr; }
    .exp-row { grid-template-columns: 48px 1fr; }
    .exp-period-col { display: none; }
    .exp-period-inline { display: block; }
    .contact-grid { grid-template-columns: 1fr; gap: 32px; }
    .contact-info-panel { grid-template-columns: 1fr 1fr; }
    .projects-grid { grid-template-columns: 1fr; }
    .tech-grid { grid-template-columns: 1fr 1fr; }
    .nav-links { display: none; }
    .nav-cta { display: none; }
    .nav-burger { display: flex; }
    .scroll-cue { display: none; }
  }

  @media (max-width: 480px) {
    .tech-grid { grid-template-columns: 1fr; }
    .contact-info-panel { grid-template-columns: 1fr; }
  }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.35; }
  }
  .dot-pulse { animation: pulse-dot 2s ease-in-out infinite; }

  .project-card { transition: border-color 0.2s, transform 0.22s; }
  .project-card:hover { border-color: #4a4a60 !important; transform: translateY(-4px); }
  .project-card:hover .card-img { transform: scale(1.04); }
  .card-img { transition: transform 0.4s; }
  .tech-card { transition: background 0.15s; }
  .tech-card:hover { background: #1c1c26 !important; }
  .about-card { transition: background 0.15s; }
  .about-card:hover { background: #1c1c26 !important; }
  .exp-row-wrap { transition: background 0.15s; }
  .exp-row-wrap:hover { background: #13131a; }
  .contact-card { transition: background 0.15s; }
  .contact-card:hover { background: #1c1c26 !important; }

  html { scroll-behavior: smooth; }
`;

export default function App() {
  const [filter, setFilter] = useState("Todos");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const filtered = filter === "Todos" ? projects : projects.filter(p => p.cat === filter);

  return (
    <>
      <style>{css}</style>
      <div style={{ background: C.ink, color: C.snow, fontFamily: FONT, minHeight: "100vh" }}>

        {/* ── NAV ── */}
        <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, transition: "background 0.3s, border-color 0.3s", background: scrolled ? "rgba(12,12,15,0.95)" : "transparent", borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent", backdropFilter: scrolled ? "blur(16px)" : "none" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
            <a href="#hero" style={{ fontWeight: 800, fontSize: "1.05rem", letterSpacing: "-0.02em", textDecoration: "none", color: C.snow, flexShrink: 0 }}>
              sofía<span style={{ color: C.lime }}>.</span>
            </a>
            <nav className="nav-links">
              {[["Sobre mí", "#sobre"], ["Experiencia", "#experiencia"], ["Proyectos", "#proyectos"], ["Contacto", "#contacto"]].map(([l, h]) => (
                <a key={l} href={h} style={{ fontFamily: MONO, fontSize: "0.75rem", color: C.mist, textDecoration: "none", letterSpacing: "0.04em", transition: "color 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = C.lime)}
                  onMouseLeave={e => (e.currentTarget.style.color = C.mist)}>{l}</a>
              ))}
            </nav>
            <a href="mailto:sofia@correo.com" className="nav-cta"
              style={{ background: C.lime, color: C.ink, padding: "9px 18px", fontWeight: 700, fontSize: "0.82rem", textDecoration: "none", borderRadius: 7, flexShrink: 0, transition: "opacity 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.82")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
              Hablemos
            </a>
            <button className="nav-burger" onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: "none", border: "none", color: C.snow, cursor: "pointer", padding: 4, alignItems: "center", justifyContent: "center" }}>
              {menuOpen ? <IconClose /> : <IconMenu />}
            </button>
          </div>
          {menuOpen && (
            <div style={{ background: C.ink2, borderTop: `1px solid ${C.border}`, padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
              {[["Sobre mí", "#sobre"], ["Experiencia", "#experiencia"], ["Proyectos", "#proyectos"], ["Contacto", "#contacto"]].map(([l, h]) => (
                <a key={l} href={h} onClick={() => setMenuOpen(false)}
                  style={{ fontFamily: MONO, fontSize: "0.8rem", color: C.mist, textDecoration: "none" }}>{l}</a>
              ))}
              <a href="mailto:sofia@correo.com"
                style={{ marginTop: 4, background: C.lime, color: C.ink, padding: "12px 18px", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none", borderRadius: 7, textAlign: "center" }}>
                Hablemos
              </a>
            </div>
          )}
        </header>

        {/* ── HERO ── */}
        <section id="hero" style={{ position: "relative", minHeight: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <img
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1600&h=1000&fit=crop&auto=format"
              alt="Sofía trabajando como desarrolladora de software"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "60% top" }}
            />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(105deg, ${C.ink} 0%, rgba(12,12,15,0.92) 30%, rgba(20,14,8,0.58) 58%, rgba(58,28,10,0.08) 82%, transparent 100%), linear-gradient(to top, ${C.ink} 0%, rgba(12,12,15,0.8) 18%, rgba(12,12,15,0.25) 42%, transparent 70%)` }} />
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 55% 70% at 70% 38%, rgba(165,85,30,0.18) 0%, transparent 65%)", mixBlendMode: "screen" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(12,12,15,0.5) 0%, transparent 20%)" }} />
          </div>

          <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 1100, margin: "0 auto", padding: "0 24px 64px", display: "flex", alignItems: "flex-end", minHeight: "100vh" }}>
            <div className="hero-split">

              {/* LEFT — name */}
              <div>
                <a href="#contacto" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 28, textDecoration: "none", transition: "opacity 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.6")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                  <span style={{ fontFamily: MONO, fontSize: "0.72rem", color: "rgba(240,240,245,0.4)", letterSpacing: "0.06em" }}>
                    ¿Tienes un proyecto? Hablemos primero →
                  </span>
                </a>
                <h1 style={{ fontFamily: FONT, fontWeight: 900, fontSize: "clamp(3rem, 7.5vw, 7rem)", lineHeight: 0.87, letterSpacing: "-0.05em", color: C.snow, margin: 0 }}>
                  Hola,<br />soy<br />
                  <span style={{ color: C.lime }}>Sofía.</span>
                </h1>
              </div>

              {/* RIGHT — rol, descripción, CTAs, stats */}
              <div style={{ display: "flex", flexDirection: "column", paddingBottom: 4 }}>
                <p style={{ fontFamily: MONO, fontSize: "0.72rem", color: C.mist, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>
                  Desarrolladora de software
                </p>
                <p style={{ fontSize: "clamp(0.88rem, 1.6vw, 0.98rem)", color: "rgba(240,240,245,0.58)", lineHeight: 1.82, marginBottom: 28 }}>
                  Construyo apps y páginas web que la gente usa cada día. Útiles, rápidas y fáciles de entender — para todo el mundo, no solo para quienes saben programar.
                </p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 36 }}>
                  <a href="#proyectos"
                    style={{ background: C.lime, color: C.ink, padding: "12px 22px", fontWeight: 700, fontSize: "0.86rem", textDecoration: "none", borderRadius: 8, transition: "opacity 0.15s", whiteSpace: "nowrap" }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = "0.84")}
                    onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                    Ver proyectos ↓
                  </a>
                  <a href="#sobre"
                    style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.11)", color: C.snow, padding: "12px 22px", fontWeight: 600, fontSize: "0.86rem", textDecoration: "none", borderRadius: 8, transition: "background 0.2s", whiteSpace: "nowrap" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.13)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}>
                    Sobre mí
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(240,240,245,0.45)", padding: "12px 16px", fontWeight: 600, fontSize: "0.86rem", textDecoration: "none", borderRadius: 8, transition: "color 0.2s", whiteSpace: "nowrap" }}
                    onMouseEnter={e => (e.currentTarget.style.color = C.snow)}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(240,240,245,0.45)")}>
                    LinkedIn ↗
                  </a>
                </div>
                <div style={{ display: "flex", gap: 28, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.08)", flexWrap: "wrap" }}>
                  {[["6+", "Proyectos"], ["3", "Años"], ["∞", "Ganas"]].map(([n, l]) => (
                    <div key={l}>
                      <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: "1.85rem", color: C.lime, lineHeight: 1 }}>{n}</div>
                      <div style={{ fontFamily: MONO, fontSize: "0.62rem", color: "rgba(240,240,245,0.32)", marginTop: 5, letterSpacing: "0.06em" }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="scroll-cue" style={{ position: "absolute", bottom: 28, right: 28, zIndex: 10, flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ width: 1, height: 40, background: `linear-gradient(to bottom, transparent, ${C.lime})` }} />
            <span style={{ fontFamily: MONO, fontSize: "0.56rem", color: C.lime, letterSpacing: "0.14em", writingMode: "vertical-rl", opacity: 0.6 }}>SCROLL</span>
          </div>
        </section>

        {/* ── SOBRE MÍ ── */}
        <section id="sobre" style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
          <SectionLabel text="01 — Sobre mí" />
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontFamily: FONT, fontWeight: 800, fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", letterSpacing: "-0.03em", color: C.snow, marginBottom: 14, lineHeight: 1.1 }}>
              ¿Qué hace exactamente una desarrolladora?
            </h2>
            <p style={{ color: C.mist, lineHeight: 1.8, fontSize: "0.93rem", maxWidth: 640 }}>
              Imagina que quieres construir una tienda. Necesitas arquitecto, albañil y electricista. Yo hago todo eso, pero en el mundo digital — desde el botón que aprietas hasta el sistema que guarda tu información.
            </p>
          </div>
          <div className="about-grid">
            {[
              { Icon: IconLayers, title: "Diseño lo que ves", text: "Colores, botones, menús — todo lo que aparece en pantalla y hace que sea fácil de usar." },
              { Icon: IconCode, title: "Construyo lo que no ves", text: "La lógica detrás de todo: que tu búsqueda funcione, que tu contraseña sea segura, que los datos lleguen rápido." },
              { Icon: IconWrench, title: "Arreglo lo que se rompe", text: "Cuando algo falla, soy quien busca el problema y lo soluciona antes de que tú lo notes." },
            ].map(({ Icon, title, text }) => (
              <div key={title} className="about-card"
                style={{ background: C.ink2, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
                <span style={{ color: C.lime }}><Icon /></span>
                <div style={{ fontWeight: 700, color: C.snow, fontSize: "0.93rem", lineHeight: 1.3 }}>{title}</div>
                <div style={{ color: C.mist, fontSize: "0.84rem", lineHeight: 1.65 }}>{text}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── EXPERIENCIA ── */}
        <section id="experiencia" style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
            <SectionLabel text="02 — Experiencia" />
            {experience.map((e, i) => (
              <div key={e.role} className="exp-row-wrap"
                style={{ borderBottom: i < experience.length - 1 ? `1px solid ${C.border}` : "none", padding: "6px 10px", borderRadius: 8 }}>
                <div className="exp-row" style={{ padding: "22px 0" }}>
                  <div>
                    <span style={{ fontFamily: MONO, fontSize: "0.68rem", color: C.lime, letterSpacing: "0.04em" }}>0{i + 1}</span>
                    <div className="exp-period-col" style={{ fontFamily: MONO, fontSize: "0.66rem", color: C.mist, marginTop: 8 }}>{e.period}</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: "1.02rem", color: C.snow, letterSpacing: "-0.02em", marginBottom: 3 }}>{e.role}</div>
                    <div style={{ fontFamily: MONO, fontSize: "0.7rem", color: C.lime, marginBottom: 4 }}>{e.company}</div>
                    <div className="exp-period-inline" style={{ fontFamily: MONO, fontSize: "0.66rem", color: C.mist, marginBottom: 8 }}>{e.period}</div>
                    <p style={{ color: C.mist, fontSize: "0.86rem", lineHeight: 1.72, margin: 0 }}>{e.desc}</p>
                  </div>
                  <div className="exp-period-col" style={{ fontFamily: MONO, fontSize: "0.66rem", color: C.mist, textAlign: "right", paddingTop: 2 }}>{e.period}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PROYECTOS ── */}
        <section id="proyectos" style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
          <SectionLabel text="03 — Proyectos" />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
            <h2 style={{ fontFamily: FONT, fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", letterSpacing: "-0.03em", color: C.snow, margin: 0, lineHeight: 1.1 }}>
              Lo que he construido
            </h2>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {CATS.map(cat => (
                <button key={cat} onClick={() => setFilter(cat)}
                  style={{ fontFamily: MONO, fontSize: "0.7rem", padding: "6px 14px", borderRadius: 999, border: `1px solid ${filter === cat ? C.lime : C.border}`, background: filter === cat ? C.lime : "transparent", color: filter === cat ? C.ink : C.mist, fontWeight: filter === cat ? 700 : 400, cursor: "pointer", transition: "all 0.15s", letterSpacing: "0.04em" }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="projects-grid">
            {filtered.map(p => (
              <div key={p.title} className="project-card"
                style={{ background: C.ink2, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <div style={{ height: 196, overflow: "hidden", background: C.ink3, position: "relative", flexShrink: 0 }}>
                  <img src={p.img} alt={p.title} className="card-img" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.75)" }} />
                  <span style={{ position: "absolute", top: 12, right: 12, fontFamily: MONO, fontSize: "0.62rem", background: "rgba(12,12,15,0.88)", color: C.lime, padding: "3px 10px", borderRadius: 999, border: `1px solid ${C.border}`, backdropFilter: "blur(8px)" }}>{p.cat}</span>
                </div>
                <div style={{ padding: "18px 18px 20px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                  <h3 style={{ fontFamily: FONT, fontWeight: 800, fontSize: "1.02rem", color: C.snow, letterSpacing: "-0.02em", margin: 0 }}>{p.title}</h3>
                  <p style={{ color: C.mist, fontSize: "0.84rem", lineHeight: 1.65, margin: 0, flex: 1 }}>{p.desc}</p>
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                    {p.tags.map(t => <Pill key={t} label={t} />)}
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <a href={p.demo} target="_blank" rel="noopener noreferrer"
                      style={{ flex: 1, background: C.lime, color: C.ink, padding: "9px 0", fontWeight: 700, fontSize: "0.8rem", textDecoration: "none", borderRadius: 7, textAlign: "center", transition: "opacity 0.15s" }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = "0.82")}
                      onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                      Ver demo →
                    </a>
                    <a href={p.code} target="_blank" rel="noopener noreferrer"
                      style={{ flex: 1, border: `1px solid ${C.border}`, color: C.mist, padding: "9px 0", fontWeight: 600, fontSize: "0.8rem", textDecoration: "none", borderRadius: 7, textAlign: "center", transition: "border-color 0.15s, color 0.15s" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = C.mist2; e.currentTarget.style.color = C.snow; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.mist; }}>
                      Código ↗
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── TECNOLOGÍAS ── */}
        <section style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
          <div id="tecnologias" style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
            <SectionLabel text="04 — Tecnologías" />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
              <h2 style={{ fontFamily: FONT, fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", letterSpacing: "-0.03em", color: C.snow, margin: 0, lineHeight: 1.1 }}>
                Los idiomas que hablo<br />
                <span style={{ color: C.lime }}>con las máquinas</span>
              </h2>
              <p style={{ color: C.mist, fontSize: "0.86rem", maxWidth: 300, lineHeight: 1.72, margin: 0 }}>
                Las computadoras tienen sus propios lenguajes — yo aprendí varios para decirles exactamente qué hacer.
              </p>
            </div>
            <div className="tech-grid">
              {techs.map(t => (
                <div key={t.code} className="tech-card"
                  style={{ background: C.ink2, padding: "20px 20px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{ fontFamily: MONO, fontSize: "0.63rem", color: C.lime, background: C.ink3, border: `1px solid ${C.border}`, padding: "4px 8px", borderRadius: 5, flexShrink: 0, letterSpacing: "0.06em", marginTop: 2 }}>{t.code}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: C.snow, fontSize: "0.87rem", marginBottom: 4 }}>{t.name}</div>
                    <div style={{ color: C.mist, fontSize: "0.79rem", lineHeight: 1.6 }}>{t.human}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACTO ── */}
        <section id="contacto" style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px 96px" }}>
          <SectionLabel text="05 — Contacto" />
          <div className="contact-grid">
            <div>
              <h2 style={{ fontFamily: FONT, fontWeight: 900, fontSize: "clamp(2rem, 5.5vw, 4.6rem)", letterSpacing: "-0.05em", color: C.snow, lineHeight: 0.9, marginBottom: 20 }}>
                ¿Tienes<br />una idea?<br />
                <span style={{ color: C.lime }}>Cuéntamela.</span>
              </h2>
              <p style={{ color: C.mist, fontSize: "0.91rem", lineHeight: 1.8, marginBottom: 28 }}>
                No importa si tu idea parece pequeña o enorme, ni si sabes nada de tecnología. Me encanta escuchar y ayudar a que las ideas se vuelvan reales.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <a href="mailto:sofia@correo.com"
                  style={{ background: C.lime, color: C.ink, padding: "14px 22px", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "opacity 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.84")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                  <IconMail /> Escribirme un correo
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                  style={{ border: `1px solid ${C.border}`, color: C.snow, padding: "13px 22px", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none", borderRadius: 8, textAlign: "center", transition: "border-color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = C.lime)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}>
                  LinkedIn ↗
                </a>
              </div>
            </div>
            <div className="contact-info-panel" style={{ alignSelf: "center" }}>
              {[
                { Icon: IconBolt, label: "Respuesta rápida", val: "Menos de 24h" },
                { Icon: IconGlobe, label: "Modalidad", val: "100% remoto" },
                { Icon: IconCalendar, label: "Antes de empezar", val: "Hablemos primero" },
                { Icon: IconChat, label: "Idiomas", val: "Español · Inglés" },
              ].map(({ Icon, label, val }) => (
                <div key={label} className="contact-card"
                  style={{ background: C.ink2, padding: "22px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
                  <span style={{ color: C.lime }}><Icon /></span>
                  <div>
                    <div style={{ fontFamily: MONO, fontSize: "0.66rem", color: C.mist, letterSpacing: "0.04em", marginBottom: 4 }}>{label}</div>
                    <div style={{ fontWeight: 700, color: C.snow, fontSize: "0.88rem" }}>{val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ borderTop: `1px solid ${C.border}` }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "22px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontWeight: 800, letterSpacing: "-0.02em" }}>sofía<span style={{ color: C.lime }}>.</span></span>
            <span style={{ fontFamily: MONO, fontSize: "0.65rem", color: C.mist }}>Diseñado y construido por mí · {new Date().getFullYear()}</span>
            <div style={{ display: "flex", gap: 20 }}>
              {[["GitHub", "https://github.com"], ["LinkedIn", "https://linkedin.com"]].map(([l, h]) => (
                <a key={l} href={h} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: MONO, fontSize: "0.66rem", color: C.mist, textDecoration: "none", transition: "color 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = C.lime)}
                  onMouseLeave={e => (e.currentTarget.style.color = C.mist)}>{l} ↗</a>
              ))}
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
