document.documentElement.classList.add("js-ready");

const navigation = document.querySelector("#navegacao-principal");
const menuToggle = document.querySelector("[data-menu-toggle]");
const wordmark = document.querySelector(".wordmark");
const sectionLinks = document.querySelectorAll("[data-section]");
const sectionPanels = document.querySelectorAll("[data-section-panel]");

const activateSection = (sectionId) => {
  const selectedPanel = document.getElementById(sectionId);

  if (!selectedPanel || !selectedPanel.hasAttribute("data-section-panel")) {
    return false;
  }

  sectionPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel === selectedPanel);
  });

  sectionLinks.forEach((link) => {
    if (link.dataset.section === sectionId) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  return true;
};

const activateFromHash = () => {
  const sectionId = window.location.hash.slice(1);

  if (!sectionId || sectionId === "topo" || !activateSection(sectionId)) {
    activateSection("simpla");
  }
};

if (wordmark) {
  wordmark.addEventListener("click", () => {
    activateSection("simpla");
  });
}

if (navigation && sectionLinks.length && sectionPanels.length) {
  if (menuToggle) {
    menuToggle.hidden = false;

    const setMenuOpen = (isOpen) => {
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
      navigation.classList.toggle("is-open", isOpen);
    };

    menuToggle.addEventListener("click", () => {
      setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
    });

    window.addEventListener("resize", () => {
      const verticalMenu = window.matchMedia(
        "(max-width: 700px), (orientation: portrait) and (max-width: 900px)"
      ).matches;

      if (!verticalMenu) {
        setMenuOpen(false);
      }
    });
  }

  navigation.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) {
      return;
    }

    const link = event.target.closest("[data-section]");
    if (link) {
      activateSection(link.dataset.section);
      if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
        navigation.classList.remove("is-open");
      }
    }
  });

  window.addEventListener("hashchange", () => {
    activateFromHash();
  });

  activateFromHash();
}
