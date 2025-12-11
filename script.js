// Mobile menu toggle
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");

mobileMenuBtn.addEventListener("click", function () {
  navLinks.classList.toggle("active");
  const icon = this.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-times");
});

// Mobile dropdown toggle
document.querySelectorAll(".dropdown > a").forEach(function (dropdownLink) {
  dropdownLink.addEventListener("click", function (e) {
    if (window.innerWidth <= 992) {
      e.preventDefault();
      const dropdown = this.parentElement;
      dropdown.classList.toggle("active");

      // Close other dropdowns
      document.querySelectorAll(".dropdown").forEach(function (otherDropdown) {
        if (otherDropdown !== dropdown) {
          otherDropdown.classList.remove("active");
        }
      });
    }
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", function (e) {
  const navLinks = document.querySelector(".nav-links");
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");

  if (
    window.innerWidth <= 992 &&
    !navLinks.contains(e.target) &&
    !mobileMenuBtn.contains(e.target) &&
    navLinks.classList.contains("active")
  ) {
    navLinks.classList.remove("active");
    mobileMenuBtn.querySelector("i").classList.remove("fa-times");
    mobileMenuBtn.querySelector("i").classList.add("fa-bars");

    // Close all dropdowns
    document.querySelectorAll(".dropdown").forEach(function (dropdown) {
      dropdown.classList.remove("active");
    });
  }
});

// Close dropdowns when clicking on a link
document.querySelectorAll(".dropdown-content a").forEach(function (link) {
  link.addEventListener("click", function () {
    if (window.innerWidth <= 992) {
      document.querySelector(".nav-links").classList.remove("active");
      document.querySelector(".mobile-menu-btn i").classList.remove("fa-times");
      document.querySelector(".mobile-menu-btn i").classList.add("fa-bars");

      // Close all dropdowns
      document.querySelectorAll(".dropdown").forEach(function (dropdown) {
        dropdown.classList.remove("active");
      });
    }
  });
});

// Slideshow functionality
const slides = document.querySelectorAll(".slide");
const indicators = document.querySelectorAll(".indicator");
const prevButton = document.querySelector(".prev-slide");
const nextButton = document.querySelector(".next-slide");
let currentSlide = 0;

function showSlide(index) {
  // Hide all slides
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  // Remove active class from all indicators
  indicators.forEach((indicator) => {
    indicator.classList.remove("active");
  });

  // Show the current slide
  slides[index].classList.add("active");
  indicators[index].classList.add("active");

  currentSlide = index;
}

function nextSlide() {
  let nextIndex = (currentSlide + 1) % slides.length;
  showSlide(nextIndex);
}

function prevSlide() {
  let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(prevIndex);
}

// Auto slideshow
let slideInterval = setInterval(nextSlide, 6000);

// Reset interval on user interaction
function resetInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 6000);
}

// Event listeners for slideshow controls
nextButton.addEventListener("click", function () {
  nextSlide();
  resetInterval();
});

prevButton.addEventListener("click", function () {
  prevSlide();
  resetInterval();
});

// Indicators click
indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", function () {
    showSlide(index);
    resetInterval();
  });
});

// Like button functionality
document
  .querySelectorAll(".like-btn, .like-btn-sm, .like-btn-gallery")
  .forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const icon = this.querySelector("i");
      const likeCount = document.querySelector(".like-count");

      if (icon.classList.contains("far")) {
        icon.classList.remove("far");
        icon.classList.add("fas");
        this.style.color = "#ff6b8b";

        // Update like count
        let count = parseInt(likeCount.textContent);
        likeCount.textContent = count + 1;

        // Add animation effect
        this.style.transform = "scale(1.3)";
        setTimeout(() => {
          this.style.transform = "scale(1)";
        }, 300);

        // Show notification
        showNotification("Added to favorites!");
      } else {
        icon.classList.remove("fas");
        icon.classList.add("far");
        this.style.color = "";

        // Update like count
        let count = parseInt(likeCount.textContent);
        likeCount.textContent = Math.max(0, count - 1);

        // Show notification
        showNotification("Removed from favorites");
      }
    });
  });

// Back to top button
const backToTopBtn = document.querySelector(".back-to-top");

window.addEventListener("scroll", function () {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add("visible");
  } else {
    backToTopBtn.classList.remove("visible");
  }
});

backToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// View buttons functionality
document
  .querySelectorAll(
    ".view-btn, .view-btn-sm, .slide-btn, .direction-btn, .appointment-btn"
  )
  .forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      // Add animation effect
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 200);

      // Show notification based on button type
      if (this.classList.contains("appointment-btn")) {
        showNotification("Appointment booking feature coming soon!");
      } else if (this.classList.contains("direction-btn")) {
        showNotification("Directions feature coming soon!");
      } else {
        showNotification("Collection viewing feature coming soon!");
      }
    });
  });

// Newsletter form
const newsletterForm = document.querySelector(".newsletter-form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = this.querySelector("input").value;

    if (email && validateEmail(email)) {
      showNotification("Thank you for subscribing to our newsletter!");
      this.querySelector("input").value = "";
    } else {
      showNotification("Please enter a valid email address.");
    }
  });
}

// Helper function to validate email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Notification system
function showNotification(message) {
  // Remove existing notification
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;

  // Add styles for notification
  notification.style.cssText = `
        position: fixed;
        top: 120px;
        right: 30px;
        background: #d4af37;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        animation: slideIn 0.3s ease;
        max-width: 350px;
        font-family: 'Inter', sans-serif;
    `;

  // Add close button styles
  notification.querySelector(".notification-close").style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;

  // Add keyframes for animation
  if (!document.querySelector("#notification-styles")) {
    const style = document.createElement("style");
    style.id = "notification-styles";
    style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes fadeOut {
                from {
                    opacity: 1;
                }
                to {
                    opacity: 0;
                }
            }
        `;
    document.head.appendChild(style);
  }

  document.body.appendChild(notification);

  // Close notification on click
  notification
    .querySelector(".notification-close")
    .addEventListener("click", function () {
      notification.style.animation = "fadeOut 0.3s ease";
      setTimeout(() => {
        notification.remove();
      }, 300);
    });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = "fadeOut 0.3s ease";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }
  }, 5000);
}

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  // Show first slide
  showSlide(0);

  // Add animation to stats
  const stats = document.querySelectorAll(".stat");
  stats.forEach((stat, index) => {
    setTimeout(() => {
      stat.style.opacity = "1";
      stat.style.transform = "translateY(0)";
    }, index * 200);
  });

  // Pre-set styles for animation
  const statElements = document.querySelectorAll(".stat");
  statElements.forEach((stat) => {
    stat.style.opacity = "0";
    stat.style.transform = "translateY(20px)";
    stat.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  // Navbar scroll effect
  window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.pageYOffset > 50) {
      header.style.background = "rgba(255, 255, 255, 0.95)";
      header.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.background = "rgba(255, 255, 255, 0.98)";
      header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.08)";
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
      window.scrollTo({
        top: targetElement.offsetTop - 120,
        behavior: "smooth",
      });

      // Close mobile menu if open
      if (window.innerWidth <= 992) {
        navLinks.classList.remove("active");
        mobileMenuBtn.querySelector("i").classList.remove("fa-times");
        mobileMenuBtn.querySelector("i").classList.add("fa-bars");
      }
    }
  });
});
