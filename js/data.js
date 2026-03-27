const products = [
  { 
    id: 1, 
    name: "The Oxford Classic", 
    price: 1299, 
    rating: 5, 
    image: "images/Oxf1.png", 
    images: [
      "images/Oxf1.png",
      "images/Oxf2.png",
      
    ],
    brand: "Oxford", 
    material: "Leather", 
    color: "Brown", 
    category: "Luxury Sofas", 
    isNew: true,
    description: "A timeless masterpiece crafted from premium Italian leather. The Oxford Classic features deep button tufting and rolled arms, offering unparalleled comfort and sophistication for any living space."
  },
  { 
    id: 2, 
    name: "Minimalist Cloud Sofa", 
    price: 899, 
    rating: 4.5, 
    image: "images/Cloud1.png", 
    images: [
      "images/Cloud2.png",
      "images/Cloud1.png",
    ],
    brand: "Cloud", 
    material: "Fabric", 
    color: "Cream", 
    category: "Modern Sofas", 
    isNew: false,
    description: "Experience weightless comfort with the Minimalist Cloud. Its ultra-soft fabric and overstuffed cushions create a serene seating experience, perfect for modern, airy interiors."
  },
  { 
    id: 3, 
    name: "Velvet Elegance Couch", 
    price: 1499, 
    rating: 5, 
    image: "images/elegance1.png", 
    images: [
      "images/elegance2.png",
      "images/elegance3.png",
      "images/elegance4.png"
    ],
    brand: "Oxford", 
    material: "Velvet", 
    color: "Fawn", 
    category: "Luxury Sofas", 
    isNew: true,
    description: "Draped in sumptuous charcoal velvet, this sofa exudes luxury. Its sleek silhouette and gold-accented legs make it a striking focal point in any contemporary room."
  },
  { 
    id: 4, 
    name: "Nordic Lounge Sofa", 
    price: 799, 
    rating: 4.5, 
    image: "images/nordic1.png", 
    images: [
      "images/nordic2.png",
      "images/nordic3.png",
      "images/nordic4.png",
    ],
    brand: "Nordic", 
    material: "Fabric", 
    color: "Beige", 
    category: "Modern Sofas", 
    isNew: false,
    description: "Embrace Scandinavian simplicity with the Nordic Lounge Sofa. Featuring a solid ash wood frame and durable beige fabric, it offers ergonomic support and clean lines."
  },
  { 
    id: 5, 
    name: "Royal Chesterfield", 
    price: 1999, 
    rating: 5, 
    image: "images/chelsea1.avif", 
    images: [
      "images/chelsea2.avif",
      "images/chelsea3.avif",
      
    ],
    brand: "Oxford", 
    material: "Leather", 
    color: "Dark Grey", 
    category: "Leather Sofas", 
    isNew: false,
    description: "The epitome of traditional luxury. Our Royal Chesterfield is hand-crafted with rich, dark brown leather, featuring iconic deep buttoning and a low back for a distinguished look."
  },
  { 
    id: 6, 
    name: "Modern Sectional Sofa", 
    price: 1699, 
    rating: 4.5, 
    image: "images/sectional1.png", 
    images: [
      "images/sectional2.jpg",
      "images/sectional3.jpg",
      "images/sectional4.jpg"
    ],
    brand: "ModernLiving", 
    material: "Fabric", 
    color: "White", 
    category: "Sectional Sofas", 
    isNew: true,
    description: "Versatile and spacious, this modern sectional adapts to your lifestyle. Upholstered in durable grey fabric, it provides ample seating for family and guests without compromising on style."
  },
  { 
    id: 7, 
    name: "Art Deco Velvet Sofa", 
    price: 1649, 
    rating: 4, 
    image: "images/Art1.webp", 
    images: [
      "images/Art2.webp",
      "images/Art3.webp",
      
    ],
    brand: "Oxford", 
    material: "Velvet", 
    color: "Emerald", 
    category: "Luxury Sofas", 
    isNew: true,
    description: "Add a pop of color and vintage glamour with this Art Deco inspired sofa. The rich emerald velvet and brass-finished legs create a stunning visual contrast."
  },
  { 
    id: 8, 
    name: "Linen Loveseat Sofa", 
    price: 1099, 
    rating: 4.5, 
    image: "images/loveseat1.png", 
    images: [
      "images/loveseat2.png",
      "images/loveseat3.png",
      "images/loveseat1.png"
    ],
    brand: "Cloud", 
    material: "Linen", 
    color: "White", 
    category: "Modern Sofas", 
    isNew: false,
    description: "Perfect for smaller spaces, this linen loveseat brings a breezy, relaxed feel to your home. The breathable white linen cover is removable for easy cleaning."
  },
  { 
    id: 101, 
    name: "Kivik 3-Seat Sofa", 
    price: 999, 
    rating: 4.5, 
    image: "images/Kivi2.avif", 
    images: [
      "images/Kivi1.avif",
      "images/Kivi3.avif",
      "images/Kivi4.avif"
    ],
    brand: "IKEA", 
    material: "Fabric", 
    color: "Grey", 
    category: "Modern Sofas", 
    isNew: false, 
    description: "Comfortable and practical 3-seat sofa with deep cushions and a washable cover." 
  },
  { 
    id: 102, 
    name: "Söderhamn Sectional", 
    price: 1299, 
    rating: 4.8, 
    image: "images/Soo2.avif", 
    images: [
      "images/Soo1.avif",
      "images/Soo3.avif",
      "images/Soo4.avif"
    ],
    brand: "IKEA", 
    material: "Fabric", 
    color: "grey", 
    category: "Sectional Sofas", 
    isNew: true, 
    description: "Modern modular seating that allows you to create your perfect living room setup." 
  },
  { 
    id: 103, 
    name: "Morabo Leather Sofa", 
    price: 1499, 
    rating: 4.7, 
    image: "images/mo1.avif", 
    images: [
      "images/mo2.avif",
      "images/mo3.avif",
      "images/mo4.avif"
    ],
    brand: "IKEA", 
    material: "Leather", 
    color: "Brown", 
    category: "Leather Sofas", 
    isNew: false, 
    description: "Classic leather comfort with a sleek, modern profile." 
  },
  { 
    id: 104, 
    name: "Friheten Sleeper Sofa", 
    price: 899, 
    rating: 4.6, 
    image: "images/fr1.jpg", 
    images: [
      "images/fr2.jpg",
      "images/fr3.jpg",
      "images/fr4.jpg"
    ],
    brand: "IKEA", 
    material: "Fabric", 
    color: "pink", 
    category: "Modern Sofas", 
    isNew: false, 
    description: "Versatile sleeper sofa that easily converts into a comfortable bed for guests." 
  },
  { 
    id: 105, 
    name: "Hendricks Velvet Sofa", 
    price: 1299, 
    rating: 4.9, 
    image: "images/Hendrick.png", 
    images: [
      "images/handrick2.png",
      "images/hendick1.png",
      "images/handrick2.png"
    ],
    brand: "Habitat", 
    material: "Velvet", 
    color: "BLUE", 
    category: "Luxury Sofas", 
    isNew: true, 
    description: "Luxurious velvet statement piece that brings elegance to any room." 
  },
  { 
    id: 106, 
    name: "Apollo 3-Seater Sofa", 
    price: 1150, 
    rating: 4.5, 
    image: "images/apollo1.png", 
    images: [
      "images/apollo2.png",
      "images/apollo3.png",
      "images/apollo4.png"
    ],
    brand: "Urban Ladder", 
    material: "Fabric", 
    color: "Dusky Blue", 
    category: "Modern Sofas", 
    isNew: false, 
    description: "Ergonomic and stylish 3-seater sofa designed for everyday comfort." 
  },
  { 
    id: 107, 
    name: "Emily 2-Seater Sofa", 
    price: 850, 
    rating: 4.4, 
    image: "images/emily1.webp", 
    images: [
      "images/emily1.webp",
      "images/emily2.webp",
      "images/emily3.webp"
    ],
    brand: "Home Centre", 
    material: "Fabric", 
    color: "Beige", 
    category: "Modern Sofas", 
    isNew: false, 
    description: "Cozy and affordable 2-seater sofa, perfect for apartments." 
  },
  { 
    id: 108, 
    name: "West Elm Harmony Sofa", 
    price: 1899, 
    rating: 4.8, 
    image: "images/elm.jpg", 
    images: [
      "images/elm.jpg",
      "images/elm2.jpg",
      "images/elm3.jpg"
    ],
    brand: "West Elm", 
    material: "Fabric", 
    color: "Grey", 
    category: "Luxury Sofas", 
    isNew: true, 
    description: "Premium comfort with extra-deep seating and plush cushions." 
  },
  { 
    id: 109, 
    name: "Chesterfield Classic Sofa", 
    price: 1799, 
    rating: 4.9, 
    image: "images/ches1.jpg", 
    images: [
      "images/ches1.jpg",
      "images/ches2.webp",
      "images/ches3.jpg"
    ],
    brand: "Habitat", 
    material: "Leather", 
    color: "Brown", 
    category: "Leather Sofas", 
    isNew: false, 
    description: "Timeless design with premium leather upholstery and deep button tufting." 
  },
  { 
    id: 110, 
    name: "Porto Corner Sofa", 
    price: 2199, 
    rating: 4.7, 
    image: "images/Po1.jpg", 
    images: [
      "images/Po1.jpg",
      "images/Po2.jpg",
      "images/Po3.jpg"
    ],
    brand: "Habitat", 
    material: "Fabric", 
    color: "Grey", 
    category: "Sectional Sofas", 
    isNew: true, 
    description: "Spacious corner seating perfect for entertaining guests or lounging." 
  },
  { 
    id: 111, 
    name: "Lombard Leather Sofa", 
    price: 1899, 
    rating: 4.8, 
    image: "images/Lom1.jpg", 
    images: [
      "images/Lom1.jpg",
      "images/Lom2.jpg",
      "images/Lom3.jpg"
    ],
    brand: "Habitat", 
    material: "Leather", 
    color: "Black", 
    category: "Leather Sofas", 
    isNew: false, 
    description: "Sleek modern leather sofa with clean lines and exceptional comfort." 
  },
  { 
    id: 121, 
    name: "Celine Velvet Loveseat", 
    price: 1250, 
    rating: 4.6, 
    image: "images/loveseat1.png", 
    images: [
      "images/loveseat2.png",
      "images/loveseat3.png"
    ],
    brand: "Habitat", 
    material: "Velvet", 
    color: "Blue", 
    category: "Luxury Sofas", 
    isNew: true, 
    description: "Compact and elegant velvet loveseat, ideal for chic living spaces." 
  },
  { 
    id: 122, 
    name: "Kendal Fabric Sofa", 
    price: 1399, 
    rating: 4.7, 
    image: "images/Kendal1.png", 
    images: [
      "images/Kendal2.png",
      "images/Kendal1.png",
    ],
    brand: "Habitat", 
    material: "Fabric", 
    color: "Beige", 
    category: "Modern Sofas", 
    isNew: false, 
    description: "Minimalist white fabric sofa that brightens up any room." 
  },
  { 
    id: 112, 
    name: "Malabar Wooden Frame Sofa", 
    price: 1150, 
    rating: 4.6, 
    image: "images/sof1.jpg", 
    images: [
      "images/sof1.jpg",
      "images/sof2.jpg",
      "images/sof3.jpg"
    ],
    brand: "Urban Ladder", 
    material: "Wood", 
    color: "Brown", 
    category: "Modern Sofas", 
    isNew: false, 
    description: "Classic wooden frame sofa with plush cushions for a rustic yet modern look." 
  },
  { 
    id: 113, 
    name: "Tokyo Reclining Sofa", 
    price: 1600, 
    rating: 4.8, 
    image: "images/Tok1.webp", 
    images: [
      "images/Tok1.webp",
      "images/Tok2.webp",
      "images/Tok3.webp"
    ],
    brand: "Urban Ladder", 
    material: "Leather", 
    color: "Black", 
    category: "Leather Sofas", 
    isNew: true, 
    description: "Ultimate relaxation with this premium reclining sofa." 
  },
  { 
    id: 114, 
    name: "Florence L-Shape Sofa", 
    price: 1850, 
    rating: 4.7, 
    image: "images/flo1.jpg", 
    images: [
      "images/flo1.jpg",
      "images/flo2.jpg",
      "images/flo3.jpg"
    ],
    brand: "Urban Ladder", 
    material: "Fabric", 
    color: "White", 
    category: "Sectional Sofas", 
    isNew: false, 
    description: "Spacious and comfortable L-shape sofa, perfect for lounging." 
  },
  { 
    id: 115, 
    name: "Oliver Sectional Sofa", 
    price: 1450, 
    rating: 4.5, 
    image: "images/Oliver1.jpg", 
    images: [
      "images/Oliver2.jpg",
      "images/Oliver3.jpg",
      "images/Oliver4.jpg"
    ],
    brand: "Home Centre", 
    material: "Fabric", 
    color: "Beige", 
    category: "Sectional Sofas", 
    isNew: false, 
    description: "Perfect for families, offering plenty of seating space and durable fabric." 
  },
  { 
    id: 116, 
    name: "Sophia Velvet Sofa", 
    price: 1290, 
    rating: 4.6, 
    image: "images/So1.jpg", 
    images: [
      "images/So2.jpg",
      "images/So3.jpg",
      "images/So4.jpg"
    ],
    brand: "Home Centre", 
    material: "Velvet", 
    color: "Grey", 
    category: "Luxury Sofas", 
    isNew: true, 
    description: "Elegant and soft velvet sofa that adds a touch of glamour." 
  },
  { 
    id: 117, 
    name: "Liam Reclining Sofa", 
    price: 1650, 
    rating: 4.4, 
    image: "images/rec1.jpg", 
    images: [
      "images/rec1.jpg",
      "images/rec2.jpg",
      "images/rec3.jpg"
    ],
    brand: "Home Centre", 
    material: "Fabric", 
    color: "Grey", 
    category: "Modern Sofas", 
    isNew: false, 
    description: "Comfortable reclining sofa with plush armrests and back support." 
  },
  { 
    id: 118, 
    name: "Andes Sectional Sofa", 
    price: 2299, 
    rating: 4.9, 
    image: "images/andes1.jpg", 
    images: [
      "images/andes1.jpg",
      "images/andes2.jpg",
      "images/andes3.jpg"
    ],
    brand: "West Elm", 
    material: "Fabric", 
    color: "Grey", 
    category: "Sectional Sofas", 
    isNew: true, 
    description: "Modern and spacious sectional sofa with deep seating." 
  },
  { 
    id: 119, 
    name: "Haven Leather Sofa", 
    price: 2400, 
    rating: 4.8, 
    image: "images/haven1.webp", 
    images: [
      "images/haven1.webp",
      "images/haven2.webp",
      "images/haven3.webp"
    ],
    brand: "West Elm", 
    material: "Leather", 
    color: "Brown", 
    category: "Leather Sofas", 
    isNew: false, 
    description: "Premium leather comfort with a relaxed, sink-in feel." 
  },
  { 
    id: 120, 
    name: "Newport Sleeper Sofa", 
    price: 1750, 
    rating: 4.7, 
    image: "images/newp1.avif", 
    images: [
      "images/newp1.avif",
      "images/newp2.avif",
      "images/newp3.avif"
    ],
    brand: "West Elm", 
    material: "Fabric", 
    color: "silver", 
    category: "Modern Sofas", 
    isNew: false, 
    description: "Stylish sleeper sofa that doesn't compromise on comfort or design." 
  }
];


