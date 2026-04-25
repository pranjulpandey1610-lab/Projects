const topbar = document.getElementById("topbar");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const navLinks = mainNav.querySelectorAll("a");
const toTop = document.getElementById("toTop");

menuToggle.addEventListener("click", () => {
  mainNav.classList.toggle("open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
  });
});

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  topbar.classList.toggle("scrolled", y > 24);
  toTop.classList.toggle("visible", y > 640);
});

toTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const ticker = document.getElementById("destinationTicker");
const tickerWords = [
  "Rajasthan",
  "Kerala Backwaters",
  "Kashmir",
  "Meghalaya",
  "Goa",
  "Varanasi"
];

let tickerIndex = 0;
setInterval(() => {
  ticker.style.opacity = "0";
  setTimeout(() => {
    tickerIndex = (tickerIndex + 1) % tickerWords.length;
    ticker.textContent = tickerWords[tickerIndex];
    ticker.style.opacity = "1";
  }, 220);
}, 2600);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("shown");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".reveal").forEach((item) => {
  revealObserver.observe(item);
});

const statValues = document.querySelectorAll("[data-target]");
const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const el = entry.target;
      const target = Number(el.dataset.target);
      const duration = 1300;
      const start = performance.now();
      const isDecimal = Number.isInteger(target) === false;

      const update = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const value = target * progress;

        if (isDecimal) {
          el.textContent = value.toFixed(1);
        } else {
          el.textContent = Math.floor(value).toLocaleString();
        }

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = isDecimal ? target.toFixed(1) : target.toLocaleString();
        }
      };

      requestAnimationFrame(update);
      statObserver.unobserve(el);
    });
  },
  { threshold: 0.45 }
);

statValues.forEach((stat) => statObserver.observe(stat));

const filterWrap = document.getElementById("filters");
const cards = [...document.querySelectorAll(".dest-card")];

filterWrap.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-filter]");
  if (!button) {
    return;
  }

  const selected = button.dataset.filter;
  filterWrap.querySelectorAll(".chip").forEach((chip) => {
    chip.classList.toggle("active", chip === button);
  });

  cards.forEach((card) => {
    const match = selected === "all" || card.dataset.region === selected;
    card.classList.toggle("hidden", !match);
  });
});

const track = document.getElementById("testimonialTrack");
const slides = [...track.children];
const prevBtn = document.getElementById("prevTestimonial");
const nextBtn = document.getElementById("nextTestimonial");
let slideIndex = 0;
let autoSlideId;

function renderSlide(index) {
  track.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
  slideIndex = (slideIndex + 1) % slides.length;
  renderSlide(slideIndex);
}

function prevSlide() {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  renderSlide(slideIndex);
}

function resetAutoSlide() {
  clearInterval(autoSlideId);
  autoSlideId = setInterval(nextSlide, 4200);
}

nextBtn.addEventListener("click", () => {
  nextSlide();
  resetAutoSlide();
});

prevBtn.addEventListener("click", () => {
  prevSlide();
  resetAutoSlide();
});

resetAutoSlide();

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const galleryButtons = document.querySelectorAll(".gallery-item");

galleryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const source = button.querySelector("img");
    lightboxImage.src = source.src;
    lightboxImage.alt = source.alt;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

const canvas = document.getElementById("skyCanvas");
const ctx = canvas.getContext("2d");
let points = [];

function sizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createPoints() {
  points = Array.from({ length: 58 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.9 + 0.8,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3
  }));
}

function drawPoints() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  points.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) {
      p.vx *= -1;
    }

    if (p.y < 0 || p.y > canvas.height) {
      p.vy *= -1;
    }

    ctx.beginPath();
    ctx.fillStyle = "rgba(24, 97, 132, 0.38)";
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();

    for (let j = i + 1; j < points.length; j += 1) {
      const q = points[j];
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(22, 103, 85, ${0.12 - distance / 1100})`;
        ctx.lineWidth = 0.6;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(drawPoints);
}

sizeCanvas();
createPoints();
drawPoints();

window.addEventListener("resize", () => {
  sizeCanvas();
  createPoints();
});
