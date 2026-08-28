export type AroundPlace = {
  name: string;
  summary: string;
  distance?: string;
  meta?: string;
  address?: string;
  details?: string[];
  images: string[];
};

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
    title: "Old Town",
    hint: "Walk from the hotel",
    intro:
      "Thalang Road is about 5 minutes on foot. Soi Romanee, shrines, cafes, and Sunday market are all around the hotel.",
    desktopPath: "/things-to-do-phuket-old-town",
    places: [
      {
        name: "Thalang Road and Soi Romanee",
        distance: "5 to 8 minutes walk",
        summary:
          "Sino-Portuguese shophouses, pastel lanes, cafes, and the streets that photograph best. Use the hotel tower to find your way back.",
        images: [
          "/images/old-town/tourist-woman-phuket-old-town-with-building-sino-portuguese-architecture-phuket-old-town.jpg",
          "/images/cultural-historical/Romanee Road (2).jpg",
          "/images/cultural-historical/thalang road (1).jpg",
        ],
      },
      {
        name: "Lard Yai Sunday market",
        distance: "5 minutes walk · Sunday 4 PM to 10 PM",
        summary:
          "Thalang Road closes to cars. Try Hokkien noodles, spring rolls, and O-Aew. Best energy from 5:30 PM.",
        images: [
          "/images/cultural-historical/lard yai walking street market (1).webp",
          "/images/cultural-historical/lard yai walking street market (2).jpg",
        ],
      },
      {
        name: "Thai Hua Museum and shrines",
        distance: "Walking distance",
        summary:
          "Chinese immigration history, Jui Tui shrine, and a short hop between temples in the heritage grid.",
        images: [
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
        summary:
          "Phuket's main temple. Ornate halls, a pagoda with a Buddha relic, and quiet grounds.",
        images: [
          "/images/cultural-historical/Chalong Temple (Way Chalong) (1).jpg",
          "/images/cultural-historical/Chalong Temple (Way Chalong) (2).jpg",
        ],
      },
      {
        name: "Lard Yai Walking Street",
        distance: "5 minutes walk · Sundays",
        summary:
          "Sunday market on Thalang Road. Crafts, local food, and the old shophouses as the backdrop.",
        images: [
          "/images/cultural-historical/lard yai walking street market (1).webp",
          "/images/cultural-historical/lard yai walking street market (3).jpg",
        ],
      },
      {
        name: "Soi Romanee and Thalang Road",
        distance: "5 to 8 minutes walk",
        summary:
          "Pastel shophouses from the tin era. Cafes and boutiques on the main heritage street.",
        images: [
          "/images/cultural-historical/Romanee Road (2).jpg",
          "/images/cultural-historical/Romanee Road (3).jpg",
          "/images/cultural-historical/thalang road (1).jpg",
        ],
      },
      {
        name: "Queen Sirikit Park (Dragon Park)",
        distance: "3 km · 10-minute drive",
        summary:
          "Gardens and walking paths around a Chinese dragon sculpture. A quiet green stop in town.",
        images: [
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
        summary:
          "Creative Thai in a restored Sino-Portuguese house. Local ingredients, modern plates.",
        images: [],
      },
      {
        name: "Tu Kab Khao",
        meta: "Michelin Plate · Southern Thai",
        distance: "5 minutes walk",
        address: "8 Phang Nga Road, Phuket Old Town",
        summary:
          "Bold Southern Thai cooking. Spicy, traditional, and close to the hotel.",
        images: [],
      },
      {
        name: "One Chun",
        meta: "Michelin Guide Recommended · Phuketian-Chinese",
        distance: "10 minutes drive",
        address: "48/1 Thepkrasattri Road, Phuket Town",
        summary:
          "A local room known for moo hong and other Phuketian-Chinese plates.",
        images: [],
      },
      {
        name: "Raya Restaurant",
        meta: "Michelin Guide Recommended · Southern Thai",
        distance: "7 minutes walk",
        address: "48 Dibuk Road, Phuket Old Town",
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
        summary:
          "Phi Phi, James Bond Island, or the Similans. Speedboat, longtail, or a yacht day.",
        images: [
          "/images/activities/rassada pier (Island hopping to Phi Phi Island) (1).jpg",
          "/images/activities/rassada pier (Island hopping to Phi Phi Island) (2).jpg",
        ],
      },
      {
        name: "Andamanda Water Park",
        distance: "15 km · 25-minute drive",
        summary:
          "Thai-themed slides, wave pool, lazy river, and kids' zones. A full family day.",
        images: [
          "/images/activities/water Park (Andamanda) (1).jpg",
          "/images/activities/water Park (Andamanda) (2).jpg",
        ],
      },
      {
        name: "Hanuman World Zipline",
        distance: "12 km · 20-minute drive",
        summary:
          "16 platforms and long rainforest lines. Ask the desk to arrange a transfer.",
        images: [
          "/images/activities/zipline Hanuman word.jpg",
          "/images/activities/zipline Hanuman word (1).jpg",
        ],
      },
    ],
  },
  {
    slug: "transport",
    title: "Getting around",
    hint: "Bus, van, Grab",
    intro:
      "The free EV Smart Bus stops at the hotel. Private vans, songthaews, Grab, and Bolt cover the rest.",
    desktopPath: "/sustainability/transportation",
    places: [
      {
        name: "Phuket Smart Bus",
        meta: "Free EV shuttle",
        summary:
          "Electric shuttle from the hotel toward town and beach areas. Every 15 minutes, 10 AM to 9 PM.",
        details: [
          "Free of charge",
          "Stops at the hotel",
          "Phuket Town to beach areas",
          "Every 15 minutes, 10 AM to 9 PM",
        ],
        images: ["/images/HOTEL WEBSITE/EV-Bus_resize-1.jpeg"],
      },
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
        name: "Songthaew",
        meta: "20 to 50 THB",
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
