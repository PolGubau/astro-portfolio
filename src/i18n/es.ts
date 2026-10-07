import type { UiKey } from "./en";

export const es: Record<UiKey, string> = {
  // Navbar (desktop)
  "nav.home": "Inicio",
  "nav.about": "Sobre mí",
  "nav.portfolio": "Portfolio",
  "nav.experiments": "Experimentos",
  "nav.writing": "Blog",

  // Mobile navbar
  "m.home": "Inicio",
  "m.about": "Sobre mí",
  "m.work": "Trabajo",
  "m.lab": "Lab",
  "m.writing": "Blog",

  // Footer
  "footer.home": "Inicio",
  "footer.work": "Trabajo",
  "footer.writing": "Blog",
  "footer.experiments": "Experimentos",
  "footer.email": "Email",

  // Accessibility / controls
  "a11y.toggleTheme": "Cambiar modo oscuro",
  "a11y.switchLang": "Cambiar idioma",

  // SEO
  "seo.home.title": "Desarrollador frontend senior en Barcelona | Pol Gubau",
  "seo.home.description":
    "Desarrollador frontend senior especializado en React, TypeScript y React Native. Creo productos web y móviles accesibles y sistemas de diseño desde Barcelona.",

  // Home hero
  "home.hero.title": "Soy Pol, construyo productos digitales",
  "home.hero.intro":
    'Fundador y director técnico de <a href="https://doscientos.es" target="_blank" rel="noopener noreferrer" class="text-ink hover:underline underline-offset-4">Doscientos</a>.<br />En Matar\u00f3, Barcelona.',
  "home.stats.npm": "Descargas NPM",
  "home.stats.vercel": "Visitas/año",
  "home.stats.years": "Años de experiencia",
  "home.stats.projects": "Proyectos entregados",

  // Home sections
  "home.work.title": "Proyectos recientes",
  "home.viewAll": "Ver todo",
  "home.side.title": "Proyectos personales",
  "home.side.downloads": "descargas",
  "home.side.views": "visitas",
  "home.github.title": "Actividad en GitHub",
  "home.github.contributions": "{count} contribuciones este año",
  "home.github.profile": "Ver perfil",
  "home.github.unavailable": "La actividad de GitHub no está disponible en esta versión.",
  "home.github.day.one": "{count} contribución el {date}",
  "home.github.day.other": "{count} contribuciones el {date}",
  "home.github.less": "Menos",
  "home.github.more": "Más",
  "home.beyond.title": "Más allá del código",
  "home.beyond.caption1": "Entrevistado en TV3 sobre mi trabajo",
  "home.beyond.caption2": "Enseñando Astro y Tailwind a más de 35 alumnos",
  "home.beyond.caption3": "Presentando Pol-UI como Trabajo de Fin de Grado",
  "home.beyond.caption4": "Participando en Innoemprèn",
  "home.doscientos.title":
    "¿Necesitas software a medida, hecho por ingenieros senior?",
  "home.doscientos.body":
    'Cofundé <strong class="text-secondary-50">Doscientos</strong>, un estudio de software que convierte ideas en productos en seis semanas.',
  "home.doscientos.stat1": "Productos publicados",
  "home.doscientos.stat2": "De idea a lanzamiento",
  "home.doscientos.stat2value": "6 semanas",
  "home.doscientos.stat3": "El código es tuyo",
  "home.doscientos.stat4": "Valoración clientes",
  "home.doscientos.cta": "Visita Doscientos",
  "home.perf.title": "No publico webs lentas",
  "home.perf.subtitle": "100/100 en Lighthouse no es un alarde, es el mínimo.",

  // About page
  "about.role": "Senior Frontend Engineer · Matar\u00f3, Barcelona",
  "about.hero":
    'Combino la ingeniería frontend y el diseño de producto para crear productos digitales claros y accesibles. Soy Senior Frontend Engineer en <a href="https://mesalvo.com" class="text-ink hover:underline underline-offset-4" target="_blank" rel="noopener noreferrer">Mesalvo</a> y cofundador y CTO de <a href="https://doscientos.es" class="text-ink hover:underline underline-offset-4" target="_blank" rel="noopener noreferrer">Doscientos</a>.',
  "about.story.title": "La historia hasta ahora",
  "about.story.p1":
    "Empecé en diseño gráfico, creando identidades visuales para startups y fotografiando coches para concesionarios. Al hacer webs para proyectos propios, me interesé por el desarrollo y aprendí a programar.",
  "about.story.p2":
    'Con el tiempo pasé de crear webs con WordPress a desarrollar aplicaciones con React, y de proyectos independientes a un puesto de frontend a tiempo completo en Mesalvo. Mi trabajo de fin de grado dio lugar a <a href="/es/projects/polui" class="text-ink underline underline-offset-4 hover:opacity-70">Pol-UI</a>, una librería React con más de 150 componentes, 62k+ descargas en npm y una nota de 10/10 con mención especial de la UAB.',
  "about.story.p3":
    'Tras graduarme, me trasladé a Alemania para trabajar más cerca de la sede de Mesalvo. Más tarde volví a España y cofundé <a href="/es/projects/doscientos" class="text-ink underline underline-offset-4 hover:opacity-70">Doscientos</a>, donde lidero la ingeniería de la plataforma de producto del estudio.',
  "about.stats.years": "Años creando",
  "about.stats.npm": "descargas npm",
  "about.stats.components": "componentes React",
  "about.stats.projects": "Proyectos publicados",
  "about.beyond.title": "Más allá de la pantalla",
  "about.beyond.caption1": "Entrevistado en TV3 sobre tecnología y diseño",
  "about.beyond.caption2": "Enseñando Astro y Tailwind a más de 35 alumnos",
  "about.beyond.caption3": "Presentando Pol-UI, TFG con 10/10 y mención especial",
  "about.currently.title": "Ahora mismo",
  "about.currently.item1":
    'Senior Frontend Engineer en <strong class="text-ink font-medium">Mesalvo</strong>, donde desarrollo productos de salud utilizados en toda Europa',
  "about.currently.item2":
    'Cofundador y CTO de <strong class="text-ink font-medium">Doscientos</strong>; lidero la ingeniería de la plataforma de producto del estudio',
  "about.currently.item3":
    'Desarrollando <a href="/es/projects/les-santes" class="text-ink underline underline-offset-4 hover:opacity-70">Les Santes</a>, una guía no oficial de la fiesta mayor de Matar\u00f3',
  "about.currently.item4": "En Matar\u00f3, Barcelona",
  "about.contact.title": "Hablemos",
  "about.contact.body":
    "Abierto a conversar sobre oportunidades como Senior Frontend Engineer e ingeniería de producto.",
  "about.contact.email": "Escríbeme",

  // About page - SEO meta
  "about.meta.title":
    "Sobre Pol Gubau | Senior Frontend Engineer",
  "about.meta.description":
    "Conoce a Pol Gubau, Senior Frontend Engineer en Mataró, Barcelona. Desarrolla productos de salud en Mesalvo y lidera la ingeniería de producto en Doscientos, con una trayectoria que combina frontend y diseño.",
  "about.meta.schema":
    "Senior Frontend Engineer en Mataró, Barcelona. Desarrolla productos de salud en Mesalvo y lidera la ingeniería de producto en Doscientos.",

  // UI experiments page
  "ui.heading": "Experimentos",
  "ui.subtitle":
    "Componentes de UI y animaciones, interacciones, movimiento y patrones creativos.",
  "ui.meta.title":
    "Experimentos de UI - Animaciones y motion con React por Pol Gubau",
  "ui.meta.description":
    "Experimentos de UI interactivos y animaciones hechos con React: microinteracciones, motion design y patrones creativos por Pol Gubau Amores.",

  // Blog index page
  "blog.heading": "Artículos",
  "blog.subtitle": "Artículos técnicos sobre desarrollo web y diseño",
  "blog.notice": "Los artículos están escritos en inglés.",
  "blog.meta.title":
    "Blog - Artículos de React, TypeScript y frontend por Pol Gubau",
  "blog.meta.description":
    "Artículos técnicos sobre React, TypeScript, arquitectura frontend, rendimiento y design systems por Pol Gubau Amores, Senior Frontend Engineer en Barcelona.",
  "blog.filter.all": "Todos",
  "blog.filter.empty": "Todavía no hay artículos con esta etiqueta.",

  // Projects index page
  "projects.heading": "Proyectos",
  "projects.subtitle":
    "Una selección de trabajo en web, móvil, open source y freelance.",
  "projects.notice": "El detalle de los proyectos está en inglés.",
  "projects.similar": "Proyectos similares",
  "projects.meta.title":
    "Proyectos frontend de Pol Gubau | React y TypeScript",
  "projects.meta.description":
    "Selección de proyectos de ingeniería frontend de Pol Gubau, desarrollador senior en Barcelona: productos React y TypeScript, apps móviles, sistemas de diseño e interfaces accesibles.",
  "projects.status.inProgress": "En progreso",
  "projects.links.visit": "Visitar proyecto",
  "projects.links.source": "Ver código",
  "projects.links.npm": "Paquete NPM",
  "projects.links.playstore": "Descargar",
  "projects.links.live": "Sitio web",
  "projects.links.registry": "registro npm",
  "projects.links.googlePlay": "Google Play",
  "projects.links.links": "Enlaces",
  "bar.share": "Compartir",
  "bar.copied": "¡Copiado!",
  "bar.visitProject": "Visitar proyecto",
  "stats.npmTooltip": "descargas npm",
  "stats.vercelTooltip": "peticiones en proyectos de Vercel",
};
