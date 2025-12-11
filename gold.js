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
    dots[i].className = dots[i].className.replace(" active-dot", "");
  }

  if (slides[slideIndex - 1]) {
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active-dot";
  }
}

// Auto slide change every 5 seconds
setInterval(() => {
  plusSlides(1);
}, 5000);

// Mobile menu toggle
document
  .querySelector(".mobile-menu-btn")
  .addEventListener("click", function () {
    document.querySelector(".nav-links").classList.toggle("active");
  });

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector(".nav-links").classList.remove("active");
  });
});

// Smooth scrolling for category navigation
document.querySelectorAll(".category-card").forEach((card) => {
  card.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Get navbar height for offset
      const navbarHeight = document.querySelector(".navbar").offsetHeight;

      // Calculate position
      const targetPosition = targetElement.offsetTop - navbarHeight - 20;

      // Smooth scroll
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Like button functionality
document.querySelectorAll(".like-btn").forEach((button) => {
  button.addEventListener("click", function () {
    const heartIcon = this.querySelector("i");
    const likeCount = document.querySelector(".like-count");

    if (heartIcon.classList.contains("far")) {
      heartIcon.classList.remove("far");
      heartIcon.classList.add("fas");
      this.style.background = "#e74c3c";
      this.style.color = "white";

      // Update like count
      let count = parseInt(likeCount.textContent);
      likeCount.textContent = count + 1;
    } else {
      heartIcon.classList.remove("fas");
      heartIcon.classList.add("far");
      this.style.background = "white";
      this.style.color = "#e74c3c";

      // Update like count
      let count = parseInt(likeCount.textContent);
      likeCount.textContent = count - 1;
    }
  });
});

// View Details button functionality (replaced Inquire Now)
document.querySelectorAll(".inquire-btn").forEach((button) => {
  button.addEventListener("click", function () {
    const productName =
      this.closest(".product-card").querySelector("h3").textContent;
    const productDesc =
      this.closest(".product-card").querySelector(".product-desc").textContent;
    const productDetails =
      this.closest(".product-card").querySelector(".product-details").innerHTML;
    const productBadge =
      this.closest(".product-card").querySelector(".product-badge").textContent;

    // Create details modal
    const modal = document.createElement("div");
    modal.className = "details-modal";
    modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${productName}</h3>
                    <span class="modal-badge">${productBadge}</span>
                    <button class="modal-close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <p class="modal-desc">${productDesc}</p>
                    <div class="modal-details">
                        ${productDetails}
                    </div>
                    <p class="modal-note"><i class="fas fa-info-circle"></i> Price available on request. Contact us for detailed pricing and availability.</p>
                </div>
                <div class="modal-footer">
                    <button class="modal-close">Close</button>
                    <button class="modal-whatsapp">
                        <i class="fab fa-whatsapp"></i> Contact on WhatsApp
                    </button>
                </div>
            </div>
        `;

    // Add styles for modal
    const style = document.createElement("style");
    style.textContent = `
            .details-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2000;
                animation: fadeIn 0.3s ease;
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .modal-content {
                background: white;
                padding: 2rem;
                border-radius: 15px;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                position: relative;
            }
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 1.5rem;
                padding-bottom: 1rem;
                border-bottom: 2px solid #f0f0f0;
            }
            .modal-header h3 {
                color: #333;
                margin: 0;
                font-size: 1.5rem;
                flex: 1;
            }
            .modal-badge {
                background: #d4af37;
                color: white;
                padding: 5px 15px;
                border-radius: 20px;
                font-size: 0.9rem;
                font-weight: 500;
                margin: 0 10px;
            }
            .modal-close-btn {
                background: none;
                border: none;
                font-size: 1.8rem;
                color: #666;
                cursor: pointer;
                line-height: 1;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            .modal-close-btn:hover {
                background: #f0f0f0;
                color: #333;
            }
            .modal-body {
                margin-bottom: 1.5rem;
            }
            .modal-desc {
                color: #666;
                margin-bottom: 1.5rem;
                line-height: 1.6;
            }
            .modal-details {
                display: flex;
                gap: 2rem;
                margin-bottom: 1.5rem;
                color: #777;
                font-size: 0.9rem;
                padding: 1rem;
                background: #f9f9f9;
                border-radius: 8px;
            }
            .modal-details span {
                display: flex;
                align-items: center;
                gap: 5px;
            }
            .modal-details i {
                color: #d4af37;
            }
            .modal-note {
                color: #666;
                font-size: 0.9rem;
                padding: 1rem;
                background: #fff9e6;
                border-radius: 8px;
                margin: 0;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .modal-note i {
                color: #d4af37;
                font-size: 1rem;
            }
            .modal-footer {
                display: flex;
                gap: 1rem;
                justify-content: center;
                margin-top: 1.5rem;
                padding-top: 1.5rem;
                border-top: 1px solid #eee;
            }
            .modal-close, .modal-whatsapp {
                padding: 12px 25px;
                border: none;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 500;
                transition: all 0.3s ease;
                font-size: 1rem;
            }
            .modal-close {
                background: #eee;
                color: #333;
            }
            .modal-whatsapp {
                background: #25D366;
                color: white;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .modal-close:hover {
                background: #ddd;
                transform: translateY(-2px);
            }
            .modal-whatsapp:hover {
                background: #128C7E;
                transform: translateY(-2px);
            }
            @media (max-width: 480px) {
                .modal-footer {
                    flex-direction: column;
                }
                .modal-close, .modal-whatsapp {
                    width: 100%;
                }
            }
        `;

    document.head.appendChild(style);
    document.body.appendChild(modal);

    // Close modal buttons
    const closeModal = () => {
      document.body.removeChild(modal);
      document.head.removeChild(style);
    };

    modal.querySelector(".modal-close").addEventListener("click", closeModal);
    modal
      .querySelector(".modal-close-btn")
      .addEventListener("click", closeModal);

    // WhatsApp action
    modal.querySelector(".modal-whatsapp").addEventListener("click", () => {
      const message = `Hi, I'm interested in ${productName}. ${productDesc}. Can you please provide more details and pricing?`;
      const whatsappUrl = `https://wa.me/918870013202?text=${encodeURIComponent(
        message
      )}`;
      window.open(whatsappUrl, "_blank");
    });

    // Close modal when clicking outside
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Close on Escape key
    document.addEventListener("keydown", function closeOnEscape(e) {
      if (e.key === "Escape") {
        closeModal();
        document.removeEventListener("keydown", closeOnEscape);
      }
    });
  });
});

// Back to top button
const backToTopButton = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Highlight active category on scroll
const sections = document.querySelectorAll("section[id]");
const categoryCards = document.querySelectorAll(".category-card");

function highlightCategoryOnScroll() {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const navbarHeight = document.querySelector(".navbar").offsetHeight;

    if (window.scrollY >= sectionTop - navbarHeight - 100) {
      current = section.getAttribute("id");
    }
  });

  categoryCards.forEach((card) => {
    card.classList.remove("active-category");
    if (card.getAttribute("data-section") === current) {
      card.classList.add("active-category");
    }
  });
}

// Add active category style
const style = document.createElement("style");
style.textContent = `
    .category-card.active-category {
        border-color: #d4af37;
        background: linear-gradient(135deg, #fff9e6 0%, #f4e4c1 100%);
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(212, 175, 55, 0.3);
    }
    .category-card.active-category .category-icon {
        background: linear-gradient(135deg, #d4af37 0%, #b8941f 100%);
    }
`;
document.head.appendChild(style);

// Initial highlight check
highlightCategoryOnScroll();

// Listen for scroll events
window.addEventListener("scroll", highlightCategoryOnScroll);

// Category cards animation on scroll
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

// Observe category cards
document.querySelectorAll(".category-card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  observer.observe(card);
});

// Observe product cards
document.querySelectorAll(".product-card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  observer.observe(card);
});

// Initialize all elements to visible after a short delay
setTimeout(() => {
  document.querySelectorAll(".category-card, .product-card").forEach((el) => {
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";
  });
}, 100);
