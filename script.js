const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Product photo galleries for the tap-to-view lightbox on checkout pages.
// Add more filenames per product as photos get sourced — the viewer picks up any array length.
const productGalleries = {
  hoodie: ["images/hoodie.png"],
};

const lightbox = document.getElementById("lightbox");
if (lightbox) {
  const track = lightbox.querySelector(".lightbox-track");
  const dotsWrap = lightbox.querySelector(".lightbox-dots");
  const prevBtn = lightbox.querySelector(".lightbox-prev");
  const nextBtn = lightbox.querySelector(".lightbox-next");
  let slideIndex = 0;
  let slideCount = 0;

  function updateSlide() {
    track.style.transform = `translateX(-${slideIndex * 100}%)`;
    [...dotsWrap.children].forEach((dot, i) => dot.classList.toggle("active", i === slideIndex));
  }

  function goToSlide(delta) {
    slideIndex = (slideIndex + delta + slideCount) % slideCount;
    updateSlide();
  }

  function openGallery(key) {
    const images = productGalleries[key];
    if (!images || images.length === 0) return;

    track.innerHTML = "";
    dotsWrap.innerHTML = "";
    images.forEach((src) => {
      const img = document.createElement("img");
      img.src = src;
      img.className = "lightbox-slide";
      img.alt = "";
      track.appendChild(img);

      const dot = document.createElement("span");
      dot.className = "lightbox-dot";
      dotsWrap.appendChild(dot);
    });

    slideIndex = 0;
    slideCount = images.length;
    const multiple = slideCount > 1;
    prevBtn.style.display = multiple ? "flex" : "none";
    nextBtn.style.display = multiple ? "flex" : "none";
    dotsWrap.style.display = multiple ? "flex" : "none";
    updateSlide();

    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeGallery() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-gallery]").forEach((btn) => {
    btn.addEventListener("click", () => openGallery(btn.dataset.gallery));
  });

  prevBtn.addEventListener("click", () => goToSlide(-1));
  nextBtn.addEventListener("click", () => goToSlide(1));
  lightbox.querySelector(".lightbox-close").addEventListener("click", closeGallery);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeGallery();
  });
  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeGallery();
    if (e.key === "ArrowLeft") goToSlide(-1);
    if (e.key === "ArrowRight") goToSlide(1);
  });

  // touch swipe
  let touchStartX = null;
  track.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });
  track.addEventListener("touchend", (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) goToSlide(dx < 0 ? 1 : -1);
    touchStartX = null;
  });
}
