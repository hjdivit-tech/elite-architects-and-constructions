// ===== Projects data =====
const projects = [
  { img: "assets/project-1.jpg", title: "Noir Kitchen", place: "Copenhagen", year: "2024", span: "tall", category: "interiors latest" },
  { img: "assets/project-2.jpg", title: "Oak Vista Suite", place: "Tokyo", year: "2024", span: "wide", category: "interiors latest" },
  { img: "assets/project-3.jpg", title: "Brass Spiral", place: "Milan", year: "2023", span: "tall", category: "interiors" },
  { img: "assets/project-4.jpg", title: "White Cube", place: "Berlin", year: "2023", span: "wide", category: "exteriors" },
  { img: "assets/project-5.jpg", title: "Travertine Bath", place: "Lisbon", year: "2023", span: "tall", category: "interiors" },
  { img: "assets/project-6.jpg", title: "Loft District", place: "New York", year: "2022", span: "wide", category: "exteriors" },
  { img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", title: "Concrete Villa", place: "Oslo", year: "2022", span: "tall", category: "exteriors" },
  { img: "https://images.unsplash.com/photo-1600607687931-570a3c9b7430?auto=format&fit=crop&w=800&q=80", title: "Glass Pavilion", place: "Zurich", year: "2022", span: "wide", category: "interiors" }
];

const grid = document.getElementById("worksGrid");
const filterBtns = document.querySelectorAll('.filter-btn');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const loadLessBtn = document.getElementById('loadLessBtn');
let currentFilter = 'all';
let itemsToShow = 4;

function renderProjects() {
  grid.innerHTML = '';
  const filtered = projects.filter(p => currentFilter === 'all' || p.category.includes(currentFilter));
  
  const visibleProjects = filtered.slice(0, itemsToShow);
  
  visibleProjects.forEach((p, i) => {
    const n = String(i + 1).padStart(2, "0");
    const card = document.createElement("article");
    card.className = `card ${p.span} reveal is-visible`;
    card.style.transitionDelay = `${(i % 2) * 120}ms`;
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}" loading="lazy" />
      <div class="card-overlay"></div>
      <div class="card-info">
        <div class="card-num">— ${n} / ${p.year}</div>
        <h3 class="display-text card-title">${p.title}</h3>
        <div class="card-place">${p.place.toUpperCase()}</div>
      </div>
    `;
    grid.appendChild(card);
  });
  
  if (itemsToShow >= filtered.length) {
    loadMoreBtn.style.display = 'none';
  } else {
    loadMoreBtn.style.display = 'inline-block';
  }

  if (itemsToShow > 4) {
    loadLessBtn.style.display = 'inline-block';
  } else {
    loadLessBtn.style.display = 'none';
  }
}

if(filterBtns.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      itemsToShow = 4;
      renderProjects();
    });
  });

  loadMoreBtn.addEventListener('click', () => {
    itemsToShow += 4;
    renderProjects();
  });

  loadLessBtn.addEventListener('click', () => {
    itemsToShow = 4;
    renderProjects();
    // Scroll back to the top of the works section so the user doesn't lose their place
    document.getElementById('works').scrollIntoView({ behavior: 'smooth' });
  });

  renderProjects();
}

// ===== Reveal on scroll =====
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("is-visible");
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// ===== Hero Slideshow =====
const slides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;
if (slides.length > 0) {
  setInterval(() => {
    slides.forEach(s => s.classList.remove('previous'));
    slides[currentSlide].classList.remove('active');
    slides[currentSlide].classList.add('previous');
    
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 3000);
}

// ===== Hero parallax =====
const heroBg = document.getElementById("heroBg");
window.addEventListener("scroll", () => {
  const y = window.scrollY;
  if (heroBg && y < window.innerHeight) {
    heroBg.style.transform = `translateY(${y * 0.4}px)`;
  }
}, { passive: true });

// ===== Navbar Scroll =====
const siteNav = document.getElementById("siteNav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    siteNav.classList.add("scrolled");
  } else {
    siteNav.classList.remove("scrolled");
  }
}, { passive: true });

// Custom cursor removed - default cursor used

// ===== Magnetic button =====
const mag = document.getElementById("magneticBtn");
if (mag) {
  mag.addEventListener("mousemove", (e) => {
    const r = mag.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    mag.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
  });
  mag.addEventListener("mouseleave", () => {
    mag.style.transform = "translate(0,0)";
  });
}
