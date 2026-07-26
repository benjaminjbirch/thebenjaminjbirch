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

  const readerForm = document.getElementById("readerListForm");
  const readerDownloadStatus = document.getElementById("readerDownloadStatus");

  readerForm?.addEventListener("submit", (event) => {
    if (!readerForm.checkValidity()) return;

    const submitButton = readerForm.querySelector('button[type="submit"]');
    if (readerForm.dataset.submitted === "true") {
      event.preventDefault();
      return;
    }

    readerForm.dataset.submitted = "true";

    const downloadLink = document.createElement("a");
    downloadLink.href = "downloads/a-claim-renounced-reader-list-edition.pdf";
    downloadLink.download = "A Claim Renounced - Reader List Edition.pdf";
    downloadLink.hidden = true;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();

    if (readerDownloadStatus) readerDownloadStatus.hidden = false;
    if (submitButton) {
      submitButton.textContent = "Joined — book downloading";
      submitButton.disabled = true;
    }
  });

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
