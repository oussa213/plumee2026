// Simple language switcher for registration page
let currentLang = localStorage.getItem('lang') || 'en';

// Translation strings
const translations = {
  en: {
    pageTitle: "Register for PLUMEE 2026",
    pageSubtitle: "Complete your registration to secure your spot at the 7th Multidisciplinary Colloquium – PLUMEE",
    backToHome: "Back to Home",
    downloadTemplate: "Download Abstract Template",
    templateDescription: "Use this template for your abstract submission (DOCX format)",
    formTitle: "Registration Form",
    formSubtitle: "Please fill in all required fields marked with *"
  },
  fr: {
    pageTitle: "Inscription à PLUMEE 2026",
    pageSubtitle: "Complétez votre inscription pour réserver votre place au 7ème Colloque Multidisciplinaire – PLUMEE",
    backToHome: "Retour à l'accueil",
    downloadTemplate: "Télécharger le Modèle de Résumé",
    templateDescription: "Utilisez ce modèle pour votre soumission de résumé (format DOCX)",
    formTitle: "Formulaire d'Inscription",
    formSubtitle: "Veuillez remplir tous les champs obligatoires marqués d'un *"
  }
};

function updateLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.setAttribute('lang', lang === 'fr' ? 'fr' : 'en');
  
  // Update page title
  const pageTitle = document.querySelector('.page-header h1');
  if (pageTitle) pageTitle.textContent = translations[lang].pageTitle;
  
  // Update page subtitle
  const pageSubtitle = document.querySelector('.page-header p');
  if (pageSubtitle) pageSubtitle.textContent = translations[lang].pageSubtitle;
  
  // Update back link
  const backLink = document.querySelector('.back-link');
  if (backLink) backLink.innerHTML = `<i class="fas fa-arrow-left"></i> ${translations[lang].backToHome}`;
  
  // Update template section
  const templateBtn = document.querySelector('.abstract-template-section .btn');
  if (templateBtn) templateBtn.innerHTML = `<i class="fas fa-download"></i> ${translations[lang].downloadTemplate}`;
  
  const templateDesc = document.querySelector('.abstract-template-section p');
  if (templateDesc) templateDesc.textContent = translations[lang].templateDescription;
  
  // Update form header
  const formTitle = document.querySelector('.form-header h2');
  if (formTitle) formTitle.textContent = translations[lang].formTitle;
  
  const formSubtitle = document.querySelector('.form-header p');
  if (formSubtitle) formSubtitle.innerHTML = translations[lang].formSubtitle.replace('*', '<span class="required">*</span>');
  
  // Update language buttons
  document.querySelectorAll('.lang-switch .chip').forEach(btn => {
    btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
  });
}

// Initialize language switcher
document.addEventListener('DOMContentLoaded', function() {
  // Set initial language
  updateLanguage(currentLang);
  
  // Add click handlers to language buttons
  document.querySelectorAll('.lang-switch .chip').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      updateLanguage(this.dataset.lang);
    });
  });
});
