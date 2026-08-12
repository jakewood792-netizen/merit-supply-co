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
  "amber-spice": {
    name: "Amber Spice EDP",
    price: 29.00,
    images: [],
    sizes: [],
    colors: [],
    description: "A warm, woody-spicy amber scent with a bold, long-lasting trail. Inspired by Dior Sauvage.",
  },
  "citrus-cedar": {
    name: "Citrus Cedar Cologne",
    price: 32.00,
    images: [],
    sizes: [],
    colors: [],
    description: "Crisp citrus over cedarwood and soft aromatic herbs, fresh and understated. Inspired by Chanel Bleu de Chanel.",
  },
  "aquatic-bergamot": {
    name: "Aquatic Bergamot EDP",
    price: 36.00,
    images: [],
    sizes: [],
    colors: [],
    description: "A fresh, aquatic scent with bright bergamot and a clean marine finish. Inspired by Giorgio Armani Acqua di Gio.",
  },
  "linen-shirt": {
    name: "Linen Short Sleeve Button Shirt",
    price: 29.99,
    images: ["images/linen-shirt.png"],
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    colors: ["Beige", "Blue", "Black", "Gray", "White"],
  },
};
