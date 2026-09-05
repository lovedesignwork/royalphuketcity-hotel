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
  disclaimer?: string;
}

export const SEA_VIEW_DISCLAIMER =
  "*Views of the Andaman Sea are available from all floors; however, views may be partially framed by surrounding city buildings depending on exact floor level and sightline.";

export const ROOM_DETAILS: Record<string, RoomDetail> = {
  "premier-superior": {
    slug: "premier-superior",
    name: "Premier Superior",
    category: "Premier",
    size: "30 sqm",
    maxGuests: 2,
    bedType: "Twin",
    views: ["City View"],
    description: [
      "Overlooking Phuket's vibrant cityscape and lush mountain backdrop, these well-appointed Premier Superior Rooms offer a peaceful retreat above the city's energy. Featuring modern furnishings, premium amenities, and all-day natural light — ideal for business and leisure travellers.",
      "Each room is thoughtfully appointed with premium bedding, a spacious work area, and a luxurious bathroom with rain shower and premium bath amenities.",
      "Wake up to stunning views of Phuket Old Town and enjoy in-room amenities designed for both relaxation and productivity.",
    ],
    amenities: [
      "Twin Bed",
      "30 sqm Space",
      "City View",
      "Rain Shower",
      "Premium Bath Amenities",
      "Smart TV",
      "High-Speed WiFi",
      "Work Desk",
      "Mini Bar",
      "In-Room Safe",
      "Coffee & Tea Making",
      "Bathrobes & Slippers",
      "Daily Housekeeping",
      "Room Service",
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
  "premier-superior-partial-sea-view": {
    slug: "premier-superior-partial-sea-view",
    name: "Premier Superior Sea View*",
    category: "Sea View",
    size: "30 sqm",
    maxGuests: 2,
    bedType: "King or Twin",
    views: ["Sea View"],
    disclaimer: SEA_VIEW_DISCLAIMER,
    description: [
      "Positioned on the sea-facing side of the building, these Premier Superior Rooms offer views of the Andaman Sea from all floors. The surrounding cityscape may partially frame the sea view depending on your floor level and sightline. Fresh atmosphere with modern Premier Superior amenities.",
      "Each room features contemporary design with warm accents, premium bedding, and a luxurious bathroom with rain shower and curated bath amenities.",
      "The perfect retreat for those seeking a connection to the sea while enjoying the convenience of our central Old Town location.",
    ],
    amenities: [
      "King or Twin Bed",
      "30 sqm Space",
      "Sea View",
      "Rain Shower",
      "Premium Bath Amenities",
      "Smart TV",
      "High-Speed WiFi",
      "Work Desk",
      "Mini Bar",
      "In-Room Safe",
      "Coffee & Tea Making",
      "Bathrobes & Slippers",
      "Daily Housekeeping",
      "Room Service",
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
    maxGuests: 2,
    bedType: "King or Twin",
    views: ["City View"],
    description: [
      "Our Premier Deluxe Rooms offer a generously sized retreat with sweeping views of Phuket City and its green mountain backdrop. Larger footprint than Premier Superior Rooms — ideal for extended stays and business travellers who value space and comfort.",
      "Each room features upgraded furnishings, a dedicated seating area, and panoramic windows offering stunning views of Phuket's historic cityscape.",
    ],
    amenities: [
      "King or Twin Bed",
      "38 sqm Space",
      "Panoramic Windows",
      "City View",
      "Marble Bathroom",
      "Rain Shower",
      "Premium Bath Amenities",
      "Smart TV",
      "High-Speed WiFi",
      "Seating Area",
      "Work Desk",
      "Mini Bar",
      "In-Room Safe",
      "Bathrobes & Slippers",
      "Daily Housekeeping",
      "Room Service",
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
  "premier-deluxe-partial-sea-view": {
    slug: "premier-deluxe-partial-sea-view",
    name: "Premier Deluxe Sea View*",
    category: "Sea View",
    size: "38 sqm",
    maxGuests: 2,
    bedType: "King or Twin",
    views: ["Sea View"],
    disclaimer: SEA_VIEW_DISCLAIMER,
    description: [
      "Our Premier Deluxe Sea View rooms combine generous space with Andaman Sea vistas. Positioned on the sea-facing side, views are available from all floors. The surrounding cityscape may partially frame the sea view depending on floor level. Premium amenities throughout.",
      "Panoramic windows frame captivating glimpses of the Andaman Sea, while premium furnishings and a marble bathroom create an atmosphere of understated luxury.",
      "The perfect choice for discerning travelers who appreciate both space and spectacular views.",
    ],
    amenities: [
      "King or Twin Bed",
      "38 sqm Space",
      "Panoramic Windows",
      "Sea View",
      "Marble Bathroom",
      "Rain Shower",
      "Premium Bath Amenities",
      "Smart TV",
      "High-Speed WiFi",
      "Seating Area",
      "Work Desk",
      "Mini Bar",
      "In-Room Safe",
      "Bathrobes & Slippers",
      "Daily Housekeeping",
      "Room Service",
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
        src: "/images/rooms/04 Premier deluxe - Partial sea view/Premier deluxe - Partial sea view 05_resize.jpg",
        alt: "Premier Deluxe Sea View - Workspace",
      },
      {
        src: "/images/rooms/04 Premier deluxe - Partial sea view/Premier deluxe - Partial sea view 06_resize.jpg",
        alt: "Premier Deluxe Sea View - Details",
      },
      {
        src: "/images/rooms/04 Premier deluxe - Partial sea view/Premier deluxe - Partial sea view 07_resize.jpg",
        alt: "Premier Deluxe Sea View - Amenities",
      },
      {
        src: "/images/rooms/04 Premier deluxe - Partial sea view/Premier deluxe - Partial sea view 08_resize.jpg",
        alt: "Premier Deluxe Sea View - Interior",
      },
      {
        src: "/images/rooms/04 Premier deluxe - Partial sea view/Premier deluxe - Partial sea view 09_resize.jpg",
        alt: "Premier Deluxe Sea View - Window View",
      },
    ],
  },
  "suite-room": {
    slug: "suite-room",
    name: "Suite",
    category: "Suite",
    size: "64 sqm",
    maxGuests: 2,
    bedType: "King",
    views: ["Panoramic City View"],
    description: [
      "Our Suite offers an expansive, elegantly furnished retreat in the heart of Phuket City. With a generous living area, premium amenities, and refined decor — ideal for discerning travellers, honeymooners, and special occasions.",
      "Spanning 64 square meters, each suite features a king bedroom, elegant living room, and a designer bathroom with soaking tub and separate rain shower.",
      "Panoramic windows provide breathtaking views of Phuket Old Town, creating an inspiring backdrop for your stay.",
    ],
    amenities: [
      "King Bed",
      "64 sqm Space",
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
      "Daily Housekeeping",
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
    size: "75 sqm",
    maxGuests: 2,
    bedType: "King",
    views: ["Panoramic Sea & City View"],
    description: [
      "The Executive Suite is our pinnacle accommodation. Featuring the most generous space in the hotel, exclusive amenities, and personalised service — reserved for guests who expect the very best. Ideal for VIPs, extended stays, and special occasions.",
      "Each suite features a master bedroom with premium king bed, a spacious living and dining area, and a spa-inspired bathroom with deep soaking tub, rain shower, and luxury amenities.",
      "Guests enjoy exclusive privileges including priority restaurant reservations and personalized service.",
    ],
    amenities: [
      "King Bed",
      "75 sqm Space",
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
      "Priority Restaurant Reservations",
      "Daily Housekeeping",
      "Room Service",
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
