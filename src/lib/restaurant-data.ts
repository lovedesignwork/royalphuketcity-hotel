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
        src: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop",
        alt: "Yan Long Restaurant Interior",
      },
      {
        src: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=2070&auto=format&fit=crop",
        alt: "Dim Sum Selection",
      },
      {
        src: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=2070&auto=format&fit=crop",
        alt: "Chinese Cuisine",
      },
      {
        src: "https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=2070&auto=format&fit=crop",
        alt: "Private Dining Room",
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
        src: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?q=80&w=2070&auto=format&fit=crop",
        alt: "TWIST Rooftop Bar",
      },
      {
        src: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2074&auto=format&fit=crop",
        alt: "Evening Ambiance",
      },
      {
        src: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=2069&auto=format&fit=crop",
        alt: "Craft Cocktails",
      },
      {
        src: "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop",
        alt: "Fine Dining Experience",
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
        src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop",
        alt: "Good Eatz 154 Restaurant",
      },
      {
        src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
        alt: "Breakfast Buffet",
      },
      {
        src: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?q=80&w=2070&auto=format&fit=crop",
        alt: "Thai Cuisine",
      },
      {
        src: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=2065&auto=format&fit=crop",
        alt: "Fresh Pastries",
      },
    ],
  },
};
