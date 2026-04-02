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
    "https://maps.app.goo.gl/3Q65GyZvmkpR9DfGA",
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
    { label: "Promotions", href: "/promotions" },
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
        { label: "Graduation Ceremony", href: "/meeting-events/graduation-ceremony" },
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
    image: "/images/HOTEL WEBSITE/Restaurant/YanLong_L01_full_dining_room_L.jpg",
  },
  {
    slug: "twist-rooftop-restaurant-bar",
    name: "TWIST Rooftop Restaurant & Bar",
    cuisine: "International",
    floor: "19th Floor",
    hours: "5:00 PM – 12:00 AM",
    shortDescription:
      "Rooftop dining with panoramic views, craft cocktails, and international cuisine.",
    image: "/images/HOTEL WEBSITE/Restaurant/Twist ROoftop.jpg",
  },
  {
    slug: "good-eatz-154",
    name: "Good Eatz 154",
    cuisine: "Thai & International",
    floor: "Ground Floor",
    hours: "6:00 AM – 10:00 PM",
    shortDescription:
      "All-day dining featuring Thai favorites and international breakfast buffet.",
    image: "/images/HOTEL WEBSITE/Restaurant/RPC_LM06_mixed_tourists_goodeatz_lunch_L.jpg",
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

export const PROMOTIONS = [
  {
    slug: "royal-insider",
    title: "Royal Insider",
    subtitle: "Hotel Membership — 5% off all bookings",
    tagline: "Member Exclusive",
    category: "Membership",
    validFrom: "2026-01-01",
    validUntil: "2026-12-31",
    image: "/images/promotions/RPC LS ROOM 15.jpg",
    shortDescription: "Join our exclusive membership program and enjoy 5% off on all room bookings, plus member-only perks and priority access to special offers.",
    highlights: [
      "5% discount on all room bookings",
      "Early access to seasonal promotions",
      "Priority room upgrades (subject to availability)",
      "Exclusive member-only rates",
      "Birthday surprise during your stay",
      "Free membership — sign up today",
    ],
    terms: [
      "Membership is free and valid for 1 year",
      "Discount applies to room rate only",
      "Cannot be combined with other promotions",
      "Must book directly through hotel website or call",
      "Present membership ID at check-in",
    ],
    price: "5% Off All Bookings",
    originalPrice: "Free Membership",
    bookingCode: "ROYALINSIDER",
  },
  {
    slug: "family-getaway",
    title: "Happy Family Getaway",
    subtitle: "School Break Value Package",
    tagline: "April–May Special",
    category: "Family",
    validFrom: "2026-04-01",
    validUntil: "2026-05-31",
    image: "/images/promotions/RPC LS ROOM 21.jpg",
    shortDescription: "Perfect for Thai families during school break! Enjoy quality time together with spacious rooms, kids' activities, and family-friendly dining.",
    highlights: [
      "Spacious Premier Deluxe room for the family",
      "Daily breakfast for 2 adults + 2 kids",
      "Kids under 12 stay free",
      "Welcome gift for children",
      "Late checkout until 2:00 PM",
      "Access to swimming pool & fitness center",
    ],
    terms: [
      "Valid for stays April 1 – May 31, 2026",
      "Maximum 2 children under 12 per room",
      "Children must share existing bedding",
      "Minimum 2-night stay required",
      "Subject to availability",
    ],
    price: "From ฿2,199/night",
    originalPrice: "฿2,800/night",
    bookingCode: "FAMILYBREAK",
  },
  {
    slug: "monthly-stay",
    title: "RPC Monthly Stay",
    subtitle: "Live Like a Local",
    tagline: "Long Stay",
    category: "Extended Stay",
    validFrom: "2026-01-01",
    validUntil: "2026-12-31",
    image: "/images/promotions/RPC LS ROOM 23.jpg",
    shortDescription: "Make Royal Phuket City your home away from home. Special rates for extended stays with flexible options — with or without breakfast.",
    highlights: [
      "30-night stay with breakfast: ฿54,450 (฿1,815/night)",
      "30-night stay without breakfast: ฿42,350 (฿1,412/night)",
      "14-night stay with breakfast: ฿27,720 (฿1,980/night)",
      "Weekly housekeeping included",
      "Complimentary laundry (limited pieces)",
      "Access to all hotel facilities",
    ],
    terms: [
      "Rates are per room, based on single/double occupancy",
      "Full payment required upon check-in",
      "Non-refundable after check-in",
      "Room type subject to availability",
      "Additional guests charged separately",
    ],
    price: "From ฿1,412/night",
    originalPrice: "฿2,200/night",
    bookingCode: "MONTHLYSTAY",
  },
  {
    slug: "songkran-package",
    title: "Songkran @ RPC",
    subtitle: "Old Town Base Camp",
    tagline: "Songkran 2026",
    category: "Seasonal",
    validFrom: "2026-04-12",
    validUntil: "2026-04-16",
    image: "/images/promotions/RPC LS ROOM 38.jpg",
    shortDescription: "Celebrate Songkran in the heart of Phuket Old Town! Your perfect base camp for Thailand's biggest water festival with everything you need to join the fun.",
    highlights: [
      "Comfortable room accommodation",
      "Daily breakfast buffet",
      "Songkran Survival Kit included",
      "Waterproof phone pouch",
      "Quick-dry towel",
      "Old Town Songkran event map & tips",
    ],
    terms: [
      "Valid for stays April 12–16, 2026",
      "Minimum 2-night stay recommended",
      "One survival kit per room",
      "Subject to availability — book early",
      "Non-refundable during Songkran period",
    ],
    price: "From ฿2,499/night",
    originalPrice: "฿3,200/night",
    bookingCode: "SONGKRAN2026",
  },
] as const;
