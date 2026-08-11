const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ---- Cart (stored in the browser, no backend) ----------------------------
function getCart() {
  try {
    return JSON.parse(localStorage.getItem("meritCart")) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("meritCart", JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(id, size, color, qty) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === id && item.size === size && item.color === color);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, size, color, qty });
  }
  saveCart(cart);
}

function updateCartBadge() {
  const badge = document.querySelector("[data-cart-count]");
  if (!badge) return;
  const count = getCart().reduce((sum, item) => sum + item.qty, 0);
  badge.textContent = count;
}
updateCartBadge();

// ---- Product photo gallery (tap-to-view, swipeable lightbox) -------------
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
    const product = typeof PRODUCTS !== "undefined" ? PRODUCTS[key] : null;
    const images = product && product.images;
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

// ---- Product detail page (product.html?id=...) ---------------------------
const pdp = document.getElementById("pdp");
if (pdp && typeof PRODUCTS !== "undefined") {
  const id = new URLSearchParams(location.search).get("id");
  const product = PRODUCTS[id];

  if (!product) {
    pdp.innerHTML = '<p style="color:var(--paper-dim);">Sorry, we couldn\'t find that product. <a href="index.html" style="color:var(--brass);">Return home</a>.</p>';
  } else {
    document.title = product.name + " — Merit Supply Co.";

    document.getElementById("pdp-name").textContent = product.name;
    document.getElementById("pdp-price").textContent = "$" + product.price.toFixed(2);
    document.getElementById("pdp-img").src = product.images[0];
    document.getElementById("pdp-img").alt = product.name;
    document.getElementById("pdp-gallery-btn").dataset.gallery = id;

    let selectedSize = null;
    let selectedColor = null;

    const sizeRow = document.getElementById("pdp-sizes");
    product.sizes.forEach((size) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option-btn";
      btn.textContent = size;
      btn.addEventListener("click", () => {
        selectedSize = size;
        [...sizeRow.children].forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
        setMessage("");
      });
      sizeRow.appendChild(btn);
    });

    const colorSection = document.getElementById("pdp-color-section");
    if (product.colors && product.colors.length) {
      colorSection.hidden = false;
      const colorRow = document.getElementById("pdp-colors");
      product.colors.forEach((color) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "option-btn";
        btn.textContent = color;
        btn.addEventListener("click", () => {
          selectedColor = color;
          [...colorRow.children].forEach((b) => b.classList.remove("selected"));
          btn.classList.add("selected");
          setMessage("");
        });
        colorRow.appendChild(btn);
      });
    }

    const messageEl = document.getElementById("pdp-message");
    function setMessage(text, isSuccess) {
      messageEl.textContent = text;
      messageEl.className = "pdp-message" + (isSuccess ? " success" : "");
    }

    function validateSelection() {
      if (!selectedSize) {
        setMessage("Please select a size.");
        return false;
      }
      if (product.colors && product.colors.length && !selectedColor) {
        setMessage("Please select a color.");
        return false;
      }
      return true;
    }

    document.getElementById("pdp-add-cart").addEventListener("click", () => {
      if (!validateSelection()) return;
      addToCart(id, selectedSize, selectedColor, 1);
      setMessage("Added to cart ✓", true);
    });

    document.getElementById("pdp-buy-now").addEventListener("click", () => {
      if (!validateSelection()) return;
      sessionStorage.setItem("meritBuyNow", JSON.stringify({ id, size: selectedSize, color: selectedColor, qty: 1 }));
      location.href = "checkout.html";
    });
  }
}
