// ===== Projects data =====
const projects = [
  { img: "assets/project-1.jpg", title: "Noir Kitchen", place: "Copenhagen", year: "2024", span: "tall" },
  { img: "assets/project-2.jpg", title: "Oak Vista Suite", place: "Tokyo", year: "2024", span: "wide" },
  { img: "assets/project-3.jpg", title: "Brass Spiral", place: "Milan", year: "2023", span: "tall" },
  { img: "assets/project-4.jpg", title: "White Cube", place: "Berlin", year: "2023", span: "wide" },
  { img: "assets/project-5.jpg", title: "Travertine Bath", place: "Lisbon", year: "2023", span: "tall" },
  { img: "assets/project-6.jpg", title: "Loft District", place: "New York", year: "2022", span: "wide" },
];

const grid = document.getElementById("worksGrid");
projects.forEach((p, i) => {
  const n = String(i + 1).padStart(2, "0");
  const card = document.createElement("article");
  card.className = `card ${p.span} reveal`;
  card.style.transitionDelay = `${(i % 2) * 120}ms`;
  card.dataset.cursorHover = "true";
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

// ===== Hero parallax =====
const heroBg = document.getElementById("heroBg");
window.addEventListener("scroll", () => {
  const y = window.scrollY;
  if (heroBg && y < window.innerHeight) {
    heroBg.style.transform = `translateY(${y * 0.4}px)`;
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
