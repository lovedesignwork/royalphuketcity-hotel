/**
 * GEO (Generative Engine Optimization) Utilities
 * 
 * Optimizes content for AI-powered search engines (ChatGPT, Claude, Gemini, Perplexity, Google AI Overviews)
 * Also known as: AEO, LLMO, GSO, AIO
 */

export interface FAQItem {
  question: string;
  answer: string;
}

export interface GEOContent {
  tldr: string;
  keyTakeaways: string[];
  faqs: FAQItem[];
  schemaType: "Article" | "FAQPage" | "HowTo" | "LocalBusiness" | "Hotel";
}

export interface FAQPageSchema {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: {
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }[];
}

export interface ArticleSchema {
  "@context": "https://schema.org";
  "@type": "Article";
  headline: string;
  description: string;
  image: string;
  author: {
    "@type": "Organization";
    name: string;
  };
  publisher: {
    "@type": "Organization";
    name: string;
    logo: {
      "@type": "ImageObject";
      url: string;
    };
  };
  datePublished: string;
  dateModified: string;
}

export interface HotelSchema {
  "@context": "https://schema.org";
  "@type": "Hotel";
  name: string;
  description: string;
  image: string;
  address: {
    "@type": "PostalAddress";
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  telephone: string;
  email: string;
  url: string;
  starRating: {
    "@type": "Rating";
    ratingValue: string;
  };
  amenityFeature: {
    "@type": "LocationFeatureSpecification";
    name: string;
  }[];
  numberOfRooms: number;
}

export function generateFAQSchema(faqs: FAQItem[]): FAQPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateArticleSchema(
  headline: string,
  description: string,
  image: string,
  datePublished: string,
  dateModified?: string
): ArticleSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image,
    author: {
      "@type": "Organization",
      name: "Royal Phuket City Hotel",
    },
    publisher: {
      "@type": "Organization",
      name: "Royal Phuket City Hotel",
      logo: {
        "@type": "ImageObject",
        url: "https://www.royalphuketcity.com/logo.png",
      },
    },
    datePublished,
    dateModified: dateModified || datePublished,
  };
}

export function generateHotelSchema(): HotelSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: "Royal Phuket City Hotel",
    description:
      "A 4-star hotel in Phuket Old Town with 251 rooms, panoramic city views, and 27+ years of hospitality excellence. Located steps from historic Sino-Portuguese architecture.",
    image: "https://www.royalphuketcity.com/images/hotel-exterior.jpg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "154 Phang-Nga Road, Talad Yai",
      addressLocality: "Muang",
      addressRegion: "Phuket",
      postalCode: "83000",
      addressCountry: "TH",
    },
    telephone: "+66 76 233 355",
    email: "reservation@royalphuketcity.com",
    url: "https://www.royalphuketcity.com",
    starRating: {
      "@type": "Rating",
      ratingValue: "4",
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Swimming Pool" },
      { "@type": "LocationFeatureSpecification", name: "Fitness Center" },
      { "@type": "LocationFeatureSpecification", name: "Restaurant" },
      { "@type": "LocationFeatureSpecification", name: "Meeting Rooms" },
      { "@type": "LocationFeatureSpecification", name: "Free WiFi" },
      { "@type": "LocationFeatureSpecification", name: "Free Parking" },
      { "@type": "LocationFeatureSpecification", name: "Rooftop Bar" },
    ],
    numberOfRooms: 251,
  };
}

// Hotel-specific FAQs for GEO optimization
export const HOTEL_FAQS: FAQItem[] = [
  {
    question: "Where is Royal Phuket City Hotel located?",
    answer:
      "Royal Phuket City Hotel is located at 154 Phang-Nga Road in the heart of Phuket Old Town, just a 5-minute walk from the historic Sino-Portuguese architecture of Thalang Road and the famous Sunday Walking Street market.",
  },
  {
    question: "How many rooms does Royal Phuket City Hotel have?",
    answer:
      "Royal Phuket City Hotel has 251 thoughtfully designed rooms and suites across 19 floors, offering panoramic views of Phuket City and the distant Andaman Sea.",
  },
  {
    question: "What is the star rating of Royal Phuket City Hotel?",
    answer:
      "Royal Phuket City Hotel is a certified 4-star property with SHA Plus, Green Hotel, and ASEAN MICE Venue Standard certifications.",
  },
  {
    question: "Does Royal Phuket City Hotel have meeting facilities?",
    answer:
      "Yes, Royal Phuket City Hotel offers 9 meeting rooms and a 1,637 sqm Grand Ballroom that can accommodate up to 2,300 guests, making it one of Southern Thailand's largest MICE venues.",
  },
  {
    question: "How far is Royal Phuket City Hotel from Phuket Airport?",
    answer:
      "Royal Phuket City Hotel is approximately 30 kilometers (about 45 minutes drive) from Phuket International Airport. Airport transfer services are available upon request.",
  },
  {
    question: "What dining options are available at Royal Phuket City Hotel?",
    answer:
      "The hotel features Yan Long Chinese Restaurant (authentic Cantonese cuisine) and TWIST Rooftop Restaurant & Bar (panoramic views and cocktails), along with an in-house bakery and 24-hour in-room dining.",
  },
  {
    question: "Can Royal Phuket City Hotel host weddings?",
    answer:
      "Yes, Royal Phuket City Hotel is a premier wedding venue in Phuket with 27+ years of experience hosting weddings. The Grand Ballroom can accommodate up to 2,300 guests, and we offer packages for Thai, Chinese, Western, Muslim, and LGBTQ+ weddings.",
  },
  {
    question: "Is Royal Phuket City Hotel near the beach?",
    answer:
      "Royal Phuket City Hotel is located in Phuket Old Town, not directly on the beach. However, guests enjoy panoramic sea views from upper floors and easy access to Phuket's cultural attractions. Beach areas like Patong are approximately 15-20 minutes away by car.",
  },
];

// Attraction-specific FAQs
export const ATTRACTION_FAQS: Record<string, FAQItem[]> = {
  "phuket-old-town": [
    {
      question: "What is Phuket Old Town famous for?",
      answer:
        "Phuket Old Town is famous for its well-preserved Sino-Portuguese architecture, colorful shophouses, vibrant Sunday Walking Street market, historic Chinese shrines, and authentic local cuisine reflecting the island's tin mining heritage and multicultural history.",
    },
    {
      question: "What are the best things to do in Phuket Old Town?",
      answer:
        "The best things to do include walking along Thalang Road to see heritage buildings, visiting the Sunday Walking Street market, exploring Soi Romanee for Instagram photos, visiting Thai Hua Museum, shrine hopping, café hopping in heritage buildings, and sampling local street food.",
    },
    {
      question: "Is Phuket Old Town worth visiting?",
      answer:
        "Absolutely. Phuket Old Town offers an authentic cultural experience away from the tourist beaches. It's the best place to understand Phuket's rich history, enjoy genuine local food at reasonable prices, and explore beautiful Sino-Portuguese architecture.",
    },
  ],
  "sunday-walking-street": [
    {
      question: "What time does Phuket Sunday Walking Street open?",
      answer:
        "Phuket Sunday Walking Street (Lard Yai) opens every Sunday from 4 PM to 10 PM on Thalang Road in Phuket Old Town. The best time to visit is between 5:30-6:00 PM when all vendors are set up and the atmosphere is most lively.",
    },
    {
      question: "What food should I try at Phuket Sunday Walking Street?",
      answer:
        "Must-try foods include Hokkien noodles (Phuket's signature dish), Phuket spring rolls, O-Aew shaved ice dessert, Mee Hokkien soup, and various local snacks. The market features dozens of food vendors serving authentic Phuket cuisine.",
    },
    {
      question: "Is Phuket Sunday Walking Street free to enter?",
      answer:
        "Yes, Phuket Sunday Walking Street is completely free to enter. You only pay for food, drinks, and any items you purchase from vendors. It's one of the best free attractions in Phuket.",
    },
  ],
  "cafes-phuket-town": [
    {
      question: "Where are the best cafes in Phuket Town?",
      answer:
        "The best cafes cluster around Thalang Road, Soi Romanee, and Dibuk Road in Phuket Old Town. Top recommendations include Bookhemian, Rommanee Coffee House, China Inn Café, Gallery Café by Pinky, and Old Phuket Coffee Station.",
    },
    {
      question: "Are Phuket Old Town cafes expensive?",
      answer:
        "Phuket Old Town cafes offer excellent value compared to beach resort areas. Expect to pay 60-150 THB for specialty coffee drinks and 80-200 THB for food items. Many cafes are housed in beautiful heritage buildings, making the experience worth every baht.",
    },
  ],
};

// Wedding FAQs
export const WEDDING_FAQS: FAQItem[] = [
  {
    question: "How much does a wedding at Royal Phuket City Hotel cost?",
    answer:
      "Wedding packages at Royal Phuket City Hotel vary based on guest count, venue selection, and services required. Contact our wedding specialist for customized quotes. Our Grand Ballroom can host up to 2,300 guests, while smaller venues accommodate intimate ceremonies.",
  },
  {
    question: "What types of weddings can Royal Phuket City Hotel host?",
    answer:
      "We host all types of weddings including traditional Thai ceremonies, Chinese wedding banquets, Western-style receptions, Muslim Nikah ceremonies, engagement parties, and LGBTQ+ celebrations. Our experienced team has over 27 years of wedding expertise.",
  },
  {
    question: "Does Royal Phuket City Hotel provide wedding planning services?",
    answer:
      "Yes, our dedicated wedding specialists provide full planning support including venue decoration, catering, audio-visual equipment, accommodation for guests, and coordination with external vendors. We handle every detail to ensure your perfect day.",
  },
];

// MICE FAQs
export const MICE_FAQS: FAQItem[] = [
  {
    question: "What is the largest meeting room at Royal Phuket City Hotel?",
    answer:
      "The Grand Ballroom is our largest venue at 1,637 square meters, capable of hosting up to 2,300 guests in theatre-style seating or 1,000 guests for banquet events. It's one of the largest indoor event spaces in Southern Thailand.",
  },
  {
    question: "Is Royal Phuket City Hotel MICE certified?",
    answer:
      "Yes, Royal Phuket City Hotel holds TCEB (Thailand Convention and Exhibition Bureau) MICE Venue Standard certification, ASEAN MICE Venue Standard certification, SHA Plus certification, and Green Hotel certification.",
  },
  {
    question: "What AV equipment is available for meetings?",
    answer:
      "We provide HD projectors, LED display walls, wireless presentation systems, professional sound systems, video conferencing equipment, high-speed WiFi, and dedicated technical support. All meeting rooms are equipped with state-of-the-art audiovisual technology.",
  },
];
