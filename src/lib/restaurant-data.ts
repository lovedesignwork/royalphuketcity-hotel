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
      { src: "/images/YL/20200828_170433_resize.jpg", alt: "Yan Long Restaurant" },
      { src: "/images/YL/28 July 2022_0184_resize.jpg", alt: "Yan Long Dining" },
      { src: "/images/YL/28 July 2022_0185_resize.jpg", alt: "Yan Long Ambiance" },
      { src: "/images/YL/28 July 2022_0189_resize.jpg", alt: "Yan Long Interior" },
      { src: "/images/YL/28 July 2022_0190_resize.jpg", alt: "Yan Long Experience" },
      { src: "/images/YL/5_resize.jpg", alt: "Yan Long Cuisine" },
      { src: "/images/YL/ok hires_resize.jpg", alt: "Yan Long Dish" },
      { src: "/images/YL/Royal PHoto SHoot1405 copy_resize.jpg", alt: "Yan Long Photo" },
      { src: "/images/YL/_DSF1834_resize.jpg", alt: "Yan Long Food" },
      { src: "/images/YL/_DSF1836_resize.jpg", alt: "Yan Long Menu" },
      { src: "/images/YL/_DSF1839_resize.jpg", alt: "Yan Long Dishes" },
      { src: "/images/YL/_DSF1849_resize.jpg", alt: "Yan Long Cantonese" },
      { src: "/images/YL/_DSF1853_resize.jpg", alt: "Yan Long Dim Sum" },
      { src: "/images/YL/_DSF1869_resize.jpg", alt: "Yan Long Banquet" },
      { src: "/images/YL/_DSF1875_resize.jpg", alt: "Yan Long Private Room" },
      { src: "/images/YL/_DSF1878_resize.jpg", alt: "Yan Long Tea" },
      { src: "/images/YL/_DSF1882_resize.jpg", alt: "Yan Long Seafood" },
      { src: "/images/YL/_DSF1884_resize.jpg", alt: "Yan Long Specialties" },
      { src: "/images/YL/_DSF1890_resize.jpg", alt: "Yan Long Atmosphere" },
      { src: "/images/YL/_DSF7297 copy_resize.jpg", alt: "Yan Long Setting" },
      { src: "/images/YL/_MG_8224_resize.jpg", alt: "Yan Long Elegance" },
      { src: "/images/YL/YL-thai-1.jpg", alt: "Yan Long Traditional" },
      { src: "/images/YL/YL-thai-2.jpg", alt: "Yan Long Heritage" },
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
};
