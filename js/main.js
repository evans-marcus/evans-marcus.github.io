// main.js
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});

// SCROLL REVEAL OBSERVER
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15
  }
);

reveals.forEach(reveal => {
  revealObserver.observe(reveal);
});

// MOBILE MENU TOGGLE
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  menuToggle.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('#navMenu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    menuToggle.classList.remove('active');
  });
});

document.addEventListener("DOMContentLoaded", function () {

  const testimonials = document.querySelectorAll(".testimonial");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");
  const slider = document.querySelector(".testimonial-slider");

  let index = 0;
  let autoSlide;
  let startX = 0;
  let endX = 0;

  function showTestimonial(i) {
    testimonials.forEach(t => t.classList.remove("active"));
    testimonials[i].classList.add("active");
  }

  function nextSlide() {
    index = (index + 1) % testimonials.length;
    showTestimonial(index);
  }

  function prevSlide() {
    index = (index - 1 + testimonials.length) % testimonials.length;
    showTestimonial(index);
  }

  function startAutoSlide() {
    autoSlide = setInterval(nextSlide, 5000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlide);
  }

  // Button controls (safe check)
  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      stopAutoSlide();
      nextSlide();
      startAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      stopAutoSlide();
      prevSlide();
      startAutoSlide();
    });
  }

  /* ================= Swipe Support ================= */

  if (slider) {
    slider.addEventListener("touchstart", function (e) {
      startX = e.touches[0].clientX;
      stopAutoSlide();
    });

    slider.addEventListener("touchmove", function (e) {
      endX = e.touches[0].clientX;
    });

    slider.addEventListener("touchend", function () {
      let diff = startX - endX;

      if (diff > 50) {
        nextSlide();
      } else if (diff < -50) {
        prevSlide();
      }

      startAutoSlide();
    });
  }

  // Start auto slide
  startAutoSlide();

});
