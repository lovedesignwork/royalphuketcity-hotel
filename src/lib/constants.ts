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
    { label: "Rooms & Suites", href: "/rooms-suites" },
    { label: "Facilities", href: "/facilities" },
    { label: "Wedding Venues", href: "/wedding-venues" },
  ],
  right: [
    { label: "Meeting & Events", href: "/meeting-events" },
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
    size: "32 sqm",
    maxGuests: 3,
    bedType: "King or Twin",
    views: ["City View"],
    shortDescription:
      "Elegant comfort with contemporary design and thoughtful amenities for a refined stay.",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop",
  },
  {
    slug: "premier-superior-sea-view",
    name: "Premier Superior",
    category: "Partial Sea View",
    size: "32 sqm",
    maxGuests: 3,
    bedType: "King or Twin",
    views: ["Partial Sea View"],
    shortDescription:
      "Wake up to glimpses of the Andaman Sea from your elegantly appointed room.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    slug: "premier-deluxe",
    name: "Premier Deluxe",
    category: "Deluxe",
    size: "38 sqm",
    maxGuests: 3,
    bedType: "King or Twin",
    views: ["City View"],
    shortDescription:
      "Spacious luxury with enhanced amenities and stunning panoramic city views.",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop",
  },
  {
    slug: "premier-deluxe-sea-view",
    name: "Premier Deluxe",
    category: "Partial Sea View",
    size: "38 sqm",
    maxGuests: 3,
    bedType: "King or Twin",
    views: ["Partial Sea View"],
    shortDescription:
      "Elevated comfort with partial sea views and premium furnishings throughout.",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop",
  },
  {
    slug: "suite",
    name: "Suite",
    category: "Suite",
    size: "52 sqm",
    maxGuests: 3,
    bedType: "King",
    views: ["Panoramic City View"],
    shortDescription:
      "Generous living space with separate lounge area and breathtaking city panoramas.",
    image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=1974&auto=format&fit=crop",
  },
  {
    slug: "executive-suite",
    name: "Executive Suite",
    category: "Executive",
    size: "68 sqm",
    maxGuests: 3,
    bedType: "King",
    views: ["Panoramic Sea & City View"],
    shortDescription:
      "The pinnacle of luxury featuring expansive living quarters and sweeping sea views.",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop",
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
