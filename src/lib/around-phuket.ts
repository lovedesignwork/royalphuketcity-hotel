export type AroundPlace = {
  name: string;
  summary: string;
  distance?: string;
  meta?: string;
  address?: string;
  details?: string[];
  images: string[];
  mapUrl?: string;
  routeImage?: string;
  imageFit?: "cover" | "contain";
};

function maps(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export type AroundSection = {
  slug: string;
  title: string;
  hint: string;
  intro: string;
  desktopPath: string;
  places: AroundPlace[];
};

export const AROUND_SECTIONS: AroundSection[] = [
  {
    slug: "old-town",
    title: "Local Experiences",
    hint: "Walk from the hotel",
    intro:
      "Thalang Road is about 5 minutes on foot. Soi Romanee, shrines, cafes, and Sunday market are all around the hotel.",
    desktopPath: "/things-to-do-phuket-old-town",
    places: [
      {
        name: "Thalang Road and Soi Romanee",
        distance: "5 to 8 minutes walk",
        mapUrl: maps("Thalang Road Phuket Old Town"),
        summary:
          "Sino-Portuguese shophouses, pastel lanes, cafes, and the streets that photograph best. Use the hotel tower to find your way back.",
        images: [
          "/images/old-town/tourist-woman-phuket-old-town-with-building-sino-portuguese-architecture-phuket-old-town.jpg",
          "/images/cultural-historical/Romanee Road (2).jpg",
          "/images/cultural-historical/thalang road (1).jpg",
        ],
      },
      {
        name: "Lard Yai Sunday Market",
        distance: "5 minutes walk · Sunday 4 PM to 10 PM",
        mapUrl: maps("Lard Yai Sunday Market Thalang Road Phuket"),
        summary:
          "Thalang Road closes to cars. Try Hokkien noodles, spring rolls, and O-Aew. Best energy from 5:30 PM.",
        images: [
          "/images/cultural-historical/lard yai walking street market (1).webp",
          "/images/cultural-historical/lard yai walking street market (2).jpg",
        ],
      },
      {
        name: "Thai Hua Museum and Shrines",
        distance: "Walking distance",
        mapUrl: maps("Thai Hua Museum Phuket Old Town"),
        summary:
          "Chinese immigration history, Jui Tui shrine, and a short hop between temples in the heritage grid.",
        images: [
          "/images/cultural-historical/chartered walking street (4).jpg",
          "/images/old-town/colorful-sino-portuguese-buildings-street-phuket-thailand.jpg",
        ],
      },
    ],
  },
  {
    slug: "nature",
    title: "Nature",
    hint: "Parks and a viewpoint",
    intro:
      "Green space close to Phuket Town. Khao Rang at sunset, Saphan Hin for a walk or a jog.",
    desktopPath: "/sustainability/natural-attractions",
    places: [
      {
        name: "Khao Rang Viewpoint",
        distance: "3 km · 10-minute drive",
        mapUrl: maps("Khao Rang Viewpoint Phuket"),
        summary:
          "City and sea views from Rang Hill. Trails, fitness stations, and cafes. Go for sunset.",
        images: [
          "/images/natural-attractions/khao rang viewpoint (1).jpg",
          "/images/natural-attractions/khao rang viewpoint (2).jpg",
          "/images/natural-attractions/khao rang viewpoint (3).jpg",
        ],
      },
      {
        name: "Saphan Hin Park",
        distance: "2.5 km · 8-minute drive",
        mapUrl: maps("Saphan Hin Park Phuket"),
        summary:
          "The town's largest park on the east coast. Jogging, cycling, playground, and a waterfront path over Phuket Bay.",
        images: [
          "/images/natural-attractions/saphan hin park (1).jpg",
          "/images/natural-attractions/saphan hin park (2).webp",
          "/images/natural-attractions/saphan hin park (4).webp",
        ],
      },
    ],
  },
  {
    slug: "culture",
    title: "Culture",
    hint: "Temples, streets, park",
    intro:
      "Temples, heritage streets, and Dragon Park. Ask the desk for a walking map of Old Town.",
    desktopPath: "/sustainability/cultural-historical",
    places: [
      {
        name: "Big Buddha Temple",
        distance: "12 km · 25-minute drive",
        mapUrl: maps("Big Buddha Phuket"),
        summary:
          "45-meter white marble Buddha on Nakkerd Hill. Wide views. Cover shoulders and knees.",
        images: [
          "/images/cultural-historical/Big Buddha Tample (1).jpg",
          "/images/cultural-historical/Big Buddha Tample (2).jpg",
        ],
      },
      {
        name: "Wat Chalong",
        distance: "10 km · 20-minute drive",
        mapUrl: maps("Wat Chalong Phuket"),
        imageFit: "contain",
        summary:
          "Phuket's main temple. Ornate halls, a pagoda with a Buddha relic, and quiet grounds.",
        images: [
          "/images/cultural-historical/Chalong Temple (Way Chalong) (3).webp",
          "/images/cultural-historical/Chalong Temple (Way Chalong) (1).jpg",
          "/images/cultural-historical/Chalong Temple (Way Chalong) (2).jpg",
        ],
      },
      {
        name: "Chillva Market",
        distance: "10-minute drive",
        mapUrl: maps("Chillva Market Phuket"),
        summary:
          "Covered night market with street food, crafts, and live music. A local evening out from Phuket Town.",
        images: [
          "/images/markets-night-market/sunday walking street market phuket (1).jpg",
          "/images/markets-night-market/sunday walking street market phuket (2).jpg",
        ],
      },
      {
        name: "Central Phuket",
        distance: "15-minute drive",
        mapUrl: maps("Central Phuket"),
        summary:
          "The island's main department store and mall. Shopping, cinema, and air-conditioned downtime.",
        images: [
          "/images/HOTEL WEBSITE/Atrium-Lounge-Royal-Phuket-City-Hotel-1.jpg",
        ],
      },
      {
        name: "Queen Sirikit Park (Dragon Park)",
        distance: "3 km · 10-minute drive",
        mapUrl: maps("Queen Sirikit Park Dragon Park Phuket"),
        imageFit: "contain",
        summary:
          "Gardens and walking paths around a Chinese dragon sculpture. A quiet green stop in town.",
        images: [
          "/images/cultural-historical/queen sirikit 72nd anniversary Chaloem Phrakiat Park (Dragon Park) (1).webp",
          "/images/cultural-historical/queen sirikit 72nd anniversary Chaloem Phrakiat Park (Dragon Park) (1).jpg",
        ],
      },
    ],
  },
  {
    slug: "michelin",
    title: "Michelin nearby",
    hint: "Walk or a short drive",
    intro:
      "Michelin-listed rooms near the hotel. Book ahead in peak season. The desk can call for you.",
    desktopPath: "/sustainability/michelin-restaurants",
    places: [
      {
        name: "Suay Restaurant",
        meta: "Michelin Plate · Modern Thai",
        distance: "8 minutes walk",
        address: "50/2 Takuapa Road, Phuket Old Town",
        mapUrl: maps("Suay Restaurant Phuket Old Town"),
        summary:
          "Creative Thai in a restored Sino-Portuguese house. Local ingredients, modern plates.",
        images: [],
      },
      {
        name: "Tu Kab Khao",
        meta: "Michelin Plate · Southern Thai",
        distance: "5 minutes walk",
        address: "8 Phang Nga Road, Phuket Old Town",
        mapUrl: maps("Tu Kab Khao Phuket Old Town"),
        summary:
          "Bold Southern Thai cooking. Spicy, traditional, and close to the hotel.",
        images: [],
      },
      {
        name: "One Chun",
        meta: "Michelin Guide Recommended · Phuketian-Chinese",
        distance: "10 minutes drive",
        address: "48/1 Thepkrasattri Road, Phuket Town",
        mapUrl: maps("One Chun Restaurant Phuket"),
        summary:
          "A local room known for moo hong and other Phuketian-Chinese plates.",
        images: [],
      },
      {
        name: "Raya Restaurant",
        meta: "Michelin Guide Recommended · Southern Thai",
        distance: "7 minutes walk",
        address: "48 Dibuk Road, Phuket Old Town",
        mapUrl: maps("Raya Restaurant Phuket Old Town"),
        summary:
          "Classic Phuket dishes in a century-old Sino-Portuguese mansion.",
        images: [],
      },
    ],
  },
  {
    slug: "activities",
    title: "Activities",
    hint: "Islands, park, zipline",
    intro:
      "Day trips the desk can book: boats from Rassada Pier, Andamanda, and Hanuman World.",
    desktopPath: "/sustainability/activities",
    places: [
      {
        name: "Island hopping from Rassada Pier",
        distance: "4 km · 12-minute drive",
        mapUrl: maps("Rassada Pier Phuket"),
        summary:
          "Phi Phi, Maya Bay, James Bond Island, or the Similans. Speedboat, longtail, or a yacht day.",
        images: [
          "/images/activities/rassada pier (Island hopping to Phi Phi Island) (3).webp",
          "/images/activities/rassada pier (Island hopping to Phi Phi Island) (1).jpg",
        ],
      },
      {
        name: "Andamanda Water Park",
        distance: "15 km · 25-minute drive",
        mapUrl: maps("Andamanda Phuket Water Park"),
        summary:
          "Thai-themed slides, wave pool, lazy river, and kids' zones. A full family day.",
        images: [
          "/images/activities/water Park (Andamanda) (3).webp",
          "/images/activities/water Park (Andamanda) (1).jpg",
          "/images/activities/water Park (Andamanda) (2).jpg",
        ],
      },
      {
        name: "Hanuman World Zipline",
        distance: "12 km · 20-minute drive",
        mapUrl: maps("Hanuman World Zipline Phuket"),
        summary:
          "16 platforms and long rainforest lines. Ask the desk to arrange a transfer.",
        images: [
          "/images/activities/zipline Hanuman word.jpg",
          "/images/activities/zipline Hanuman word (1).jpg",
        ],
      },
      {
        name: "ATV",
        distance: "Ask the desk",
        mapUrl: maps("ATV Phuket"),
        summary: "Off-road buggy trails through rubber plantations and dirt tracks. Book at the front desk.",
        images: [],
      },
      {
        name: "Aquaria Phuket",
        distance: "15-minute drive",
        mapUrl: maps("Aquaria Phuket"),
        summary: "Indoor aquarium and sea-life exhibits. An easy half-day with children.",
        images: [],
      },
      {
        name: "Siam Niramit",
        distance: "20-minute drive",
        mapUrl: maps("Siam Niramit Phuket"),
        summary: "Thai cultural show with dinner packages. Evening performance.",
        images: [],
      },
      {
        name: "Carnival Magic",
        distance: "25-minute drive",
        mapUrl: maps("Carnival Magic Phuket"),
        summary: "Family theme park with rides and evening lights.",
        images: [],
      },
      {
        name: "Phuket FantaSea",
        distance: "30-minute drive",
        mapUrl: maps("Phuket FantaSea"),
        summary: "Cultural theme park and night show in Kamala.",
        images: [],
      },
      {
        name: "Phuket Elephant Jungle Sanctuary",
        distance: "40-minute drive",
        mapUrl: maps("Phuket Elephant Jungle Sanctuary"),
        summary: "Ethical elephant encounter. No riding. The desk can arrange a transfer.",
        images: [],
      },
      {
        name: "Phuket Dolphins Bay Show",
        distance: "30-minute drive",
        mapUrl: maps("Phuket Dolphins Bay"),
        summary: "Dolphin show and lagoon seating. Check showtimes with the desk.",
        images: [],
      },
      {
        name: "Thai Costume Rental & Photoshoot",
        distance: "Walk from the hotel",
        mapUrl: maps("Thai costume rental Phuket Old Town"),
        summary: "Traditional Thai dress for photos in Old Town. Studios are a few minutes on foot.",
        images: [],
      },
    ],
  },
  {
    slug: "transport",
    title: "Getting around",
    hint: "Bus, van, Grab",
    intro:
      "Hotel vans first. Then the free Dragon Line, Bus Terminal 1, songthaews, Grab, and Bolt.",
    desktopPath: "/sustainability/transportation",
    places: [
      {
        name: "Hotel private transfer",
        meta: "Paid · book at the desk",
        summary:
          "Airport runs, island days, and point-to-point vans with a hotel driver.",
        details: [
          "Airport transfers",
          "Island tours and day trips",
          "Air-conditioned vans",
          "Book ahead at the front desk",
        ],
        images: ["/images/HOTEL WEBSITE/Hotel-Transportation-Van-Front_resize.jpg"],
      },
      {
        name: "Phuket Smart Dragon Line",
        meta: "Free EV shuttle",
        routeImage: "/images/phuket-town-smart-bus-map.png",
        summary:
          "Electric shuttle from the hotel through Phuket Town. Every 30 minutes, 10 AM to 9 PM. Tap the map to enlarge it.",
        details: [
          "Free of charge",
          "Stops at the hotel",
          "Phuket Town loop",
          "Every 30 minutes, 10 AM to 9 PM",
        ],
        images: ["/images/HOTEL WEBSITE/EV-Bus_resize-1.jpeg"],
      },
      {
        name: "Bus Terminal 1",
        meta: "Intercity buses",
        mapUrl: maps("Phuket Bus Terminal 1"),
        summary:
          "Long-distance buses to other provinces. The desk can write the destination in Thai and call a Grab.",
        details: [
          "Phuket Town terminal",
          "Intercity routes",
          "Ask the desk for the current timetable",
        ],
        images: [],
      },
      {
        name: "Songthaew",
        meta: "20 to 50 THB",
        mapUrl: maps("Phuket Town Songthaew Terminal"),
        summary:
          "Shared pickup buses to the beaches. Flag one on the road or start at the Phuket Town terminal.",
        details: [
          "Daylight hours",
          "Fixed beach routes",
          "Terminal is nearby",
        ],
        images: [],
      },
      {
        name: "Grab and Bolt",
        meta: "On demand",
        summary:
          "Door-to-door apps with a price before you ride. Works late.",
        details: ["Upfront pricing", "Several car types", "24 hours"],
        images: [],
      },
    ],
  },
];

export function getAroundSection(slug: string): AroundSection | undefined {
  return AROUND_SECTIONS.find((item) => item.slug === slug);
}
