export interface RestaurantDetail {
  slug: string;
  name: string;
  cuisine: string;
  floor: string;
  hours: string;
  phone?: string;
  description: string[];
  highlights: string[];
  images: {
    src: string;
    alt: string;
  }[];
}

export const RESTAURANT_DETAILS: Record<string, RestaurantDetail> = {
  "yan-long-chinese-restaurant": {
    slug: "yan-long-chinese-restaurant",
    name: "Yan Long Chinese Restaurant",
    cuisine: "Cantonese",
    floor: "Ground Floor",
    hours: "11:00 AM - 10:00 PM",
    phone: "+66 76 233 355 ext. 1234",
    description: [
      "Yan Long brings the finest traditions of Cantonese cuisine to Phuket, offering an authentic dining experience in an elegant setting that honors both heritage and innovation.",
      "Our master chefs, trained in the culinary arts of Hong Kong and Guangzhou, prepare each dish with meticulous attention to detail, using the freshest ingredients and time-honored techniques.",
      "Whether you're savoring our renowned dim sum selection, enjoying a family-style banquet, or hosting an intimate celebration in one of our private dining rooms, Yan Long promises an unforgettable culinary journey.",
    ],
    highlights: [
      "Authentic Dim Sum (Daily 11 AM - 2 PM)",
      "Fresh Seafood Selection",
      "Private Dining Rooms",
      "Cantonese BBQ Specialties",
      "Premium Chinese Teas",
      "Vegetarian Menu Available",
      "Wine & Spirits Pairing",
      "Group Banquet Menus",
    ],
    images: [
      {
        src: "/images/HOTEL WEBSITE/Restaurant/YL Main_resize.jpg",
        alt: "Yan Long Restaurant Main Dining Room",
      },
      {
        src: "/images/HOTEL WEBSITE/Restaurant/CU01_business_hands_chopsticks_H.jpg",
        alt: "Business Dining at Yan Long",
      },
      {
        src: "/images/HOTEL WEBSITE/Restaurant/CU08_peking_duck_carve_H.jpg",
        alt: "Peking Duck Carving",
      },
      {
        src: "/images/HOTEL WEBSITE/Restaurant/CU10_corporate_toast_closeup_H.jpg",
        alt: "Corporate Toast",
      },
      {
        src: "/images/HOTEL WEBSITE/Restaurant/FK19_full_family_silk_H.jpg",
        alt: "Family Dining at Yan Long",
      },
      {
        src: "/images/HOTEL WEBSITE/Restaurant/MD04_mother_serving_main_H.jpg",
        alt: "Mother Serving Guests",
      },
      {
        src: "/images/HOTEL WEBSITE/Restaurant/MD09_women_executives_silk_H.jpg",
        alt: "Executive Dining",
      },
      {
        src: "/images/HOTEL WEBSITE/Restaurant/YanLong_L02_private_room_setup_L.jpg",
        alt: "Private Room Setup",
      },
      {
        src: "/images/HOTEL WEBSITE/Restaurant/YanLong_L12_banquet_dishes_overhead_L.jpg",
        alt: "Banquet Dishes",
      },
      {
        src: "/images/HOTEL WEBSITE/Restaurant/YanLong_L13_ceiling_lanterns_lookup_L.jpg",
        alt: "Traditional Ceiling Lanterns",
      },
      {
        src: "/images/HOTEL WEBSITE/Restaurant/YanLong_L14_tea_pouring_wide_L.jpg",
        alt: "Traditional Tea Service",
      },
      {
        src: "/images/HOTEL WEBSITE/Restaurant/YanLong_L18_light_atmosphere_L.jpg",
        alt: "Restaurant Atmosphere",
      },
    ],
  },
  "twist-rooftop-restaurant-bar": {
    slug: "twist-rooftop-restaurant-bar",
    name: "TWIST Rooftop Restaurant & Bar",
    cuisine: "International",
    floor: "19th Floor",
    hours: "5:00 PM - 12:00 AM",
    phone: "+66 76 233 355 ext. 1901",
    description: [
      "Perched on the 19th floor, TWIST offers an unparalleled dining experience with 360-degree panoramic views of Phuket Old Town, the Andaman Sea, and the surrounding mountains.",
      "Our innovative menu combines international flavors with local Thai influences, featuring premium cuts, fresh seafood, and creative cocktails crafted by our award-winning mixologists.",
      "Whether you're here for sunset cocktails, a romantic dinner under the stars, or a celebratory night out, TWIST delivers an atmosphere that's as memorable as the cuisine.",
    ],
    highlights: [
      "360° Panoramic Views",
      "Sunset Cocktail Hour",
      "Live Music (Thu-Sat)",
      "Premium Steaks & Seafood",
      "Craft Cocktail Menu",
      "Wine Cellar Selection",
      "Outdoor Terrace Seating",
      "Private Event Space",
    ],
    images: [
      {
        src: "/images/HOTEL WEBSITE/Restaurant/TWIST_001-_resize.jpg",
        alt: "TWIST Rooftop Bar",
      },
      {
        src: "/images/HOTEL WEBSITE/Restaurant/TWIST Rooftop 001.jpg",
        alt: "TWIST Rooftop View",
      },
      {
        src: "/images/HOTEL WEBSITE/Restaurant/TWIST Rooftop 005.jpg",
        alt: "Rooftop Dining",
      },
      {
        src: "/images/HOTEL WEBSITE/Restaurant/TWIST Rooftop 006.jpg",
        alt: "Evening Atmosphere",
      },
      {
        src: "/images/HOTEL WEBSITE/Restaurant/TWIST Rooftop 008.jpg",
        alt: "Cocktail Bar",
      },
      {
        src: "/images/HOTEL WEBSITE/Restaurant/TWIST Rooftop 009.jpg",
        alt: "Sunset Views",
      },
      {
        src: "/images/HOTEL WEBSITE/Restaurant/TWIST Rooftop 011.jpg",
        alt: "Rooftop Lounge",
      },
      {
        src: "/images/HOTEL WEBSITE/Restaurant/TWIST Rooftop 012.jpg",
        alt: "City Views",
      },
      {
        src: "/images/HOTEL WEBSITE/Restaurant/TWIST Rooftop 013.jpg",
        alt: "Fine Dining",
      },
      {
        src: "/images/HOTEL WEBSITE/Restaurant/TWIST Rooftop 014.jpg",
        alt: "Night Ambiance",
      },
      {
        src: "/images/HOTEL WEBSITE/Restaurant/TWIST Rooftop 016.jpg",
        alt: "Craft Cocktails",
      },
      {
        src: "/images/HOTEL WEBSITE/Restaurant/TWIST Rooftop 017.jpg",
        alt: "Terrace Seating",
      },
      {
        src: "/images/HOTEL WEBSITE/Restaurant/TWIST Rooftop 018.jpg",
        alt: "Premium Dining",
      },
      {
        src: "/images/HOTEL WEBSITE/Restaurant/TWIST Rooftop 019.jpg",
        alt: "Panoramic Views",
      },
      {
        src: "/images/HOTEL WEBSITE/Restaurant/TWIST Rooftop 020.jpg",
        alt: "Rooftop Experience",
      },
      {
        src: "/images/HOTEL WEBSITE/Restaurant/TWIST Rooftop 024.jpg",
        alt: "Sky Bar",
      },
      {
        src: "/images/HOTEL WEBSITE/Restaurant/TWIST Rooftop 025.jpg",
        alt: "Romantic Setting",
      },
      {
        src: "/images/HOTEL WEBSITE/Restaurant/TWIST Rooftop 042.jpg",
        alt: "Outdoor Terrace",
      },
      {
        src: "/images/HOTEL WEBSITE/Restaurant/TWIST Rooftop 044.jpg",
        alt: "Night Views",
      },
      {
        src: "/images/HOTEL WEBSITE/Restaurant/TWIST Rooftop 045.jpg",
        alt: "Rooftop Bar Atmosphere",
      },
    ],
  },
  "good-eatz-154": {
    slug: "good-eatz-154",
    name: "Good Eatz 154",
    cuisine: "Thai & International",
    floor: "Ground Floor",
    hours: "6:00 AM - 10:00 PM",
    phone: "+66 76 233 355 ext. 1540",
    description: [
      "Good Eatz 154 is our signature all-day dining destination, where guests can enjoy a diverse culinary journey from sunrise to sunset in a warm and welcoming atmosphere.",
      "Start your day with our lavish international breakfast buffet, featuring live cooking stations, fresh tropical fruits, and both Western and Asian favorites.",
      "Throughout the day, explore our à la carte menu showcasing the best of Thai cuisine alongside international comfort classics, all prepared with locally sourced ingredients.",
    ],
    highlights: [
      "International Breakfast Buffet",
      "Live Cooking Stations",
      "Thai Specialties",
      "Western Comfort Food",
      "Fresh Bakery & Pastries",
      "Kids Menu Available",
      "In-Room Dining Service",
      "Dietary Accommodations",
    ],
    images: [
      {
        src: "/images/HOTEL WEBSITE/Restaurant/154 Main.jpg",
        alt: "Good Eatz 154 Restaurant",
      },
      {
        src: "/images/HOTEL WEBSITE/Restaurant/154 Good Eatz 04.jpg",
        alt: "Fresh Pastries",
      },
      {
        src: "/images/HOTEL WEBSITE/Restaurant/154 Good Eatz 05.jpg",
        alt: "All-Day Dining",
      },
      {
        src: "/images/HOTEL WEBSITE/Restaurant/154 Good Eatz 06.jpg",
        alt: "Restaurant Interior",
      },
      {
        src: "/images/HOTEL WEBSITE/Restaurant/154 Good Eatz 07.jpg",
        alt: "Dining Experience",
      },
      {
        src: "/images/HOTEL WEBSITE/Restaurant/154 Good Eatz 08.jpg",
        alt: "Food Selection",
      },
    ],
  },
};
