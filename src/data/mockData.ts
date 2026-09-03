import { CategoryItem, Coupon, Order, Product } from "@/types";

export const INITIAL_CATEGORIES: CategoryItem[] = [
  {
    id: "cat-1",
    slug: "backpacks",
    name: "Heritage & Urban Backpacks",
    tagline: "Engineered for daily commute, tech protection & weekend travel",
    description: "Discover handcrafted full-grain leather and weather-resistant canvas backpacks featuring padded 16\" laptop compartments, ergonomic straps, and smart organization.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=900",
    productCount: 8,
    badge: "Bestseller"
  },
  {
    id: "cat-2",
    slug: "totes",
    name: "Luxury Structured Totes",
    tagline: "Timeless silhouettes designed for work, travel and daily elegance",
    description: "Roomy yet refined leather and waxed canvas totes equipped with zippered security tops, key leashes, and interior organizer pockets.",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=900",
    productCount: 6,
    badge: "Trending"
  },
  {
    id: "cat-3",
    slug: "crossbody",
    name: "Crossbody & Messenger Bags",
    tagline: "Hands-free utility with bespoke leather finishes",
    description: "Versatile crossbody bags and classic flap-over messengers crafted for swift urban mobility with quick-access magnetic closures.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=900",
    productCount: 6,
  },
  {
    id: "cat-4",
    slug: "duffels",
    name: "Weekender & Travel Duffels",
    tagline: "TSA carry-on compliant weekender bags built for lifetime journeys",
    description: "Rugged elegance featuring dedicated ventilated shoe compartments, heavy-duty YKK brass zippers, and detachable shoulder straps.",
    image: "https://images.unsplash.com/photo-1528732263440-4dd1a18a4cc2?auto=format&fit=crop&q=80&w=900",
    productCount: 5,
    badge: "Popular"
  },
  {
    id: "cat-5",
    slug: "briefcases",
    name: "Executive Briefcases & Satchels",
    tagline: "Command the boardroom with vegetable-tanned leather excellence",
    description: "Sleek document folios and structured executive briefcases designed to securely house tech, contracts, and fine writing instruments.",
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&q=80&w=900",
    productCount: 4,
  },
  {
    id: "cat-6",
    slug: "slings",
    name: "Modern Sling & Chest Packs",
    tagline: "Compact, ultra-lightweight minimalist everyday carry",
    description: "Waterproof ripstop and ballistic nylon sling bags engineered for essentials—phone, passport, wallet, keys, and sunglasses.",
    image: "https://images.unsplash.com/photo-1577733966973-d680bffd2e80?auto=format&fit=crop&q=80&w=900",
    productCount: 4,
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    title: "The Sovereign Full-Grain Leather Daypack",
    slug: "sovereign-leather-daypack",
    shortDescription: "Hand-stitched Italian Vachetta leather backpack with dedicated 16\" laptop sleeve and waterproof brass hardware.",
    description: "The Sovereign Daypack embodies timeless craftsmanship merged with modern functionality. Made from vegetable-tanned Italian Vachetta leather that develops a rich, unique patina over time. It features a padded micro-suede 16-inch laptop compartment, dual side water bottle pockets, an anti-theft hidden passport pocket, and contoured memory foam shoulder straps for all-day comfort.",
    category: "backpacks",
    categoryName: "Heritage & Urban Backpacks",
    basePrice: 3450,
    compareAtPrice: 4200,
    rating: 4.9,
    reviewCount: 142,
    isFeatured: true,
    isBestSeller: true,
    tags: ["Leather", "Laptop", "Work", "Commute", "Handcrafted"],
    specs: {
      dimensions: "17.2\" H x 12.0\" W x 6.5\" D",
      capacity: "22 Liters",
      weight: "2.8 lbs (1.27 kg)",
      laptopFit: "Up to 16\" MacBook Pro / 15.6\" PC",
      material: "Full-Grain Italian Vachetta Leather & 1000D Cordura Lining",
      waterResistance: "Weather-resistant wax treated leather with waterproof YKK zippers",
      warranty: "Lifetime Craftsmanship Guarantee"
    },
    features: [
      "Dedicated padded 16\" laptop sleeve with magnetic security flap",
      "Hidden anti-theft back panel pocket for passport & cash",
      "Ergonomic padded shoulder straps with breathable air-mesh",
      "Trolley pass-through sleeve for rolling luggage attachment",
      "Solid antique brass YKK Excella zippers"
    ],
    variants: [
      {
        sku: "SOV-COGNAC-22L",
        colorName: "Cognac Amber",
        colorHex: "#9A3412",
        sizeOrCapacity: "Standard (22L)",
        materialOption: "Full-Grain Leather",
        stock: 14,
        priceOffset: 0,
        images: [
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1200",
          "https://images.unsplash.com/photo-1546938576-6e6a64f317cc?auto=format&fit=crop&q=80&w=1200",
          "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&q=80&w=1200"
        ]
      },
      {
        sku: "SOV-BLACK-22L",
        colorName: "Obsidian Black",
        colorHex: "#18181B",
        sizeOrCapacity: "Standard (22L)",
        materialOption: "Full-Grain Leather",
        stock: 9,
        priceOffset: 0,
        images: [
          "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&q=80&w=1200",
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1200"
        ]
      },
      {
        sku: "SOV-OLIVE-22L",
        colorName: "Forest Olive",
        colorHex: "#3F4F38",
        sizeOrCapacity: "Standard (22L)",
        materialOption: "Waxed Canvas & Leather Trim",
        stock: 6,
        priceOffset: -200,
        images: [
          "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&q=80&w=1200",
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1200"
        ]
      }
    ],
    reviews: [
      {
        id: "rev-1",
        author: "Tahmid Rahman",
        rating: 5,
        date: "2026-08-14",
        title: "Exceptional quality leather bag",
        comment: "The craftsmanship on the Cognac leather is mind-blowing. Holds my 16-inch laptop with ample room for my headphones, tech pouch, and charger. Cash on delivery was super fast in Gulshan!",
        verifiedPurchase: true
      },
      {
        id: "rev-2",
        author: "Nusrat Jahan",
        rating: 5,
        date: "2026-07-28",
        title: "Perfect daily commuter",
        comment: "Very elegant and durable. The stitching and zippers are top-notch.",
        verifiedPurchase: true
      }
    ],
    createdAt: "2026-01-10"
  },
  {
    id: "prod-2",
    title: "Aura Minimalist Structured Leather Tote",
    slug: "aura-minimalist-structured-tote",
    shortDescription: "Ultra-refined premium leather work tote with protective laptop divider, brass feet, and magnetic key clip.",
    description: "Designed for the modern professional, the Aura Tote effortlessly transitions from high-stakes morning meetings to evening dinners. Handcrafted with top-grain pebbled leather, this structured silhouette resists scuffing while maintaining an architectural drape.",
    category: "totes",
    categoryName: "Luxury Structured Totes",
    basePrice: 2850,
    compareAtPrice: 3450,
    rating: 4.8,
    reviewCount: 98,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    tags: ["Tote", "Work", "Leather", "Minimalist", "Women"],
    specs: {
      dimensions: "14.5\" H x 18.0\" W x 6.0\" D",
      capacity: "18 Liters",
      weight: "2.1 lbs (0.95 kg)",
      laptopFit: "Up to 15\" Laptop or iPad Pro",
      material: "Top-Grain Pebbled Italian Leather with Suede Lining",
      waterResistance: "Stain and water-resistant protective coating",
      warranty: "Lifetime Craftsmanship Guarantee"
    },
    features: [
      "Padded center zipper compartment for 15\" laptop",
      "Interior organization suite with pen slots, phone slot & card holder",
      "Reinforced base with 5 protective solid brass feet",
      "Detachable quick-release leather key fob",
      "Magnetic top closure with secondary security zip"
    ],
    variants: [
      {
        sku: "AUR-TAN-18L",
        colorName: "Saddle Tan",
        colorHex: "#C27D38",
        sizeOrCapacity: "Standard (18L)",
        stock: 12,
        priceOffset: 0,
        images: [
          "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1200",
          "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=1200"
        ]
      },
      {
        sku: "AUR-BLACK-18L",
        colorName: "Noir Black",
        colorHex: "#111827",
        sizeOrCapacity: "Standard (18L)",
        stock: 8,
        priceOffset: 0,
        images: [
          "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200"
        ]
      },
      {
        sku: "AUR-EMERALD-18L",
        colorName: "Emerald Forest",
        colorHex: "#064E3B",
        sizeOrCapacity: "Standard (18L)",
        stock: 4,
        priceOffset: 150,
        images: [
          "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1200"
        ]
      }
    ],
    reviews: [
      {
        id: "rev-3",
        author: "Farhana Ahmed",
        rating: 5,
        date: "2026-08-01",
        title: "Holds everything gracefully",
        comment: "This tote fits my MacBook, cosmetic pouch, water flask, and notebooks without bulging. Structured silhouette stays upright when placed on my desk.",
        verifiedPurchase: true
      }
    ],
    createdAt: "2026-02-15"
  },
  {
    id: "prod-3",
    title: "The Nomad Waxed Canvas Weekender Duffel",
    slug: "nomad-waxed-canvas-weekender-duffel",
    shortDescription: "Heavy-duty 18oz Scottish waxed canvas travel duffel with ventilated shoe tunnel and bridle leather handles.",
    description: "Built for weekend getaways and airline carry-on travel. The Nomad combines rugged water-shedding 18oz waxed canvas with thick English bridle leather handles. Includes a side-loading ventilated compartment to isolate boots or shoes from clean apparel.",
    category: "duffels",
    categoryName: "Weekender & Travel Duffels",
    basePrice: 4200,
    compareAtPrice: 4950,
    rating: 4.9,
    reviewCount: 84,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    tags: ["Travel", "Duffel", "Waxed Canvas", "Overnight", "Gym"],
    specs: {
      dimensions: "20.5\" L x 11.5\" W x 12.0\" H",
      capacity: "42 Liters (Airline Carry-On Compliant)",
      weight: "3.4 lbs (1.54 kg)",
      laptopFit: "Dedicated 14\" quick-access tech pocket",
      material: "18oz Heritage Scottish Waxed Canvas & Bridle Leather",
      waterResistance: "Impermeable wax barrier with storm-flap zippers",
      warranty: "Lifetime Craftsmanship Guarantee"
    },
    features: [
      "Separate ventilated footwear / dirty laundry tunnel",
      "Reinforced heavy-gauge brass two-way main zipper",
      "Detachable ergonomic leather shoulder strap with sliding pad",
      "Exterior quick-stash passport and boarding pass pocket",
      "Waterproof tarpaulin bottom panel resists wet floors"
    ],
    variants: [
      {
        sku: "NOM-KHAKI-42L",
        colorName: "Safari Khaki",
        colorHex: "#A38F78",
        sizeOrCapacity: "42L Carry-On",
        stock: 10,
        priceOffset: 0,
        images: [
          "https://images.unsplash.com/photo-1528732263440-4dd1a18a4cc2?auto=format&fit=crop&q=80&w=1200",
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1200"
        ]
      },
      {
        sku: "NOM-CHARCOAL-42L",
        colorName: "Charcoal Slate",
        colorHex: "#374151",
        sizeOrCapacity: "42L Carry-On",
        stock: 7,
        priceOffset: 0,
        images: [
          "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200"
        ]
      }
    ],
    reviews: [
      {
        id: "rev-4",
        author: "Kazi Ashiqur",
        rating: 5,
        date: "2026-08-19",
        title: "The ultimate 3-day travel bag",
        comment: "Packed 3 outfits, running shoes in the shoe tunnel, and my grooming kit. Fit effortlessly in the overhead bin.",
        verifiedPurchase: true
      }
    ],
    createdAt: "2026-03-01"
  },
  {
    id: "prod-4",
    title: "Vanguard Executive Bridle Leather Briefcase",
    slug: "vanguard-executive-bridle-leather-briefcase",
    shortDescription: "Structured vegetable-tanned executive satchel with dual gusset filing, brass latch lock, and luggage strap.",
    description: "The Vanguard is tailored for professionals who command excellence. Constructed with 5-6oz vegetable-tanned bridle leather and lined with heavy cotton twill. Features dual spacious gussets for laptops, case files, and tablets, sealed with a classic brass lock.",
    category: "briefcases",
    categoryName: "Executive Briefcases & Satchels",
    basePrice: 4850,
    compareAtPrice: 5600,
    rating: 5.0,
    reviewCount: 67,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: false,
    tags: ["Briefcase", "Executive", "Leather", "Office", "Classic"],
    specs: {
      dimensions: "16.5\" W x 12.5\" H x 5.0\" D",
      capacity: "16 Liters",
      weight: "3.6 lbs (1.63 kg)",
      laptopFit: "Up to 16\" MacBook Pro / 15.6\" Laptop",
      material: "Full-Grain English Bridle Leather with Brass Hardware",
      waterResistance: "Naturally weather-treated oil finish",
      warranty: "Lifetime Craftsmanship Guarantee"
    },
    features: [
      "Dual interior accordion gussets with center zippered document pocket",
      "Solid cast brass key-lock latch mechanism",
      "Integrated rear luggage trolley strap",
      "Dedicated pen, card, and stylus organizers",
      "Stitched and burnished leather grab handle"
    ],
    variants: [
      {
        sku: "VAN-MAHOGANY",
        colorName: "Mahogany Brown",
        colorHex: "#451A03",
        sizeOrCapacity: "16\" Dual Gusset",
        stock: 5,
        priceOffset: 0,
        images: [
          "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&q=80&w=1200",
          "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1200"
        ]
      },
      {
        sku: "VAN-BLACK",
        colorName: "Classic Black",
        colorHex: "#0F172A",
        sizeOrCapacity: "16\" Dual Gusset",
        stock: 4,
        priceOffset: 0,
        images: [
          "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&q=80&w=1200"
        ]
      }
    ],
    reviews: [
      {
        id: "rev-5",
        author: "Barrister Rafiqul Islam",
        rating: 5,
        date: "2026-07-15",
        title: "Heirloom grade executive briefcase",
        comment: "Carries my legal briefs and MacBook with effortless prestige. The brass lock is satisfying and secure.",
        verifiedPurchase: true
      }
    ],
    createdAt: "2026-02-10"
  },
  {
    id: "prod-5",
    title: "Aero Modular Waterproof Crossbody Sling",
    slug: "aero-modular-waterproof-crossbody-sling",
    shortDescription: "Ultra-lightweight weatherproof sling with Fidlock magnetic buckle, expandable gusset, and key tether.",
    description: "Engineered for minimalist urban exploration. The Aero Sling holds your daily EDC essentials—iPhone, sunglasses, wallet, AirPods, and passport. Features German-engineered Fidlock magnetic quick-release buckle and waterproof Aquaguard zippers.",
    category: "slings",
    categoryName: "Modern Sling & Chest Packs",
    basePrice: 1450,
    compareAtPrice: 1800,
    rating: 4.8,
    reviewCount: 112,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    tags: ["Sling", "EDC", "Minimalist", "Waterproof", "Urban"],
    specs: {
      dimensions: "11.5\" W x 6.5\" H x 3.5\" D",
      capacity: "4.5 Liters (Expandable to 6L)",
      weight: "0.75 lbs (0.34 kg)",
      laptopFit: "Fits iPad Mini / Kindle Paperwhite",
      material: "X-Pac VX21 Waterproof Sailcloth & Recycled Poly",
      waterResistance: "100% Weatherproof laminate with YKK Aquaguard",
      warranty: "Lifetime Craftsmanship Guarantee"
    },
    features: [
      "German Fidlock V-Buckle magnetic quick-release strap",
      "Hidden rear security pocket for passport and credit cards",
      "Self-compressing bungee cord for compact footprint",
      "Soft micro-fleece lined pocket for sunglasses or phone",
      "Magnetic auto-docking key clip leash"
    ],
    variants: [
      {
        sku: "AER-BLACK-4L",
        colorName: "Stealth Black",
        colorHex: "#18181B",
        sizeOrCapacity: "4.5L",
        stock: 22,
        priceOffset: 0,
        images: [
          "https://images.unsplash.com/photo-1577733966973-d680bffd2e80?auto=format&fit=crop&q=80&w=1200",
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1200"
        ]
      },
      {
        sku: "AER-SLATE-4L",
        colorName: "Glacier Grey",
        colorHex: "#64748B",
        sizeOrCapacity: "4.5L",
        stock: 15,
        priceOffset: 0,
        images: [
          "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200"
        ]
      }
    ],
    reviews: [
      {
        id: "rev-6",
        author: "Zubair Hossain",
        rating: 5,
        date: "2026-08-22",
        title: "Hands down the best sling pack",
        comment: "Fidlock magnetic buckle is addictive to use. Keeps my pockets completely empty when biking around Dhaka.",
        verifiedPurchase: true
      }
    ],
    createdAt: "2026-04-12"
  },
  {
    id: "prod-6",
    title: "The Florentine Italian Leather Messenger",
    slug: "florentine-italian-leather-messenger",
    shortDescription: "Timeless flap-over shoulder messenger bag with magnetic quick snaps and 14\" padded laptop section.",
    description: "A tribute to vintage postal bags and university satchels. The Florentine combines supple calfskin leather with antique bronze fixtures. Features quick-release hidden magnetic snaps beneath authentic buckle straps for instant access.",
    category: "crossbody",
    categoryName: "Crossbody & Messenger Bags",
    basePrice: 2950,
    compareAtPrice: 3500,
    rating: 4.7,
    reviewCount: 53,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: false,
    tags: ["Messenger", "Crossbody", "Vintage", "Leather", "Work"],
    specs: {
      dimensions: "15.0\" W x 11.5\" H x 4.5\" D",
      capacity: "14 Liters",
      weight: "2.5 lbs (1.13 kg)",
      laptopFit: "Up to 14\" MacBook Pro / 13\" Laptops",
      material: "Full-Grain Italian Calfskin with Tartan Cotton Lining",
      waterResistance: "Wax-conditioned water-repellent finish",
      warranty: "Lifetime Craftsmanship Guarantee"
    },
    features: [
      "Concealed quick-snap magnetic locks behind buckle straps",
      "Padded 14\" device pocket and notebook partition",
      "Adjustable woven cotton webbing shoulder strap with leather pad",
      "Rear slip pocket with magnetic fastener for newspapers / tablet"
    ],
    variants: [
      {
        sku: "FLO-CHESTNUT",
        colorName: "Chestnut Brown",
        colorHex: "#78350F",
        sizeOrCapacity: "14L Messenger",
        stock: 8,
        priceOffset: 0,
        images: [
          "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1200"
        ]
      }
    ],
    reviews: [
      {
        id: "rev-7",
        author: "Mahir Faysal",
        rating: 5,
        date: "2026-08-05",
        title: "Classic style with modern convenience",
        comment: "The hidden magnetic clasps are brilliant. Looks like a traditional buckled satchel but opens in one second.",
        verifiedPurchase: true
      }
    ],
    createdAt: "2026-03-20"
  },
  {
    id: "prod-7",
    title: "Capri Pebbled Leather Crescent Crossbody",
    slug: "capri-pebbled-leather-crescent-crossbody",
    shortDescription: "Chic curved silhouette handbag with adjustable strap, dual zippers, and interior velvet card slots.",
    description: "The Capri Crescent Bag pairs an elegant ergonomic curve with luxurious Italian pebbled calfskin. Contoured to rest effortlessly against the torso, making it the perfect companion for dining, art galleries, and evening strolls.",
    category: "crossbody",
    categoryName: "Crossbody & Messenger Bags",
    basePrice: 2150,
    compareAtPrice: 2600,
    rating: 4.9,
    reviewCount: 76,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    tags: ["Crossbody", "Handbag", "Women", "Luxury", "Evening"],
    specs: {
      dimensions: "10.5\" W x 7.0\" H x 3.2\" D",
      capacity: "3.5 Liters",
      weight: "1.1 lbs (0.5 kg)",
      laptopFit: "Fits all smartphones, passport & wallet",
      material: "Pebbled Italian Calfskin Leather with Micro-Velvet Lining",
      waterResistance: "Scratch and moisture resistant treatment",
      warranty: "Lifetime Craftsmanship Guarantee"
    },
    features: [
      "Curved crescent ergonomic drape hugs the body",
      "Two-way gold-tone zipper with elongated leather pulls",
      "Adjustable pin-buckle leather strap (shoulder or crossbody length)",
      "4 internal velvet-lined card organizer slots"
    ],
    variants: [
      {
        sku: "CAP-LATTE",
        colorName: "Cream Latte",
        colorHex: "#E5E0D8",
        sizeOrCapacity: "Standard",
        stock: 14,
        priceOffset: 0,
        images: [
          "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=1200"
        ]
      },
      {
        sku: "CAP-BURGUNDY",
        colorName: "Deep Burgundy",
        colorHex: "#581C87",
        sizeOrCapacity: "Standard",
        stock: 9,
        priceOffset: 0,
        images: [
          "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1200"
        ]
      }
    ],
    reviews: [
      {
        id: "rev-8",
        author: "Afsana Mimi",
        rating: 5,
        date: "2026-08-11",
        title: "My favorite purse ever",
        comment: "The leather is buttery soft and the crescent silhouette sits comfortably under my arm.",
        verifiedPurchase: true
      }
    ],
    createdAt: "2026-05-02"
  },
  {
    id: "prod-8",
    title: "Signature Full-Grain Leather Bi-Fold Wallet",
    slug: "signature-leather-bi-fold-wallet",
    shortDescription: "Ultra-slim RFID-shielded vegetable tanned wallet with 8 card slots, billfold divider, and gift box.",
    description: "Crafted from single-origin vegetable-tanned leather, this slim bi-fold features built-in RFID blocking to secure your contactless cards. Edges are hand-creased and beveled for lifelong durability.",
    category: "slings",
    categoryName: "Modern Sling & Chest Packs",
    basePrice: 850,
    compareAtPrice: 1100,
    rating: 4.9,
    reviewCount: 165,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    tags: ["Wallet", "Accessories", "Leather", "EDC", "Gift"],
    specs: {
      dimensions: "4.3\" W x 3.5\" H x 0.4\" D",
      capacity: "8-12 Cards + Full Size Cash Bills",
      weight: "0.18 lbs (80 grams)",
      laptopFit: "Pocket EDC",
      material: "Full-Grain Tuscan Vegetable-Tanned Leather",
      waterResistance: "Natural wax burnish",
      warranty: "Lifetime Craftsmanship Guarantee"
    },
    features: [
      "Integrated military-grade RFID protective liner",
      "8 card slots, 2 receipt pockets, and divided cash billfold",
      "Beveled and hand-waxed smooth edge finishing",
      "Packaged in a debossed keepsake presentation gift box"
    ],
    variants: [
      {
        sku: "WAL-SADDLE",
        colorName: "Saddle Tan",
        colorHex: "#9A3412",
        sizeOrCapacity: "One Size",
        stock: 35,
        priceOffset: 0,
        images: [
          "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=1200"
        ]
      },
      {
        sku: "WAL-NOIR",
        colorName: "Noir Black",
        colorHex: "#18181B",
        sizeOrCapacity: "One Size",
        stock: 28,
        priceOffset: 0,
        images: [
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1200"
        ]
      }
    ],
    reviews: [
      {
        id: "rev-9",
        author: "Tanvir Hasan",
        rating: 5,
        date: "2026-08-25",
        title: "Top tier leather wallet",
        comment: "Fits Bangladeshi Taka notes comfortably without sticking out. The tan leather is already developing a gorgeous patina.",
        verifiedPurchase: true
      }
    ],
    createdAt: "2026-01-20"
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: "coup-1",
    code: "GLORY10",
    description: "Special 10% discount on all handcrafted leather bags",
    discountType: "percentage",
    discountValue: 10,
    minOrderValue: 1500,
    maxDiscount: 1000,
    usageLimit: 500,
    usageCount: 142,
    isActive: true,
    expiresAt: "2026-12-31"
  },
  {
    id: "coup-2",
    code: "BAGS20",
    description: "20% off when you spend over ৳3,000",
    discountType: "percentage",
    discountValue: 20,
    minOrderValue: 3000,
    maxDiscount: 1500,
    usageLimit: 200,
    usageCount: 78,
    isActive: true,
    expiresAt: "2026-10-31"
  },
  {
    id: "coup-3",
    code: "OFF500",
    description: "Flat ৳500 instant discount on premium bags",
    discountType: "fixed",
    discountValue: 500,
    minOrderValue: 3500,
    usageLimit: 100,
    usageCount: 29,
    isActive: true,
    expiresAt: "2026-11-30"
  },
  {
    id: "coup-4",
    code: "WELCOME15",
    description: "Welcome discount: 15% off first order",
    discountType: "percentage",
    discountValue: 15,
    minOrderValue: 2000,
    maxDiscount: 800,
    usageLimit: 1000,
    usageCount: 312,
    isActive: true,
    expiresAt: "2026-12-31"
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: "BG-2026-8891",
    createdAt: "2026-09-02T10:30:00Z",
    customer: {
      fullName: "Tanvir Ahmed",
      phone: "+880 1712-345678",
      email: "tanvir.ahmed@example.com",
      streetAddress: "House 42, Road 11, Block D",
      city: "Dhaka",
      districtState: "Banani, Dhaka",
      postalCode: "1213",
      deliveryNotes: "Call when reaching building gate. Cash on delivery."
    },
    items: [
      {
        id: "prod-1-SOV-COGNAC-22L",
        productId: "prod-1",
        slug: "sovereign-leather-daypack",
        title: "The Sovereign Full-Grain Leather Daypack",
        category: "Heritage & Urban Backpacks",
        variantSku: "SOV-COGNAC-22L",
        colorName: "Cognac Amber",
        colorHex: "#9A3412",
        sizeOrCapacity: "Standard (22L)",
        price: 3450,
        originalPrice: 4200,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600",
        stock: 14
      }
    ],
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending (Cash on Delivery)",
    orderStatus: "Processing",
    subtotal: 3450,
    shippingFee: 0,
    discountAmount: 345,
    couponApplied: "GLORY10",
    total: 3105,
    trackingHistory: [
      {
        status: "Pending",
        label: "Order Placed",
        description: "Your order has been received and verified for Cash on Delivery.",
        timestamp: "2026-09-02 10:30 AM",
        completed: true,
        current: false
      },
      {
        status: "Processing",
        label: "Handcrafting & Quality Check",
        description: "Your bag is being packaged with protective dust cover.",
        timestamp: "2026-09-02 02:15 PM",
        completed: true,
        current: true
      },
      {
        status: "Shipped",
        label: "Dispatched to Courier",
        description: "Pathao / Steadfast Courier tracking #BG-889218 has been assigned.",
        timestamp: "Pending",
        completed: false,
        current: false
      },
      {
        status: "Out for Delivery",
        label: "Out for Delivery",
        description: "Rider is en route to your delivery address. Please keep exact cash ready.",
        timestamp: "Pending",
        completed: false,
        current: false
      },
      {
        status: "Delivered",
        label: "Delivered & Cash Collected",
        description: "Package received and cash payment successfully settled.",
        timestamp: "Pending",
        completed: false,
        current: false
      }
    ]
  },
  {
    id: "BG-2026-7742",
    createdAt: "2026-08-31T14:20:00Z",
    customer: {
      fullName: "Samira Chowdhury",
      phone: "+880 1819-876543",
      email: "samira.chowdhury@example.com",
      streetAddress: "Apt 5B, Concord Tower, GEC Circle",
      city: "Chittagong",
      districtState: "Chittagong",
      postalCode: "4000",
      deliveryNotes: "Deliver in afternoon. Keep change for ৳4,000."
    },
    items: [
      {
        id: "prod-2-AUR-TAN-18L",
        productId: "prod-2",
        slug: "aura-minimalist-structured-tote",
        title: "Aura Minimalist Structured Leather Tote",
        category: "Luxury Structured Totes",
        variantSku: "AUR-TAN-18L",
        colorName: "Saddle Tan",
        colorHex: "#C27D38",
        sizeOrCapacity: "Standard (18L)",
        price: 2850,
        originalPrice: 3450,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=600",
        stock: 12
      },
      {
        id: "prod-8-WAL-SADDLE",
        productId: "prod-8",
        slug: "signature-leather-bi-fold-wallet",
        title: "Signature Full-Grain Leather Bi-Fold Wallet",
        category: "Modern Sling & Chest Packs",
        variantSku: "WAL-SADDLE",
        colorName: "Saddle Tan",
        colorHex: "#9A3412",
        sizeOrCapacity: "One Size",
        price: 850,
        originalPrice: 1100,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=600",
        stock: 35
      }
    ],
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Paid upon Delivery",
    orderStatus: "Delivered",
    subtotal: 3700,
    shippingFee: 0,
    discountAmount: 500,
    couponApplied: "OFF500",
    total: 3200,
    trackingHistory: [
      {
        status: "Pending",
        label: "Order Placed",
        description: "Order placed via Cash on Delivery.",
        timestamp: "2026-08-31 02:20 PM",
        completed: true,
        current: false
      },
      {
        status: "Processing",
        label: "Inspected & Packed",
        description: "Package sealed with BagsGlory authenticity seal.",
        timestamp: "2026-08-31 05:00 PM",
        completed: true,
        current: false
      },
      {
        status: "Shipped",
        label: "Dispatched",
        description: "Express courier assigned.",
        timestamp: "2026-09-01 09:00 AM",
        completed: true,
        current: false
      },
      {
        status: "Out for Delivery",
        label: "Out for Delivery",
        description: "Courier out for delivery in Chittagong.",
        timestamp: "2026-09-01 01:15 PM",
        completed: true,
        current: false
      },
      {
        status: "Delivered",
        label: "Delivered & Cash Collected",
        description: "Delivered safely and ৳3,200 cash payment received.",
        timestamp: "2026-09-01 03:45 PM",
        completed: true,
        current: true
      }
    ]
  }
];
