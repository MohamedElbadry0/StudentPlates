document.addEventListener("DOMContentLoaded", () => {
  // === Mobile Menu ===
  const menuToggle = document.getElementById("mobile-menu");
  const navLinks = document.querySelector(".nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // === Animate Underline on Page Load ===
  window.addEventListener("load", () => {
    const heroTitle = document.querySelector(".hero-text");
    if (heroTitle) {
      heroTitle.classList.add("animate-underline");
    }
  });

  // === Carousel Setup ===
  const carouselCards = document.querySelectorAll(".carousel-item");
  let currentSlide = 2;

  const prevButton = document.getElementById("prevBtn");
  const nextButton = document.getElementById("nextBtn");

  function refreshCarousel() {
    carouselCards.forEach((card, i) => {
      card.className = "carousel-item";

      if (i === currentSlide) {
        card.classList.add("front");
      } else if (
        i === (currentSlide - 1 + carouselCards.length) % carouselCards.length ||
        i === (currentSlide + 1) % carouselCards.length
      ) {
        card.classList.add("back");
      } else {
        card.classList.add("back-blur");
      }
    });
  }

  if (prevButton && nextButton) {
    prevButton.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + carouselCards.length) % carouselCards.length;
      refreshCarousel();
    });

    nextButton.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % carouselCards.length;
      refreshCarousel();
    });

    refreshCarousel();
  }

  // === Toggle Recipe button ===
  document.querySelectorAll(".toggle-btn").forEach(button => {
    button.addEventListener("click", () => {
      const recipeDetails = button.previousElementSibling;
      const isShown = recipeDetails.style.display === "block";

      recipeDetails.style.display = isShown ? "none" : "block";
      button.textContent = isShown ? "Read Full Recipe" : "Hide Recipe";
    });
  });
});
