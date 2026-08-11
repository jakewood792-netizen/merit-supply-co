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

    const slideshow = document.getElementById("pdp-slideshow");
    const slidePrev = document.getElementById("pdp-slide-prev");
    const slideNext = document.getElementById("pdp-slide-next");
    const slideDots = document.getElementById("pdp-slide-dots");
    let slideIndex = 0;
    const slideImages = product.images.map((src, i) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = product.name;
      img.className = "slide-photo" + (i === 0 ? " active" : "");
      slideshow.insertBefore(img, slidePrev);
      return img;
    });

    const dots = product.images.map((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "slide-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Show photo " + (i + 1));
      dot.addEventListener("click", () => showSlide(i));
      slideDots.appendChild(dot);
      return dot;
    });

    function showSlide(index) {
      slideIndex = (index + slideImages.length) % slideImages.length;
      slideImages.forEach((img, i) => img.classList.toggle("active", i === slideIndex));
      dots.forEach((dot, i) => dot.classList.toggle("active", i === slideIndex));
    }

    if (slideImages.length > 1) {
      slidePrev.addEventListener("click", () => showSlide(slideIndex - 1));
      slideNext.addEventListener("click", () => showSlide(slideIndex + 1));
      setInterval(() => showSlide(slideIndex + 1), 3500);
    } else {
      slidePrev.hidden = true;
      slideNext.hidden = true;
    }

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
