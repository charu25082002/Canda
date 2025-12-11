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
      this.style.backgroundColor = "#FFF8F0";

      // Update like count
      let currentCount = parseInt(likeCountElement.textContent);
      likeCountElement.textContent = currentCount + 1;

      // Animation effect
      this.style.transform = "scale(1.2)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 200);
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

// Inquire button functionality (for WhatsApp)
const inquireButtons = document.querySelectorAll(".inquire-btn");

inquireButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const productCard = this.closest(".product-card");
    const productName = productCard.querySelector("h3").textContent;
    const productPrice = productCard.querySelector(".price")?.textContent || "";

    // Create a WhatsApp message
    const message = `Hello, I'm interested in the ${productName} from your MotherGold Collection. ${
      productPrice ? "Price: " + productPrice + ". " : ""
    }Can you please provide more details?`;
    const whatsappURL = `https://wa.me/918870013202?text=${encodeURIComponent(
      message
    )}`;

    // Open WhatsApp in a new tab
    window.open(whatsappURL, "_blank");
  });
});

// View Details button functionality
const viewDetailsButtons = document.querySelectorAll(".view-details");

viewDetailsButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const productCard = this.closest(".product-card");
    const productName = productCard.querySelector("h3").textContent;
    const productDesc = productCard.querySelector(".product-desc").textContent;
    const productDetails =
      productCard.querySelector(".product-details").innerHTML;
    const productPrice = productCard.querySelector(".price")?.textContent || "";

    // Show product details in an alert (in real application, this would be a modal)
    alert(
      `${productName}\n\n${productDesc}\n\n${
        productPrice ? "Price: " + productPrice + "\n\n" : ""
      }Details:\n${productDetails.replace(/<[^>]*>/g, "\n")}`
    );
  });
});

// Smooth scrolling for category links
document.querySelectorAll(".category-card").forEach((card, index) => {
  card.style.setProperty("--order", index);

  card.addEventListener("click", function (e) {
    e.preventDefault();
    const targetSection = this.getAttribute("href");
    const targetElement = document.querySelector(targetSection);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });

      // Close mobile menu if open
      navLinks.classList.remove("active");

      // Add highlight effect to the section
      targetElement.style.boxShadow = "0 0 0 5px rgba(193, 154, 107, 0.3)";
      setTimeout(() => {
        targetElement.style.boxShadow = "";
      }, 2000);
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

// Consultation modal functionality
const legacyBtn = document.querySelector(".legacy-btn");
const consultationModal = document.querySelector(".consultation-modal");
const closeModal = document.querySelector(".close-modal");
const whatsappBtn = document.querySelector(".whatsapp-btn");

legacyBtn.addEventListener("click", () => {
  consultationModal.style.display = "flex";
});

whatsappBtn.addEventListener("click", (e) => {
  e.preventDefault();
  consultationModal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
  consultationModal.style.display = "none";
});

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === consultationModal) {
    consultationModal.style.display = "none";
  }
});

// Consultation form submission
const consultationForm = document.getElementById("consultation-form");

consultationForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = Object.fromEntries(formData);

  // Prepare WhatsApp message
  let message = `New Heritage Consultation Request:\n\n`;
  message += `Name: ${data.name || "Not provided"}\n`;
  message += `Phone: ${data.phone || "Not provided"}\n`;
  message += `Email: ${data.email || "Not provided"}\n`;
  message += `Service: ${data.service || "Not provided"}\n`;
  message += `Details: ${data.details || "No additional details"}\n`;

  const whatsappURL = `https://wa.me/918870013202?text=${encodeURIComponent(
    message
  )}`;

  // Close modal and open WhatsApp
  consultationModal.style.display = "none";
  consultationForm.reset();

  setTimeout(() => {
    window.open(whatsappURL, "_blank");
  }, 500);
});

// Add active class to current section in view for navigation
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

// Product card hover effect enhancement
document.querySelectorAll(".product-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-15px)";
    this.style.boxShadow = "0 30px 50px rgba(193, 154, 107, 0.4)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
    this.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
  });
});

// Category card staggered animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 0.6s ease-out forwards";
    }
  });
}, observerOptions);

document
  .querySelectorAll(".category-card, .product-card, .feature")
  .forEach((element) => {
    observer.observe(element);
  });

// Add floating particles effect for hero section
function createFloatingParticles() {
  const heroSection = document.querySelector(".mothergold-hero");
  const particlesCount = 15;

  for (let i = 0; i < particlesCount; i++) {
    const particle = document.createElement("div");
    particle.className = "floating-particle";
    particle.innerHTML = "✦";
    particle.style.position = "absolute";
    particle.style.color = "rgba(193, 154, 107, 0.3)";
    particle.style.fontSize = Math.random() * 20 + 10 + "px";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.opacity = "0";
    particle.style.transition = "opacity 1s ease";

    heroSection.appendChild(particle);

    // Animate particle
    setTimeout(() => {
      particle.style.opacity = "1";
      particle.style.animation = `float ${
        Math.random() * 10 + 10
      }s linear infinite`;

      // Define float animation
      const style = document.createElement("style");
      style.textContent = `
                @keyframes float {
                    0%, 100% { transform: translate(0, 0) rotate(0deg); }
                    25% { transform: translate(${Math.random() * 20 - 10}px, ${
        Math.random() * 20 - 10
      }px) rotate(90deg); }
                    50% { transform: translate(${Math.random() * 20 - 10}px, ${
        Math.random() * 20 - 10
      }px) rotate(180deg); }
                    75% { transform: translate(${Math.random() * 20 - 10}px, ${
        Math.random() * 20 - 10
      }px) rotate(270deg); }
                }
            `;
      document.head.appendChild(style);
    }, i * 200);
  }
}

// Initialize when page loads
window.addEventListener("load", () => {
  createFloatingParticles();

  // Add loading animation
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});
