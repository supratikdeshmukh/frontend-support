// ✅ 1. Navbar
window.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".main-navbar");
  const navLinks = document.querySelectorAll(".nav-links a");
  const hamburger = document.getElementById("hamburger");
  const navLinksContainer = document.querySelector(".nav-links");

  const bannerContainer = document.querySelector(".banner");
  const captionText = document.getElementById("caption-text");
  const indicatorsContainer = document.getElementById("indicators");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  const whatsappFAB = document.getElementById("whatsappFAB");

  const handleNavbarScrollEffect = () => {
    nav?.classList.toggle("scrolled", window.scrollY > 20);
  };
  window.addEventListener("scroll", handleNavbarScrollEffect);
  handleNavbarScrollEffect();

  const observerOptions = {
    root: null,
    rootMargin: "-40% 0px -40% 0px",
    threshold: 0,
  };

  const sections = document.querySelectorAll("section[id]");
  let activeSectionId = null;

  const observer = new IntersectionObserver((entries) => {
    let currentActiveCandidate = null;
    let maxRatio = 0;

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          currentActiveCandidate = entry.target.getAttribute("id");
        }
      }
    });

    if (
      !currentActiveCandidate &&
      window.scrollY < (sections[0]?.offsetHeight / 2 || 200)
    ) {
      currentActiveCandidate = sections[0]?.getAttribute("id") || "home";
    }

    if (currentActiveCandidate && currentActiveCandidate !== activeSectionId) {
      activeSectionId = currentActiveCandidate;

      navLinks.forEach((link) => {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
      });

      const targetLink = document.querySelector(
        `.nav-links a[href="#${activeSectionId}"]`
      );
      if (targetLink) {
        targetLink.classList.add("active");
        targetLink.setAttribute("aria-current", "page");
      }
    }
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });

  const setInitialActiveLink = () => {
    let initialActiveId = "home";

    for (let i = 0; i < sections.length; i++) {
      const rect = sections[i].getBoundingClientRect();

      if (
        rect.top <= (nav?.offsetHeight || 0) + 50 &&
        rect.bottom > (nav?.offsetHeight || 0) + 50
      ) {
        initialActiveId = sections[i].getAttribute("id");
        break;
      }
    }

    const initialTargetLink = document.querySelector(
      `.nav-links a[href="#${initialActiveId}"]`
    );
    if (initialTargetLink && !initialTargetLink.classList.contains("active")) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
      });
      initialTargetLink.classList.add("active");
      initialTargetLink.setAttribute("aria-current", "page");
      activeSectionId = initialActiveId;
    }
  };

  setInitialActiveLink();
  window.addEventListener("resize", setInitialActiveLink);

  hamburger?.addEventListener("click", () => {
    navLinksContainer?.classList.toggle("show");
    const icon = hamburger.querySelector("i");
    if (icon) {
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-times");
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (
        window.innerWidth <= 1260 &&
        navLinksContainer?.classList.contains("show")
      ) {
        navLinksContainer.classList.remove("show");
        const icon = hamburger?.querySelector("i");
        if (icon) {
          icon.classList.add("fa-bars");
          icon.classList.remove("fa-times");
        }
      }
    });
  });

  // ✅ 2. Banner
  const banners = [
    { image: "./img/banner/1.jpg", caption: "Aperiam aut deleniti" },
    {
      image: "./img/banner/2.jpg",
      caption: "sit amet adipisicing",
    },
    { image: "./img/banner/3.jpg", caption: "Aperiam aut deleniti" },
    {
      image: "./img/banner/4.jpg",
      caption: "sit amet adipisicing",
    },
    { image: "./img/banner/5.jpg", caption: "Aperiam aut deleniti" },
  ];

  let currentBannerIndex = 0;
  let bannerIntervalId;

  banners.forEach((b) => {
    const img = new Image();
    img.src = b.image;
  });

  banners.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.addEventListener("click", () => {
      currentBannerIndex = i;
      updateBanner();
      resetBannerInterval();
    });
    indicatorsContainer.appendChild(dot);
  });

  function updateBanner() {
    const current = banners[currentBannerIndex];
    if (bannerContainer) {
      bannerContainer.style.backgroundImage = `url('${current.image}')`;
      bannerContainer.setAttribute("aria-label", current.caption);
    }
    if (captionText) {
      captionText.textContent = current.caption;
      captionText.classList.remove("fade");
      void captionText.offsetWidth;
      captionText.classList.add("fade");
    }

    const dots = document.querySelectorAll("#indicators span");
    dots.forEach((dot) => dot.classList.remove("active"));
    if (dots[currentBannerIndex])
      dots[currentBannerIndex].classList.add("active");
  }

  function prevSlide() {
    currentBannerIndex =
      (currentBannerIndex - 1 + banners.length) % banners.length;
    updateBanner();
    resetBannerInterval();
  }

  function nextSlide() {
    currentBannerIndex = (currentBannerIndex + 1) % banners.length;
    updateBanner();
    resetBannerInterval();
  }

  function resetBannerInterval() {
    clearInterval(bannerIntervalId);
    bannerIntervalId = setInterval(nextSlide, 4000);
  }

  bannerContainer?.addEventListener("mouseenter", () =>
    clearInterval(bannerIntervalId)
  );
  bannerContainer?.addEventListener("mouseleave", () => resetBannerInterval());

  prevBtn?.addEventListener("click", prevSlide);
  nextBtn?.addEventListener("click", nextSlide);

  if (bannerContainer && captionText) {
    updateBanner();
    bannerIntervalId = setInterval(nextSlide, 4000);
  }

  // ✅ 3. Floating Action Buttons
  const handleFabVisibility = () => {
    const scrollY = window.scrollY;
    const windowH = window.innerHeight;
    const docH = document.documentElement.scrollHeight;

    const isVisibleThreshold = scrollY > 300;
    const isMobile = window.innerWidth <= 768;
    const nearBottom = scrollY + windowH >= docH - 80;

    if (scrollToTopBtn) {
      scrollToTopBtn.classList.toggle(
        "fab-visible",
        isVisibleThreshold && !nearBottom
      );
      scrollToTopBtn.classList.toggle(
        "fab-hidden",
        !isVisibleThreshold || nearBottom
      );
      scrollToTopBtn.classList.toggle(
        "fab-near-bottom",
        nearBottom && isMobile
      );
    }

    if (whatsappFAB) {
      whatsappFAB.classList.toggle(
        "fab-visible",
        isVisibleThreshold && !nearBottom
      );
      whatsappFAB.classList.toggle(
        "fab-hidden",
        !isVisibleThreshold || nearBottom
      );
      whatsappFAB.classList.toggle("fab-near-bottom", nearBottom && isMobile);
    }
  };

  window.addEventListener("scroll", handleFabVisibility);
  handleFabVisibility();

  scrollToTopBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// ✅ 4. scroll-animations.js
function initScrollAnimations({
  selector = "[data-animate]",
  visibleClass = "visible",
  threshold = 0.1,
} = {}) {
  const elements = document.querySelectorAll(selector);

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetElement = entry.target;

          const delay = targetElement.dataset.delay;
          if (delay) {
            targetElement.style.transitionDelay = delay;
          }

          targetElement.classList.add(visibleClass);
          observerInstance.unobserve(targetElement);
        }
      });
    },
    { threshold }
  );

  elements.forEach((el) => observer.observe(el));
}

window.addEventListener("DOMContentLoaded", () => {
  initScrollAnimations();
});

// ✅ 4. Contact form
// ✅ EmailJs Sign Up - https://dashboard.emailjs.com/sign-in
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const submitButton = document.getElementById("submitButton");
  const successMessage = document.getElementById("successMessage");
  const errorMessage = document.getElementById("errorMessage");

  emailjs.init("Your EmailJS Public User ID"); // ✅ Your EmailJS Public User ID

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    submitButton.textContent = "Sending...";
    submitButton.disabled = true;
    successMessage.style.display = "none";
    errorMessage.style.display = "none";

    emailjs
      .sendForm("Service ID", "Template ID", this) // ✅ Your EmailJS Service & Template ID
      .then(function (response) {
        console.log("SUCCESS!", response.status, response.text);
        successMessage.style.display = "block";
        form.reset();
        setTimeout(() => (successMessage.style.display = "none"), 5000);
      })
      .catch(function (error) {
        console.log("FAILED...", error);
        errorMessage.style.display = "block";
        setTimeout(() => (errorMessage.style.display = "none"), 5000);
      })
      .finally(() => {
        submitButton.textContent = "Send Message";
        submitButton.disabled = false;
      });
  });
});
