(() => {
  "use strict";

  const body = document.body;
  const gate = document.getElementById("ageGate");
  const enterButton = document.getElementById("enterSite");
  const storageKey = "benjamin-j-birch-age-confirmed";

  const setAgeConfirmed = () => {
    try {
      sessionStorage.setItem(storageKey, "yes");
    } catch (_) {
      // The gate still works when browser storage is unavailable.
    }
  };

  const hasAgeConfirmation = () => {
    try {
      return sessionStorage.getItem(storageKey) === "yes";
    } catch (_) {
      return false;
    }
  };

  const unlockSite = (remember = true) => {
    if (remember) setAgeConfirmed();
    if (gate) {
      gate.hidden = true;
      gate.setAttribute("aria-hidden", "true");
    }
    body.classList.remove("age-locked");
  };

  if (gate && enterButton) {
    if (hasAgeConfirmation()) {
      unlockSite(false);
    } else {
      gate.hidden = false;
      gate.setAttribute("aria-hidden", "false");
      body.classList.add("age-locked");
      window.setTimeout(() => enterButton.focus(), 0);
    }

    enterButton.addEventListener("click", () => {
      unlockSite(true);
      document.getElementById("main-content")?.focus({ preventScroll: true });
    });
  } else {
    body.classList.remove("age-locked");
  }

  const menuButton = document.querySelector(".menu-button");
  const nav = document.querySelector(".site-nav");

  const closeMenu = () => {
    nav?.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
  };

  menuButton?.addEventListener("click", () => {
    const open = nav?.classList.toggle("is-open") ?? false;
    menuButton.setAttribute("aria-expanded", String(open));
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) closeMenu();
  });

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
