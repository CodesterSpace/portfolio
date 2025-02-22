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

downloadButton.addEventListener("click", function() {
    // Ouvre le fichier PDF dans un nouvel onglet
    window.open('Ibrahima-diallo-cv.pdf', '_blank');

    // Déclenche le téléchargement du fichier
    const link = document.createElement('a');
    link.href = 'Ibrahima-diallo-cv.pdf';  // Chemin vers votre fichier PDF
    link.download = 'Ibrahima-diallo-cv.pdf';  // Nom du fichier téléchargé
    link.click();
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

/**
 * Defilement Auto
 */

let scrollInterval;
let direction = 1; // 1 pour bas, -1 pour haut

// Événement lorsque l'on active le défilement
document.getElementById("scrollOn").addEventListener("change", function() {
    if (this.checked) {
      toggleNavbar(); // Simule un clic sur les togglers de la navbar

        scrollInterval = setInterval(() => {
            window.scrollBy(0, 5 * direction); // Définit la vitesse du défilement

            // Vérifie si on atteint le bas
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                direction = -1; // Change de direction vers le haut
            }

            // Vérifie si on atteint le haut
            if (window.scrollY <= 0) {
                direction = 1; // Change de direction vers le bas
            }
        }, 20);
    }
});

// Événement lorsque l'on désactive le défilement
document.getElementById("scrollOff").addEventListener("change", function() {
    clearInterval(scrollInterval);
    toggleNavbar();
});

/**
 * HEADER
 * header active when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
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
