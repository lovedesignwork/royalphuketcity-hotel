export interface WeddingTypeDetail {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  whyChooseUsImage?: string;
  ctaImage?: string;
  description: string[];
  highlights: string[];
  traditions: {
    title: string;
    description: string;
    image: string;
  }[];
  gallery: string[];
  seoKeywords: string[];
  metaDescription: string;
}

export const WEDDING_TYPES: Record<string, WeddingTypeDetail> = {
  "engagement-ceremony": {
    slug: "engagement-ceremony",
    title: "Engagement Ceremony",
    subtitle: "Celebrate Your Promise in Style",
    heroImage: "/images/HOTEL WEBSITE/Wedding/Wedding RPC 09.jpg",
    whyChooseUsImage: "/images/HOTEL WEBSITE/Wedding/Wedding RPC 08.jpg",
    ctaImage: "/images/HOTEL WEBSITE/Wedding/Wedding RPC 07.jpg",
    metaDescription: "Host your dream engagement ceremony in Phuket at Royal Phuket City Hotel. Intimate venues, elegant settings, and 27+ years of experience creating unforgettable celebrations.",
    seoKeywords: ["engagement ceremony Phuket", "engagement party venue Thailand", "Phuket engagement venue", "engagement celebration hotel", "romantic engagement Phuket"],
    description: [
      "Mark the first step of your journey together with an elegant engagement ceremony at Royal Phuket City Hotel. Whether you envision an intimate gathering with close family or a festive celebration with all your friends, we have the perfect setting to make your promise unforgettable.",
      "Our experienced wedding team works closely with you to design every detail — from traditional rituals to modern styling — all set against the charming backdrop of Phuket Old Town. With flexible venue options and customizable packages, we bring your vision to life.",
      "From the moment you step into our venue, you'll feel the warmth of Thai hospitality combined with sophisticated elegance. Let us help you create memories that will last a lifetime.",
    ],
    highlights: [
      "Intimate venue options for 20-200 guests",
      "Customizable décor and styling",
      "Professional event coordination",
      "Gourmet catering with Thai and international options",
      "Champagne toasts and celebration packages",
      "Photography-friendly settings",
      "Convenient Phuket Old Town location",
      "Accommodation packages for guests",
    ],
    traditions: [
      {
        title: "Ring Exchange Ceremony",
        description: "A beautiful moment where couples exchange rings as a symbol of their commitment, surrounded by loved ones in an elegant setting.",
        image: "/images/HOTEL WEBSITE/Wedding/Wedding RPC 07.jpg",
      },
      {
        title: "Traditional Thai Elements",
        description: "Incorporate Thai blessing rituals and customs for a unique cultural touch that honors local traditions.",
        image: "/images/HOTEL WEBSITE/Wedding/WED2_ENG_L02_forehead_touch.jpg",
      },
      {
        title: "Celebration Dinner",
        description: "Toast to your future with an exquisite dinner featuring our chef's specially curated menu.",
        image: "/images/HOTEL WEBSITE/Wedding/WED2_ENG_L04_hands_table.jpg",
      },
    ],
    gallery: [
      "/images/HOTEL WEBSITE/Wedding/WED2_ENG_L01_ring_on_finger.jpg",
      "/images/HOTEL WEBSITE/Wedding/WED2_ENG_L03_bride_ring_display.jpg",
      "/images/HOTEL WEBSITE/Wedding/WED_WES_L01_ring_exchange_landscape.jpg",
      "/images/HOTEL WEBSITE/Wedding/WED2_ENG_L05_couple_laugh.jpg",
      "/images/HOTEL WEBSITE/Wedding/WED2_ENG_L06_groom_gaze.jpg",
      "/images/HOTEL WEBSITE/Wedding/WED_ENG_L01_ring_exchange_landscape.jpg",
    ],
  },
  "thai-wedding": {
    slug: "thai-wedding",
    title: "Thai Wedding",
    subtitle: "Elegant Rituals, Authentic Thai Ambiance",
    heroImage: "/images/HOTEL WEBSITE/Wedding/WED2_THAI_L01_water_ceremony.jpg",
    whyChooseUsImage: "/images/HOTEL WEBSITE/Wedding/Thai Wedding 004.jpg",
    metaDescription: "Experience authentic Thai wedding ceremonies in Phuket with traditional rituals, monks' blessings, and elegant venues at Royal Phuket City Hotel.",
    seoKeywords: ["Thai wedding ceremony", "traditional Thai wedding Phuket", "Thai wedding venue", "rod nam sang ceremony", "Buddhist wedding Thailand"],
    description: [
      "Celebrate your love with an authentic Thai wedding ceremony at Royal Phuket City Hotel. Our experienced team guides you through the beautiful rituals that have been cherished for generations — from the sacred monks' blessing to the joyful water-pouring ceremony.",
      "Experience the full richness of Thai wedding traditions: the Khan Maak procession where the groom's family arrives bearing gifts, the shell ceremony symbolizing unity, the sai sin thread connecting the couple, and the Rod Nam Sang water blessing from elders.",
      "Our team is well-versed in Thai ceremony logistics, ensuring every detail — from traditional décor and draping to music and timing — is perfectly orchestrated so you can immerse yourself in the moment without stress.",
    ],
    highlights: [
      "Traditional monks' blessing ceremony",
      "Rod Nam Sang water-pouring ritual",
      "Khan Maak procession arrangements",
      "Authentic Thai décor and flowers",
      "Traditional Thai music and entertainment",
      "Experienced ceremony coordinators",
      "Thai and fusion cuisine options",
      "Grand ballroom for up to 2,300 guests",
    ],
    traditions: [
      {
        title: "Monks' Blessing Ceremony",
        description: "Begin your marriage with sacred blessings from Buddhist monks, a meaningful tradition that brings good fortune to your union.",
        image: "/images/Thai Wed/RPC-Thai17.jpg",
      },
      {
        title: "Rod Nam Sang (Water Blessing)",
        description: "Receive blessings from elders as they pour sacred water over your hands, symbolizing wishes for prosperity and happiness.",
        image: "/images/Thai Wed/RPC-Thai20.jpg",
      },
      {
        title: "Khan Maak Procession",
        description: "The groom's procession bearing elaborately decorated trays of gifts, accompanied by traditional music and dancing.",
        image: "/images/Thai Wed/RPC-Thai21.jpg",
      },
    ],
    gallery: [
      "/images/HOTEL WEBSITE/Wedding/Thai Wedding 001.jpg",
      "/images/Thai Wed/RPC-Thai06.jpg",
      "/images/HOTEL WEBSITE/Wedding/Thai Wedding 005.jpg",
      "/images/HOTEL WEBSITE/Wedding/Thai Wedding 006.jpg",
      "/images/HOTEL WEBSITE/Wedding/Thai Wedding 007.jpg",
      "/images/HOTEL WEBSITE/Wedding/Thai Wedding 009.jpg",
    ],
  },
  "chinese-wedding": {
    slug: "chinese-wedding",
    title: "Chinese Wedding",
    subtitle: "Tea Ceremony, Eight-Course Banquet & Festive Atmosphere",
    heroImage: "/images/Big/28 July 2022_0050_resize.jpg",
    whyChooseUsImage: "/images/HOTEL WEBSITE/Wedding/Chinese 11.jpg",
    metaDescription: "Host an elegant Chinese wedding banquet in Phuket with traditional tea ceremonies, auspicious decorations, and eight-course dinners at Royal Phuket City Hotel.",
    seoKeywords: ["Chinese wedding Phuket", "Chinese tea ceremony Thailand", "Chinese wedding banquet", "Chinese wedding venue Phuket", "traditional Chinese wedding"],
    description: [
      "Bring cultural richness to your wedding celebration with a traditional Chinese ceremony at Royal Phuket City Hotel. From the meaningful tea ceremony to the sumptuous eight-course banquet, we honor every tradition that makes Chinese weddings so special.",
      "Our Yan Long Chinese Restaurant and grand banquet halls provide the perfect setting for your celebration. The team will assist with all traditional elements — symbolic red décor, tea ceremony arrangements, and family-style dining — to deliver a joyous occasion.",
      "Whether you're planning an intimate family gathering or a grand celebration with hundreds of guests, we ensure every auspicious detail is perfectly executed.",
    ],
    highlights: [
      "Traditional tea ceremony arrangements",
      "Sumptuous eight-course wedding banquet",
      "Auspicious red and gold decorations",
      "Yan Long Chinese Restaurant venue",
      "Grand ballroom for large celebrations",
      "Double happiness (囍) themed décor",
      "Lion dance and traditional entertainment",
      "Authentic Cantonese cuisine",
    ],
    traditions: [
      {
        title: "Tea Ceremony (敬茶)",
        description: "A heartfelt ritual where the couple serves tea to parents and elders, receiving blessings and gifts in return.",
        image: "/images/HOTEL WEBSITE/Wedding/Chinese 1.jpg",
      },
      {
        title: "Eight-Course Banquet",
        description: "An elaborate feast featuring symbolic dishes representing prosperity, happiness, and good fortune for the newlyweds.",
        image: "/images/HOTEL WEBSITE/Wedding/Chinese 11.jpg",
      },
      {
        title: "Lion Dance Performance",
        description: "The energetic lion dance brings good luck and drives away evil spirits, adding excitement to your celebration.",
        image: "/images/HOTEL WEBSITE/Wedding/Chinese 10.jpg",
      },
    ],
    gallery: [
      "/images/Wedding YL/RPC-wedding-YL-01.jpg",
      "/images/Wedding YL/RPC-wedding-YL-02.jpg",
      "/images/Wedding YL/RPC-wedding-YL-03.jpg",
      "/images/Wedding YL/RPC-wedding-YL-04.jpg",
      "/images/Wedding YL/RPC-wedding-YL-05.jpg",
      "/images/Wedding YL/RPC-wedding-YL-06.jpg",
      "/images/Wedding YL/RPC-wedding-YL-07.jpg",
      "/images/Wedding YL/RPC-wedding-YL-08.jpg",
      "/images/Wedding YL/RPC-wedding-YL-09.jpg",
      "/images/Wedding YL/RPC-wedding-YL-10.jpg",
      "/images/Wedding YL/RPC-wedding-YL-11.jpg",
      "/images/Wedding YL/RPC-wedding-YL-12.jpg",
    ],
  },
  "muslim-wedding": {
    slug: "muslim-wedding",
    title: "Muslim Wedding",
    subtitle: "Sharia-Compliant, Inclusive and Elegant",
    heroImage: "/images/Big/Photo-595_resize.jpg",
    whyChooseUsImage: "/images/HOTEL WEBSITE/Wedding/Moeslim 03.jpg",
    metaDescription: "Plan your Nikah ceremony in Phuket with halal catering, Sharia-compliant arrangements, and elegant venues at Royal Phuket City Hotel.",
    seoKeywords: ["Muslim wedding Phuket", "Nikah ceremony Thailand", "halal wedding venue", "Islamic wedding Phuket", "Sharia compliant wedding"],
    description: [
      "We welcome Muslim couples with wedding arrangements designed to honour your faith and values. Our experienced team coordinates every aspect to ensure a beautiful, Sharia-compliant celebration that respects Islamic traditions.",
      "From halal-certified menus to separate spaces for male and female guests when needed, we understand the importance of cultural sensitivity. Our venues can accommodate both the sacred Nikah ceremony and the joyful walima reception.",
      "Whether you're planning an intimate Nikah with close family or a grand celebration, we work closely with you to create an atmosphere of respect, beauty, and joy.",
    ],
    highlights: [
      "Halal-certified catering options",
      "Separate male/female spaces available",
      "Nikah ceremony arrangements",
      "Walima reception venues",
      "Prayer room facilities",
      "Culturally sensitive décor",
      "Modest dress code accommodations",
      "Coordination with Islamic officiants",
    ],
    traditions: [
      {
        title: "Nikah Ceremony",
        description: "The sacred Islamic marriage contract ceremony, conducted by an imam in the presence of witnesses and family.",
        image: "/images/HOTEL WEBSITE/Wedding/Moeslim 06.jpg",
      },
      {
        title: "Walima Reception",
        description: "The joyful wedding feast that follows the Nikah, where family and friends celebrate the union.",
        image: "/images/Muslim/Photo-548_resize.jpg",
      },
      {
        title: "Henna Night (Mehndi)",
        description: "A pre-wedding celebration where the bride's hands are adorned with intricate henna designs.",
        image: "/images/Muslim/Photo-595_resize.jpg",
      },
    ],
    gallery: [
      "/images/Muslim/MDW00916_resize.jpg",
      "/images/Muslim/MDW00952_resize.jpg",
      "/images/Muslim/MDW01228_resize.jpg",
      "/images/Muslim/MDW01260_resize.jpg",
      "/images/Muslim/MDW01275_resize.jpg",
      "/images/Muslim/MDW01300_resize.jpg",
      "/images/Muslim/Photo-512_resize.jpg",
      "/images/Muslim/Photo-535_resize.jpg",
      "/images/Muslim/Photo-536_resize.jpg",
      "/images/Muslim/Photo-562_resize.jpg",
      "/images/Muslim/Photo-587_resize.jpg",
      "/images/Muslim/Photo-604_resize.jpg",
      "/images/Muslim/Photo-748_resize.jpg",
      "/images/Muslim/Photo-755_resize.jpg",
      "/images/Muslim/Photo-920_resize.jpg",
    ],
  },
  "western-wedding": {
    slug: "western-wedding",
    title: "Western Wedding",
    subtitle: "Classic Style with a Modern Touch",
    heroImage: "/images/HOTEL WEBSITE/Wedding/WED2_WES_L02_first_kiss.jpg",
    whyChooseUsImage: "/images/Western Wdding/WeddingDay BT-1708_resize.jpg",
    metaDescription: "Host a classic Western wedding in Phuket with elegant ceremonies, first dances, and beautiful receptions at Royal Phuket City Hotel.",
    seoKeywords: ["Western wedding Phuket", "destination wedding Thailand", "classic wedding venue Phuket", "white wedding Phuket", "romantic wedding Thailand"],
    description: [
      "Celebrate your love with a classic Western-style wedding crafted around your unique vision. From the romantic walk down the aisle to your unforgettable first dance, we create an elegant atmosphere that captures every special moment.",
      "Our experienced team helps you design every detail — from sophisticated décor and curated music to beautifully set dining arrangements. Whether you prefer a classic white theme, rustic elegance, or modern minimalist style, we bring your dream wedding to life.",
      "With our stunning venues, exceptional catering, and dedicated wedding coordinators, your Western wedding at Royal Phuket City Hotel will be an unforgettable celebration of your love story.",
    ],
    highlights: [
      "Elegant ceremony setups",
      "Grand reception venues",
      "Professional DJ and live music options",
      "First dance floor arrangements",
      "Multi-tiered wedding cakes",
      "Bridal suite and groom's room",
      "Customizable décor themes",
      "International cuisine menus",
    ],
    traditions: [
      {
        title: "Walking Down the Aisle",
        description: "The magical moment when the bride makes her entrance, walking toward her partner to exchange vows.",
        image: "/images/HOTEL WEBSITE/Wedding/western wedding 8.jpg",
      },
      {
        title: "Exchange of Vows",
        description: "Share your heartfelt promises with each other in a beautiful ceremony witnessed by your loved ones.",
        image: "/images/HOTEL WEBSITE/Wedding/western wedding 2.jpg",
      },
      {
        title: "First Dance",
        description: "Take the floor for your first dance as a married couple, creating a romantic memory that lasts forever.",
        image: "/images/Western Wdding/WeddingDay BT-1523_resize.jpg",
      },
    ],
    gallery: [
      "/images/Western Wdding/1G5A1075_resize.jpg",
      "/images/Western Wdding/JJPH3775_resize.jpg",
      "/images/Western Wdding/JJPH3779_resize.jpg",
      "/images/Western Wdding/JJPH4671_resize.jpg",
      "/images/Western Wdding/JJPH4679_resize.jpg",
      "/images/Western Wdding/LINE_ALBUM_25.10.2025_251217_11_resize.jpg",
      "/images/Western Wdding/LINE_ALBUM_25.10.2025_251217_12_resize.jpg",
      "/images/Western Wdding/LINE_ALBUM_25.10.2025_251217_4_resize.jpg",
      "/images/Western Wdding/line_oa_chat_240912_092811_resize.jpg",
      "/images/Western Wdding/MDW00191_resize.JPG",
      "/images/Western Wdding/MTT2428_resize.jpg",
      "/images/Western Wdding/WeddingDay BT-1543_resize.jpg",
      "/images/Western Wdding/WeddingDay BT-1665_resize.jpg",
      "/images/Western Wdding/WeddingDay BT-1713_resize.jpg",
      "/images/Western Wdding/WeddingDay BT-2033_resize.jpg",
      "/images/Western Wdding/WeddingDay BT-1523_resize.jpg",
    ],
  },
  "lgbtq-wedding": {
    slug: "lgbtq-wedding",
    title: "LGBTQ+ Wedding",
    subtitle: "Inclusive. Celebratory. Authentic.",
    heroImage: "/images/HOTEL WEBSITE/Wedding/WED2_LGBT_L03_twobrides_dance.jpg",
    whyChooseUsImage: "/images/HOTEL WEBSITE/Wedding/WED2_LGBT_L04_twobrides_laugh.jpg",
    metaDescription: "Celebrate your love with an inclusive LGBTQ+ wedding in Phuket. Royal Phuket City Hotel welcomes all couples with personalized ceremonies and joyful celebrations.",
    seoKeywords: ["LGBTQ wedding Phuket", "same-sex wedding Thailand", "gay wedding venue Phuket", "inclusive wedding Thailand", "pride wedding celebration"],
    description: [
      "At Royal Phuket City Hotel, we believe in love in all its beautiful forms. Our wedding services for LGBTQ+ couples are welcoming, inclusive, and personally tailored to celebrate your unique love story.",
      "From intimate ceremonies to vibrant receptions, our dedicated team ensures your vision is realized with sensitivity, creativity, and the utmost respect. We're proud to be a safe and celebratory space for all couples.",
      "Thailand's progressive attitudes and our hotel's commitment to inclusivity make Royal Phuket City the perfect destination for your same-sex wedding or commitment ceremony. Let's craft a day that truly reflects who you are.",
    ],
    highlights: [
      "Welcoming and inclusive environment",
      "Personalized ceremony options",
      "Pride-themed décor available",
      "Same-sex commitment ceremonies",
      "Experienced LGBTQ+ friendly staff",
      "Flexible venue arrangements",
      "Custom menu options",
      "Photography-friendly settings",
    ],
    traditions: [
      {
        title: "Personalized Ceremony",
        description: "Design a ceremony that reflects your journey and relationship, with no restrictions on traditions or formats.",
        image: "/images/HOTEL WEBSITE/Wedding/WED_LGBT_L02_twogrooms_altar_landscape.jpg",
      },
      {
        title: "Celebration of Love",
        description: "Whether intimate or grand, your reception will be a joyful celebration surrounded by those who support your love.",
        image: "/images/HOTEL WEBSITE/Wedding/WED_LGBT_L01_twobrides_hands_landscape.jpg",
      },
      {
        title: "Unity Rituals",
        description: "Choose from various unity ceremonies — sand blending, candle lighting, or create your own meaningful tradition.",
        image: "/images/HOTEL WEBSITE/Wedding/WED2_LGBT_L02_twogrooms_forehead.jpg",
      },
    ],
    gallery: [
      "/images/HOTEL WEBSITE/Wedding/WED2_LGBT_L01_twobrides_rings.jpg",
      "/images/HOTEL WEBSITE/Wedding/WED2_LGBT_L05_twogrooms_toast.jpg",
      "/images/HOTEL WEBSITE/Wedding/WED2_LGBT_L06_twobrides_cheek.jpg",
      "/images/HOTEL WEBSITE/Wedding/WED_LGBT_L03_twobrides_dance_landscape.jpg",
      "/images/HOTEL WEBSITE/Wedding/WED_LGBT_P01_twobrides_cheektop_portrait.jpg",
      "/images/HOTEL WEBSITE/Wedding/WED_LGBT_P02_twogrooms_ring_portrait.jpg",
    ],
  },
};

export const WEDDING_TYPE_SLUGS = Object.keys(WEDDING_TYPES);
