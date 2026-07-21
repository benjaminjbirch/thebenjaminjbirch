const ageGate = document.getElementById("ageGate");
const enterButton = document.getElementById("enterSite");
const AGE_KEY = "bjb-age-confirmed";

try {
  if (localStorage.getItem(AGE_KEY) === "yes") {
    ageGate?.classList.add("hidden");
  } else {
    document.body.classList.add("gate-open");
  }
} catch {
  document.body.classList.add("gate-open");
}

enterButton?.addEventListener("click", () => {
  try { localStorage.setItem(AGE_KEY, "yes"); } catch {}
  ageGate?.classList.add("hidden");
  document.body.classList.remove("gate-open");
});

const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

toggle?.addEventListener("click", () => {
  const open = nav?.classList.toggle("open") ?? false;
  toggle.setAttribute("aria-expanded", String(open));
});

nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  toggle?.setAttribute("aria-expanded", "false");
}));

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(el => observer.observe(el));
} else {
  revealItems.forEach(el => el.classList.add("visible"));
}
