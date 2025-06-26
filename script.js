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
  