/* =========
  i18n strings (EN/FR)
=========== */
const STRINGS = {
  en: {
    brand: { kicker: "PLUMEE 2026", title: "7th Multidisciplinary Colloquium" },
    nav: {
      about: "About",
      themes: "Topics",
      program: "Program",
      speakers: "Speakers",
      registration: "Registration",
      partners: "Organizers",
      venue: "Venue",
      importantDates: "Important Dates",
      contact: "Contact",
    },
    hero: {
      kicker: "Materials · Environment · Electronics",
      title: "7th Multidisciplinary Colloquium – PLUMEE",
      meta: "21–23 April 2026 · UM6P, Benguerir, Morocco",
      ctaThemes: "View Themes",
      ctaRegister: "Register Now",
    },
    about: {
      heading: "About the Colloquium",
      kicker: "Why PLUMEE 2026",
      body: "PLUMEE 2026 brings together leading researchers, engineers, and industry professionals from around the world to explore the latest advances in materials, environment, and electronics. This 7th Multidisciplinary Colloquium serves as a platform for knowledge exchange, collaboration, and innovation across these interconnected fields.",
    },
    themes: {
      heading: "Topics",
      kicker: "Cross-disciplinary focus",
      items: [
        { title: "Natural Resources and Waste Recycling", desc: "Valorization of natural resources and waste recycling" },
        { title: "Materials for Depollution", desc: "Catalysts, membranes, and adsorbents" },
        { title: "Energy Storage and Renewable Energy", desc: "Advanced solutions for energy storage and renewable sources" },
        { title: "Surface Treatment", desc: "Industrial surface treatment and environmental impact" },
        { title: "Nanomaterials and Nanotechnologies", desc: "Advanced nanomaterials and their applications" },
        { title: "Advanced Materials for Electronics", desc: "Innovative materials for electronic applications" },
        { title: "Embedded Systems for Ecological Transition", desc: "Embedded solutions for sustainable development" },
        { title: "AI for Materials and Electronic Systems", desc: "Artificial intelligence applications in materials optimization" },
        { title: "EM Waves and Living Matter", desc: "Interaction between electromagnetic waves and biological systems" },
        { title: "Embedded Systems and Cybersecurity", desc: "Applications based on embedded systems, cybersecurity, and AI integration" },
        { title: "Other", desc: "Other topics not listed above" }
      ]
    },
    program: {
      heading: "Program",
      kicker: "At a glance",
      notice:
        "Detailed schedule coming soon: keynotes, parallel sessions, posters, and industry panels.",
      items: {
        d1i1: "Registration & welcome coffee",
        d1i2: "Opening & keynote",
        d1i3: "Parallel sessions A",
        d2i1: "Keynotes & panels",
        d2i2: "Poster session",
        d2i3: "Industry roundtables",
        d3i1: "Parallel sessions B",
        d3i2: "Closing remarks",
        d3i3: "Networking",
      },
    },
    speakers: {
      heading: "Keynote Speakers",
      kicker: "Distinguished Experts in Their Fields",
      tag: { invited: "Invited", panel: "Panel", keynote: "Keynote" },
      alamy: {
        name: "Pr. Jones ALAMI",
        title: "UM6P Vice President",
        affiliation: "Director of Research and Global Scientific Engagement",
        topic: "Topic: Advanced Materials"
      },
      rossignol: {
        name: "Dr. Fabrice ROSSIGNOL",
        title: "CNRS Research Director",
        affiliation: "CNRS, France",
        topic: "Topic: AI and Materials"
      }
    },
    reg: { heading: "Registration", kicker: "Secure your seat" },
    form: {
      firstName: "First Name",
      lastName: "Last Name",
      affiliation: "Affiliation / Institution",
      country: "Country",
      role: { label: "Role", placeholder: "Select...", student: "Student", researcher: "Researcher", industry: "Industry", other: "Other" },
      participation: "Participation",
      poster: { label: "Presentation", y: "Poster: Yes", n: "Poster: No" },
      dietary: "Dietary needs (optional)",
      consent: "I consent to the processing of my data for event organization.",
      privacy: "We store your data securely and only for PLUMEE 2026 logistics.",
      submit: "Submit registration",
      success: "Thank you! Your registration has been received. A JSON summary has been downloaded.",
      errors: {
        required: "Please fill out all required fields.",
        email: "Please enter a valid email address.",
        consent: "Please provide consent to proceed.",
      },
    },
    org: {
      heading: "Scientific Committee",
      kicker: "International collaboration",
      body:
        "PLUMEE 2026 is organized by UM6P (Benguerir), Université de Limoges, Université de Bacau, MSN, ENSIL-ENSCI, and Université Cadi Ayyad (Marrakech).",
    },
    importantDates: {
      heading: "Important Dates",
      kicker: "Mark your calendar",
      mainEvent: "Main Conference",
      conferenceDate: "21-23 April 2026",
      conferenceTitle: "PLUMEE 2026 Conference",
      conferenceDesc: "Join us in Benguerir for three days of innovation and collaboration in Materials, Environment, and Electronics.",
      day1: "Day 1",
      day2: "Day 2",
      day3: "Day 3",
      timeline: [
        {
          date: "January 16, 2026",
          title: "Paper Submission Deadline",
          desc: "Last day to submit your research papers for consideration."
        },
        {
          date: "February 16, 2026",
          title: "Notification of Acceptance",
          desc: "Authors will be notified about the status of their submissions."
        },
        {
          date: "February 02 - March 31, 2026",
          title: "Registration Period",
          desc: "Register during this period to secure your participation in PLUMEE 2026."
        },
        {
          date: "April 21-23, 2026",
          title: "PLUMEE 2026 Conference",
          desc: "Join us for three days of scientific presentations and networking."
        }
      ]
    },
    venue: {
      heading: "Venue",
      kicker: "UM6P · Benguerir, Morocco",
      body:
        "The colloquium takes place at Université Mohammed VI Polytechnique (UM6P), a modern campus in Benguerir fostering innovation across science and engineering. Practical information on travel and lodging will be shared here.",
      mapLabel: "Map coming soon",
      travel: {
        air: "Nearest airport:",
        accom: "Accommodation:",
        accomTxt: "Hotel options coming soon",
        access: "Access:",
        accessTxt: "Shuttle and train information to be announced",
      },
    },
    contact: {
      heading: "Contact",
      kicker: "We’re here to help",
      form: {
        name: "Name",
        msg: "Message",
        consent: "I agree to be contacted regarding PLUMEE 2026.",
        submit: "Send message",
        success: "Thank you! Your message has been sent (demo). A JSON copy has been downloaded.",
        errors: {
          required: "Please complete all required fields.",
          email: "Please enter a valid email address.",
          consent: "Please accept to be contacted.",
        },
      },
      aside: {
        heading: "Direct contacts",
        note: "Use the form for general inquiries. We aim to reply within 2–3 business days.",
      },
    },
    footer: { tag: "Built for PLUMEE 2026", top: "Back to top ↑" },
    countdown: {
      days: "Days",
      hours: "Hours", 
      minutes: "Minutes",
      seconds: "Seconds"
    },
  },

  fr: {
    brand: { kicker: "PLUMEE 2026", title: "7ᵉ Colloque Pluridisciplinaire" },
    nav: {
      about: "À propos",
      themes: "Sujets",
      program: "Programme",
      speakers: "Conférenciers",
      registration: "Inscription",
      partners: "Organisateurs",
      venue: "Lieu",
      importantDates: "Dates importantes",
      contact: "Contact",
    },
    hero: {
      kicker: "Matériaux · Environnement · Électronique",
      title: "7ᵉ Colloque Pluridisciplinaire – PLUMEE",
      meta: "21–23 avril 2026 · UM6P, Benguerir, Maroc",
      ctaThemes: "Découvrir les thématiques",
      ctaRegister: "S’inscrire",
    },
    about: {
      heading: "À propos du colloque",
      kicker: "Pourquoi PLUMEE 2026",
      body: "PLUMEE est un colloque unique qui favorise les échanges et renforce les liens entre les différentes communautés scientifiques francophones dans les domaines des Matériaux, l'Environnement et l'Électronique.",
    },
    themes: {
      heading: "Sujets",
      kicker: "Approche pluridisciplinaire",
      items: [
        { title: "Valorisation des ressources naturelles et recyclage des déchets", desc: "Valorisation des ressources naturelles et recyclage des déchets" },
        { title: "Matériaux pour la dépollution", desc: "Catalyseurs, membranes, adsorbants" },
        { title: "Stockage d'énergie et énergies renouvelables", desc: "Solutions avancées pour le stockage d'énergie et les sources renouvelables" },
        { title: "Traitement de surface", desc: "Traitement de surface industriel et impact environnemental" },
        { title: "Nanomatériaux et nanotechnologies", desc: "Nanomatériaux avancés et leurs applications" },
        { title: "Matériaux avancés pour l'électronique", desc: "Matériaux innovants pour applications électroniques" },
        { title: "Systèmes embarqués pour la transition écologique", desc: "Solutions embarquées pour le développement durable" },
        { title: "IA appliquée à l'optimisation des matériaux", desc: "Applications de l'intelligence artificielle dans l'optimisation des matériaux" },
        { title: "Interaction ondes électromagnétiques et matières vivantes", desc: "Interaction entre les ondes électromagnétiques et les systèmes biologiques" },
        { title: "Applications basées sur les systèmes embarqués", desc: "Systèmes intégrant cybersécurité, intelligence artificielle et sources d'énergie" },
        { title: "Autre", desc: "Autres thèmes non listés ci-dessus" }
      ]
    },
    program: {
      heading: "Programme",
      kicker: "En bref",
      notice:
        "Programme détaillé à venir : conférences plénières, sessions parallèles, posters et tables rondes industrielles.",
      items: {
        d1i1: "Accueil & café",
        d1i2: "Ouverture & conférence plénière",
        d1i3: "Sessions parallèles A",
        d2i1: "Plénières & tables rondes",
        d2i2: "Session posters",
        d2i3: "Tables rondes industrielles",
        d3i1: "Sessions parallèles B",
        d3i2: "Clôture",
        d3i3: "Networking",
      },
    },
    speakers: {
      heading: "Conférenciers Invités",
      kicker: "Experts Éminents dans Leurs Domaines",
      tag: { invited: "Invitée", panel: "Table ronde", keynote: "Conférence" },
      alamy: {
        name: "Pr. Jones ALAMI",
        title: "Vice-Président de l'UM6P",
        affiliation: "Directeur de la Recherche et de l'Engagement Scientifique Mondial",
        topic: "Thème: Matériaux avancés"
      },
      rossignol: {
        name: "Dr. Fabrice ROSSIGNOL",
        title: "Directeur de Recherche CNRS",
        affiliation: "CNRS, France",
        topic: "Thème: IA et Matériaux"
      }
    },
    reg: { heading: "Inscription", kicker: "Réservez votre place" },
    form: {
      firstName: "Prénom",
      lastName: "Nom",
      affiliation: "Affiliation / Institution",
      country: "Pays",
      role: { label: "Rôle", placeholder: "Sélectionner…", student: "Étudiant", researcher: "Chercheur", industry: "Industrie", other: "Autre" },
      participation: "Participation",
      poster: { label: "Présentation", y: "Poster : Oui", n: "Poster : Non" },
      dietary: "Régimes alimentaires (optionnel)",
      consent: "Je consens au traitement de mes données pour l’organisation de l’événement.",
      privacy: "Nous stockons vos données de manière sécurisée et uniquement pour PLUMEE 2026.",
      submit: "Envoyer l’inscription",
      success: "Merci ! Votre inscription a été reçue. Un fichier JSON a été téléchargé.",
      errors: {
        required: "Veuillez remplir tous les champs obligatoires.",
        email: "Veuillez saisir une adresse email valide.",
        consent: "Veuillez donner votre consentement pour continuer.",
      },
    },
    org: {
      heading: "Comité scientifique",
      kicker: "Collaboration internationale",
      body:
        "PLUMEE 2026 est organisé par l’UM6P (Benguerir), l’Université de Limoges, l’Université de Bacau, MSN, ENSIL-ENSCI, et l’Université Cadi Ayyad (Marrakech).",
    },
    importantDates: {
      heading: "Dates importantes",
      kicker: "Marquez vos calendriers",
      mainEvent: "Conférence Principale",
      conferenceDate: "21-23 Avril 2026",
      conferenceTitle: "Colloque PLUMEE 2026",
      conferenceDesc: "Rejoignez-nous à Benguerir pour trois jours d'innovation et de collaboration dans les domaines des Matériaux, de l'Environnement et de l'Électronique.",
      day1: "Jour 1",
      day2: "Jour 2",
      day3: "Jour 3",
      timeline: [
        {
          date: "16 Janvier 2026",
          title: "Date limite de soumission des articles",
          desc: "Dernier jour pour soumettre vos articles de recherche."
        },
        {
          date: "16 Février 2026",
          title: "Notification d'acceptation",
          desc: "Les auteurs seront informés du statut de leurs soumissions."
        },
        {
          date: "02 Février - 31 Mars 2026",
          title: "Période d'inscription",
          desc: "Inscrivez-vous pendant cette période pour assurer votre participation à PLUMEE 2026."
        },
        {
          date: "21-23 Avril 2026",
          title: "Colloque PLUMEE 2026",
          desc: "Rejoignez-nous pour trois jours de présentations scientifiques et de réseautage."
        }
      ]
    },
    venue: {
      heading: "Lieu",
      kicker: "UM6P · Benguerir, Maroc",
      body:
        "Le colloque se tient à l'Université Mohammed VI Polytechnique (UM6P), campus moderne à Benguerir, dédié à l'innovation en science et ingénierie. Les informations pratiques sur le voyage et l'hébergement seront partagées ici.",
      mapLabel: "Carte à venir",
      travel: {
        air: "Aéroport le plus proche :",
        accom: "Hébergement :",
        accomTxt: "Options d'hôtels à venir",
        access: "Accès :",
        accessTxt: "Navettes et trains annoncés prochainement",
      },
    },
    contact: {
      heading: "Contact",
      kicker: "Nous sommes à votre écoute",
      form: {
        name: "Nom",
        msg: "Message",
        consent: "J’accepte d’être contacté au sujet de PLUMEE 2026.",
        submit: "Envoyer le message",
        success: "Merci ! Votre message a été envoyé (démo). Une copie JSON a été téléchargée.",
        errors: {
          required: "Veuillez compléter tous les champs obligatoires.",
          email: "Veuillez saisir une adresse email valide.",
          consent: "Veuillez accepter d’être contacté.",
        },
      },
      aside: {
        heading: "Contacts directs",
        note: "Utilisez le formulaire pour les demandes générales. Réponse sous 2–3 jours ouvrés.",
      },
    },
    footer: { tag: "Créé pour PLUMEE 2026", top: "Haut de page ↑" },
    countdown: {
      days: "Jours",
      hours: "Heures",
      minutes: "Minutes", 
      seconds: "Secondes"
    },
  },
};

const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];

const state = {
  lang: localStorage.getItem("lang") || "en",
};

/* =========
  i18n apply
=========== */
function applyI18n() {
  const dict = STRINGS[state.lang];

  // Update html lang attribute
  document.documentElement.setAttribute("lang", state.lang);

  // data-i18n replacements for all elements with data-i18n attribute
  $$("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    // Handle array indices in keys (e.g., timeline[0].date)
    const value = key.split(/[\[\].]/).reduce((acc, k) => {
      if (k === '') return acc; // Skip empty segments from split
      return acc && acc[k];
    }, dict);
    if (typeof value === "string") el.textContent = value;
    else if (value !== undefined) console.warn(`Missing translation for key: ${key}`);
  });

  // Update form placeholders and other attributes
  $$("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    const value = key.split(".").reduce((acc, k) => acc && acc[k], dict);
    if (typeof value === "string") el.placeholder = value;
  });

  // Update aria-labels
  $$("[data-i18n-aria]").forEach(el => {
    const key = el.getAttribute("data-i18n-aria");
    const value = key.split(".").reduce((acc, k) => acc && acc[k], dict);
    if (typeof value === "string") el.setAttribute("aria-label", value);
  });

  // Update aria-pressed on language chips
  $$(".lang-switch .chip").forEach(btn => btn.setAttribute("aria-pressed", String(btn.dataset.lang === state.lang)));
}

/* =========
  Nav / UX
=========== */
function setupNav() {
  const toggle = $(".nav-toggle");
  const menu = $("#navMenu");
  toggle?.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  // Active section highlight
  const links = $$("#navMenu a");
  const sections = links.map(a => $(a.getAttribute("href")));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const idx = sections.indexOf(entry.target);
      if (idx >= 0 && entry.isIntersecting) {
        links.forEach(l => l.classList.remove("active"));
        links[idx].classList.add("active");
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });
  sections.forEach(s => s && observer.observe(s));

  // Smooth close menu on nav click (mobile)
  links.forEach(a => a.addEventListener("click", () => menu.classList.remove("open")));
}

/* =========
  Reveal animations
=========== */
function setupReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  $$(".reveal").forEach(el => obs.observe(el));
}

/* =========
  Language switching
=========== */
function setupLang() {
  // Update active state of language buttons
  const updateActiveState = () => {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const isActive = btn.dataset.lang === state.lang;
      btn.setAttribute('aria-pressed', isActive);
      btn.classList.toggle('active', isActive);
    });
  };

  // Set initial language from localStorage or default to 'en'
  state.lang = localStorage.getItem("lang") || 'en';
  document.documentElement.setAttribute("lang", state.lang);
  
  // Set up click handlers for language buttons
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      state.lang = btn.dataset.lang;
      localStorage.setItem("lang", state.lang);
      document.documentElement.setAttribute("lang", state.lang);
      updateActiveState();
      applyI18n();
    });
  });

  // Initialize active state
  updateActiveState();
}

/* =========
  Form helpers
=========== */
function validateEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

function handleRegForm() {
  const form = $("#regForm");
  if (!form) return;
  const status = form.querySelector(".form-status");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const t = STRINGS[state.lang].form;
    const fd = new FormData(form);

    // Required: firstName, lastName, email, affiliation, country, role, consent
    const required = ["firstName","lastName","email","affiliation","country","role","consent"];
    const missing = required.some(name => {
      if (name === "consent") return !form.elements["consent"].checked;
      const val = (fd.get(name) || "").toString().trim();
      return !val;
    });
    if (missing){ status.textContent = t.errors.required; return; }
    if (!validateEmail(fd.get("email"))){ status.textContent = t.errors.email; return; }
    if (!form.elements["consent"].checked){ status.textContent = t.errors.consent; return; }

    const data = Object.fromEntries(fd.entries());
    ["day1","day2","day3"].forEach(d => data[d] = form.elements[d].checked);
    data.lang = state.lang;
    data.timestamp = new Date().toISOString();

    // Download JSON summary
    const blob = new Blob([JSON.stringify(data, null, 2)], {type:"application/json"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `PLUMEE2026_registration_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(a.href);

    status.textContent = t.success;

    // TODO: Connect to backend endpoint
    // fetch("/api/register", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(data) })
    //   .then(r => r.ok ? r.json() : Promise.reject(r.statusText))
    //   .catch(console.error);

    form.reset();
  });
}


/* =========
  Countdown
=========== */
function setupCountdown() {
  const conferenceDate = new Date('2026-04-21T09:00:00').getTime();
  
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = conferenceDate - now;
    
    if (distance < 0) {
      document.getElementById('countdown').innerHTML = '<div class="countdown-item"><span class="countdown-number">Event Started!</span></div>';
      return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days.toString().padStart(3, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
  }
  
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/* =========
  Boot
=========== */
document.addEventListener("DOMContentLoaded", () => {
  // Apply saved lang to <html>
  document.documentElement.setAttribute("lang", state.lang === "fr" ? "fr" : "en");

  // Initialize language button states
  $$(".lang-switch .chip").forEach(btn => btn.setAttribute("aria-pressed", String(btn.dataset.lang === state.lang)));

  setupNav();
  setupReveal();
  setupLang();
  applyI18n();
  handleRegForm();
  setupCountdown();

  // Back-to-top smooth scroll (footer link already anchors)
});
