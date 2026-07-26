const ageGate = document.getElementById("ageGate");
const enterButton = document.getElementById("enterSite");
const ageKey = "bjb-age-confirmed";

const dismissAgeGate = () => {
  if (!ageGate) return;
  ageGate.style.setProperty("display", "none", "important");
  ageGate.classList.add("hidden");
  ageGate.hidden = true;
  ageGate.setAttribute("aria-hidden", "true");
  ageGate.remove();
};

try {
  if (localStorage.getItem(ageKey) === "yes") dismissAgeGate();
} catch {}

enterButton?.addEventListener("click", () => {
  try { localStorage.setItem(ageKey, "yes"); } catch {}
  dismissAgeGate();
});

const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".site-nav");
menuButton?.addEventListener("click", () => {
  const open = nav?.classList.toggle("is-open") ?? false;
  menuButton.setAttribute("aria-expanded", String(open));
});
nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  nav.classList.remove("is-open");
  menuButton?.setAttribute("aria-expanded", "false");
}));

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());
