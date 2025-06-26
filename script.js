// Smooth scroll for internal links
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener("click", function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) target.scrollIntoView({ behavior: "smooth" });
      });
    });
  
    // Dark mode toggle button
    const toggleBtn = document.createElement("button");
    toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    toggleBtn.classList.add("toggle-dark-mode");
    document.body.appendChild(toggleBtn);
  
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      toggleBtn.innerHTML = document.body.classList.contains("dark")
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
    });
  
    // Intersection Observer for fade-in effect
    const faders = document.querySelectorAll(".fade-in, .service-card, #map-container, .testimonial-section");
    const options = {
      threshold: 0.1,
    };
    const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("appear");
        appearOnScroll.unobserve(entry.target);
      });
    }, options);
  
    faders.forEach(fader => {
      appearOnScroll.observe(fader);
    });
  
    // Initialize Leaflet map
    const map = L.map("map-container").setView([38.9, -77], 7);
  
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  
    const locations = [
      { coords: [38.9072, -77.0369], title: "Washington, D.C." },
      { coords: [39.0458, -76.6413], title: "Maryland" },
      { coords: [37.4316, -78.6569], title: "Virginia" },
    ];
  
    locations.forEach(({ coords, title }) => {
      L.marker(coords).addTo(map).bindPopup(title).openPopup();
    });
  
    // Contact form submit simulation
    const contactForm = document.querySelector(".contact-form");
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you for your message! We'll get back to you soon.");
      contactForm.reset();
    });
});
const servicesInfo = {
    "Electricity": "We offer residential and commercial electrical installation, repair, and maintenance services with licensed professionals.",
    "Plumbing": "Expert plumbing services including leak repair, pipe installation, and water heater solutions.",
    "Carpentry": "Custom woodwork, framing, cabinetry, doors, and more with precision and care.",
    "Wood Floors": "Professional hardwood and laminate floor installation, refinishing and repairs.",
    "Ceramic": "Ceramic tile installation for kitchens, bathrooms, floors, and walls with perfect finishing.",
    "Pressure Washing": "Power washing services for patios, driveways, siding, and more to leave surfaces spotless.",
    "Painting": "Interior and exterior painting with attention to detail and long-lasting finishes.",
    "Drywall": "Drywall installation, patching, taping, and finishing for all types of spaces.",
    "Framing": "Structural and decorative framing work for residential and light commercial projects.",
    "Home Cleaning": "Thorough home cleaning services to keep your space fresh and spotless.",
    "Decking": "Build and restore wooden decks with durable materials and stylish design.",
    "Grass Cutting": "Lawn care and grass cutting services to keep your garden looking clean and green."
  };
  
  // Modal elements
  const modal = document.createElement("div");
  modal.classList.add("modal-overlay");
  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close">&times;</button>
      <h3></h3>
      <p></p>
    </div>
  `;
  document.body.appendChild(modal);
  
  const modalTitle = modal.querySelector("h3");
  const modalDesc = modal.querySelector("p");
  const modalClose = modal.querySelector(".modal-close");
  
  modalClose.addEventListener("click", () => {
    modal.classList.remove("active");
  });
  
  // Show modal when clicking a service card
  document.querySelectorAll(".service-card").forEach(card => {
    card.addEventListener("click", () => {
      const title = card.querySelector("h3").textContent;
      modalTitle.textContent = title;
      modalDesc.textContent = servicesInfo[title] || "More information coming soon.";
      modal.classList.add("active");
    });
  });
  