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

// FAQ Toggle Functionality
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    // Close other FAQ items
    faqItems.forEach((otherItem) => {
      if (otherItem !== item && otherItem.classList.contains("active")) {
        otherItem.classList.remove("active");
      }
    });

    // Toggle current FAQ item
    item.classList.toggle("active");
  });
});

// Appointment Modal
const appointmentModal = document.querySelector(".appointment-modal");
const appointmentBtn = document.querySelector(".appointment-btn");
const closeModal = document.querySelector(".close-modal");

appointmentBtn.addEventListener("click", () => {
  appointmentModal.style.display = "flex";
  document.body.style.overflow = "hidden";
});

closeModal.addEventListener("click", () => {
  appointmentModal.style.display = "none";
  document.body.style.overflow = "auto";
});

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === appointmentModal) {
    appointmentModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// Appointment Form Submission
const appointmentForm = document.getElementById("appointment-form");

appointmentForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = Object.fromEntries(formData);

  // Prepare WhatsApp message
  let message = `New Appointment Request:\n\n`;
  message += `Name: ${data.name}\n`;
  message += `Phone: ${data.phone}\n`;
  message += `Email: ${data.email || "Not provided"}\n`;
  message += `Preferred Date: ${data.date}\n`;
  message += `Preferred Time: ${data.time}\n`;
  message += `Purpose: ${data.purpose}\n`;
  message += `Notes: ${data.notes || "No additional notes"}\n`;

  const whatsappURL = `https://wa.me/918870013202?text=${encodeURIComponent(
    message
  )}`;

  // Show success message
  alert(
    "Appointment request sent successfully! We will confirm your appointment via phone call."
  );

  // Reset form and close modal
  appointmentForm.reset();
  appointmentModal.style.display = "none";
  document.body.style.overflow = "auto";

  // Open WhatsApp in new tab
  setTimeout(() => {
    window.open(whatsappURL, "_blank");
  }, 1000);
});

// Main Contact Form Submission
const mainContactForm = document.getElementById("main-contact-form");

mainContactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = Object.fromEntries(formData);

  // Prepare WhatsApp message
  let message = `New Contact Form Submission:\n\n`;
  message += `Name: ${data.name}\n`;
  message += `Phone: ${data.phone}\n`;
  message += `Email: ${data.email}\n`;
  message += `Purpose: ${data.purpose}\n`;
  message += `Collection Interest: ${data.collection || "Not specified"}\n`;
  message += `Message: ${data.message}\n`;
  message += `Newsletter: ${data.newsletter ? "Subscribed" : "Not subscribed"}`;

  const whatsappURL = `https://wa.me/918870013202?text=${encodeURIComponent(
    message
  )}`;

  // Show success message
  alert("Thank you for your message! We will contact you within 24 hours.");

  // Reset form
  mainContactForm.reset();

  // Open WhatsApp in new tab
  setTimeout(() => {
    window.open(whatsappURL, "_blank");
  }, 1000);
});

// Get Directions Button
const getDirectionsBtn = document.querySelector(".get-directions-btn");

getDirectionsBtn.addEventListener("click", () => {
  const address = "123 Jewel Street, Bandra West, Mumbai, Maharashtra 400050";
  const mapsURL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;
  window.open(mapsURL, "_blank");
});

// Open Google Maps Button
const openMapsBtn = document.querySelector(".open-maps-btn");

openMapsBtn.addEventListener("click", () => {
  const address = "123 Jewel Street, Bandra West, Mumbai, Maharashtra 400050";
  const mapsURL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;
  window.open(mapsURL, "_blank");
});

// Set minimum date for appointment form to today
const appointmentDateInput = document.getElementById("appointment-date");
if (appointmentDateInput) {
  const today = new Date().toISOString().split("T")[0];
  appointmentDateInput.min = today;

  // Set default date to 2 days from today
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 2);
  appointmentDateInput.value = defaultDate.toISOString().split("T")[0];
}

// Add animation to elements on scroll
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

// Observe animated elements
document
  .querySelectorAll(
    ".quick-item, .option-card, .service-card, .faq-item, .detail-card"
  )
  .forEach((element) => {
    element.style.animationPlayState = "paused";
    observer.observe(element);
  });

// Form input focus effects
document
  .querySelectorAll(
    ".form-group input, .form-group select, .form-group textarea"
  )
  .forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.style.transform = "translateY(-2px)";
      this.parentElement.style.boxShadow =
        "0 5px 15px rgba(193, 154, 107, 0.1)";
    });

    input.addEventListener("blur", function () {
      this.parentElement.style.transform = "translateY(0)";
      this.parentElement.style.boxShadow = "none";
    });
  });

// Option card hover enhancement
document.querySelectorAll(".option-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-15px)";
    this.style.boxShadow = "0 30px 50px rgba(193, 154, 107, 0.3)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(-10px)";
    this.style.boxShadow = "0 20px 40px rgba(193, 154, 107, 0.2)";
  });
});

// Service card hover enhancement
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    const icon = this.querySelector(".service-icon");
    icon.style.transform = "scale(1.2) rotate(5deg)";
    icon.style.color = "#8B7355";
  });

  card.addEventListener("mouseleave", function () {
    const icon = this.querySelector(".service-icon");
    icon.style.transform = "scale(1) rotate(0deg)";
    icon.style.color = "#C19A6B";
  });
});

// Phone number formatting
const phoneInputs = document.querySelectorAll('input[type="tel"]');

phoneInputs.forEach((input) => {
  input.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 10) {
      value = value.substring(0, 10);
    }

    if (value.length > 3) {
      value = value.replace(/(\d{3})(\d{3})/, "$1 $2");
    }
    if (value.length > 7) {
      value = value.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
    }

    e.target.value = value;
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
    } else if (current === "" && link.getAttribute("href") === "contact.html") {
      link.parentElement.classList.add("active");
    }
  });
});

// Copy phone number functionality
const phoneNumbers = document.querySelectorAll(".contact-details p strong");

phoneNumbers.forEach((phone) => {
  phone.style.cursor = "pointer";
  phone.title = "Click to copy";

  phone.addEventListener("click", function () {
    const phoneNumber = this.textContent.replace("+91 ", "");
    navigator.clipboard.writeText(phoneNumber).then(() => {
      const originalText = this.textContent;
      this.textContent = "Copied!";
      this.style.color = "#27ae60";

      setTimeout(() => {
        this.textContent = originalText;
        this.style.color = "";
      }, 2000);
    });
  });
});

// Add year dynamically to footer
const currentYear = new Date().getFullYear();
document.querySelectorAll(".footer-bottom p").forEach((p) => {
  if (p.textContent.includes("2025")) {
    p.textContent = p.textContent.replace("2025", currentYear);
  }
});

// Intersection observer for contact form and info sections
const contactObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 200);
      }
    });
  },
  {
    threshold: 0.1,
  }
);

document
  .querySelectorAll(".contact-form-section, .contact-info-section")
  .forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    contactObserver.observe(section);
  });
