const ADMIN_EMAIL = "latifyiga193@gmail.com";
const ADMIN_PASSWORD = "Ehsan256";
const PACKAGE_STORAGE_KEY = "latrat_expeditions_packages_v1";
const ADMIN_SESSION_KEY = "latrat_admin_session_v1";

const defaultPackages = [
  {
    id: "pkg-gorilla-uganda",
    title: "Luxury Gorilla Trekking in Bwindi",
    location: "Bwindi Impenetrable Forest, Uganda",
    country: "uganda",
    type: "gorilla",
    duration: "short",
    price: "$1,550 / person",
    rating: "★ 4.9 (176 reviews)",
    visits: 324,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    summary: "Track family groups of mountain gorillas through misty rainforest trails with expert local guides.",
    details: "This package blends wildlife adventure with comfort lodge stays. Wake before dawn for a guided gorilla trek in Bwindi, then relax at a premium forest lodge. You will also visit local communities and learn about conservation efforts.",
    highlights: ["One gorilla trekking permit included", "Luxury forest lodge accommodation", "Guided nature walk and cultural village visit"],
    topDestination: true,
    mostVisited: true
  },
  {
    id: "pkg-mara-migration",
    title: "Great Migration Safari",
    location: "Maasai Mara & Serengeti",
    country: "kenya",
    type: "safari",
    duration: "medium",
    price: "$2,250 / person",
    rating: "★ 4.8 (132 reviews)",
    visits: 287,
    image: "https://images.unsplash.com/photo-1524933511246-9c2f44f00651?auto=format&fit=crop&w=900&q=80",
    summary: "Follow the wildebeest herds between Tanzania and Kenya in a premium safari itinerary.",
    details: "Experience the world-famous Great Migration in style. This package includes morning and evening game drives, luxury tented camps, and private transfers between the Maasai Mara and Serengeti. Look out for the Big Five, river crossings, and endless savanna panoramas.",
    highlights: ["Daily game drives", "Luxury tented safari camp", "Visit local Maasai village"],
    topDestination: true,
    mostVisited: true
  },
  {
    id: "pkg-kilimanjaro-machame",
    title: "Machame Route Kilimanjaro Adventure",
    location: "Mount Kilimanjaro, Tanzania",
    country: "tanzania",
    type: "mountain",
    duration: "long",
    price: "$2,900 / person",
    rating: "★ 4.7 (98 reviews)",
    visits: 214,
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80",
    summary: "Summit Mount Kilimanjaro via the scenic Machame route with full support from our mountain crew.",
    details: "Climb Africa's highest peak across six nights, supported by experienced guides and crews. Each day includes acclimatization, meals, and premium tented camping. Celebrate your summit from the roof of Africa.",
    highlights: ["Full Machame route itinerary", "Experienced mountain guides", "High-quality camping and dining"],
    topDestination: false,
    mostVisited: true
  },
  {
    id: "pkg-virunga-rwanda",
    title: "Rwanda Gorilla & Volcano Trail",
    location: "Volcanoes National Park, Rwanda",
    country: "rwanda",
    type: "gorilla",
    duration: "medium",
    price: "$2,600 / person",
    rating: "★ 4.9 (108 reviews)",
    visits: 182,
    image: "https://images.unsplash.com/photo-1573768468286-a9c2101e62b6?auto=format&fit=crop&w=900&q=80",
    summary: "Combine primate trekking and volcanic scenery for a private Rwanda adventure.",
    details: "Enjoy a luxury stay in Rwanda's lush highlands, with a guided mountain gorilla trek and national park walks beside misty volcanoes. This itinerary celebrates Rwanda's culture, cuisine, and conservation.",
    highlights: ["Gorilla permit included", "Luxury lodge stay", "Volcano trail day hike"],
    topDestination: true,
    mostVisited: false
  },
  {
    id: "pkg-source-nile",
    title: "Source of the Nile & Wildlife Explorer",
    location: "Jinja & Murchison Falls, Uganda",
    country: "uganda",
    type: "cultural",
    duration: "medium",
    price: "$1,450 / person",
    rating: "★ 4.8 (90 reviews)",
    visits: 156,
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80",
    summary: "Discover Uganda's Nile source, cultural villages, and Murchison Falls wildlife cruise.",
    details: "This package blends river adventure with wildlife discovery. Visit the Source of the Nile in Jinja, experience a boat cruise on Murchison Falls, and search for hippos, crocodiles, and lion sightings.",
    highlights: ["Boat cruise on the Nile", "Murchison Falls park entry", "Cultural community visit"],
    topDestination: false,
    mostVisited: false
  }
];

function loadPackages() {
  try {
    const stored = localStorage.getItem(PACKAGE_STORAGE_KEY);
    if (!stored) return [...defaultPackages];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length ? parsed : [...defaultPackages];
  } catch (error) {
    return [...defaultPackages];
  }
}

function savePackages(packages) {
  localStorage.setItem(PACKAGE_STORAGE_KEY, JSON.stringify(packages));
}

function getStoredPackages() {
  return loadPackages();
}

function isAdminLoggedIn() {
  return localStorage.getItem(ADMIN_SESSION_KEY) === "true";
}

function setAdminLoggedIn(value) {
  if (value) {
    localStorage.setItem(ADMIN_SESSION_KEY, "true");
  } else {
    localStorage.removeItem(ADMIN_SESSION_KEY);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const brandLogo = document.getElementById("brandLogo");
  const adminSection = document.getElementById("adminSection");
  const adminLogoutBtn = document.getElementById("adminLogoutBtn");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });

  if (brandLogo) {
    let longPressTimer;
    const openLogin = () => {
      openAdminLoginModal();
    };

    brandLogo.addEventListener("dblclick", openLogin);
    brandLogo.addEventListener("mousedown", () => {
      longPressTimer = setTimeout(openLogin, 650);
    });
    brandLogo.addEventListener("mouseup", () => {
      clearTimeout(longPressTimer);
    });
    brandLogo.addEventListener("mouseleave", () => {
      clearTimeout(longPressTimer);
    });
    brandLogo.addEventListener("touchstart", () => {
      longPressTimer = setTimeout(openLogin, 650);
    });
    brandLogo.addEventListener("touchend", () => {
      clearTimeout(longPressTimer);
    });
    brandLogo.addEventListener("click", (event) => {
      event.preventDefault();
    });
  }

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
        card.style.display = matchesCountry && matchesType && matchesDuration ? "flex" : "none";
      });

      const toursSection = document.getElementById("tours");
      if (toursSection) {
        toursSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

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

  const adminLoginForm = document.getElementById("adminLoginForm");
  if (adminLoginForm) {
    adminLoginForm.addEventListener("submit", handleAdminLogin);
  }

  if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener("click", () => {
      setAdminLoggedIn(false);
      if (adminSection) adminSection.classList.add("hidden");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const adminCancelEdit = document.getElementById("adminCancelEdit");
  if (adminCancelEdit) {
    adminCancelEdit.addEventListener("click", () => {
      resetAdminForm();
    });
  }

  const adminPackageForm = document.getElementById("adminPackageForm");
  if (adminPackageForm) {
    adminPackageForm.addEventListener("submit", handleAdminPackageForm);
  }

  renderTours();
  if (isAdminLoggedIn() && adminSection) {
    adminSection.classList.remove("hidden");
    renderAdminDashboard();
  }
});

function createTourCard(pkg) {
  const card = document.createElement("div");
  card.className = "tour-card";
  card.dataset.country = pkg.country;
  card.dataset.type = pkg.type;
  card.dataset.duration = pkg.duration;
  card.dataset.id = pkg.id;
  card.innerHTML = `
    <div class="card-img-wrapper">
      <img src="${pkg.image}" alt="${pkg.title}">
      <span class="price-tag">${pkg.price}</span>
    </div>
    <div class="tour-content">
      <div class="tour-meta">
        <span>Duration: ${pkg.duration === "short" ? "3-4 Days" : pkg.duration === "medium" ? "5-9 Days" : "10+ Days"}</span>
        <span>Location: ${pkg.location}</span>
      </div>
      <h3>${pkg.title}</h3>
      <p>${pkg.summary}</p>
      <div class="tour-footer">
        <span class="rating">${pkg.rating}</span>
        <div class="tour-buttons">
          <button class="btn btn-outline" type="button" onclick="openBookingModal('${pkg.title}')">Reserve Spot</button>
          <button class="btn btn-primary" type="button" onclick="openPackageDetail('${pkg.id}')">View Details</button>
        </div>
      </div>
    </div>
  `;
  card.addEventListener("click", (event) => {
    if (event.target.closest("button")) return;
    openPackageDetail(pkg.id);
  });
  return card;
}

function renderTours() {
  const grid = document.getElementById("toursGrid");
  if (!grid) return;
  const packages = getStoredPackages();
  grid.innerHTML = "";
  packages.forEach((pkg) => {
    grid.appendChild(createTourCard(pkg));
  });
}

function openPackageDetail(packageId) {
  // Navigate to the package details page for a full-screen, dedicated view
  if (!packageId) return;
  const href = `package.html?id=${encodeURIComponent(packageId)}`;
  window.location.href = href;
}

function closePackageDetail() {
  const modal = document.getElementById("packageDetailModal");
  if (modal) {
    modal.classList.remove("active");
  }
}

function openAdminLoginModal() {
  const modal = document.getElementById("adminLoginModal");
  const error = document.getElementById("adminLoginError");
  if (error) {
    error.textContent = "";
  }
  if (modal) {
    modal.classList.add("active");
  }
}

function closeAdminLoginModal() {
  const modal = document.getElementById("adminLoginModal");
  if (modal) {
    modal.classList.remove("active");
  }
}

function handleAdminLogin(event) {
  event.preventDefault();
  const emailInput = document.getElementById("adminEmail");
  const passwordInput = document.getElementById("adminPassword");
  const error = document.getElementById("adminLoginError");
  if (!emailInput || !passwordInput || !error) return;
  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    // persist session and redirect to the dedicated admin page
    setAdminLoggedIn(true);
    error.textContent = "";
    closeAdminLoginModal();
    // redirect to admin page which will verify session and render dashboard
    window.location.href = 'admin.html';
  } else {
    error.textContent = "Invalid admin credentials. Please try again.";
  }
}

function renderAdminDashboard() {
  renderTours();
  renderAdminSummary();
  renderAdminPackageList();
  renderAdminFeatureLists();
}

function renderAdminSummary() {
  const packages = getStoredPackages();
  const total = packages.length;
  const top = packages.filter((pkg) => pkg.topDestination).length;
  const visited = packages.filter((pkg) => pkg.mostVisited).length;
  const totalEl = document.getElementById("adminTotalPackages");
  const topEl = document.getElementById("adminTopPackages");
  const visitedEl = document.getElementById("adminVisitedPackages");
  if (totalEl) totalEl.textContent = total;
  if (topEl) topEl.textContent = top;
  if (visitedEl) visitedEl.textContent = visited;
}

function renderAdminPackageList() {
  const packages = getStoredPackages();
  const list = document.getElementById("adminPackageList");
  if (!list) return;
  list.innerHTML = "";
  if (!packages.length) {
    list.innerHTML = "<p>No packages available yet.</p>";
    return;
  }
  packages.forEach((pkg) => {
    const item = document.createElement("div");
    item.className = "admin-package-item";
    item.innerHTML = `
      <div>
        <strong>${pkg.title}</strong>
        <p>${pkg.location} · ${pkg.price}</p>
        <div class="package-tags">
          ${pkg.topDestination ? '<span class="tag top">Top</span>' : ""}
          ${pkg.mostVisited ? '<span class="tag visited">Popular</span>' : ""}
        </div>
      </div>
      <div class="admin-package-actions">
        <button class="btn btn-outline" type="button" onclick="editAdminPackage('${pkg.id}')">Edit</button>
        <button class="btn btn-primary" type="button" onclick="deleteAdminPackage('${pkg.id}')">Delete</button>
      </div>
    `;
    list.appendChild(item);
  });
}

function renderAdminFeatureLists() {
  const packages = getStoredPackages();
  const topList = document.getElementById("adminTopDestList");
  const visitedList = document.getElementById("adminVisitedList");
  if (topList) {
    const topPackages = packages.filter((pkg) => pkg.topDestination);
    topList.innerHTML = topPackages.length ? topPackages.map((pkg) => `<div class="feature-item"><strong>${pkg.title}</strong><span>${pkg.location}</span></div>`).join("") : "<p>None set yet.</p>";
  }
  if (visitedList) {
    const visitedPackages = packages.filter((pkg) => pkg.mostVisited).sort((a, b) => b.visits - a.visits);
    visitedList.innerHTML = visitedPackages.length ? visitedPackages.map((pkg) => `<div class="feature-item"><strong>${pkg.title}</strong><span>${pkg.visits} visits</span></div>`).join("") : "<p>None set yet.</p>";
  }
}

function editAdminPackage(packageId) {
  const packages = getStoredPackages();
  const pkg = packages.find((item) => item.id === packageId);
  if (!pkg) return;
  document.getElementById("adminPackageId").value = pkg.id;
  document.getElementById("adminPackageTitle").value = pkg.title;
  document.getElementById("adminPackageLocation").value = pkg.location;
  document.getElementById("adminPackageCountry").value = pkg.country;
  document.getElementById("adminPackageType").value = pkg.type;
  document.getElementById("adminPackageDuration").value = pkg.duration;
  document.getElementById("adminPackagePrice").value = pkg.price;
  document.getElementById("adminPackageRating").value = pkg.rating;
  document.getElementById("adminPackageVisits").value = pkg.visits;
  document.getElementById("adminPackageImage").value = pkg.image;
  document.getElementById("adminPackageSummary").value = pkg.summary;
  document.getElementById("adminPackageDetails").value = pkg.details;
  document.getElementById("adminPackageTop").checked = pkg.topDestination;
  document.getElementById("adminPackageVisited").checked = pkg.mostVisited;
  document.getElementById("adminFormTitle").textContent = "Edit Package";
  document.getElementById("adminCancelEdit").classList.remove("hidden");
  document.getElementById("adminSection").scrollIntoView({ behavior: "smooth" });
}

function deleteAdminPackage(packageId) {
  if (!confirm("Delete this package permanently?")) return;
  const packages = getStoredPackages().filter((pkg) => pkg.id !== packageId);
  savePackages(packages);
  renderAdminDashboard();
}

function resetAdminForm() {
  document.getElementById("adminPackageForm").reset();
  document.getElementById("adminPackageId").value = "";
  document.getElementById("adminFormTitle").textContent = "Add New Package";
  document.getElementById("adminCancelEdit").classList.add("hidden");
}

async function handleAdminPackageForm(event) {
  event.preventDefault();
  const idInput = document.getElementById("adminPackageId");
  const title = document.getElementById("adminPackageTitle").value.trim();
  const location = document.getElementById("adminPackageLocation").value.trim();
  const country = document.getElementById("adminPackageCountry").value;
  const type = document.getElementById("adminPackageType").value;
  const duration = document.getElementById("adminPackageDuration").value;
  const price = document.getElementById("adminPackagePrice").value.trim();
  const rating = document.getElementById("adminPackageRating").value.trim();
  const visits = Number(document.getElementById("adminPackageVisits").value) || 0;
  const image = document.getElementById("adminPackageImage").value.trim();
  const filesInput = document.getElementById("adminPackageFiles");
  const extraUrlsInput = document.getElementById("adminPackageImageUrls");
  const summary = document.getElementById("adminPackageSummary").value.trim();
  const details = document.getElementById("adminPackageDetails").value.trim();
  const topDestination = document.getElementById("adminPackageTop").checked;
  const mostVisited = document.getElementById("adminPackageVisited").checked;
  if (!title || !location || !price || !rating || !summary || !details) {
    alert("Please complete all required package fields.");
    return;
  }
  // collect images: from text input, uploaded files, and extra URLs
  let collectedImages = [];
  if (image) collectedImages.push(image);
  if (extraUrlsInput && extraUrlsInput.value.trim()) {
    const parts = extraUrlsInput.value.split(',').map(s=>s.trim()).filter(Boolean);
    collectedImages = collectedImages.concat(parts);
  }
  // upload files if any
  if (filesInput && filesInput.files && filesInput.files.length) {
    try {
      const fd = new FormData();
      for (const f of filesInput.files) fd.append('images', f);
      const res = await fetch('/upload', { method: 'POST', body: fd });
      if (res.ok) {
        const j = await res.json();
        if (j.files && Array.isArray(j.files)) collectedImages = collectedImages.concat(j.files);
      } else {
        console.warn('Image upload failed', await res.text());
      }
    } catch (e) { console.warn('Upload error', e); }
  }
  const packages = getStoredPackages();
  const editingId = idInput.value;
  if (editingId) {
    const existingIndex = packages.findIndex((pkg) => pkg.id === editingId);
    if (existingIndex >= 0) {
      packages[existingIndex] = {
        id: editingId,
        title,
        location,
        country,
        type,
        duration,
        price,
        rating,
        visits,
        image: (collectedImages.length ? collectedImages[0] : (image || packages[existingIndex].image)),
        images: (collectedImages.length ? collectedImages : (packages[existingIndex].images || [packages[existingIndex].image])),
        summary,
        details,
        highlights: packages[existingIndex].highlights || ["Signature safari itinerary", "Professional tour guide", "Comfortable accommodation"],
        topDestination,
        mostVisited
      };
    }
  } else {
    const newPackage = {
      id: `pkg-${Date.now()}`,
      title,
      location,
      country,
      type,
      duration,
      price,
      rating,
      visits,
      image: (collectedImages.length ? collectedImages[0] : (image || "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80")),
      images: (collectedImages.length ? collectedImages : []),
      summary,
      details,
      highlights: ["Signature safari itinerary", "Professional tour guide", "Comfortable accommodation"],
      topDestination,
      mostVisited
    };
    packages.unshift(newPackage);
  }
  savePackages(packages);
  // try persist to server and commit
  try {
    await fetch('/save-packages', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(packages) });
  } catch (e) { console.warn('Save-packages failed', e); }
  renderAdminDashboard();
  resetAdminForm();
}

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

function handleFormSubmit(event) {
  event.preventDefault();
  alert("Thank you! Your inquiry has been submitted to Latrat Expeditions. Our team will contact you shortly.");
  document.getElementById("contactForm").reset();
}

function handleModalSubmit(event) {
  event.preventDefault();
  alert("Reservation request submitted! We will check availability for your selected dates and respond via email.");
  closeBookingModal();
  document.getElementById("modalForm").reset();
}
