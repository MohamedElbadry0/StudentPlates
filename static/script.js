document.addEventListener("DOMContentLoaded", () => {
  // === Mobile Menu ===
  const menuToggle = document.getElementById("mobile-menu");
  const navLinks = document.querySelector(".nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // === Scroll Animations ===
  const animatedElements = document.querySelectorAll(
    ".animate-fade-in, .animate-slide-in, .animate-slide-up"
  );
  const animationObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );
  animatedElements.forEach(el => animationObserver.observe(el));

  // === Hero Text Animation ===
  const heroHeading = document.querySelector(".hero-text");
  if (heroHeading) {
    setTimeout(() => {
      heroHeading.classList.add("visible", "animate-underline");
    }, 400);
  }

  // === Highlight Paragraphs in Hero when Scroll ===
  document.querySelectorAll(".hero-content p").forEach(paragraph => {
    const paragraphObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            paragraph.classList.add("animate-highlight");
          }
        });
      },
      { threshold: 0.5 }
    );
    paragraphObserver.observe(paragraph);
  });

  // === Counter Section Animation ===
  const statsSection = document.querySelector(".counter-section");
  const statsCounters = document.querySelectorAll(".counter-number");
  let hasCounted = false;

  if (statsSection) {
    const statsObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasCounted) {
            hasCounted = true;
            statsCounters.forEach(counter => {
              const endValue = parseInt(counter.getAttribute("data-target"));
              animateCount(counter, endValue);
            });
          }
        });
      },
      { threshold: 0.4 }
    );
    setTimeout(() => statsObserver.observe(statsSection), 300);
  }

  function animateCount(element, target) {
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    function step(timestamp) {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(Math.sqrt(progress) * target);
      element.textContent = current;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = target;
      }
    }

    requestAnimationFrame(step);
  }

  // === Timeline Animation ===
  const timelineBlocks = document.querySelectorAll(".timeline-item");
  const timelineWatcher = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.3 }
  );
  timelineBlocks.forEach(item => timelineWatcher.observe(item));

  // === Quote Carousel ===
  const quoteSlides = document.querySelectorAll(".quote-slide");
  const navDots = document.querySelectorAll(".dot");
  let slideIndex = 0;

  if (quoteSlides.length && navDots.length) {
    function showSlide(index) {
      quoteSlides.forEach((slide, i) =>
        slide.classList.toggle("active", i === index)
      );
      navDots.forEach((dot, i) =>
        dot.classList.toggle("active", i === index)
      );
      slideIndex = index;
    }

    function nextSlide() {
      slideIndex = (slideIndex + 1) % quoteSlides.length;
      showSlide(slideIndex);
    }

    navDots.forEach((dot, i) => {
      dot.addEventListener("click", () => showSlide(i));
    });

    showSlide(0);
    setInterval(nextSlide, 5000);
  }

  // === FAQ Toggle ===
  document.querySelectorAll(".faq-item").forEach(faq => {
    const question = faq.querySelector(".faq-question");
    if (question) {
      question.addEventListener("click", () => {
        faq.classList.toggle("active");
      });
    }
  });

  // === Contact Forms ===
  handleForm(".contact-form");
  handleForm(".newsletter-form");
  handleForm(".contact-final-form");

  function handleForm(selector) {
    const form = document.querySelector(selector);
    if (form) {
      form.addEventListener("submit", e => {
        e.preventDefault();
        const feedback = form.querySelector(".form-message");
        feedback.classList.remove("hidden");
        form.reset();
      });
    }
  }

  // === Chat Box ===
  const chatTrigger = document.getElementById("open-chat");
  const chatClose = document.getElementById("close-chat");
  const chatContainer = document.getElementById("chat-box");

  if (chatTrigger && chatClose && chatContainer) {
    chatTrigger.addEventListener("click", () => {
      chatContainer.style.display = "flex";
    });

    chatClose.addEventListener("click", () => {
      chatContainer.style.display = "none";
    });
  }

  // === Recipe Carousel ===
  const carouselCards = document.querySelectorAll(".carousel-item");
  const prev = document.getElementById("prevBtn");
  const next = document.getElementById("nextBtn");
  let currentCard = 2;

  function updateCarousel() {
    carouselCards.forEach((card, i) => {
      card.className = "carousel-item";
      if (i === currentCard) {
        card.classList.add("front");
      } else if (
        i === (currentCard - 1 + carouselCards.length) % carouselCards.length ||
        i === (currentCard + 1) % carouselCards.length
      ) {
        card.classList.add("back");
      } else {
        card.classList.add("back-blur");
      }
    });
  }

  if (prev && next) {
    prev.addEventListener("click", () => {
      currentCard = (currentCard - 1 + carouselCards.length) % carouselCards.length;
      updateCarousel();
    });

    next.addEventListener("click", () => {
      currentCard = (currentCard + 1) % carouselCards.length;
      updateCarousel();
    });

    updateCarousel();
  }

  // === Toggle Full Recipe button  ===
  document.querySelectorAll(".toggle-btn").forEach(button => {
    button.addEventListener("click", () => {
      const contentBlock = button.previousElementSibling;
      const isShown = contentBlock.style.display === "block";
      contentBlock.style.display = isShown ? "none" : "block";
      button.textContent = isShown ? "Read Full Recipe" : "Hide Recipe";
    });
  });
});

// === Scroll to Recipes Section ===
function scrollToRecipes() {
  const recipesHeader = document.querySelector(".recipes-headline");
  if (recipesHeader) {
    recipesHeader.scrollIntoView({ behavior: "smooth" });
  }
}

// === wheel ===

const wheelCanvas = document.getElementById("foodWheel");
const spinBtn = document.getElementById("spin-food-btn");
const resultText = document.getElementById("food-result");

const segments = ["Pasta 🍝", "Tacos 🌮", "Ramen 🍜", "Salad 🥗", "Curry 🍛", "Burgers 🍔"];
const segmentDegrees = 360 / segments.length;
const pieColors = ["#F94144", "#F3722C", "#F8961E", "#F9C74F", "#90BE6D", "#43AA8B"];

let foodWheelChart = new Chart(wheelCanvas, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: segments,
    datasets: [{
      backgroundColor: pieColors,
      data: Array(segments.length).fill(1)
    }]
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    rotation: 0,
    plugins: {
      tooltip: false,
      legend: { display: false },
      datalabels: {
        color: "#ffffff",
        font: (ctx) => {
          const w = window.innerWidth;
          return {
            size: w < 480 ? 10 : w < 768 ? 13 : 16,
            weight: "bold",
            family: "Rubik"
          };
        },
        formatter: (_, ctx) => ctx.chart.data.labels[ctx.dataIndex],
        clamp: true
      }
    }
  }
});

function getResultFromAngle(angle) {
  const corrected = (360 - ((angle + 90) % 360)) % 360;
  const index = Math.floor(corrected / segmentDegrees);
  return segments[index];
}

function spinWheel() {
  let totalRotation = 0;
  const spins = 6; // how many full spins
  const randomOffset = Math.floor(Math.random() * 360);
  const targetRotation = 360 * spins + randomOffset;

  let start = null;

  function animate(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;

    // Ease out rotation using a simple timing function
    const progress = Math.min(elapsed / 3000, 1); // 3s duration
    const eased = 1 - Math.pow(1 - progress, 3);  // easeOutCubic

    const currentRotation = targetRotation * eased;
    foodWheelChart.options.rotation = currentRotation % 360;
    foodWheelChart.update();

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      const finalAngle = currentRotation % 360;
      const result = getResultFromAngle(finalAngle);
      resultText.style.opacity = 1;
      spinBtn.disabled = false;
    }
  }

  requestAnimationFrame(animate);
}

spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  resultText.style.opacity = 0;
  spinWheel();
});
