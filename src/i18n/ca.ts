import type { UiKey } from "./en";

export const ca: Record<UiKey, string> = {
  // Navbar (desktop)
  "nav.home": "Inici",
  "nav.about": "Sobre mi",
  "nav.portfolio": "Portafoli",
  "nav.experiments": "Experiments",
  "nav.writing": "Blog",

  // Mobile navbar
  "m.home": "Inici",
  "m.about": "Sobre mi",
  "m.work": "Feina",
  "m.lab": "Lab",
  "m.writing": "Blog",

  // Footer
  "footer.home": "Inici",
  "footer.work": "Feina",
  "footer.writing": "Blog",
  "footer.experiments": "Experiments",
  "footer.email": "Email",

  // Accessibility / controls
  "a11y.toggleTheme": "Canviar mode fosc",
  "a11y.switchLang": "Canviar idioma",

  // SEO
  "seo.home.title": "Desenvolupador frontend sènior a Barcelona | Pol Gubau",
  "seo.home.description":
    "Desenvolupador frontend sènior especialitzat en React, TypeScript i React Native. Creo productes web i mòbils accessibles i sistemes de disseny des de Barcelona.",

  // Home hero
  "home.hero.title": "Sóc en Pol, faig productes digitals",
  "home.hero.intro":
    'Fundador i director tècnic de <a href="https://doscientos.es" target="_blank" rel="noopener noreferrer" class="text-ink hover:underline underline-offset-4">Doscientos</a>.<br />Des de Mataró, Barcelona.',
  "home.stats.npm": "Descàrregues NPM",
  "home.stats.vercel": "Visites/any",
  "home.stats.years": "Anys d'experiència",
  "home.stats.projects": "Projectes entregats",

  // Home sections
  "home.work.title": "Projectes seleccionats",
  "home.viewAll": "Veure-ho tot",
  "home.side.title": "Projectes personals",
  "home.side.downloads": "descàrregues",
  "home.side.views": "visites",
  "home.github.title": "Activitat a GitHub",
  "home.github.contributions": "{count} contribucions aquest any",
  "home.github.profile": "Veure el perfil",
  "home.github.unavailable": "L'activitat de GitHub no està disponible en aquesta versió.",
  "home.github.day.one": "{count} contribució el {date}",
  "home.github.day.other": "{count} contribucions el {date}",
  "home.github.less": "Menys",
  "home.github.more": "Més",
  "home.beyond.title": "Més enllà del codi",
  "home.beyond.caption1": "Entrevistat a TV3 sobre la meva feina",
  "home.beyond.caption2": "Ensenyant Astro i Tailwind a més de 35 alumnes",
  "home.beyond.caption3": "Presentant Pol-UI com a Treball de Fi de Grau",
  "home.beyond.caption4": "Participant a Innoemprèn",
  "home.doscientos.title":
    "Necessites software a mida, fet per enginyers sènior?",
  "home.doscientos.body":
    'Vaig cofundar <strong class="text-secondary-50">Doscientos</strong>, un estudi de programari que converteix idees en productes en només sis setmanes.',
  "home.doscientos.stat1": "Productes publicats",
  "home.doscientos.stat2": "D'idea a llançament",
  "home.doscientos.stat2value": "6 setmanes",
  "home.doscientos.stat3": "El codi és teu",
  "home.doscientos.stat4": "Valoració clients",
  "home.doscientos.cta": "Visita Doscientos",
  "home.perf.title": "No publico webs lentes",
  "home.perf.subtitle":
    "100/100 a Lighthouse no és una fanfarronada, és el mínim.",

  // About page
  "about.role": "Senior Frontend Engineer · Mataró, Barcelona",
  "about.hero":
    'Combino l\'enginyeria frontend i el disseny de producte per crear productes digitals clars i accessibles. Soc Senior Frontend Engineer a <a href="https://mesalvo.com" class="text-ink hover:underline underline-offset-4" target="_blank" rel="noopener noreferrer">Mesalvo</a> i cofundador i CTO de <a href="https://doscientos.es" class="text-ink hover:underline underline-offset-4" target="_blank" rel="noopener noreferrer">Doscientos</a>.',
  "about.story.title": "La història fins ara",
  "about.story.p1":
    "Vaig començar en el disseny gràfic, creant identitats visuals per a startups i fotografiant cotxes per a concessionaris. Fer webs per a projectes propis em va acostar al desenvolupament i em va portar a aprendre a programar.",
  "about.story.p2":
    'Amb el temps vaig passar de crear webs amb WordPress a desenvolupar aplicacions React, i de projectes independents a una feina de frontend a temps complet a Mesalvo. El meu treball de fi de grau va donar lloc a <a href="/ca/projects/polui" class="text-ink underline underline-offset-4 hover:opacity-70">Pol-UI</a>, una llibreria React amb més de 150 components, 62k+ descàrregues a npm i una nota de 10/10 amb menció especial de la UAB.',
  "about.story.p3":
    'Després de graduar-me, em vaig traslladar a Alemanya per treballar més a prop de la seu de Mesalvo. Més tard vaig tornar a Espanya i vaig cofundar <a href="/ca/projects/doscientos" class="text-ink underline underline-offset-4 hover:opacity-70">Doscientos</a>, on lidero l\'enginyeria de la plataforma de producte de l\'estudi.',
  "about.stats.years": "Anys creant",
  "about.stats.npm": "descàrregues npm",
  "about.stats.components": "components React",
  "about.stats.projects": "Projectes publicats",
  "about.beyond.title": "Més enllà de la pantalla",
  "about.beyond.caption1": "Entrevistat a TV3 sobre tecnologia i disseny",
  "about.beyond.caption2": "Ensenyant Astro i Tailwind a més de 35 alumnes",
  "about.beyond.caption3": "Presentant Pol-UI, TFG amb 10/10 i menció especial",
  "about.currently.title": "Ara mateix",
  "about.currently.item1":
    'Senior Frontend Engineer a <strong class="text-ink font-medium">Mesalvo</strong>, on desenvolupo productes de salut que s\'utilitzen arreu d\'Europa',
  "about.currently.item2":
    'Cofundador i CTO de <strong class="text-ink font-medium">Doscientos</strong>; lidero l\'enginyeria de la plataforma de producte de l\'estudi',
  "about.currently.item3":
    'Desenvolupant <a href="/ca/projects/les-santes" class="text-ink underline underline-offset-4 hover:opacity-70">Les Santes</a>, una guia no oficial de la festa major de Mataró',
  "about.currently.item4": "A Mataró, Barcelona",
  "about.contact.title": "Parlem",
  "about.contact.body":
    "Obert a parlar d'oportunitats com a Senior Frontend Engineer i d'enginyeria de producte.",
  "about.contact.email": "Escriu-me",

  // About page - SEO meta
  "about.meta.title":
    "Sobre Pol Gubau | Senior Frontend Engineer",
  "about.meta.description":
    "Coneix Pol Gubau, Senior Frontend Engineer a Mataró, Barcelona. Desenvolupa productes de salut a Mesalvo i lidera l'enginyeria de producte a Doscientos, amb una trajectòria que combina frontend i disseny.",
  "about.meta.schema":
    "Senior Frontend Engineer a Mataró, Barcelona. Desenvolupa productes de salut a Mesalvo i lidera l'enginyeria de producte a Doscientos.",

  // UI experiments page
  "ui.heading": "Experiments",
  "ui.subtitle":
    "Components d'UI i animacions, interaccions, moviment i patrons creatius.",
  "ui.meta.title":
    "Experiments d'UI - Animacions i motion amb React per Pol Gubau",
  "ui.meta.description":
    "Experiments d'UI interactius i animacions fets amb React: microinteraccions, motion design i patrons creatius per Pol Gubau Amores.",

  // Blog index page
  "blog.heading": "Articles",
  "blog.subtitle": "Articles tècnics sobre desenvolupament web i disseny",
  "blog.notice": "Els articles estan escrits en anglès.",
  "blog.meta.title":
    "Blog - Articles de React, TypeScript i frontend per Pol Gubau",
  "blog.meta.description":
    "Articles tècnics sobre React, TypeScript, arquitectura frontend, rendiment i design systems per Pol Gubau Amores, Senior Frontend Engineer a Barcelona.",
  "blog.filter.all": "Tots",
  "blog.filter.empty": "Encara no hi ha articles amb aquesta etiqueta.",

  // Projects index page
  "projects.heading": "Projectes",
  "projects.subtitle":
    "Una selecció de feina en web, mòbil, open source i freelance.",
  "projects.similar": "Projectes similars",
  "projects.meta.title":
    "Projectes frontend de Pol Gubau | React i TypeScript",
  "projects.meta.description":
    "Selecció de projectes d'enginyeria frontend de Pol Gubau, desenvolupador sènior a Barcelona: productes React i TypeScript, apps mòbils, sistemes de disseny i interfícies accessibles.",
  "projects.status.inProgress": "En progrés",
  "projects.links.visit": "Visitar projecte",
  "projects.links.source": "Codi font",
  "projects.links.npm": "Paquet NPM",
  "projects.links.playstore": "Descarregar",
  "projects.links.live": "Web en directe",
  "projects.links.registry": "registre npm",
  "projects.links.googlePlay": "Google Play",
  "projects.links.links": "Enllaços",
  "bar.share": "Compartir",
  "bar.copied": "Copiat!",
  "bar.visitProject": "Visitar projecte",
  "stats.npmTooltip": "descàrregues npm",
  "stats.vercelTooltip": "peticions en projectes de Vercel",
};
