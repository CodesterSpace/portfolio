'use strict';



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * PRELOADER
 */

const preloader = document.querySelector("[data-preloader]");

window.addEventListener("DOMContentLoaded", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});


/**
 * Bouton Telechargement
 */

const downloadCvButton = document.getElementById("download-cv");

if (downloadCvButton) {
  downloadCvButton.addEventListener("click" , (event) => {
      event.preventDefault();
      // Ouvre le fichier PDF dans un nouvel onglet
      window.open('./assets/documents/Ibrahima-diallo-cv.pdf', '_blank');
  
      // Déclenche le téléchargement du fichier
      // const link = document.createElement('a');
      // // link.href = 'Ibrahima-diallo-cv.pdf';  // Chemin vers votre fichier PDF
      // // link.download = 'Ibrahima-diallo-cv.pdf';  // Nom du fichier téléchargé
      // link.click();
  });
}

/**
 * Bouton Open CV
 */
const modalTogglers = document.querySelectorAll("[data-modal-toggler]");
const openCvButton = document.getElementById("open-cv");
const cvContainer = document.getElementById("cv-modal");
const closeCvButton = document.getElementById("close-cv");
const cvOverlay = document.getElementById("cv-overlay");
const body = document.body;

const toggleModal = function () {
  const isHidden = cvContainer.classList.contains("hide");

  console.log("Toggle CV Modal");
    if (isHidden) {
        cvContainer.classList.remove("hide");
        cvContainer.style.display = "flex";
        cvOverlay.classList.add("active");
        body.style.overflow = "hidden"; // Empêche le défilement du corps lorsque le modal est ouvert
      } else {
        cvContainer.classList.add("hide");
        cvContainer.style.display = "none";
        cvOverlay.classList.remove("active");
        body.style.overflow = ""; // Rétablit le défilement du corps lorsque le modal est fermé
    }
}

addEventOnElements(modalTogglers, "click", toggleModal);

/**
 * NAVBAR
 * navbar toggle for mobile
 */

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  if (!navbar.classList.contains("active")) {
    // Si la classe "active" n'est pas présente, on l'ajoute
    navbar.classList.add("active");
    navToggleBtn.classList.add("active");
    overlay.classList.add("active");
    document.body.classList.add("nav-active");
  } else {
    // Si la classe "active" est déjà présente, on la supprime
    navbar.classList.remove("active");
    navToggleBtn.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("nav-active");
  }

}

addEventOnElements(navTogglers, "click", toggleNavbar);


// SWITCH MODE

document.addEventListener("DOMContentLoaded", function () {
  var toggleSwitch = document.getElementById("theme-toggle");
  var root = document.documentElement; // Accès à :root
  const logoImg = document.getElementById("logo-img");
  const BackToTopImg = document.getElementById("back-to-top-img");
  
  // Vérifie si le mode sombre est activé dans le localStorage
  if (localStorage.getItem("dark-mode") === "enabled" || localStorage.getItem("dark-mode") === null) {
    toggleSwitch.checked = true;
    setDarkMode(); // Applique le mode sombre
  } else if (localStorage.getItem("dark-mode") === "disabled") {
    toggleSwitch.checked = false;
    setLightMode(); // Applique le mode clair
    logoImg.style.filter = "invert(1)";  // Réinitialise l'inversion de couleur en mode clair
    BackToTopImg.style.filter = "invert(1)";  // Réinitialise l'inversion de couleur en mode clair
  }

  // Change le thème quand le switch est activé/désactivé
  toggleSwitch.addEventListener("change", function () {
    if (this.checked) {
      setDarkMode();
      localStorage.setItem("dark-mode", "enabled");
      logoImg.style.filter = "invert(0)";  // Inverse l'image en mode sombre
      BackToTopImg.style.filter = "invert(0)";  // Inverse l'image en mode sombre
      console.log('Mode sombre activé');
    } else {
      setLightMode();
      localStorage.setItem("dark-mode", "disabled");
      logoImg.style.filter = "invert(1)";  // Inverse l'image en mode clair
      BackToTopImg.style.filter = "invert(1)";  // Inverse l'image en mode clair
      console.log('Mode sombre désactivé');
    }
  });

  // Fonction pour activer le mode sombre
  function setDarkMode() {
    root.style.setProperty('--raisin-black', 'hsla(231, 10%, 14%, 1)');
    root.style.setProperty('--roman-silver', 'hsla(229, 10%, 57%, 1)');
    root.style.setProperty('--eerie-black', 'hsla(228, 9%, 10%, 1)');
    root.style.setProperty('--black', 'hsla(0, 0%, 0%, 1)');
    root.style.setProperty('--white', 'hsla(0, 0%, 100%, 1)');
    root.style.setProperty('--white-top', 'rgb(212, 212, 212)');
    root.style.setProperty('--white_a10', 'hsla(0, 0%, 100%, 0.1)');
    root.style.setProperty('--white_a5', 'hsla(0, 0%, 100%, 0.05)');
  }

  // Fonction pour activer le mode clair
  function setLightMode() {
    root.style.setProperty('--raisin-black', 'hsla(0, 0%, 100%, 1)');
    root.style.setProperty('--roman-silver', 'hsla(0, 0%, 50%, 1)');
    root.style.setProperty('--eerie-black', 'hsla(0, 0%, 95%, 1)');
    root.style.setProperty('--white', 'hsla(0, 0%, 0%, 1)');
    root.style.setProperty('--black', 'hsla(0, 0%, 100%, 1)');
    root.style.setProperty('--white-top', 'hsla(231, 10%, 14%, 1)');
    root.style.setProperty('--white_a10', 'hsla(0, 0%, 20%, 0.1)');
    root.style.setProperty('--white_a5', 'hsla(0, 0%, 20%, 0.05)');
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".navbar-link");

  links.forEach(link => {
    link.addEventListener("click", function () {
      // Retirer la classe active de tous les liens
      links.forEach(l => l.classList.remove("active"));
      
      // Ajouter la classe active au lien cliqué
      this.classList.add("active");
    });
  });
});

/**
 * HEADER
 * header active when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  const top = document.querySelector("[data-top]");
  if (window.scrollY >= 100) {
    header.classList.add("active");
    top.classList.add("active");
  } else {
    header.classList.remove("active");
    top.classList.remove("active");
  }
});

const layerlinks = document.querySelectorAll(".layer-link");
layerlinks.forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    // get the target's link href attribute
    const targetId = this.getAttribute("href").substring(1);
    if (targetId) {
      // open the link in a new tab
      window.open(this.getAttribute("href"), '_blank');
    }
  });
});


// const layerlinks = document.querySelectorAll(".layer-link");
// layerlinks.forEach(link => {
//   link.addEventListener("click", function (e) {
//     e.preventDefault();
//     // get the target section id from the link's href attribute
//     const targetId = this.getAttribute("href").substring(1);
//     const targetSection = document.getElementById(targetId);
//     if (targetSection) {
//       // scroll to the target section smoothly
//       targetSection.scrollIntoView({ behavior: "smooth" });
//     }
//   });
// });
