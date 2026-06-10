(() => {
  const galleries = Array.from(document.querySelectorAll("[data-lightbox-gallery]"));

  if (!galleries.length) {
    return;
  }

  let activeGallery = [];
  let activeIndex = 0;
  let previousFocus = null;

  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "Image viewer");
  lightbox.hidden = true;
  lightbox.innerHTML = `
    <div class="lightbox__backdrop" data-lightbox-close></div>
    <div class="lightbox__frame">
      <button class="lightbox__button lightbox__close" type="button" data-lightbox-close aria-label="Close image viewer">×</button>
      <button class="lightbox__button lightbox__previous" type="button" data-lightbox-previous aria-label="Previous image">‹</button>
      <img class="lightbox__image" alt="">
      <button class="lightbox__button lightbox__next" type="button" data-lightbox-next aria-label="Next image">›</button>
    </div>
  `;
  document.body.append(lightbox);

  const imageEl = lightbox.querySelector(".lightbox__image");
  const closeButton = lightbox.querySelector(".lightbox__close");
  const previousButton = lightbox.querySelector("[data-lightbox-previous]");
  const nextButton = lightbox.querySelector("[data-lightbox-next]");

  const setImage = (index) => {
    activeIndex = (index + activeGallery.length) % activeGallery.length;
    const activeItem = activeGallery[activeIndex];
    const thumbnail = activeItem.querySelector("img");
    imageEl.src = activeItem.href;
    imageEl.alt = thumbnail ? thumbnail.alt : "";

    const hasMultipleImages = activeGallery.length > 1;
    previousButton.hidden = !hasMultipleImages;
    nextButton.hidden = !hasMultipleImages;
  };

  const openLightbox = (items, index, trigger) => {
    activeGallery = items;
    previousFocus = trigger;
    setImage(index);
    lightbox.hidden = false;
    document.body.classList.add("has-lightbox");
    closeButton.focus();
  };

  const closeLightbox = () => {
    if (lightbox.hidden) {
      return;
    }

    lightbox.hidden = true;
    document.body.classList.remove("has-lightbox");
    imageEl.removeAttribute("src");

    if (previousFocus) {
      previousFocus.focus();
    }
  };

  const showPrevious = () => {
    if (activeGallery.length > 1) {
      setImage(activeIndex - 1);
    }
  };

  const showNext = () => {
    if (activeGallery.length > 1) {
      setImage(activeIndex + 1);
    }
  };

  galleries.forEach((gallery) => {
    const items = Array.from(gallery.querySelectorAll("[data-lightbox-item]"));

    items.forEach((item, index) => {
      item.addEventListener("click", (event) => {
        event.preventDefault();
        openLightbox(items, index, item);
      });
    });
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target.closest("[data-lightbox-close]")) {
      closeLightbox();
      return;
    }

    if (event.target.closest("[data-lightbox-previous]")) {
      showPrevious();
      return;
    }

    if (event.target.closest("[data-lightbox-next]")) {
      showNext();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) {
      return;
    }

    if (event.key === "Escape") {
      closeLightbox();
    } else if (event.key === "ArrowLeft") {
      showPrevious();
    } else if (event.key === "ArrowRight") {
      showNext();
    }
  });
})();
