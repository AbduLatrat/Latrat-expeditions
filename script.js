document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Toggle
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // Close nav on click
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });

  // 2. Filter / Search Expeditions
  const filterBtn = document.getElementById("filterBtn");
  if (filterBtn) {
    filterBtn.addEventListener("click", () => {
      const selectedCountry = document.getElementById("dest-select").value;
      const selectedType = document.getElementById("type-select").value;
      const selectedDuration = document.getElementById("duration-select").value;

      const tourCards = document.querySelectorAll("#toursGrid .tour-card");

      tourCards.forEach((card) => {
        const country = card.getAttribute("data-country");
        const type = card.getAttribute("data-type");
        const duration = card.getAttribute("data-duration");

        const matchesCountry = selectedCountry === "all" || selectedCountry === country;
        const matchesType = selectedType === "all" || selectedType === type;
        const matchesDuration = selectedDuration === "all" || selectedDuration === duration;

        if (matchesCountry && matchesType && matchesDuration) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });

      // Scroll smoothly to tours grid
      const toursSection = document.getElementById("tours");
      if (toursSection) {
        toursSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // 3. Animated Number Counter for Stats Section
  const statNumbers = document.querySelectorAll(".stat-num");
  let animated = false;

  const animateCounters = () => {
    statNumbers.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      const speed = 200;
      const increment = target / speed;

      const updateCount = () => {
        const count = +counter.innerText;
        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 15);
        } else {
          counter.innerText = target;
        }
      };

      updateCount();
    });
  };

  // Trigger counter animation on scroll into view
  window.addEventListener("scroll", () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      const position = aboutSection.getBoundingClientRect();
      if (position.top < window.innerHeight && !animated) {
        animated = true;
        animateCounters();
      }
    }
  });
});

// 4. Modal Open/Close Logic
function openBookingModal(packageName) {
  const modal = document.getElementById("bookingModal");
  const packageLabel = document.getElementById("modalPackageName");

  if (packageLabel) {
    packageLabel.textContent = `Selected Package: ${packageName}`;
  }

  if (modal) {
    modal.classList.add("active");
  }
}

function closeBookingModal() {
  const modal = document.getElementById("bookingModal");
  if (modal) {
    modal.classList.remove("active");
  }
}

// 5. Contact Form Handler
function handleFormSubmit(event) {
  event.preventDefault();
  alert("Thank you! Your inquiry has been submitted to Latrat Expeditions. Our team will contact you shortly.");
  document.getElementById("contactForm").reset();
}

// 6. Modal Booking Form Handler
function handleModalSubmit(event) {
  event.preventDefault();
  alert("Reservation request submitted! We will check availability for your selected dates and respond via email.");
  closeBookingModal();
  document.getElementById("modalForm").reset();
}