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

const downloadButton = document.getElementById("cv");

downloadButton.addEventListener("click" , (event) => {
    event.preventDefault();
    // Ouvre le fichier PDF dans un nouvel onglet
    window.open('Ibrahima-diallo-cv.pdf', '_blank');

    // Déclenche le téléchargement du fichier
    // const link = document.createElement('a');
    // // link.href = 'Ibrahima-diallo-cv.pdf';  // Chemin vers votre fichier PDF
    // // link.download = 'Ibrahima-diallo-cv.pdf';  // Nom du fichier téléchargé
    // link.click();
});


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



/**
 * SLIDER
 */

const sliders = document.querySelectorAll("[data-slider]");

const initSlider = function (currentSlider) {

  const sliderContainer = currentSlider.querySelector("[data-slider-container]");
  const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]");
  const sliderNextBtn = currentSlider.querySelector("[data-slider-next]");

  let totalSliderVisibleItems = Number(getComputedStyle(currentSlider).getPropertyValue("--slider-items"));
  let totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

  let currentSlidePos = 0;

  const moveSliderItem = function () {
    sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
  }

  /**
   * NEXT SLIDE
   */
  const slideNext = function () {
    const slideEnd = currentSlidePos >= totalSlidableItems;

    if (slideEnd) {
      currentSlidePos = 0;
    } else {
      currentSlidePos++;
    }

    moveSliderItem();
  }

  sliderNextBtn.addEventListener("click", slideNext);

  /**
   * PREVIOUS SLIDE
   */
  const slidePrev = function () {
    if (currentSlidePos <= 0) {
      currentSlidePos = totalSlidableItems;
    } else {
      currentSlidePos--;
    }

    moveSliderItem();
  }

  sliderPrevBtn.addEventListener("click", slidePrev);

  const dontHaveExtraItem = totalSlidableItems <= 0;
  if (dontHaveExtraItem) {
    sliderNextBtn.style.display = 'none';
    sliderPrevBtn.style.display = 'none';
  }

  /**
   * slide with [shift + mouse wheel]
   */

  currentSlider.addEventListener("wheel", function (event) {
    if (event.shiftKey && event.deltaY > 0) slideNext();
    if (event.shiftKey && event.deltaY < 0) slidePrev();
  });

  /**
   * RESPONSIVE
   */

  window.addEventListener("resize", function () {
    totalSliderVisibleItems = Number(getComputedStyle(currentSlider).getPropertyValue("--slider-items"));
    totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

    moveSliderItem();
  });

}

for (let i = 0, len = sliders.length; i < len; i++) { initSlider(sliders[i]); }
