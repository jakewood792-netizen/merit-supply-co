// Single source of truth for every sellable product.
// Add a new product by adding an entry here — product.html reads it via ?id=<key>,
// and the cart/checkout screens pull name/price/image from here too.
// "colors" can be left as [] for products that don't have a color choice —
// the color picker on the product page just won't show up.
const PRODUCTS = {
  hoodie: {
    name: "Heavyweight Oversized Hoodie",
    price: 44.00,
    images: ["images/hoodie.png", "images/hoodie-2.jpg", "images/hoodie-3.jpg"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Blue", "Black"],
    // Picking a color also jumps the photo slideshow to the matching image index.
    colorImageIndex: { "Blue": 0, "Black": 1 },
  },
};
