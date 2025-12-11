// Mobile menu toggle
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");

mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  mobileMenuBtn.innerHTML = navLinks.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    !e.target.closest(".nav-container") &&
    navLinks.classList.contains("active")
  ) {
    navLinks.classList.remove("active");
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  }
});

// Mobile dropdown handling
const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach((dropdown) => {
  const dropdownLink = dropdown.querySelector("a");

  dropdownLink.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      dropdown.classList.toggle("active");

      // Close other dropdowns
      dropdowns.forEach((otherDropdown) => {
        if (otherDropdown !== dropdown) {
          otherDropdown.classList.remove("active");
        }
      });
    }
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Close mobile menu if open
      navLinks.classList.remove("active");
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';

      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: "smooth",
      });
    }
  });
});

// Back to top button
const backToTopBtn = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.style.display = "flex";
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

// Contact form submission
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = Object.fromEntries(formData);

  // Prepare WhatsApp message
  let message = `New Contact Form Submission from Canda Gold Website:\n\n`;
  message += `Name: ${data.name || "Not provided"}\n`;
  message += `Email: ${data.email || "Not provided"}\n`;
  message += `Phone: ${data.phone || "Not provided"}\n`;
  message += `Purpose: ${data.purpose || "Not specified"}\n`;
  message += `Message: ${data.message || "No message provided"}\n`;

  const whatsappURL = `https://wa.me/918870013202?text=${encodeURIComponent(
    message
  )}`;

  // Show success message
  alert("Thank you for your message! We will contact you shortly.");

  // Reset form
  contactForm.reset();

  // Open WhatsApp in new tab
  setTimeout(() => {
    window.open(whatsappURL, "_blank");
  }, 1000);
});

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for animation
document
  .querySelectorAll(
    ".timeline-item, .value-card, .team-member, .process-step, .feature"
  )
  .forEach((element) => {
    element.style.animationPlayState = "paused";
    observer.observe(element);
  });

// Add active class to current section in view for navigation
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop - 150) {
      current = section.getAttribute("id");
    }
  });

  // Update active nav link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.parentElement.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.parentElement.classList.add("active");
    } else if (current === "" && link.getAttribute("href") === "about.html") {
      link.parentElement.classList.add("active");
    }
  });
});

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".about-hero");

  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Team member hover effect
document.querySelectorAll(".team-member").forEach((member) => {
  member.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-15px)";
    this.style.boxShadow = "0 30px 50px rgba(0,0,0,0.2)";
  });

  member.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
    this.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
  });
});

// Value cards hover effect enhancement
document.querySelectorAll(".value-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.querySelector(".value-icon").style.transform =
      "scale(1.2) rotate(5deg)";
  });

  card.addEventListener("mouseleave", function () {
    this.querySelector(".value-icon").style.transform = "scale(1) rotate(0deg)";
  });
});

// Add loading animation for images
document.querySelectorAll("img").forEach((img) => {
  img.style.opacity = "0";
  img.style.transition = "opacity 0.5s ease";

  img.addEventListener("load", function () {
    this.style.opacity = "1";
  });
});

// Initialize page animations on load
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);

  // Trigger initial scroll for animations
  setTimeout(() => {
    window.dispatchEvent(new Event("scroll"));
  }, 500);
});

// WhatsApp button hover effect
const whatsappBtn = document.querySelector(".whatsapp-btn");
whatsappBtn.addEventListener("mouseenter", () => {
  whatsappBtn.style.transform = "translateY(-3px) scale(1.05)";
});

whatsappBtn.addEventListener("mouseleave", () => {
  whatsappBtn.style.transform = "translateY(0) scale(1)";
});

// Form input focus effects
document
  .querySelectorAll(
    ".form-group input, .form-group select, .form-group textarea"
  )
  .forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.style.transform = "translateY(-2px)";
    });

    input.addEventListener("blur", function () {
      this.parentElement.style.transform = "translateY(0)";
    });
  });

// Add year dynamically to footer
const currentYear = new Date().getFullYear();
document.querySelectorAll(".footer-bottom p").forEach((p) => {
  if (p.textContent.includes("2025")) {
    p.textContent = p.textContent.replace("2025", currentYear);
  }
});

// Intersection observer for contact cards
const contactObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 100);
      }
    });
  },
  {
    threshold: 0.1,
  }
);

document.querySelectorAll(".contact-card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  contactObserver.observe(card);
});
