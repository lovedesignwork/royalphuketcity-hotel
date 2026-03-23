export interface RoomDetail {
  slug: string;
  name: string;
  category: string;
  size: string;
  maxGuests: number;
  bedType: string;
  views: string[];
  description: string[];
  amenities: string[];
  images: {
    src: string;
    alt: string;
  }[];
}

export const ROOM_DETAILS: Record<string, RoomDetail> = {
  "premier-superior": {
    slug: "premier-superior",
    name: "Premier Superior",
    category: "Premier",
    size: "32 sqm",
    maxGuests: 3,
    bedType: "King or Twin",
    views: ["City View"],
    description: [
      "Our Premier Superior rooms offer elegant comfort with contemporary design, featuring warm wood accents and floor-to-ceiling windows that flood the space with natural light.",
      "Each room is thoughtfully appointed with premium bedding, a spacious work area, and a luxurious bathroom with rain shower and premium bath amenities.",
      "Wake up to stunning views of Phuket Old Town and enjoy in-room amenities designed for both relaxation and productivity.",
    ],
    amenities: [
      "King or Twin Bed",
      "32 sqm Living Space",
      "Floor-to-ceiling Windows",
      "City View",
      "Rain Shower",
      "Premium Bath Amenities",
      "Smart TV with Streaming",
      "High-Speed WiFi",
      "Work Desk",
      "Mini Bar",
      "In-Room Safe",
      "Coffee & Tea Making",
      "Bathrobes & Slippers",
      "Daily Housekeeping",
      "24-Hour Room Service",
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop",
        alt: "Premier Superior - Main View",
      },
      {
        src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
        alt: "Premier Superior - Bed",
      },
      {
        src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
        alt: "Premier Superior - Bathroom",
      },
      {
        src: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2070&auto=format&fit=crop",
        alt: "Premier Superior - View",
      },
    ],
  },
  "premier-superior-sea-view": {
    slug: "premier-superior-sea-view",
    name: "Premier Superior - Partial Sea View",
    category: "Partial Sea View",
    size: "32 sqm",
    maxGuests: 3,
    bedType: "King or Twin",
    views: ["Partial Sea View"],
    description: [
      "Experience the beauty of the Andaman Sea from our Premier Superior rooms with partial sea views, offering glimpses of crystal blue waters alongside the Phuket cityscape.",
      "Each room features contemporary design with warm accents, premium bedding, and a luxurious bathroom with rain shower and curated bath amenities.",
      "The perfect retreat for those seeking a connection to the sea while enjoying the convenience of our central Old Town location.",
    ],
    amenities: [
      "King or Twin Bed",
      "32 sqm Living Space",
      "Floor-to-ceiling Windows",
      "Partial Sea View",
      "Rain Shower",
      "Premium Bath Amenities",
      "Smart TV with Streaming",
      "High-Speed WiFi",
      "Work Desk",
      "Mini Bar",
      "In-Room Safe",
      "Coffee & Tea Making",
      "Bathrobes & Slippers",
      "Daily Housekeeping",
      "24-Hour Room Service",
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
        alt: "Premier Superior Sea View - Main",
      },
      {
        src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop",
        alt: "Premier Superior Sea View - Bedroom",
      },
      {
        src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
        alt: "Premier Superior Sea View - Bathroom",
      },
      {
        src: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974&auto=format&fit=crop",
        alt: "Premier Superior Sea View - View",
      },
    ],
  },
  "premier-deluxe": {
    slug: "premier-deluxe",
    name: "Premier Deluxe",
    category: "Deluxe",
    size: "38 sqm",
    maxGuests: 3,
    bedType: "King or Twin",
    views: ["City View"],
    description: [
      "Our Premier Deluxe rooms offer enhanced space and premium touches, perfect for guests seeking a more refined experience with 38 square meters of elegant living space.",
      "Each room features upgraded furnishings, a dedicated seating area, and panoramic windows offering stunning views of Phuket's historic cityscape.",
      "Enjoy premium amenities including a marble bathroom with rain shower, complimentary mini bar refreshments, and Nespresso coffee machine.",
    ],
    amenities: [
      "King or Twin Bed",
      "38 sqm Living Space",
      "Panoramic Windows",
      "City View",
      "Marble Bathroom",
      "Rain Shower",
      "Premium Bath Amenities",
      "Smart TV with Streaming",
      "High-Speed WiFi",
      "Seating Area",
      "Work Desk",
      "Mini Bar (Welcome Drinks)",
      "In-Room Safe",
      "Nespresso Machine",
      "Bathrobes & Slippers",
      "Daily Housekeeping",
      "24-Hour Room Service",
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop",
        alt: "Premier Deluxe - Main View",
      },
      {
        src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop",
        alt: "Premier Deluxe - Bedroom",
      },
      {
        src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=2070&auto=format&fit=crop",
        alt: "Premier Deluxe - Bathroom",
      },
      {
        src: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974&auto=format&fit=crop",
        alt: "Premier Deluxe - View",
      },
    ],
  },
  "premier-deluxe-sea-view": {
    slug: "premier-deluxe-sea-view",
    name: "Premier Deluxe - Partial Sea View",
    category: "Partial Sea View",
    size: "38 sqm",
    maxGuests: 3,
    bedType: "King or Twin",
    views: ["Partial Sea View"],
    description: [
      "Elevated comfort meets stunning sea vistas in our Premier Deluxe rooms with partial sea views, offering 38 square meters of refined living space.",
      "Floor-to-ceiling windows frame captivating glimpses of the Andaman Sea, while premium furnishings and a marble bathroom create an atmosphere of understated luxury.",
      "The perfect choice for discerning travelers who appreciate both space and spectacular views.",
    ],
    amenities: [
      "King or Twin Bed",
      "38 sqm Living Space",
      "Panoramic Windows",
      "Partial Sea View",
      "Marble Bathroom",
      "Rain Shower",
      "Premium Bath Amenities",
      "Smart TV with Streaming",
      "High-Speed WiFi",
      "Seating Area",
      "Work Desk",
      "Mini Bar (Welcome Drinks)",
      "In-Room Safe",
      "Nespresso Machine",
      "Bathrobes & Slippers",
      "Daily Housekeeping",
      "24-Hour Room Service",
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop",
        alt: "Premier Deluxe Sea View - Main",
      },
      {
        src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop",
        alt: "Premier Deluxe Sea View - Bedroom",
      },
      {
        src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=2070&auto=format&fit=crop",
        alt: "Premier Deluxe Sea View - Bathroom",
      },
      {
        src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2070&auto=format&fit=crop",
        alt: "Premier Deluxe Sea View - Living",
      },
    ],
  },
  "suite": {
    slug: "suite",
    name: "Suite",
    category: "Suite",
    size: "52 sqm",
    maxGuests: 3,
    bedType: "King",
    views: ["Panoramic City View"],
    description: [
      "Our Suites offer generous living space with a separate lounge area, perfect for extended stays or guests who appreciate room to spread out and relax.",
      "Spanning 52 square meters, each suite features a king bedroom, elegant living room, and a designer bathroom with soaking tub and separate rain shower.",
      "Floor-to-ceiling windows provide breathtaking panoramic views of Phuket Old Town, creating an inspiring backdrop for your stay.",
    ],
    amenities: [
      "King Bed",
      "52 sqm Living Space",
      "Separate Living Room",
      "Panoramic City View",
      "Designer Bathroom",
      "Soaking Tub",
      "Walk-in Rain Shower",
      "Luxury Bath Amenities",
      "55-inch Smart TV",
      "High-Speed WiFi",
      "Work Desk",
      "Dining Area",
      "Premium Mini Bar",
      "In-Room Safe",
      "Nespresso Machine",
      "Luxury Bathrobes & Slippers",
      "Executive Lounge Access",
      "Daily Housekeeping",
      "24-Hour Room Service",
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=1974&auto=format&fit=crop",
        alt: "Suite - Main View",
      },
      {
        src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop",
        alt: "Suite - Bedroom",
      },
      {
        src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=2070&auto=format&fit=crop",
        alt: "Suite - Bathroom",
      },
      {
        src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2070&auto=format&fit=crop",
        alt: "Suite - Living Area",
      },
    ],
  },
  "executive-suite": {
    slug: "executive-suite",
    name: "Executive Suite",
    category: "Executive",
    size: "68 sqm",
    maxGuests: 3,
    bedType: "King",
    views: ["Panoramic Sea & City View"],
    description: [
      "The Executive Suite represents the pinnacle of luxury at Royal Phuket City, offering 68 square meters of exquisitely appointed living space with sweeping views of both the Andaman Sea and Phuket Old Town.",
      "Each suite features a master bedroom with premium king bed, a spacious living and dining area, and a spa-inspired bathroom with deep soaking tub, rain shower, and luxury amenities.",
      "Guests enjoy exclusive privileges including complimentary airport transfers, personalized butler service, priority restaurant reservations, and access to our private Executive Lounge.",
    ],
    amenities: [
      "King Bed",
      "68 sqm Living Space",
      "Panoramic Windows",
      "Sea & City Views",
      "Separate Living & Dining Area",
      "Spa-Inspired Bathroom",
      "Deep Soaking Tub",
      "Walk-in Rain Shower",
      "Luxury Bath Amenities",
      "65-inch Smart TV",
      "High-Speed WiFi",
      "Executive Work Desk",
      "Premium Mini Bar",
      "In-Room Safe",
      "Nespresso Machine",
      "Luxury Bathrobes & Slippers",
      "Butler Service",
      "Complimentary Airport Transfer",
      "Executive Lounge Access",
      "Priority Restaurant Reservations",
      "Daily Housekeeping",
      "24-Hour Room Service",
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop",
        alt: "Executive Suite - Main View",
      },
      {
        src: "https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=1974&auto=format&fit=crop",
        alt: "Executive Suite - Bedroom",
      },
      {
        src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=2070&auto=format&fit=crop",
        alt: "Executive Suite - Bathroom",
      },
      {
        src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop",
        alt: "Executive Suite - Living Area",
      },
    ],
  },
};
