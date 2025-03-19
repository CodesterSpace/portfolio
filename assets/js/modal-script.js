document.querySelectorAll(".layer-link").forEach(link => {
  link.addEventListener("click", () => {
    const modalId = link.getAttribute("data-modal");
    document.getElementById(modalId).classList.add("show");
    document.getElementById("modal-overlay").style.display = "block";
    document.body.style.overflow = "hidden"; // Désactive le scroll
  });
});

document.querySelectorAll(".close-btn").forEach(button => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const modalId = button.getAttribute("data-close");
    document.getElementById(modalId).classList.remove("show");
    document.getElementById("modal-overlay").style.display = "none";
    document.body.style.overflow = "auto"; // Réactive le scroll
  });
});

document.getElementById("modal-overlay").addEventListener("click", () => {
  document.querySelectorAll(".modal__container").forEach(modal__container => modal__container.classList.remove("show"));
  document.getElementById("modal-overlay").style.display = "none";
  document.body.style.overflow = "auto"; // Réactive le scroll
});
