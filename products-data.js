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
    images: [
      "images/linen-shirt.png",
      "images/linen-shirt-blue.png",
      "images/linen-shirt-black.png",
      "images/linen-shirt-gray.png",
      "images/linen-shirt-white.png",
    ],
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    colors: ["Beige", "Blue", "Black", "Gray", "White"],
    // Picking a color also jumps the photo slideshow to the matching image index.
    colorImageIndex: { "Beige": 0, "Blue": 1, "Black": 2, "Gray": 3, "White": 4 },
  },
  "led-face-mask": {
    name: "7-Color LED Light Therapy Face Mask",
    price: 29.00,
    images: [
      "images/led-face-mask.webp",
      "images/led-face-mask-2.webp",
      "images/led-face-mask-3.webp",
      "images/led-face-mask-4.webp",
      "images/led-face-mask-5.webp",
    ],
    sizes: [],
    colors: [],
    description: "A 7-color LED light therapy mask for anti-aging, wrinkle reduction, and skin brightening — full-face coverage with adjustable light modes.",
  },
  "led-face-neck-mask": {
    name: "7-Color LED Face & Neck Mask",
    price: 49.00,
    images: [
      "images/led-face-neck-mask.webp",
      "images/led-face-neck-mask-2.webp",
      "images/led-face-neck-mask-3.webp",
    ],
    sizes: [],
    colors: [],
    description: "A wraparound 7-color LED photon therapy mask covering face and neck for firming, anti-aging, and skin rejuvenation.",
  },
  "cupping-massager": {
    name: "Electric Vacuum Cupping Massager",
    price: 24.00,
    images: [
      "images/cupping-massager.webp",
      "images/cupping-massager-2.webp",
      "images/cupping-massager-3.webp",
      "images/cupping-massager-4.webp",
      "images/cupping-massager-5.webp",
    ],
    sizes: [],
    colors: [],
    description: "A rechargeable electric vacuum cupping massager with 12 heat/suction gears and an LCD display — cupping and gua sha therapy for back, neck, and arms.",
  },
  "cupping-set": {
    name: "Cupping Therapy Set with Pump",
    price: 19.00,
    images: [
      "images/cupping-set-temu-main.jpg",
      "images/cupping-set.webp",
      "images/cupping-set-2.webp",
      "images/cupping-set-3.webp",
    ],
    sizes: [],
    colors: [],
    description: "A 12-piece manual cupping therapy set with hand pump and carrying case — traditional cupping for muscle relief and circulation.",
  },
  "lined-tank-top": {
    name: "Lined Tank Top",
    price: 15.99,
    images: [
      "images/lined-tank-top.png",
      "images/lined-tank-top-green.png",
      "images/lined-tank-top-coffee.png",
      "images/lined-tank-top-black.png",
      "images/lined-tank-top-darkgrey.png",
      "images/lined-tank-top-white.png",
      "images/lined-tank-top-grey.png",
      "images/lined-tank-top-pink.png",
      "images/lined-tank-top-blue.png",
    ],
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Brown", "Green", "Coffee", "Black", "Dark Grey", "White", "Grey", "Pink", "Blue"],
    // Picking a color also jumps the photo slideshow to the matching image index.
    colorImageIndex: {
      "Brown": 0, "Green": 1, "Coffee": 2, "Black": 3, "Dark Grey": 4,
      "White": 5, "Grey": 6, "Pink": 7, "Blue": 8,
    },
  },
};
