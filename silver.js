// Slideshow functionality
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

// Auto slideshow
setInterval(() => {
  plusSlides(1);
}, 5000);

// Mobile menu toggle
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");

mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".navbar") && navLinks.classList.contains("active")) {
    navLinks.classList.remove("active");
  }
});

// Like button functionality
const likeButtons = document.querySelectorAll(".like-btn");
const likeCountElement = document.querySelector(".like-count");

likeButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    e.stopPropagation();
    const heartIcon = this.querySelector("i");

    if (heartIcon.classList.contains("far")) {
      heartIcon.classList.remove("far");
      heartIcon.classList.add("fas");
      this.style.backgroundColor = "#ffe6e6";

      // Update like count
      let currentCount = parseInt(likeCountElement.textContent);
      likeCountElement.textContent = currentCount + 1;
    } else {
      heartIcon.classList.remove("fas");
      heartIcon.classList.add("far");
      this.style.backgroundColor = "white";

      // Update like count
      let currentCount = parseInt(likeCountElement.textContent);
      likeCountElement.textContent = currentCount - 1;
    }
  });
});

// Inquire button functionality
const inquireButtons = document.querySelectorAll(".inquire-btn");

inquireButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const productCard = this.closest(".product-card");
    const productName = productCard.querySelector("h3").textContent;

    // Create a WhatsApp message
    const message = `Hello, I'm interested in the ${productName} from your Silver Collection. Can you please provide more details?`;
    const whatsappURL = `https://wa.me/918870013202?text=${encodeURIComponent(
      message
    )}`;

    // Open WhatsApp in a new tab
    window.open(whatsappURL, "_blank");
  });
});

// Smooth scrolling for category links
document.querySelectorAll(".category-card").forEach((card) => {
  card.addEventListener("click", function (e) {
    e.preventDefault();
    const targetSection = this.getAttribute("href");
    const targetElement = document.querySelector(targetSection);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: "smooth",
      });

      // Close mobile menu if open
      navLinks.classList.remove("active");
    }
  });
});

// Back to top button
const backToTopBtn = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.style.display = "flex";
    backToTopBtn.style.alignItems = "center";
    backToTopBtn.style.justifyContent = "center";
  } else {
    backToTopBtn.style.display = "none";
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Product card hover effect enhancement
document.querySelectorAll(".product-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px)";
    this.style.boxShadow = "0 20px 40px rgba(0,0,0,0.2)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
    this.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
  });
});

// Add active class to current section in view
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop - 150) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((item) => {
    item.parentElement.classList.remove("active");
    if (item.getAttribute("href") === `#${current}`) {
      item.parentElement.classList.add("active");
    }
  });
});

// Category card animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll(".category-card, .product-card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  observer.observe(card);
});

// WhatsApp button hover effect
const whatsappBtn = document.querySelector(".whatsapp-btn");
whatsappBtn.addEventListener("mouseenter", () => {
  whatsappBtn.style.transform = "translateY(-3px) scale(1.05)";
});

whatsappBtn.addEventListener("mouseleave", () => {
  whatsappBtn.style.transform = "translateY(0) scale(1)";
});
