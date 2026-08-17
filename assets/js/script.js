(() => {
  "use strict";

  const body = document.body;
  const gate = document.getElementById("ageGate");
  const enterButton = document.getElementById("enterSite");
  const storageKey = "bjb-age-confirmed";

  const hasAgeConfirmation = () => {
    try { return window.localStorage.getItem(storageKey) === "yes"; }
    catch (_) { return false; }
  };

  const unlockSite = () => {
    try { window.localStorage.setItem(storageKey, "yes"); } catch (_) {}
    if (gate) {
      gate.hidden = true;
      gate.setAttribute("aria-hidden", "true");
      gate.style.display = "none";
    }
    body.classList.remove("age-locked");
  };

  if (gate && enterButton && !hasAgeConfirmation()) {
    gate.hidden = false;
    gate.setAttribute("aria-hidden", "false");
    gate.style.removeProperty("display");
    body.classList.add("age-locked");
    window.setTimeout(() => enterButton.focus(), 0);
    enterButton.addEventListener("click", unlockSite);
  } else if (gate) {
    gate.hidden = true;
    gate.setAttribute("aria-hidden", "true");
    gate.style.display = "none";
  }

  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-button");
  const nav = document.querySelector(".site-nav");

  const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 24);
  const closeMenu = () => {
    nav?.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Open navigation");
    body.classList.remove("menu-open");
  };

  menuButton?.addEventListener("click", () => {
    const open = nav?.classList.toggle("is-open") ?? false;
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    body.classList.toggle("menu-open", open);
  });
  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });
  window.addEventListener("resize", () => { if (window.innerWidth > 980) closeMenu(); });
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();
})();
