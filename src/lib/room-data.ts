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
        src: "/images/rooms/01 Premier superior/Premier Superior 1.jpg",
        alt: "Premier Superior - Main View",
      },
      {
        src: "/images/rooms/01 Premier superior/Premier Superior 2.jpg",
        alt: "Premier Superior - Bed",
      },
      {
        src: "/images/rooms/01 Premier superior/Premier Superior 3.jpg",
        alt: "Premier Superior - Bathroom",
      },
      {
        src: "/images/rooms/01 Premier superior/Premier Superior 4.jpg",
        alt: "Premier Superior - View",
      },
      {
        src: "/images/rooms/01 Premier superior/Premier Superior 5.jpg",
        alt: "Premier Superior - Workspace",
      },
      {
        src: "/images/rooms/01 Premier superior/Premier Superior 6.jpg",
        alt: "Premier Superior - Details",
      },
      {
        src: "/images/rooms/01 Premier superior/Premier Superior 7.jpg",
        alt: "Premier Superior - Amenities",
      },
      {
        src: "/images/rooms/01 Premier superior/Premier Superior 8.jpg",
        alt: "Premier Superior - Interior",
      },
      {
        src: "/images/rooms/01 Premier superior/Premier Superior 9.jpg",
        alt: "Premier Superior - Window View",
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
        src: "/images/rooms/02 Premier superior - Partial sea view/Premier Superior 1.jpg",
        alt: "Premier Superior Sea View - Main",
      },
      {
        src: "/images/rooms/02 Premier superior - Partial sea view/Premier Superior 2.jpg",
        alt: "Premier Superior Sea View - Bedroom",
      },
      {
        src: "/images/rooms/02 Premier superior - Partial sea view/Premier Superior 3.jpg",
        alt: "Premier Superior Sea View - Bathroom",
      },
      {
        src: "/images/rooms/02 Premier superior - Partial sea view/Premier Superior 4.jpg",
        alt: "Premier Superior Sea View - View",
      },
      {
        src: "/images/rooms/02 Premier superior - Partial sea view/Premier Superior 5.jpg",
        alt: "Premier Superior Sea View - Workspace",
      },
      {
        src: "/images/rooms/02 Premier superior - Partial sea view/Premier Superior 6.jpg",
        alt: "Premier Superior Sea View - Details",
      },
      {
        src: "/images/rooms/02 Premier superior - Partial sea view/Premier Superior 7.jpg",
        alt: "Premier Superior Sea View - Amenities",
      },
      {
        src: "/images/rooms/02 Premier superior - Partial sea view/Premier Superior 8.jpg",
        alt: "Premier Superior Sea View - Interior",
      },
      {
        src: "/images/rooms/02 Premier superior - Partial sea view/Premier Superior 9.jpg",
        alt: "Premier Superior Sea View - Window View",
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
        src: "/images/rooms/03 Premier deluxe/Premier Deluxe 1.jpg",
        alt: "Premier Deluxe - Main View",
      },
      {
        src: "/images/rooms/03 Premier deluxe/Premier Deluxe 2.jpg",
        alt: "Premier Deluxe - Bedroom",
      },
      {
        src: "/images/rooms/03 Premier deluxe/Premier Deluxe 3.jpg",
        alt: "Premier Deluxe - Bathroom",
      },
      {
        src: "/images/rooms/03 Premier deluxe/Premier Deluxe 4.jpg",
        alt: "Premier Deluxe - View",
      },
      {
        src: "/images/rooms/03 Premier deluxe/Premier Deluxe 5.jpg",
        alt: "Premier Deluxe - Workspace",
      },
      {
        src: "/images/rooms/03 Premier deluxe/Premier Deluxe 6.jpg",
        alt: "Premier Deluxe - Details",
      },
      {
        src: "/images/rooms/03 Premier deluxe/Premier Deluxe 7.jpg",
        alt: "Premier Deluxe - Amenities",
      },
      {
        src: "/images/rooms/03 Premier deluxe/Premier Deluxe 8.jpg",
        alt: "Premier Deluxe - Interior",
      },
      {
        src: "/images/rooms/03 Premier deluxe/Premier Deluxe 9.jpg",
        alt: "Premier Deluxe - Window View",
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
        src: "/images/rooms/04 Premier deluxe - Partial sea view/Premier deluxe - Partial sea view01_resize.jpg",
        alt: "Premier Deluxe Sea View - Main",
      },
      {
        src: "/images/rooms/04 Premier deluxe - Partial sea view/Premier deluxe - Partial sea view02_resize.jpg",
        alt: "Premier Deluxe Sea View - Bedroom",
      },
      {
        src: "/images/rooms/04 Premier deluxe - Partial sea view/Premier deluxe - Partial sea view03_resize.jpg",
        alt: "Premier Deluxe Sea View - Bathroom",
      },
      {
        src: "/images/rooms/04 Premier deluxe - Partial sea view/Premier deluxe - Partial sea view04_resize.jpg",
        alt: "Premier Deluxe Sea View - Living",
      },
      {
        src: "/images/rooms/04 Premier deluxe - Partial sea view/Premier deluxe - Partial sea view05_resize.jpg",
        alt: "Premier Deluxe Sea View - Workspace",
      },
      {
        src: "/images/rooms/04 Premier deluxe - Partial sea view/Premier deluxe - Partial sea view06_resize.jpg",
        alt: "Premier Deluxe Sea View - Details",
      },
      {
        src: "/images/rooms/04 Premier deluxe - Partial sea view/Premier deluxe - Partial sea view07_resize.jpg",
        alt: "Premier Deluxe Sea View - Amenities",
      },
      {
        src: "/images/rooms/04 Premier deluxe - Partial sea view/Premier deluxe - Partial sea view08_resize.jpg",
        alt: "Premier Deluxe Sea View - Interior",
      },
      {
        src: "/images/rooms/04 Premier deluxe - Partial sea view/Premier deluxe - Partial sea view09_resize.jpg",
        alt: "Premier Deluxe Sea View - Window View",
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
        src: "/images/rooms/05 Suite/Suite01_resize.jpg",
        alt: "Suite - Main View",
      },
      {
        src: "/images/rooms/05 Suite/Suite02_resize.jpg",
        alt: "Suite - Bedroom",
      },
      {
        src: "/images/rooms/05 Suite/Suite03_resize.jpg",
        alt: "Suite - Bathroom",
      },
      {
        src: "/images/rooms/05 Suite/Suite04_resize.jpg",
        alt: "Suite - Living Area",
      },
      {
        src: "/images/rooms/05 Suite/Suite05_resize.jpg",
        alt: "Suite - Workspace",
      },
      {
        src: "/images/rooms/05 Suite/Suite06_resize.jpg",
        alt: "Suite - Details",
      },
      {
        src: "/images/rooms/05 Suite/Suite07_resize.jpg",
        alt: "Suite - Amenities",
      },
      {
        src: "/images/rooms/05 Suite/Suite08_resize.jpg",
        alt: "Suite - Interior",
      },
      {
        src: "/images/rooms/05 Suite/Suite09_resize.jpg",
        alt: "Suite - Window View",
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
        src: "/images/rooms/06 Executive suite/Executive Suites 1.jpg",
        alt: "Executive Suite - Main View",
      },
      {
        src: "/images/rooms/06 Executive suite/Executive Suites 2.jpg",
        alt: "Executive Suite - Bedroom",
      },
      {
        src: "/images/rooms/06 Executive suite/Executive Suites 3.jpg",
        alt: "Executive Suite - Bathroom",
      },
      {
        src: "/images/rooms/06 Executive suite/Executive Suites 4.jpg",
        alt: "Executive Suite - Living Area",
      },
      {
        src: "/images/rooms/06 Executive suite/Executive Suites 5.jpg",
        alt: "Executive Suite - Workspace",
      },
      {
        src: "/images/rooms/06 Executive suite/Executive Suites 6.jpg",
        alt: "Executive Suite - Details",
      },
      {
        src: "/images/rooms/06 Executive suite/Executive Suites 7.jpg",
        alt: "Executive Suite - Amenities",
      },
      {
        src: "/images/rooms/06 Executive suite/Executive Suites 8.jpg",
        alt: "Executive Suite - Interior",
      },
      {
        src: "/images/rooms/06 Executive suite/Executive Suites 9.jpg",
        alt: "Executive Suite - Window View",
      },
    ],
  },
};
