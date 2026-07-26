const ageGate = document.getElementById("ageGate");
const enterButton = document.getElementById("enterSite");
const ageKey = "bjb-age-confirmed";

try {
  if (localStorage.getItem(ageKey) === "yes") ageGate?.classList.add("hidden");
} catch {}

enterButton?.addEventListener("click", () => {
  try { localStorage.setItem(ageKey, "yes"); } catch {}
  ageGate?.classList.add("hidden");
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
