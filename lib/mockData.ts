export interface Variant {
  id: string;
  sku: string;
  name: string;
  price: number;
  stock: number;
  color?: string;
  size?: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  b2bPrice: number;
  moq: number;
  categoryId: string;
  images: string[];
  rating: number;
  features: string[];
  variants: Variant[];
  reviews: Review[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

export const categories: Category[] = [
  {
    id: "copper-bottles",
    name: "Copper Bottles",
    description: "Pure handcrafted copper vessels that naturally purify water with anti-inflammatory properties.",
    image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "copper-gift-sets",
    name: "Copper Gift Sets",
    description: "Elegant bespoke sets for home dining and wellness gifting, celebrating Indian artisan craft.",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "glass-bottles",
    name: "Glass Bottles",
    description: "Heavy borosilicate glass drinking bottles with sustainable wood/bamboo caps.",
    image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "leather-belts",
    name: "Leather Belts",
    description: "Full-grain vegetable-tanned leather belts with solid brass buckles designed to age gracefully.",
    image: "https://images.unsplash.com/photo-1624222247344-550fb8ecf7db?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "vegan-belts",
    name: "Vegan Leather Belts",
    description: "Cruelty-free, sustainable cork and plant-based vegan leather belts crafted for durability.",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "bags",
    name: "Handcrafted Bags",
    description: "Artisan-made waxed canvas duffles, minimalist totes, and messenger bags.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "handcrafted-accessories",
    name: "Handcrafted Accessories",
    description: "Premium sustainable wallets, luggage tags, tech organizers, and fashion items.",
    image: "https://images.unsplash.com/photo-1627124118123-e4d31129d16a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "corporate-gifts",
    name: "Corporate Gifts",
    description: "Customizable executive gift hampers and sustainable hampers featuring precision laser-branding.",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800",
  },
];

export const products: Product[] = [
  {
    "id": "product-001",
    "name": "Royal Heritage Pure Copper Bottle",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Royal Heritage Pure Copper Bottle is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 200,
    "b2bPrice": 120,
    "moq": 50,
    "categoryId": "copper-bottles",
    "images": [
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.3,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-001-var-std",
        "sku": "CRO-COP-001",
        "name": "Standard Pack",
        "price": 200,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-001-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-002",
    "name": "Artisan Handmade Pure Copper Bottle",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Artisan Handmade Pure Copper Bottle is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 219,
    "b2bPrice": 131,
    "moq": 50,
    "categoryId": "copper-bottles",
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.4,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-002-var-std",
        "sku": "CRO-COP-002",
        "name": "Standard Pack",
        "price": 219,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-002-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-003",
    "name": "Imperial Wellness Pure Copper Bottle",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Imperial Wellness Pure Copper Bottle is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 239,
    "b2bPrice": 143,
    "moq": 50,
    "categoryId": "copper-bottles",
    "images": [
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.5,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-003-var-std",
        "sku": "CRO-COP-003",
        "name": "Standard Pack",
        "price": 239,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-003-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-004",
    "name": "Elite Collection Pure Copper Bottle",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Elite Collection Pure Copper Bottle is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 258,
    "b2bPrice": 155,
    "moq": 50,
    "categoryId": "copper-bottles",
    "images": [
      "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.6,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-004-var-std",
        "sku": "CRO-COP-004",
        "name": "Standard Pack",
        "price": 258,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-004-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-005",
    "name": "Gilded Luxury Pure Copper Bottle",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Gilded Luxury Pure Copper Bottle is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 277,
    "b2bPrice": 166,
    "moq": 50,
    "categoryId": "copper-bottles",
    "images": [
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.7,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-005-var-std",
        "sku": "CRO-COP-005",
        "name": "Standard Pack",
        "price": 277,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-005-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-006",
    "name": "Sovereign Series Pure Copper Bottle",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Sovereign Series Pure Copper Bottle is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 297,
    "b2bPrice": 178,
    "moq": 50,
    "categoryId": "copper-bottles",
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.8,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-006-var-std",
        "sku": "CRO-COP-006",
        "name": "Standard Pack",
        "price": 297,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-006-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-007",
    "name": "Traditional Handcrafted Pure Copper Bottle",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Traditional Handcrafted Pure Copper Bottle is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 316,
    "b2bPrice": 190,
    "moq": 50,
    "categoryId": "copper-bottles",
    "images": [
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.9,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-007-var-std",
        "sku": "CRO-COP-007",
        "name": "Standard Pack",
        "price": 316,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-007-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-008",
    "name": "Vedic Pure Pure Copper Bottle",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Vedic Pure Pure Copper Bottle is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 335,
    "b2bPrice": 201,
    "moq": 50,
    "categoryId": "copper-bottles",
    "images": [
      "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 5,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-008-var-std",
        "sku": "CRO-COP-008",
        "name": "Standard Pack",
        "price": 335,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-008-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-009",
    "name": "Darbari Premium Pure Copper Bottle",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Darbari Premium Pure Copper Bottle is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 355,
    "b2bPrice": 213,
    "moq": 50,
    "categoryId": "copper-bottles",
    "images": [
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.3,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-009-var-std",
        "sku": "CRO-COP-009",
        "name": "Standard Pack",
        "price": 355,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-009-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-010",
    "name": "Vintage Crafted Pure Copper Bottle",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Vintage Crafted Pure Copper Bottle is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 374,
    "b2bPrice": 224,
    "moq": 50,
    "categoryId": "copper-bottles",
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.4,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-010-var-std",
        "sku": "CRO-COP-010",
        "name": "Standard Pack",
        "price": 374,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-010-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-011",
    "name": "Nirvana Special Pure Copper Bottle",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Nirvana Special Pure Copper Bottle is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 394,
    "b2bPrice": 236,
    "moq": 50,
    "categoryId": "copper-bottles",
    "images": [
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.5,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-011-var-std",
        "sku": "CRO-COP-011",
        "name": "Standard Pack",
        "price": 394,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-011-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-012",
    "name": "Chakra Balancing Pure Copper Bottle",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Chakra Balancing Pure Copper Bottle is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 413,
    "b2bPrice": 248,
    "moq": 50,
    "categoryId": "copper-bottles",
    "images": [
      "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.6,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-012-var-std",
        "sku": "CRO-COP-012",
        "name": "Standard Pack",
        "price": 413,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-012-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-013",
    "name": "Mughal Signature Pure Copper Bottle",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Mughal Signature Pure Copper Bottle is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 432,
    "b2bPrice": 259,
    "moq": 50,
    "categoryId": "copper-bottles",
    "images": [
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.7,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-013-var-std",
        "sku": "CRO-COP-013",
        "name": "Standard Pack",
        "price": 432,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-013-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-014",
    "name": "Modernist Design Pure Copper Bottle",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Modernist Design Pure Copper Bottle is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 452,
    "b2bPrice": 271,
    "moq": 50,
    "categoryId": "copper-bottles",
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.8,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-014-var-std",
        "sku": "CRO-COP-014",
        "name": "Standard Pack",
        "price": 452,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-014-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-015",
    "name": "Maharaja Classic Pure Copper Bottle",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Maharaja Classic Pure Copper Bottle is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 471,
    "b2bPrice": 283,
    "moq": 50,
    "categoryId": "copper-bottles",
    "images": [
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.9,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-015-var-std",
        "sku": "CRO-COP-015",
        "name": "Standard Pack",
        "price": 471,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-015-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-016",
    "name": "Royal Heritage Copper Wellness Gift Set",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Royal Heritage Copper Wellness Gift Set is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 490,
    "b2bPrice": 294,
    "moq": 50,
    "categoryId": "copper-gift-sets",
    "images": [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 5,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-016-var-std",
        "sku": "CRO-COP-016",
        "name": "Standard Pack",
        "price": 490,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-016-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-017",
    "name": "Artisan Handmade Copper Wellness Gift Set",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Artisan Handmade Copper Wellness Gift Set is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 510,
    "b2bPrice": 306,
    "moq": 50,
    "categoryId": "copper-gift-sets",
    "images": [
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.3,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-017-var-std",
        "sku": "CRO-COP-017",
        "name": "Standard Pack",
        "price": 510,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-017-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-018",
    "name": "Imperial Wellness Copper Wellness Gift Set",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Imperial Wellness Copper Wellness Gift Set is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 529,
    "b2bPrice": 317,
    "moq": 50,
    "categoryId": "copper-gift-sets",
    "images": [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.4,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-018-var-std",
        "sku": "CRO-COP-018",
        "name": "Standard Pack",
        "price": 529,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-018-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-019",
    "name": "Elite Collection Copper Wellness Gift Set",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Elite Collection Copper Wellness Gift Set is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 548,
    "b2bPrice": 329,
    "moq": 50,
    "categoryId": "copper-gift-sets",
    "images": [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.5,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-019-var-std",
        "sku": "CRO-COP-019",
        "name": "Standard Pack",
        "price": 548,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-019-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-020",
    "name": "Gilded Luxury Copper Wellness Gift Set",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Gilded Luxury Copper Wellness Gift Set is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 568,
    "b2bPrice": 341,
    "moq": 50,
    "categoryId": "copper-gift-sets",
    "images": [
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.6,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-020-var-std",
        "sku": "CRO-COP-020",
        "name": "Standard Pack",
        "price": 568,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-020-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-021",
    "name": "Sovereign Series Copper Wellness Gift Set",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Sovereign Series Copper Wellness Gift Set is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 587,
    "b2bPrice": 352,
    "moq": 50,
    "categoryId": "copper-gift-sets",
    "images": [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.7,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-021-var-std",
        "sku": "CRO-COP-021",
        "name": "Standard Pack",
        "price": 587,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-021-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-022",
    "name": "Traditional Handcrafted Copper Wellness Gift Set",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Traditional Handcrafted Copper Wellness Gift Set is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 606,
    "b2bPrice": 364,
    "moq": 50,
    "categoryId": "copper-gift-sets",
    "images": [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.8,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-022-var-std",
        "sku": "CRO-COP-022",
        "name": "Standard Pack",
        "price": 606,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-022-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-023",
    "name": "Vedic Pure Copper Wellness Gift Set",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Vedic Pure Copper Wellness Gift Set is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 626,
    "b2bPrice": 376,
    "moq": 50,
    "categoryId": "copper-gift-sets",
    "images": [
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.9,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-023-var-std",
        "sku": "CRO-COP-023",
        "name": "Standard Pack",
        "price": 626,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-023-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-024",
    "name": "Darbari Premium Copper Wellness Gift Set",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Darbari Premium Copper Wellness Gift Set is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 645,
    "b2bPrice": 387,
    "moq": 50,
    "categoryId": "copper-gift-sets",
    "images": [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 5,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-024-var-std",
        "sku": "CRO-COP-024",
        "name": "Standard Pack",
        "price": 645,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-024-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-025",
    "name": "Vintage Crafted Copper Wellness Gift Set",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Vintage Crafted Copper Wellness Gift Set is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 665,
    "b2bPrice": 399,
    "moq": 50,
    "categoryId": "copper-gift-sets",
    "images": [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.3,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-025-var-std",
        "sku": "CRO-COP-025",
        "name": "Standard Pack",
        "price": 665,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-025-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-026",
    "name": "Nirvana Special Copper Wellness Gift Set",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Nirvana Special Copper Wellness Gift Set is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 684,
    "b2bPrice": 410,
    "moq": 50,
    "categoryId": "copper-gift-sets",
    "images": [
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.4,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-026-var-std",
        "sku": "CRO-COP-026",
        "name": "Standard Pack",
        "price": 684,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-026-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-027",
    "name": "Chakra Balancing Copper Wellness Gift Set",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Chakra Balancing Copper Wellness Gift Set is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 703,
    "b2bPrice": 422,
    "moq": 50,
    "categoryId": "copper-gift-sets",
    "images": [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.5,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-027-var-std",
        "sku": "CRO-COP-027",
        "name": "Standard Pack",
        "price": 703,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-027-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-028",
    "name": "Mughal Signature Copper Wellness Gift Set",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Mughal Signature Copper Wellness Gift Set is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 723,
    "b2bPrice": 434,
    "moq": 50,
    "categoryId": "copper-gift-sets",
    "images": [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.6,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-028-var-std",
        "sku": "CRO-COP-028",
        "name": "Standard Pack",
        "price": 723,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-028-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-029",
    "name": "Modernist Design Copper Wellness Gift Set",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Modernist Design Copper Wellness Gift Set is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 742,
    "b2bPrice": 445,
    "moq": 50,
    "categoryId": "copper-gift-sets",
    "images": [
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.7,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-029-var-std",
        "sku": "CRO-COP-029",
        "name": "Standard Pack",
        "price": 742,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-029-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-030",
    "name": "Maharaja Classic Copper Wellness Gift Set",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Maharaja Classic Copper Wellness Gift Set is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 761,
    "b2bPrice": 457,
    "moq": 50,
    "categoryId": "copper-gift-sets",
    "images": [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.8,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-030-var-std",
        "sku": "CRO-COP-030",
        "name": "Standard Pack",
        "price": 761,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-030-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-031",
    "name": "Royal Heritage Borosilicate Glass Hydrator",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Royal Heritage Borosilicate Glass Hydrator is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 781,
    "b2bPrice": 469,
    "moq": 50,
    "categoryId": "glass-bottles",
    "images": [
      "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.9,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-031-var-std",
        "sku": "CRO-GLA-031",
        "name": "Standard Pack",
        "price": 781,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-031-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-032",
    "name": "Artisan Handmade Borosilicate Glass Hydrator",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Artisan Handmade Borosilicate Glass Hydrator is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 800,
    "b2bPrice": 480,
    "moq": 50,
    "categoryId": "glass-bottles",
    "images": [
      "https://images.unsplash.com/photo-1608889174633-56a6f204281f?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 5,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-032-var-std",
        "sku": "CRO-GLA-032",
        "name": "Standard Pack",
        "price": 800,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-032-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-033",
    "name": "Imperial Wellness Borosilicate Glass Hydrator",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Imperial Wellness Borosilicate Glass Hydrator is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 819,
    "b2bPrice": 491,
    "moq": 50,
    "categoryId": "glass-bottles",
    "images": [
      "https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.3,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-033-var-std",
        "sku": "CRO-GLA-033",
        "name": "Standard Pack",
        "price": 819,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-033-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-034",
    "name": "Elite Collection Borosilicate Glass Hydrator",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Elite Collection Borosilicate Glass Hydrator is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 839,
    "b2bPrice": 503,
    "moq": 50,
    "categoryId": "glass-bottles",
    "images": [
      "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.4,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-034-var-std",
        "sku": "CRO-GLA-034",
        "name": "Standard Pack",
        "price": 839,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-034-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-035",
    "name": "Gilded Luxury Borosilicate Glass Hydrator",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Gilded Luxury Borosilicate Glass Hydrator is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 858,
    "b2bPrice": 515,
    "moq": 50,
    "categoryId": "glass-bottles",
    "images": [
      "https://images.unsplash.com/photo-1608889174633-56a6f204281f?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.5,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-035-var-std",
        "sku": "CRO-GLA-035",
        "name": "Standard Pack",
        "price": 858,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-035-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-036",
    "name": "Sovereign Series Borosilicate Glass Hydrator",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Sovereign Series Borosilicate Glass Hydrator is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 877,
    "b2bPrice": 526,
    "moq": 50,
    "categoryId": "glass-bottles",
    "images": [
      "https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.6,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-036-var-std",
        "sku": "CRO-GLA-036",
        "name": "Standard Pack",
        "price": 877,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-036-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-037",
    "name": "Traditional Handcrafted Borosilicate Glass Hydrator",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Traditional Handcrafted Borosilicate Glass Hydrator is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 897,
    "b2bPrice": 538,
    "moq": 50,
    "categoryId": "glass-bottles",
    "images": [
      "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.7,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-037-var-std",
        "sku": "CRO-GLA-037",
        "name": "Standard Pack",
        "price": 897,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-037-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-038",
    "name": "Vedic Pure Borosilicate Glass Hydrator",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Vedic Pure Borosilicate Glass Hydrator is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 916,
    "b2bPrice": 550,
    "moq": 50,
    "categoryId": "glass-bottles",
    "images": [
      "https://images.unsplash.com/photo-1608889174633-56a6f204281f?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.8,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-038-var-std",
        "sku": "CRO-GLA-038",
        "name": "Standard Pack",
        "price": 916,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-038-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-039",
    "name": "Darbari Premium Borosilicate Glass Hydrator",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Darbari Premium Borosilicate Glass Hydrator is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 935,
    "b2bPrice": 561,
    "moq": 50,
    "categoryId": "glass-bottles",
    "images": [
      "https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.9,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-039-var-std",
        "sku": "CRO-GLA-039",
        "name": "Standard Pack",
        "price": 935,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-039-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-040",
    "name": "Vintage Crafted Borosilicate Glass Hydrator",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Vintage Crafted Borosilicate Glass Hydrator is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 955,
    "b2bPrice": 573,
    "moq": 50,
    "categoryId": "glass-bottles",
    "images": [
      "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 5,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-040-var-std",
        "sku": "CRO-GLA-040",
        "name": "Standard Pack",
        "price": 955,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-040-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-041",
    "name": "Nirvana Special Borosilicate Glass Hydrator",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Nirvana Special Borosilicate Glass Hydrator is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 974,
    "b2bPrice": 584,
    "moq": 50,
    "categoryId": "glass-bottles",
    "images": [
      "https://images.unsplash.com/photo-1608889174633-56a6f204281f?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.3,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-041-var-std",
        "sku": "CRO-GLA-041",
        "name": "Standard Pack",
        "price": 974,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-041-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-042",
    "name": "Chakra Balancing Borosilicate Glass Hydrator",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Chakra Balancing Borosilicate Glass Hydrator is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 994,
    "b2bPrice": 596,
    "moq": 50,
    "categoryId": "glass-bottles",
    "images": [
      "https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.4,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-042-var-std",
        "sku": "CRO-GLA-042",
        "name": "Standard Pack",
        "price": 994,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-042-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-043",
    "name": "Mughal Signature Borosilicate Glass Hydrator",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Mughal Signature Borosilicate Glass Hydrator is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1013,
    "b2bPrice": 608,
    "moq": 50,
    "categoryId": "glass-bottles",
    "images": [
      "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.5,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-043-var-std",
        "sku": "CRO-GLA-043",
        "name": "Standard Pack",
        "price": 1013,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-043-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-044",
    "name": "Modernist Design Borosilicate Glass Hydrator",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Modernist Design Borosilicate Glass Hydrator is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1032,
    "b2bPrice": 619,
    "moq": 50,
    "categoryId": "glass-bottles",
    "images": [
      "https://images.unsplash.com/photo-1608889174633-56a6f204281f?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.6,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-044-var-std",
        "sku": "CRO-GLA-044",
        "name": "Standard Pack",
        "price": 1032,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-044-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-045",
    "name": "Maharaja Classic Borosilicate Glass Hydrator",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Maharaja Classic Borosilicate Glass Hydrator is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1052,
    "b2bPrice": 631,
    "moq": 50,
    "categoryId": "glass-bottles",
    "images": [
      "https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.7,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-045-var-std",
        "sku": "CRO-GLA-045",
        "name": "Standard Pack",
        "price": 1052,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-045-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-046",
    "name": "Royal Heritage Vegetable-Tanned Leather Belt",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Royal Heritage Vegetable-Tanned Leather Belt is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1071,
    "b2bPrice": 643,
    "moq": 50,
    "categoryId": "leather-belts",
    "images": [
      "https://images.unsplash.com/photo-1624222247344-550fb8ecf7db?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.8,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-046-var-std",
        "sku": "CRO-LEA-046",
        "name": "Standard Pack",
        "price": 1071,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-046-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-047",
    "name": "Artisan Handmade Vegetable-Tanned Leather Belt",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Artisan Handmade Vegetable-Tanned Leather Belt is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1090,
    "b2bPrice": 654,
    "moq": 50,
    "categoryId": "leather-belts",
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.9,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-047-var-std",
        "sku": "CRO-LEA-047",
        "name": "Standard Pack",
        "price": 1090,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-047-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-048",
    "name": "Imperial Wellness Vegetable-Tanned Leather Belt",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Imperial Wellness Vegetable-Tanned Leather Belt is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1110,
    "b2bPrice": 666,
    "moq": 50,
    "categoryId": "leather-belts",
    "images": [
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 5,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-048-var-std",
        "sku": "CRO-LEA-048",
        "name": "Standard Pack",
        "price": 1110,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-048-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-049",
    "name": "Elite Collection Vegetable-Tanned Leather Belt",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Elite Collection Vegetable-Tanned Leather Belt is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1129,
    "b2bPrice": 677,
    "moq": 50,
    "categoryId": "leather-belts",
    "images": [
      "https://images.unsplash.com/photo-1624222247344-550fb8ecf7db?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.3,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-049-var-std",
        "sku": "CRO-LEA-049",
        "name": "Standard Pack",
        "price": 1129,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-049-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-050",
    "name": "Gilded Luxury Vegetable-Tanned Leather Belt",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Gilded Luxury Vegetable-Tanned Leather Belt is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1148,
    "b2bPrice": 689,
    "moq": 50,
    "categoryId": "leather-belts",
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.4,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-050-var-std",
        "sku": "CRO-LEA-050",
        "name": "Standard Pack",
        "price": 1148,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-050-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-051",
    "name": "Sovereign Series Vegetable-Tanned Leather Belt",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Sovereign Series Vegetable-Tanned Leather Belt is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1168,
    "b2bPrice": 701,
    "moq": 50,
    "categoryId": "leather-belts",
    "images": [
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.5,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-051-var-std",
        "sku": "CRO-LEA-051",
        "name": "Standard Pack",
        "price": 1168,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-051-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-052",
    "name": "Traditional Handcrafted Vegetable-Tanned Leather Belt",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Traditional Handcrafted Vegetable-Tanned Leather Belt is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1187,
    "b2bPrice": 712,
    "moq": 50,
    "categoryId": "leather-belts",
    "images": [
      "https://images.unsplash.com/photo-1624222247344-550fb8ecf7db?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.6,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-052-var-std",
        "sku": "CRO-LEA-052",
        "name": "Standard Pack",
        "price": 1187,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-052-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-053",
    "name": "Vedic Pure Vegetable-Tanned Leather Belt",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Vedic Pure Vegetable-Tanned Leather Belt is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1206,
    "b2bPrice": 724,
    "moq": 50,
    "categoryId": "leather-belts",
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.7,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-053-var-std",
        "sku": "CRO-LEA-053",
        "name": "Standard Pack",
        "price": 1206,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-053-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-054",
    "name": "Darbari Premium Vegetable-Tanned Leather Belt",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Darbari Premium Vegetable-Tanned Leather Belt is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1226,
    "b2bPrice": 736,
    "moq": 50,
    "categoryId": "leather-belts",
    "images": [
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.8,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-054-var-std",
        "sku": "CRO-LEA-054",
        "name": "Standard Pack",
        "price": 1226,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-054-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-055",
    "name": "Vintage Crafted Vegetable-Tanned Leather Belt",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Vintage Crafted Vegetable-Tanned Leather Belt is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1245,
    "b2bPrice": 747,
    "moq": 50,
    "categoryId": "leather-belts",
    "images": [
      "https://images.unsplash.com/photo-1624222247344-550fb8ecf7db?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.9,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-055-var-std",
        "sku": "CRO-LEA-055",
        "name": "Standard Pack",
        "price": 1245,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-055-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-056",
    "name": "Nirvana Special Plant-Based Vegan Belt",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Nirvana Special Plant-Based Vegan Belt is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1265,
    "b2bPrice": 759,
    "moq": 50,
    "categoryId": "vegan-belts",
    "images": [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 5,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-056-var-std",
        "sku": "CRO-VEG-056",
        "name": "Standard Pack",
        "price": 1265,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-056-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-057",
    "name": "Chakra Balancing Plant-Based Vegan Belt",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Chakra Balancing Plant-Based Vegan Belt is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1284,
    "b2bPrice": 770,
    "moq": 50,
    "categoryId": "vegan-belts",
    "images": [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.3,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-057-var-std",
        "sku": "CRO-VEG-057",
        "name": "Standard Pack",
        "price": 1284,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-057-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-058",
    "name": "Mughal Signature Plant-Based Vegan Belt",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Mughal Signature Plant-Based Vegan Belt is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1303,
    "b2bPrice": 782,
    "moq": 50,
    "categoryId": "vegan-belts",
    "images": [
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.4,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-058-var-std",
        "sku": "CRO-VEG-058",
        "name": "Standard Pack",
        "price": 1303,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-058-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-059",
    "name": "Modernist Design Plant-Based Vegan Belt",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Modernist Design Plant-Based Vegan Belt is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1323,
    "b2bPrice": 794,
    "moq": 50,
    "categoryId": "vegan-belts",
    "images": [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.5,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-059-var-std",
        "sku": "CRO-VEG-059",
        "name": "Standard Pack",
        "price": 1323,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-059-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-060",
    "name": "Maharaja Classic Plant-Based Vegan Belt",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Maharaja Classic Plant-Based Vegan Belt is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1342,
    "b2bPrice": 805,
    "moq": 50,
    "categoryId": "vegan-belts",
    "images": [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.6,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-060-var-std",
        "sku": "CRO-VEG-060",
        "name": "Standard Pack",
        "price": 1342,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-060-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-061",
    "name": "Royal Heritage Plant-Based Vegan Belt",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Royal Heritage Plant-Based Vegan Belt is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1361,
    "b2bPrice": 817,
    "moq": 50,
    "categoryId": "vegan-belts",
    "images": [
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.7,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-061-var-std",
        "sku": "CRO-VEG-061",
        "name": "Standard Pack",
        "price": 1361,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-061-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-062",
    "name": "Artisan Handmade Plant-Based Vegan Belt",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Artisan Handmade Plant-Based Vegan Belt is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1381,
    "b2bPrice": 829,
    "moq": 50,
    "categoryId": "vegan-belts",
    "images": [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.8,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-062-var-std",
        "sku": "CRO-VEG-062",
        "name": "Standard Pack",
        "price": 1381,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-062-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-063",
    "name": "Imperial Wellness Plant-Based Vegan Belt",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Imperial Wellness Plant-Based Vegan Belt is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1400,
    "b2bPrice": 840,
    "moq": 50,
    "categoryId": "vegan-belts",
    "images": [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.9,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-063-var-std",
        "sku": "CRO-VEG-063",
        "name": "Standard Pack",
        "price": 1400,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-063-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-064",
    "name": "Elite Collection Plant-Based Vegan Belt",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Elite Collection Plant-Based Vegan Belt is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1419,
    "b2bPrice": 851,
    "moq": 50,
    "categoryId": "vegan-belts",
    "images": [
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 5,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-064-var-std",
        "sku": "CRO-VEG-064",
        "name": "Standard Pack",
        "price": 1419,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-064-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-065",
    "name": "Gilded Luxury Plant-Based Vegan Belt",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Gilded Luxury Plant-Based Vegan Belt is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1439,
    "b2bPrice": 863,
    "moq": 50,
    "categoryId": "vegan-belts",
    "images": [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.3,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-065-var-std",
        "sku": "CRO-VEG-065",
        "name": "Standard Pack",
        "price": 1439,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-065-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-066",
    "name": "Sovereign Series Waxed Canvas Travel Duffle",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Sovereign Series Waxed Canvas Travel Duffle is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1458,
    "b2bPrice": 875,
    "moq": 50,
    "categoryId": "bags",
    "images": [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.4,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-066-var-std",
        "sku": "CRO-BAG-066",
        "name": "Standard Pack",
        "price": 1458,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-066-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-067",
    "name": "Traditional Handcrafted Waxed Canvas Travel Duffle",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Traditional Handcrafted Waxed Canvas Travel Duffle is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1477,
    "b2bPrice": 886,
    "moq": 50,
    "categoryId": "bags",
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.5,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-067-var-std",
        "sku": "CRO-BAG-067",
        "name": "Standard Pack",
        "price": 1477,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-067-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-068",
    "name": "Vedic Pure Waxed Canvas Travel Duffle",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Vedic Pure Waxed Canvas Travel Duffle is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1497,
    "b2bPrice": 898,
    "moq": 50,
    "categoryId": "bags",
    "images": [
      "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.6,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-068-var-std",
        "sku": "CRO-BAG-068",
        "name": "Standard Pack",
        "price": 1497,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-068-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-069",
    "name": "Darbari Premium Waxed Canvas Travel Duffle",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Darbari Premium Waxed Canvas Travel Duffle is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1516,
    "b2bPrice": 910,
    "moq": 50,
    "categoryId": "bags",
    "images": [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.7,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-069-var-std",
        "sku": "CRO-BAG-069",
        "name": "Standard Pack",
        "price": 1516,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-069-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-070",
    "name": "Vintage Crafted Waxed Canvas Travel Duffle",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Vintage Crafted Waxed Canvas Travel Duffle is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1535,
    "b2bPrice": 921,
    "moq": 50,
    "categoryId": "bags",
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.8,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-070-var-std",
        "sku": "CRO-BAG-070",
        "name": "Standard Pack",
        "price": 1535,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-070-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-071",
    "name": "Nirvana Special Waxed Canvas Travel Duffle",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Nirvana Special Waxed Canvas Travel Duffle is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1555,
    "b2bPrice": 933,
    "moq": 50,
    "categoryId": "bags",
    "images": [
      "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.9,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-071-var-std",
        "sku": "CRO-BAG-071",
        "name": "Standard Pack",
        "price": 1555,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-071-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-072",
    "name": "Chakra Balancing Waxed Canvas Travel Duffle",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Chakra Balancing Waxed Canvas Travel Duffle is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1574,
    "b2bPrice": 944,
    "moq": 50,
    "categoryId": "bags",
    "images": [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 5,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-072-var-std",
        "sku": "CRO-BAG-072",
        "name": "Standard Pack",
        "price": 1574,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-072-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-073",
    "name": "Mughal Signature Waxed Canvas Travel Duffle",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Mughal Signature Waxed Canvas Travel Duffle is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1594,
    "b2bPrice": 956,
    "moq": 50,
    "categoryId": "bags",
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.3,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-073-var-std",
        "sku": "CRO-BAG-073",
        "name": "Standard Pack",
        "price": 1594,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-073-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-074",
    "name": "Modernist Design Waxed Canvas Travel Duffle",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Modernist Design Waxed Canvas Travel Duffle is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1613,
    "b2bPrice": 968,
    "moq": 50,
    "categoryId": "bags",
    "images": [
      "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.4,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-074-var-std",
        "sku": "CRO-BAG-074",
        "name": "Standard Pack",
        "price": 1613,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-074-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-075",
    "name": "Maharaja Classic Waxed Canvas Travel Duffle",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Maharaja Classic Waxed Canvas Travel Duffle is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1632,
    "b2bPrice": 979,
    "moq": 50,
    "categoryId": "bags",
    "images": [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.5,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-075-var-std",
        "sku": "CRO-BAG-075",
        "name": "Standard Pack",
        "price": 1632,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-075-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-076",
    "name": "Royal Heritage Artisan Harness Wallet",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Royal Heritage Artisan Harness Wallet is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1652,
    "b2bPrice": 991,
    "moq": 50,
    "categoryId": "handcrafted-accessories",
    "images": [
      "https://images.unsplash.com/photo-1627124118123-e4d31129d16a?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.6,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-076-var-std",
        "sku": "CRO-HAN-076",
        "name": "Standard Pack",
        "price": 1652,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-076-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-077",
    "name": "Artisan Handmade Artisan Harness Wallet",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Artisan Handmade Artisan Harness Wallet is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1671,
    "b2bPrice": 1003,
    "moq": 50,
    "categoryId": "handcrafted-accessories",
    "images": [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.7,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-077-var-std",
        "sku": "CRO-HAN-077",
        "name": "Standard Pack",
        "price": 1671,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-077-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-078",
    "name": "Imperial Wellness Artisan Harness Wallet",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Imperial Wellness Artisan Harness Wallet is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1690,
    "b2bPrice": 1014,
    "moq": 50,
    "categoryId": "handcrafted-accessories",
    "images": [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.8,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-078-var-std",
        "sku": "CRO-HAN-078",
        "name": "Standard Pack",
        "price": 1690,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-078-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-079",
    "name": "Elite Collection Artisan Harness Wallet",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Elite Collection Artisan Harness Wallet is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1710,
    "b2bPrice": 1026,
    "moq": 50,
    "categoryId": "handcrafted-accessories",
    "images": [
      "https://images.unsplash.com/photo-1627124118123-e4d31129d16a?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.9,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-079-var-std",
        "sku": "CRO-HAN-079",
        "name": "Standard Pack",
        "price": 1710,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-079-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-080",
    "name": "Gilded Luxury Artisan Harness Wallet",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Gilded Luxury Artisan Harness Wallet is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1729,
    "b2bPrice": 1037,
    "moq": 50,
    "categoryId": "handcrafted-accessories",
    "images": [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 5,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-080-var-std",
        "sku": "CRO-HAN-080",
        "name": "Standard Pack",
        "price": 1729,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-080-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-081",
    "name": "Sovereign Series Artisan Harness Wallet",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Sovereign Series Artisan Harness Wallet is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1748,
    "b2bPrice": 1049,
    "moq": 50,
    "categoryId": "handcrafted-accessories",
    "images": [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.3,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-081-var-std",
        "sku": "CRO-HAN-081",
        "name": "Standard Pack",
        "price": 1748,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-081-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-082",
    "name": "Traditional Handcrafted Artisan Harness Wallet",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Traditional Handcrafted Artisan Harness Wallet is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1768,
    "b2bPrice": 1061,
    "moq": 50,
    "categoryId": "handcrafted-accessories",
    "images": [
      "https://images.unsplash.com/photo-1627124118123-e4d31129d16a?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.4,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-082-var-std",
        "sku": "CRO-HAN-082",
        "name": "Standard Pack",
        "price": 1768,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-082-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-083",
    "name": "Vedic Pure Artisan Harness Wallet",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Vedic Pure Artisan Harness Wallet is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1787,
    "b2bPrice": 1072,
    "moq": 50,
    "categoryId": "handcrafted-accessories",
    "images": [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.5,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-083-var-std",
        "sku": "CRO-HAN-083",
        "name": "Standard Pack",
        "price": 1787,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-083-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-084",
    "name": "Darbari Premium Artisan Harness Wallet",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Darbari Premium Artisan Harness Wallet is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1806,
    "b2bPrice": 1084,
    "moq": 50,
    "categoryId": "handcrafted-accessories",
    "images": [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.6,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-084-var-std",
        "sku": "CRO-HAN-084",
        "name": "Standard Pack",
        "price": 1806,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-084-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-085",
    "name": "Vintage Crafted Artisan Harness Wallet",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Vintage Crafted Artisan Harness Wallet is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1826,
    "b2bPrice": 1096,
    "moq": 50,
    "categoryId": "handcrafted-accessories",
    "images": [
      "https://images.unsplash.com/photo-1627124118123-e4d31129d16a?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.7,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-085-var-std",
        "sku": "CRO-HAN-085",
        "name": "Standard Pack",
        "price": 1826,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-085-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-086",
    "name": "Nirvana Special Executive Desk & Wellness Hamper",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Nirvana Special Executive Desk & Wellness Hamper is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1845,
    "b2bPrice": 1107,
    "moq": 50,
    "categoryId": "corporate-gifts",
    "images": [
      "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.8,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-086-var-std",
        "sku": "CRO-COR-086",
        "name": "Standard Pack",
        "price": 1845,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-086-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-087",
    "name": "Chakra Balancing Executive Desk & Wellness Hamper",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Chakra Balancing Executive Desk & Wellness Hamper is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1865,
    "b2bPrice": 1119,
    "moq": 50,
    "categoryId": "corporate-gifts",
    "images": [
      "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.9,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-087-var-std",
        "sku": "CRO-COR-087",
        "name": "Standard Pack",
        "price": 1865,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-087-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-088",
    "name": "Mughal Signature Executive Desk & Wellness Hamper",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Mughal Signature Executive Desk & Wellness Hamper is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1884,
    "b2bPrice": 1130,
    "moq": 50,
    "categoryId": "corporate-gifts",
    "images": [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 5,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-088-var-std",
        "sku": "CRO-COR-088",
        "name": "Standard Pack",
        "price": 1884,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-088-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-089",
    "name": "Modernist Design Executive Desk & Wellness Hamper",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Modernist Design Executive Desk & Wellness Hamper is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1903,
    "b2bPrice": 1142,
    "moq": 50,
    "categoryId": "corporate-gifts",
    "images": [
      "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.3,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-089-var-std",
        "sku": "CRO-COR-089",
        "name": "Standard Pack",
        "price": 1903,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-089-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-090",
    "name": "Maharaja Classic Executive Desk & Wellness Hamper",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Maharaja Classic Executive Desk & Wellness Hamper is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1923,
    "b2bPrice": 1154,
    "moq": 50,
    "categoryId": "corporate-gifts",
    "images": [
      "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.4,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-090-var-std",
        "sku": "CRO-COR-090",
        "name": "Standard Pack",
        "price": 1923,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-090-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-091",
    "name": "Royal Heritage Executive Desk & Wellness Hamper",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Royal Heritage Executive Desk & Wellness Hamper is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1942,
    "b2bPrice": 1165,
    "moq": 50,
    "categoryId": "corporate-gifts",
    "images": [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.5,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-091-var-std",
        "sku": "CRO-COR-091",
        "name": "Standard Pack",
        "price": 1942,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-091-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-092",
    "name": "Artisan Handmade Executive Desk & Wellness Hamper",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Artisan Handmade Executive Desk & Wellness Hamper is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1961,
    "b2bPrice": 1177,
    "moq": 50,
    "categoryId": "corporate-gifts",
    "images": [
      "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.6,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-092-var-std",
        "sku": "CRO-COR-092",
        "name": "Standard Pack",
        "price": 1961,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-092-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-093",
    "name": "Imperial Wellness Executive Desk & Wellness Hamper",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Imperial Wellness Executive Desk & Wellness Hamper is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 1981,
    "b2bPrice": 1189,
    "moq": 50,
    "categoryId": "corporate-gifts",
    "images": [
      "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.7,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-093-var-std",
        "sku": "CRO-COR-093",
        "name": "Standard Pack",
        "price": 1981,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-093-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  },
  {
    "id": "product-094",
    "name": "Elite Collection Executive Desk & Wellness Hamper",
    "description": "Hand-finished premium product designed for durability and daily style. Authentically sourced and crafted from high-grade raw components.",
    "longDescription": "The Elite Collection Executive Desk & Wellness Hamper is handcrafted by master artisans using traditional techniques combined with sustainable materials. Each unit undergoes strict quality evaluation to ensure premium grade aesthetics, structural integrity, and ergonomic functionality. A perfect blend of Indian heritage craft and modern lifestyle utilities.",
    "price": 2000,
    "b2bPrice": 1200,
    "moq": 50,
    "categoryId": "corporate-gifts",
    "images": [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800"
    ],
    "rating": 4.8,
    "features": [
      "Authentic artisan handcrafting",
      "100% organic sustainable materials",
      "Designed for durability and lifestyle wellness"
    ],
    "variants": [
      {
        "id": "product-094-var-std",
        "sku": "CRO-COR-094",
        "name": "Standard Pack",
        "price": 2000,
        "stock": 100
      }
    ],
    "reviews": [
      {
        "id": "rev-product-094-1",
        "userName": "Priya M.",
        "rating": 5,
        "comment": "Exceptional quality and beautiful packaging!",
        "date": "2026-07-10"
      }
    ]
  }
];
