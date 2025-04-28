document.addEventListener("DOMContentLoaded", () => {
  // === Mobile Navigation Toggle ===
  const menuButton = document.getElementById("mobile-menu");
  const navigationLinks = document.getElementById("nav-links");

  if (menuButton && navigationLinks) {
    menuButton.addEventListener("click", () => {
      navigationLinks.classList.toggle("active");
      menuButton.classList.toggle("open");
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
