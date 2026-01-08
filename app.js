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
      body:
        "PLUMEE brings together researchers, engineers, and industry to explore advances spanning materials science, environmental sustainability, and electronics. The 2026 edition emphasizes cross-disciplinary solutions— from valorizing natural resources and recycling, to novel depollution materials and surface treatments, to energy storage and renewable technologies. We highlight nanomaterials and advanced electronic materials, embedded systems supporting ecological transition, and AI-driven optimization of materials and electronic systems. The program also welcomes work on electromagnetic interactions with living matter, along with a dedicated Romanian theme, reflecting our international collaboration and shared scientific priorities.",
    },
    themes: {
      heading: "Topics",
      kicker: "Cross-disciplinary focus",
      items: [
        { 
          title: "Valorization & Recycling", 
          desc: "Natural resources and waste recycling"
        },
        { 
          title: "Depollution Materials", 
          desc: "Catalysts, membranes, and adsorbents"
        },
        { 
          title: "Energy Solutions", 
          desc: "Storage and renewable energies"
        },
        { 
          title: "Surface Engineering", 
          desc: "Treatment and industrial impact"
        },
        { 
          title: "Nanomaterials", 
          desc: "Nanotechnologies and applications"
        },
        { 
          title: "Electronic Materials", 
          desc: "Advanced materials for electronics"
        },
        { 
          title: "Embedded Systems", 
          desc: "For ecological transition"
        },
        { 
          title: "AI & Optimization", 
          desc: "For materials and electronic systems"
        },
        { 
          title: "EM Waves", 
          desc: "Interaction with living matter"
        },
        { 
          title: "Romanian Theme", 
          desc: "Special focus session"
        },
      ],
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
      heading: "Organizers & Partners",
      kicker: "International collaboration",
      body:
        "PLUMEE 2026 is organized by UM6P (Benguerir), Université de Limoges, Université de Bacau, MSN, ENSIL-ENSCI, and Université Cadi Ayyad (Marrakech).",
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
      speakers: "Intervenants",
      registration: "Inscription",
      partners: "Organisateurs",
      venue: "Lieu",
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
      body:
        "PLUMEE réunit chercheurs, ingénieurs et industriels autour des avancées en science des matériaux, durabilité environnementale et électronique. L’édition 2026 met l’accent sur des solutions pluridisciplinaires — de la valorisation des ressources naturelles et du recyclage, aux matériaux de dépollution et traitements de surface, jusqu’au stockage de l’énergie et aux technologies renouvelables. Nous mettons en avant les nanomatériaux et les matériaux avancés pour l’électronique, les systèmes embarqués au service de la transition écologique, ainsi que l’optimisation par l’IA des matériaux et des systèmes électroniques. Le programme accueille aussi des travaux sur les interactions des ondes électromagnétiques avec le vivant, et propose une thématique roumaine, reflet d’une collaboration internationale et de priorités scientifiques partagées.",
    },
    themes: {
      heading: "Sujets",
      kicker: "Approche pluridisciplinaire",
      items: [
        { 
          title: "Valorisation & Recyclage", 
          desc: "Ressources naturelles et recyclage des déchets"
        },
        { 
          title: "Matériaux de Dépollution", 
          desc: "Catalyseurs, membranes et adsorbants"
        },
        { 
          title: "Solutions Énergétiques", 
          desc: "Stockage et énergies renouvelables"
        },
        { 
          title: "Ingénierie des Surfaces", 
          desc: "Traitement et impact industriel"
        },
        { 
          title: "Nanomatériaux", 
          desc: "Nanotechnologies et applications"
        },
        { 
          title: "Matériaux Électroniques", 
          desc: "Matériaux avancés pour l'électronique"
        },
        { 
          title: "Systèmes Embarqués", 
          desc: "Pour la transition écologique"
        },
        { 
          title: "IA & Optimisation", 
          desc: "Pour les matériaux et systèmes électroniques"
        },
        { 
          title: "Ondes Électromagnétiques", 
          desc: "Interaction avec le vivant"
        },
        { 
          title: "Thème Roumain", 
          desc: "Session spéciale"
        },
      ],
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
      heading: "Organisateurs & Partenaires",
      kicker: "Collaboration internationale",
      body:
        "PLUMEE 2026 est organisé par l’UM6P (Benguerir), l’Université de Limoges, l’Université de Bacau, MSN, ENSIL-ENSCI, et l’Université Cadi Ayyad (Marrakech).",
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
    const value = key.split(".").reduce((acc, k) => acc && acc[k], dict);
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

  // Rebuild topics section when language changes - DISABLED to preserve static content
  // const topicsContainer = $("#themes .topics-grid");
  // if (topicsContainer) {
  //   // Clear existing content
  //   topicsContainer.innerHTML = '';
  //   
  //   // Rebuild topics with current language
  //   dict.themes.items.forEach((item) => {
  //     const topicItem = document.createElement("div");
  //     topicItem.className = "topic-item";
  //     topicItem.innerHTML = `
  //       <h3 class="topic-title">${item.title}</h3>
  //       <p class="topic-desc">${item.desc}</p>
  //     `;
  //     topicsContainer.appendChild(topicItem);
  //   });
  // }

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
  $$(".lang-switch .chip").forEach(btn => {
    btn.addEventListener("click", () => {
      state.lang = btn.dataset.lang;
      localStorage.setItem("lang", state.lang);
      // Update html lang attribute
      document.documentElement.setAttribute("lang", state.lang === "fr" ? "fr" : "en");
      applyI18n();
    });
  });
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

  setupNav();
  setupReveal();
  setupLang();
  applyI18n();
  handleRegForm();
  setupCountdown();

  // Back-to-top smooth scroll (footer link already anchors)
});
