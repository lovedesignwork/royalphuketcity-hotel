export const SITE_CONFIG = {
  name: "Royal Phuket City Hotel",
  tagline: "Heritage Hospitality at Its Finest",
  description:
    "Experience luxury and comfort at Royal Phuket City Hotel, a 4-star hotel in the heart of Phuket Old Town. 251 elegant rooms, 5 dining venues, and world-class facilities.",
  url: "https://royalphuketcity.com",
  ogImage: "/images/og-image.jpg",
} as const;

export const HOTEL_INFO = {
  name: "Royal Phuket City Hotel",
  starRating: 4,
  address: "154 Phang-Nga Road, Talad Yai, Muang, Phuket 83000, Thailand",
  phone: "+66 76 233 355",
  email: "reservation@royalphuketcity.com",
  checkIn: "2:00 PM",
  checkOut: "12:00 PM",
  totalRooms: 251,
  totalRestaurants: 5,
  meetingRooms: 9,
  parkingSpaces: 350,
  building: "19-story (first high-rise in Phuket, tallest near Old Town)",
  architecture: "Contemporary Classic",
} as const;

export const EXTERNAL_LINKS = {
  booking: "https://www.myxcaliber.com/ibe/b/Royal-Phuket-City-Hotel",
  facebook: "https://www.facebook.com/royalphuketcity/",
  instagram: "https://www.instagram.com/royalphuketcity/",
  tripadvisor:
    "https://www.tripadvisor.com/Hotel_Review-g1215781-d309104-Reviews-Royal_Phuket_City_Hotel-Phuket_Town_Phuket.html",
  googleMaps:
    "https://www.google.com/maps/place/Royal+Phuket+City+Hotel/@7.882943,98.394902,17z",
} as const;

export const NAV_LINKS = {
  left: [
    { label: "Home", href: "/" },
    {
      label: "Rooms & Suites",
      href: "/rooms-suites",
      dropdown: [
        { label: "All Rooms & Suites", href: "/rooms-suites" },
        { label: "Premier Superior", href: "/premier-superior" },
        { label: "Premier Superior Sea View", href: "/premier-superior-sea-view" },
        { label: "Premier Deluxe", href: "/premier-deluxe" },
        { label: "Premier Deluxe Sea View", href: "/premier-deluxe-sea-view" },
        { label: "Suite Room", href: "/suite" },
        { label: "Executive Suite", href: "/executive-suite" },
      ],
    },
    { label: "Facilities", href: "/facilities" },
    {
      label: "Wedding",
      href: "/wedding-venues",
      dropdown: [
        { label: "Wedding Venues", href: "/wedding-venues" },
        { label: "Engagement Ceremony", href: "/wedding-venues/engagement-ceremony" },
        { label: "Thai Wedding", href: "/wedding-venues/thai-wedding" },
        { label: "Chinese Wedding", href: "/wedding-venues/chinese-wedding" },
        { label: "Muslim Wedding", href: "/wedding-venues/muslim-wedding" },
        { label: "Western Wedding", href: "/wedding-venues/western-wedding" },
        { label: "LGBTQ+ Wedding", href: "/wedding-venues/lgbtq-wedding" },
      ],
    },
  ],
  right: [
    {
      label: "Meeting & Events",
      href: "/meeting-events",
      dropdown: [
        { label: "All Venues & Events", href: "/meeting-events" },
        { label: "Corporate Conference", href: "/meeting-events/corporate-conference" },
        { label: "Seminar & Workshop", href: "/meeting-events/seminar-workshop" },
        { label: "Product Launch", href: "/meeting-events/product-launch" },
        { label: "Gala Dinner & Awards", href: "/meeting-events/gala-dinner-award" },
        { label: "Exhibition & Trade Show", href: "/meeting-events/exhibition-trade-show" },
        { label: "Concert & Live Show", href: "/meeting-events/concert-live-performance" },
        { label: "Stand-Up Comedy", href: "/meeting-events/stand-up-comedy" },
        { label: "Talk Show & Panel", href: "/meeting-events/talk-show-panel" },
        { label: "Download Fact Sheets", href: "/download-fact-sheets" },
      ],
    },
    {
      label: "Dining",
      href: "/dining",
      dropdown: [
        {
          label: "Yan Long Chinese Restaurant",
          href: "/yan-long-chinese-restaurant",
        },
        {
          label: "TWIST Rooftop Restaurant & Bar",
          href: "/twist-rooftop-restaurant-bar",
        },
        { label: "Good Eatz 154", href: "/good-eatz-154" },
      ],
    },
    {
      label: "About",
      href: "/about",
      dropdown: [
        { label: "Royal Green", href: "/royal-green" },
        { label: "Our Clients", href: "/our-clients" },
        { label: "Artist Story", href: "/artist-story" },
        { label: "Sustainability", href: "/sustainability" },
        { label: "Blog", href: "/blog" },
      ],
    },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export const ROOMS = [
  {
    slug: "premier-superior",
    name: "Premier Superior",
    category: "Premier",
    size: "30 sqm",
    maxGuests: 3,
    bedType: "Single or Double Beds",
    views: ["City View", "Mountain View"],
    shortDescription:
      "The perfect space and place for relaxing with city or mountain view options and full amenities.",
    image: "/images/rooms/01 Premier superior/Premier Superior 1.jpg",
  },
  {
    slug: "premier-superior-partial-sea-view",
    name: "Premier Superior - Partial Sea View",
    category: "Premier",
    size: "30 sqm",
    maxGuests: 3,
    bedType: "Single or Double Beds",
    views: ["Partial Sea View"],
    shortDescription:
      "Wake up to glimpses of the Andaman Sea from your elegantly appointed Premier Superior room.",
    image: "/images/rooms/02 Premier superior - Partial sea view/Premier Superior 1.jpg",
  },
  {
    slug: "premier-superior-sea-view",
    name: "Premier Superior - Sea View",
    category: "Premier",
    size: "30 sqm",
    maxGuests: 3,
    bedType: "King or Twin",
    views: ["Partial Sea View"],
    shortDescription:
      "Wake up to stunning sea vistas from your elegantly appointed Premier Superior room with panoramic windows.",
    image: "/images/rooms/02 Premier superior - Partial sea view/Premier Superior 1.jpg",
  },
  {
    slug: "premier-deluxe",
    name: "Premier Deluxe",
    category: "Premier",
    size: "38 sqm",
    maxGuests: 3,
    bedType: "Single or Double Beds",
    views: ["City View", "Mountain View"],
    shortDescription:
      "An ideal option for business travelers with everything you expect from a 4-star hotel including a sofa bed and free Wi-Fi.",
    image: "/images/rooms/03 Premier deluxe/Premier Deluxe 1.jpg",
  },
  {
    slug: "premier-deluxe-partial-sea-view",
    name: "Premier Deluxe - Partial Sea View",
    category: "Premier",
    size: "38 sqm",
    maxGuests: 3,
    bedType: "Single or Double Beds",
    views: ["Partial Sea View"],
    shortDescription:
      "Elevated comfort with partial sea views and premium furnishings in 38 m² of luxury.",
    image: "/images/rooms/04 Premier deluxe - Partial sea view/Premier deluxe - Partial sea view01_resize.jpg",
  },
  {
    slug: "premier-deluxe-sea-view",
    name: "Premier Deluxe - Sea View",
    category: "Premier",
    size: "38 sqm",
    maxGuests: 3,
    bedType: "King or Twin",
    views: ["Partial Sea View"],
    shortDescription:
      "Elevated comfort meets stunning sea vistas with 38 sqm of refined living space and panoramic windows.",
    image: "/images/rooms/04 Premier deluxe - Partial sea view/Premier deluxe - Partial sea view01_resize.jpg",
  },
  {
    slug: "suite-room",
    name: "Suite Room",
    category: "Suite",
    size: "64 sqm",
    maxGuests: 3,
    bedType: "Double Bed",
    views: ["City View", "Mountain View"],
    shortDescription:
      "Featuring an impressive living room, sofa bed, comfortable bathroom, and free Wi-Fi in 64 m² of luxury.",
    image: "/images/rooms/05 Suite/Suite01_resize.jpg",
  },
  {
    slug: "suite",
    name: "Suite Room",
    category: "Suite",
    size: "64 sqm",
    maxGuests: 3,
    bedType: "King Bed",
    views: ["City View", "Mountain View"],
    shortDescription:
      "Spacious 64 sqm suite with separate living area, king bed, and panoramic city views for ultimate comfort.",
    image: "/images/rooms/05 Suite/Suite01_resize.jpg",
  },
  {
    slug: "executive-suite",
    name: "Executive Suite Room",
    category: "Executive",
    size: "75 sqm",
    maxGuests: 3,
    bedType: "Double Beds",
    views: ["City View", "Mountain View"],
    shortDescription:
      "A luxurious living room, sofa bed, comfortable bathroom with bathtub, and free Wi-Fi in 75 m² of ultimate luxury.",
    image: "/images/rooms/06 Executive suite/Executive Suites 7.jpg",
  },
] as const;

export const RESTAURANTS = [
  {
    slug: "yan-long-chinese-restaurant",
    name: "Yan Long Chinese Restaurant",
    cuisine: "Chinese",
    floor: "Ground Floor",
    hours: "11:00 AM – 10:00 PM",
    shortDescription:
      "Authentic Cantonese cuisine with dim sum specialties and private dining rooms.",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    slug: "twist-rooftop-restaurant-bar",
    name: "TWIST Rooftop Restaurant & Bar",
    cuisine: "International",
    floor: "19th Floor",
    hours: "5:00 PM – 12:00 AM",
    shortDescription:
      "Rooftop dining with panoramic views, craft cocktails, and international cuisine.",
    image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?q=80&w=2070&auto=format&fit=crop",
  },
  {
    slug: "good-eatz-154",
    name: "Good Eatz 154",
    cuisine: "Thai & International",
    floor: "Ground Floor",
    hours: "6:00 AM – 10:00 PM",
    shortDescription:
      "All-day dining featuring Thai favorites and international breakfast buffet.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop",
  },
] as const;

export const FACILITIES = [
  {
    name: "Rooftop Breakfast",
    description: "Start your day with breathtaking views from the 19th floor.",
    image: "/images/facilities/rooftop-breakfast.jpg",
  },
  {
    name: "Swimming Pool",
    description: "Outdoor pool with sun loungers and poolside service.",
    image: "/images/facilities/swimming-pool.jpg",
  },
  {
    name: "Fitness Center",
    description: "State-of-the-art equipment available 24 hours.",
    image: "/images/facilities/fitness-center.jpg",
  },
  {
    name: "Spa & Massage",
    description: "Rejuvenating treatments inspired by Thai wellness traditions.",
    image: "/images/facilities/spa.jpg",
  },
  {
    name: "Atrium Lounge",
    description: "Elegant space for afternoon tea and light refreshments.",
    image: "/images/facilities/atrium-lounge.jpg",
  },
  {
    name: "Smart Bus",
    description: "Complimentary shuttle service to popular destinations.",
    image: "/images/facilities/smart-bus.jpg",
  },
  {
    name: "EV Charger",
    description: "Electric vehicle charging stations for eco-conscious travelers.",
    image: "/images/facilities/ev-charger.jpg",
  },
] as const;
