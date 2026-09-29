(() => {
  const carousels = Array.from(document.querySelectorAll("[data-carousel]"));

  if (!carousels.length) {
    return;
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scrollBehavior = reduceMotion ? "auto" : "smooth";

  carousels.forEach((carousel) => {
    const track = carousel.querySelector("[data-carousel-track]");
    const slides = Array.from(carousel.querySelectorAll("[data-carousel-slide]"));
    const prevButton = carousel.querySelector("[data-carousel-prev]");
    const nextButton = carousel.querySelector("[data-carousel-next]");
    const counter = carousel.querySelector("[data-carousel-counter]");

    if (!track || slides.length < 2) {
      return;
    }

    const goTo = (index) => {
      const slide = slides[(index + slides.length) % slides.length];
      track.scrollTo({
        left: slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2,
        behavior: scrollBehavior,
      });
    };

    const currentIndex = () => {
      const center = track.scrollLeft + track.clientWidth / 2;
      let best = 0;
      let bestDistance = Infinity;
      slides.forEach((slide, index) => {
        const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
        const distance = Math.abs(slideCenter - center);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = index;
        }
      });
      return best;
    };

    const updateCounter = () => {
      if (counter) {
        counter.textContent = `${currentIndex() + 1} / ${slides.length}`;
      }
    };

    if (prevButton) {
      prevButton.addEventListener("click", () => goTo(currentIndex() - 1));
    }
    if (nextButton) {
      nextButton.addEventListener("click", () => goTo(currentIndex() + 1));
    }

    let ticking = false;
    track.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(() => {
            updateCounter();
            ticking = false;
          });
        }
      },
      { passive: true }
    );

    // Swiping/dragging the track should not open the lightbox on release.
    let pointerStart = null;
    const clearPointer = () => {
      pointerStart = null;
    };
    track.addEventListener("pointerdown", (event) => {
      pointerStart = { x: event.clientX, y: event.clientY };
    });
    track.addEventListener("pointerup", clearPointer);
    track.addEventListener("pointercancel", clearPointer);
    track.addEventListener(
      "click",
      (event) => {
        if (!pointerStart) {
          return;
        }
        const moved = Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y);
        clearPointer();
        if (moved > 6) {
          event.preventDefault();
          event.stopPropagation();
        }
      },
      true
    );

    carousel.addEventListener("keydown", (event) => {
      if (document.body.classList.contains("has-lightbox")) {
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(currentIndex() - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(currentIndex() + 1);
      }
    });

    updateCounter();
  });
})();
