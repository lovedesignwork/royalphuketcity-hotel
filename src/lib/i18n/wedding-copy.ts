import { WEDDING_TYPES, type WeddingTypeDetail } from "@/lib/wedding-types-data";
import type { Locale } from "./config";

type WeddingText = Pick<
  WeddingTypeDetail,
  "title" | "subtitle" | "description" | "highlights" | "traditions" | "metaDescription" | "seoKeywords"
>;

export const weddingPage = {
  en: {
    metaTitle: "Wedding Venues",
    metaDesc:
      "Create unforgettable wedding memories at Royal Phuket City Hotel. 27+ years of experience, elegant venues for up to 500 guests, and dedicated wedding planning team.",
    heroTitle: "The Venue of Your Dreams, The Service You Deserve",
    heroSubtitle: "Wedding Venues",
    heroDesc: "Flexible Packages, Personal Touches, and Total Freedom",
    introLabel: "Weddings at Royal Phuket City",
    introTitle: "Perfectly Planned, Beautifully Executed",
    introBody:
      "Welcome to Royal Phuket City Hotel, the premier destination for weddings in Phuket. With over 27 years of experience, we craft bespoke weddings that are beautiful, seamless, and unforgettable. Whether you're planning an intimate ceremony or a grand celebration, our flexible venues, dedicated team, and full-service packages make it all possible - your love story, your way.",
    planLabel: "Start Planning Today",
    planTitle: "Contact Our Wedding Team",
    planDesc: "Let our experienced wedding planners help you create your perfect day.",
    inquiry: "Inquiry for Wedding",
    brochure: "Download Brochure",
    servicesLabel: "Full-Service Wedding Planning",
    servicesTitle: "Your Dream Wedding, Our Expertise",
    servicesSubtitle:
      "Whether you're planning an intimate ceremony or a grand celebration, we tailor every detail to fit your vision. Our experienced team works closely with you to deliver an event that meets your goals and exceeds expectations.",
    services: [
      {
        title: "Dedicated Wedding Planner",
        description: "A personal coordinator to guide you through every step, from venue selection to the final farewell.",
      },
      {
        title: "Custom Catering",
        description: "Exquisite Thai and international cuisine, crafted to your preferences with custom menus and dietary accommodations.",
      },
      {
        title: "Floral & Decor Design",
        description: "Stunning floral arrangements and bespoke décor that transform our venues into your dream setting.",
      },
      {
        title: "Entertainment & AV",
        description: "Professional sound, lighting, and entertainment options to keep your celebration memorable and vibrant.",
      },
    ],
    typesLabel: "Celebrate Your Love",
    typesTitle: "Wedding Ceremonies We Host",
    typesSubtitle:
      "From traditional Thai rituals to elegant Western ceremonies, we create unforgettable celebrations for every couple.",
    learnMore: "Learn More",
    types: {
      "engagement-ceremony": {
        label: "Celebrate Your Promise",
        title: "Engagement Ceremony",
        desc: "Mark the first step of your journey with an elegant engagement ceremony at Royal Phuket City.",
      },
      "thai-wedding": {
        label: "Elegant Thai Rituals",
        title: "Thai Wedding",
        desc: "Experience authentic Thai wedding traditions with water-pouring rituals and monks' blessings.",
      },
      "chinese-wedding": {
        label: "Tea Ceremony & Banquet",
        title: "Chinese Wedding",
        desc: "Celebrate with traditional tea ceremonies and sumptuous eight-course banquets.",
      },
      "muslim-wedding": {
        label: "Halal & Inclusive",
        title: "Muslim Wedding",
        desc: "Sharia-compliant ceremonies with halal menus and culturally sensitive arrangements.",
      },
      "western-wedding": {
        label: "Classic & Modern",
        title: "Western Wedding",
        desc: "Classic elegance meets modern style with customizable ceremonies and receptions.",
      },
      "lgbtq-wedding": {
        label: "Love is Love",
        title: "LGBTQ+ Wedding",
        desc: "Inclusive, welcoming celebrations that honor love in all its beautiful forms.",
      },
    },
    afterTitle: "Dance, Toast and\nUnwind in Style",
    afterHeading: "After-Party - Keep the Celebration Going",
    afterBody:
      "Once the formal banquet ends, the party doesn't have to stop. Choose our rooftop bar or private lounge for your after-party - complete with DJ or live music, custom cocktails, light bites and a relaxed vibe. Let your guests let loose and celebrate late into the night, in comfort and with no transport hassles.",
    allInLabel: "More Than Just a Wedding Venue",
    allInTitle: "All-in-One Wedding Service",
    allInBody:
      "We offer full-service wedding planning with in-house chefs, floral designers, AV teams, and experienced consultants. You'll find it easy to plan your day, from the engagement ceremony to the after-party. Prefer your own suppliers? No problem - we're flexible too.",
    allInItems: [
      "Diverse menus to suit any cuisine and budget",
      "Cost-saving, flexible bar service",
      "Discounted hotel rates for out-of-town guests",
      "One event at a time - our full attention is on you",
      "Custom options available - your day, your way",
      "We handle the details so you can relax and enjoy",
    ],
    specialist: "Talk to Our Wedding Venue Specialist",
    lovedLabel: "Fully Customizable Spaces and Bespoke Wedding Packages",
    lovedTitle: "Phuket's Most Loved\nWedding Venue",
    lovedBody:
      "Your wedding day should be as unique as your love story. From our exclusive 1600 sqm private ballroom to a stress-free planning process led by experienced consultants, we make sure every detail is perfect. Whether it's Thai or Chinese traditions, custom décor, or a specially crafted menu - everything is designed just for you.",
    certLabel: "A New Standard for Weddings in Phuket",
    certTitle: "Certified Excellence",
    certBody:
      "Royal Phuket City Hotel is proud to be recognized as a certified MICE Venue by the Thailand Convention & Exhibition Bureau (TCEB). With SHA and Green Hotel certifications, we are committed to providing a clean, safe, and environmentally responsible venue for your events.",
    certHeading: "Our Certifications",
    certs: [
      "ASEAN MICE Venue Standard certified",
      "Thailand MICE Venue Standard by TCEB",
      "Green Hotel certified for sustainability",
      "SHA Plus certified for health & safety",
      "Halal certified kitchen available",
      "ISO 22483 certified for event excellence",
    ],
    whyLabel: "Celebrate in grand style with bespoke weddings crafted to perfection.",
    whyTitle: "Phuket's Premier Wedding Venues",
    why: [
      {
        title: "Best Location",
        desc: "We are just steps away from Phuket Old Town - a safe, walkable and vibrant heritage district filled with culture, cafés, local restaurants and street food. It's perfect for combining celebration with exploration.",
      },
      {
        title: "Great Value",
        desc: "We combine premium comfort, a prime location and warm service at a very competitive price, so you get exceptional value for every baht spent on your special day.",
      },
      {
        title: "Flexibility Comes First",
        desc: "Room layouts, packages, and pricing are all flexible. We shape each wedding around your vision and budget for a smooth experience. Your day, your way.",
      },
      {
        title: "Food to Impress",
        desc: "We are proud of our culinary team. From creative coffee breaks and buffets to Chinese banquets and à la carte menus, your guests will enjoy delicious and varied food throughout the event.",
      },
      {
        title: "Large-Scale Capacity",
        desc: "We offer a large grand ballroom for up to 2,300 guests, plus 9-11 meeting and function rooms all on a single level - ideal for large celebrations, parallel sessions and breakouts. With over 27 years of experience, our dedicated team knows how to design and run smooth large-scale events.",
      },
      {
        title: "Ample Parking Spaces",
        desc: "With over 350 indoor parking spaces, we can comfortably accommodate private cars and coaches. Guests have direct access to the hotel without worrying about the weather or finding parking.",
      },
      {
        title: "Certified Excellence",
        desc: "We are certified by leading tourism and MICE organizations, including ASEAN MICE Venue Standard, Thailand MICE Venue Standard, Trusted Thailand, ISO 22483 and more - giving you confidence that your event is in safe, professional hands.",
      },
      {
        title: "Sustainability Certified",
        desc: "We are proud to be a certified Green Hotel and to follow Thailand Sustainable Event Management and STGs STAR standards. Hosting your event with us helps support your company's ESG and sustainability commitments.",
      },
      {
        title: "27 Years Wedding Experience",
        desc: "With over 27 years of hosting weddings, we've mastered the art of creating unforgettable celebrations. Our seasoned team brings decades of expertise, ensuring every detail is handled with care, precision, and a deep understanding of what makes each wedding truly special.",
      },
    ],
    years: "Years",
    miceLabel: "Planning a Corporate Event?",
    miceTitle: "Explore Our MICE Facilities",
    miceDesc:
      "From boardroom briefings to grand galas, our 9 fully equipped meeting rooms and 1,637 sqm grand ballroom can host up to 2,300 guests with state-of-the-art technology.",
    miceCta: "Explore Meeting & Events",
    typeDream: "Your Dream",
    typeAtHotel: "at Royal Phuket City Hotel",
    whyChoose: "Why Choose Us",
    whatWeOffer: "What We Offer",
    traditionsLabel: "Traditions & Ceremonies",
    traditionsTitle: "Traditions",
    traditionsSubtitle: "Experience the meaningful rituals and customs that make your celebration special.",
    galleryLabel: "Gallery",
    galleryTitle: "Captured Moments",
    gallerySubtitle: "See the beauty of celebrations we've hosted.",
    startPlanning: "Start Planning",
    readyPlan: "Ready to Plan Your",
    readyBody:
      "Our dedicated wedding specialists are ready to help you create the perfect celebration. Contact us today to begin your journey.",
    inquireNow: "Inquire Now",
    viewAllTypes: "View All Wedding Types",
    exploreMore: "Explore More",
    otherTypes: "Other Wedding Ceremonies",
    otherSubtitle: "Discover more wedding styles we offer.",
    galleryMoments: "Cherished Moments",
    galleryLove: "Celebrating Love at Royal Phuket City",
    formTitle: "Plan Your Dream Wedding",
    formDesc: "Our dedicated wedding specialist is ready to help you create your perfect day",
    yourName: "Your Name",
    firstLast: "first & last name",
    partnerName: "Partner's Name",
    email: "Email",
    phone: "Phone number",
    whatsapp: "whatsapp",
    country: "Country",
    weddingDate: "Wedding Date",
    plannedDate: "planned date",
    guests: "Number of Guests",
    estimated: "estimated",
    tellMore: "Tell Us More",
    yourVision: "your vision",
    placeholder: "Share your wedding vision, theme preferences, special requirements, or any questions you have...",
    submitting: "Submitting...",
    submit: "Submit Inquiry",
    error: "Something went wrong. Please try again or contact us directly at",
    thankYou: "Thank You",
    successBody:
      "Your wedding inquiry has been successfully submitted. Our wedding specialist will review your request and contact you shortly to begin planning your special day.",
    refNumber: "Your Reference Number",
    saveRef: "Please save this for your records",
    summary: "Your Wedding Inquiry Summary",
    couple: "Couple",
    newInquiry: "Submit Another Inquiry",
    confirmEmail: "A confirmation email has been sent to",
    respondWithin: "Our wedding team typically responds within",
    hours: "24-48 Business Hours",
    returnHome: "Return to Homepage",
  },
  th: {
    metaTitle: "สถานที่จัดงานแต่งงาน",
    metaDesc:
      "จัดงานแต่งงานที่โรงแรมรอยัล ภูเก็ต ซิตี้ ทีมงานมากประสบการณ์กว่า 27 ปี สถานที่รองรับได้ถึง 500 ท่าน และมีผู้ประสานงานแต่งงานดูแลตลอด",
    heroTitle: "สถานที่ในแบบที่อยากได้ บริการที่วางใจได้",
    heroSubtitle: "สถานที่จัดงานแต่งงาน",
    heroDesc: "แพ็กเกจปรับได้ รายละเอียดตามสไตล์คู่บ่าวสาว อิสระในการจัดงาน",
    introLabel: "งานแต่งงานที่รอยัล ภูเก็ต ซิตี้",
    introTitle: "วางแผนให้ครบ จัดให้สวย",
    introBody:
      "โรงแรมรอยัล ภูเก็ต ซิตี้ เป็นหนึ่งในสถานที่จัดงานแต่งงานที่คู่บ่าวสาวเลือกใช้ในภูเก็ตมานานกว่า 27 ปี งานเล็กงานใหญ่ก็จัดได้ สถานที่ยืดหยุ่น ทีมงานดูแลเอง และแพ็กเกจปรับตามงบได้ เรื่องราวของคู่คุณ จัดในแบบของคุณ",
    planLabel: "เริ่มวางแผนได้เลย",
    planTitle: "คุยกับทีมงานแต่งงาน",
    planDesc: "ให้ทีมแพลนเนอร์ช่วยจัดงานในวันที่คุณต้องการ",
    inquiry: "สอบถามงานแต่งงาน",
    brochure: "ดาวน์โหลดโบรชัวร์",
    servicesLabel: "วางแผนงานแต่งงานครบวงจร",
    servicesTitle: "งานในฝันของคุณ ฝีมือของเรา",
    servicesSubtitle:
      "ไม่ว่าจะเป็นพิธีเล็ก ๆ หรืองานเลี้ยงใหญ่ ทีมงานจัดรายละเอียดตามที่คู่บ่าวสาวอยากได้ และดูแลจนถึงวันงาน",
    services: [
      {
        title: "แพลนเนอร์ส่วนตัว",
        description: "มีผู้ประสานงานดูแลทุกขั้นตอน ตั้งแต่เลือกห้องจนถึงปิดงาน",
      },
      {
        title: "อาหารตามแบบที่ต้องการ",
        description: "อาหารไทยและนานาชาติ ปรับเมนูและข้อจำกัดด้านอาหารได้",
      },
      {
        title: "ดอกไม้และตกแต่ง",
        description: "จัดดอกไม้และธีมงานให้ห้องกลายเป็นฉากในวันที่ต้องการ",
      },
      {
        title: "ดนตรีและระบบเสียง",
        description: "เสียง แสง และการแสดงพร้อมใช้ ทำให้บรรยากาศงานมีชีวิต",
      },
    ],
    typesLabel: "ฉลองความรักในแบบของคุณ",
    typesTitle: "รูปแบบงานแต่งที่เราจัดได้",
    typesSubtitle: "จากพิธีไทยโบราณไปจนถึงงานสไตล์ตะวันตก จัดให้เข้ากับคู่บ่าวสาวทุกคู่",
    learnMore: "ดูเพิ่มเติม",
    types: {
      "engagement-ceremony": {
        label: "เริ่มต้นคำสัญญา",
        title: "งานหมั้น",
        desc: "จัดงานหมั้นอย่างงดงาม เป็นก้าวแรกก่อนวันแต่ง ที่โรงแรมรอยัล ภูเก็ต ซิตี้",
      },
      "thai-wedding": {
        label: "พิธีไทยอย่างประณีต",
        title: "งานแต่งไทย",
        desc: "พิธีรดน้ำสังข์ พิธีสงฆ์ และธรรมเนียมไทยที่จัดให้ครบ ไม่ต้องวิ่งหาทีมเอง",
      },
      "chinese-wedding": {
        label: "พิธีชงชาและโต๊ะจีน",
        title: "งานแต่งจีน",
        desc: "พิธีชงชาและโต๊ะจีนแปดคอร์ส บรรยากาศมงคลตามธรรมเนียม",
      },
      "muslim-wedding": {
        label: "ฮาลาลและใส่ใจวัฒนธรรม",
        title: "งานแต่งอิสลาม",
        desc: "จัดตามหลักชารีอะห์ มีเมนูฮาลาล และจัดพื้นที่ให้เหมาะสมกับแขก",
      },
      "western-wedding": {
        label: "คลาสสิกและร่วมสมัย",
        title: "งานแต่งสไตล์ตะวันตก",
        desc: "พิธีเดินพรมและงานเลี้ยงที่ปรับธีมได้ ตามสไตล์คู่บ่าวสาว",
      },
      "lgbtq-wedding": {
        label: "รักทุกแบบคือรัก",
        title: "งานแต่ง LGBTQ+",
        desc: "พื้นที่ที่ยินดีต้อนรับทุกคู่ จัดงานให้เป็นตัวของตัวเองได้อย่างสบายใจ",
      },
    },
    afterTitle: "เต้น ฉลอง\nแล้วพักอย่างมีสไตล์",
    afterHeading: "After-Party - งานยังไม่จบแค่โต๊ะจีน",
    afterBody:
      "เลี้ยงใหญ่จบแล้ว ปาร์ตี้ยังต่อได้ ใช้บาร์บนดาดฟ้าหรือเลานจ์ส่วนตัว มีดีเจหรือดนตรีสด ค็อกเทลตามสั่ง ของว่างเบา ๆ แขกไม่ต้องเดินทางต่อให้วุ่น อยู่ที่โรงแรมจนดึกได้",
    allInLabel: "มากกว่าแค่ห้องจัดงาน",
    allInTitle: "บริการงานแต่งครบในที่เดียว",
    allInBody:
      "มีเชฟในโรงแรม ทีมดอกไม้ ทีมเสียงแสง และที่ปรึกษางานแต่งดูแลให้ วางแผนได้ตั้งแต่หมั้นจนถึง after-party ถ้าอยากใช้ร้านข้างนอกก็คุยได้ เราปรับตามงาน",
    allInItems: [
      "เมนูหลากหลาย เลือกตามงบและรสชาติได้",
      "บริการเครื่องดื่มยืดหยุ่น ประหยัดกว่าจัดเอง",
      "เรทห้องพิเศษสำหรับแขกต่างจังหวัด",
      "จัดทีละงาน ให้ความใส่ใจเต็มที่",
      "ปรับรายละเอียดได้ วันของคุณ แบบของคุณ",
      "เราจัดการรายละเอียด คุณได้ฉลองอย่างสบาย",
    ],
    specialist: "คุยกับผู้เชี่ยวชาญสถานที่จัดงานแต่ง",
    lovedLabel: "ห้องจัดได้ตามแบบ และแพ็กเกจที่ตัดตามงาน",
    lovedTitle: "สถานที่จัดงานแต่ง\nที่คู่ภูเก็ตไว้ใจ",
    lovedBody:
      "วันแต่งควรเป็นของคู่คุณจริง ๆ ห้องบอลรูมส่วนตัวกว่า 1,600 ตร.ม. และทีมที่ปรึกษาที่คุยงานให้จบ ไม่ต้องวิ่งหาทุกอย่างเอง ไม่ว่าจะพิธีไทย พิธีจีน ตกแต่งเฉพาะงาน หรือเมนูที่ออกแบบมาให้แขกของคุณ เราจัดตามนั้น",
    certLabel: "มาตรฐานใหม่ของงานแต่งในภูเก็ต",
    certTitle: "มาตรฐานที่ตรวจสอบได้",
    certBody:
      "โรงแรมรอยัล ภูเก็ต ซิตี้ เป็นสถานที่จัดงานที่ได้รับการรับรองจากสำนักงานส่งเสริมการจัดประชุมและนิทรรศการ (TCEB) พร้อมมาตรฐาน SHA และโรงแรมสีเขียว เพื่อให้สถานที่สะอาด ปลอดภัย และรับผิดชอบต่อสิ่งแวดล้อม",
    certHeading: "ใบรับรองของเรา",
    certs: [
      "มาตรฐานสถานที่จัดงาน MICE อาเซียน",
      "มาตรฐานสถานที่จัดงาน MICE ไทย โดย TCEB",
      "โรงแรมสีเขียว เพื่อความยั่งยืน",
      "SHA Plus ด้านสุขอนามัยและความปลอดภัย",
      "ครัวฮาลาลพร้อมให้บริการ",
      "ISO 22483 ด้านคุณภาพงานอีเวนต์",
    ],
    whyLabel: "จัดงานใหญ่ได้สวย และปรับรายละเอียดได้ตามคู่บ่าวสาว",
    whyTitle: "สถานที่จัดงานแต่งชั้นนำในภูเก็ต",
    why: [
      {
        title: "ทำเลดีที่สุด",
        desc: "เดินออกไปไม่กี่ก้าวก็ถึงเมืองเก่าภูเก็ต ย่านเก่าที่เดินได้ทั้งวัน มีคาเฟ่ ร้านอาหาร และสตรีทฟู้ด แขกมาฉลองแล้วยังเที่ยวต่อได้",
      },
      {
        title: "คุ้มกับงบที่จ่าย",
        desc: "ได้ทั้งห้องพัก ทำเล และบริการที่อบอุ่นในราคาที่แข่งขันได้ ไม่ต้องจ่ายแพงเกินเพื่อวันที่สำคัญ",
      },
      {
        title: "ยืดหยุ่นเป็นหลัก",
        desc: "ผังห้อง แพ็กเกจ และราคาปรับได้ เราจัดงานตามวิสัยทัศน์และงบของคุณ ไม่ยัดแพ็กเกจสำเร็จรูป",
      },
      {
        title: "อาหารที่แขกพูดถึง",
        desc: "ทีมครัวของโรงแรมจัดได้ทั้งคอฟฟี่เบรค บุฟเฟต์ โต๊ะจีน และเมนูตามสั่ง แขกได้กินหลากหลายตลอดงาน",
      },
      {
        title: "รองรับงานใหญ่",
        desc: "บอลรูมใหญ่รองรับได้ถึง 2,300 ท่าน และมีห้องประชุม 9-11 ห้องอยู่ชั้นเดียวกัน เหมาะกับงานใหญ่และกิจกรรมคู่ขนาน ทีมงานจัดงานขนาดใหญ่มาแล้วกว่า 27 ปี",
      },
      {
        title: "ที่จอดรถเพียงพอ",
        desc: "ที่จอดในร่มกว่า 350 คัน รองรับทั้งรถส่วนตัวและรถบัส แขกเข้าโรงแรมได้ตรง ไม่ต้องลุ้นหาที่จอดหรือโดนฝน",
      },
      {
        title: "มาตรฐานที่ตรวจสอบได้",
        desc: "ผ่านการรับรองจากองค์กรท่องเที่ยวและ MICE ชั้นนำ ทั้งมาตรฐานอาเซียน มาตรฐานไทย Trusted Thailand และ ISO 22483",
      },
      {
        title: "ใส่ใจความยั่งยืน",
        desc: "เป็นโรงแรมสีเขียว และจัดงานตามมาตรฐานงานอีเวนต์ยั่งยืนของไทย ช่วยสนับสนุนเป้าหมาย ESG ขององค์กรคุณได้จริง",
      },
      {
        title: "ประสบการณ์งานแต่ง 27 ปี",
        desc: "จัดงานแต่งมานานกว่า 27 ปี ทีมงานรู้จังหวะของวันจริง รู้ว่าอะไรต้องล็อกก่อน และดูแลรายละเอียดให้คู่วางใจได้",
      },
    ],
    years: "ปี",
    miceLabel: "กำลังวางแผนงานองค์กร?",
    miceTitle: "ดูห้องประชุมและงานอีเวนต์",
    miceDesc:
      "จากห้องบอร์ดไปจนถึงงานเลี้ยงใหญ่ ห้องประชุม 9 ห้องและบอลรูม 1,637 ตร.ม. รองรับได้ถึง 2,300 ท่าน พร้อมระบบเสียงแสงครบ",
    miceCta: "ดูห้องประชุมและงานอีเวนต์",
    typeDream: "งานในแบบที่คุณอยากได้",
    typeAtHotel: "ที่โรงแรมรอยัล ภูเก็ต ซิตี้",
    whyChoose: "ทำไมต้องที่นี่",
    whatWeOffer: "สิ่งที่เราจัดให้",
    traditionsLabel: "ธรรมเนียมและพิธี",
    traditionsTitle: "ธรรมเนียม",
    traditionsSubtitle: "พิธีที่มีความหมาย และทำให้วันที่ฉลองต่างจากงานทั่วไป",
    galleryLabel: "แกลเลอรี",
    galleryTitle: "ช่วงเวลาที่เก็บไว้",
    gallerySubtitle: "ภาพจากงานจริงที่เราได้จัดให้",
    startPlanning: "เริ่มวางแผน",
    readyPlan: "พร้อมวางแผน",
    readyBody: "ทีมงานแต่งงานพร้อมคุยรายละเอียดและจัดงานให้เข้ากับคู่คุณ ติดต่อเราได้วันนี้",
    inquireNow: "สอบถามเลย",
    viewAllTypes: "ดูรูปแบบงานแต่งทั้งหมด",
    exploreMore: "ดูเพิ่มเติม",
    otherTypes: "รูปแบบงานแต่งอื่น",
    otherSubtitle: "ดูสไตล์งานอื่นที่เราจัดได้",
    galleryMoments: "ช่วงเวลาที่เก็บไว้",
    galleryLove: "ความรักที่ฉลองที่รอยัล ภูเก็ต ซิตี้",
    formTitle: "วางแผนงานแต่งในแบบของคุณ",
    formDesc: "ผู้เชี่ยวชาญงานแต่งพร้อมคุยและจัดงานในวันที่คุณต้องการ",
    yourName: "ชื่อของคุณ",
    firstLast: "ชื่อและนามสกุล",
    partnerName: "ชื่อคู่ของคุณ",
    email: "อีเมล",
    phone: "เบอร์โทร",
    whatsapp: "whatsapp",
    country: "ประเทศ",
    weddingDate: "วันที่แต่งงาน",
    plannedDate: "วันที่วางแผนไว้",
    guests: "จำนวนแขก",
    estimated: "โดยประมาณ",
    tellMore: "เล่าเพิ่มเติม",
    yourVision: "ภาพงานในหัว",
    placeholder: "เล่าธีมงาน ความต้องการพิเศษ หรือคำถามที่อยากถามทีมงาน...",
    submitting: "กำลังส่ง...",
    submit: "ส่งข้อความสอบถาม",
    error: "ส่งไม่สำเร็จ ลองอีกครั้ง หรือติดต่อเราโดยตรงที่",
    thankYou: "ขอบคุณ",
    successBody:
      "เราได้รับข้อความสอบถามงานแต่งแล้ว ผู้เชี่ยวชาญจะตรวจรายละเอียดและติดต่อกลับเพื่อเริ่มวางแผนงาน",
    refNumber: "เลขที่อ้างอิง",
    saveRef: "กรุณาเก็บเลขนี้ไว้เป็นหลักฐาน",
    summary: "สรุปข้อมูลที่ส่งมา",
    couple: "คู่บ่าวสาว",
    newInquiry: "ส่งข้อความใหม่อีกครั้ง",
    confirmEmail: "เราได้ส่งอีเมลยืนยันไปที่",
    respondWithin: "ทีมงานแต่งงานมักตอบกลับภายใน",
    hours: "24-48 ชั่วโมงทำการ",
    returnHome: "กลับหน้าแรก",
  },
} as const;

const weddingTypesTh: Record<string, WeddingText> = {
  "engagement-ceremony": {
    title: "งานหมั้น",
    subtitle: "ฉลองคำสัญญาอย่างมีระดับ",
    metaDescription:
      "จัดงานหมั้นในภูเก็ตที่โรงแรมรอยัล ภูเก็ต ซิตี้ สถานที่อบอุ่น ทีมงานจัดงานมากประสบการณ์กว่า 27 ปี",
    seoKeywords: ["งานหมั้นภูเก็ต", "สถานที่จัดงานหมั้น", "งานหมั้นโรงแรมภูเก็ต", "พิธีหมั้นเมืองเก่า"],
    description: [
      "เริ่มต้นชีวิตร่วมกันด้วยงานหมั้นที่โรงแรมรอยัล ภูเก็ต ซิตี้ จะเป็นวงครอบครัวเล็ก ๆ หรืองานเลี้ยงกับเพื่อนฝูง เรามีห้องที่เหมาะกับบรรยากาศนั้น",
      "ทีมงานแต่งคุยรายละเอียดกับคุณทุกจุด ทั้งพิธีตามธรรมเนียมและสไตล์ร่วมสมัย ฉากหลังคือเมืองเก่าภูเก็ต ห้องจัดได้หลายแบบ แพ็กเกจปรับตามงบได้",
      "ก้าวเข้ามาแล้วจะได้ทั้งความเป็นไทยที่อบอุ่นและความเรียบหรูของโรงแรม ให้เราช่วยเก็บวันที่สำคัญนี้ให้อยู่ในความทรงจำ",
    ],
    highlights: [
      "ห้องจัดงานสำหรับ 20-200 ท่าน",
      "ตกแต่งและธีมปรับได้",
      "มีผู้ประสานงานดูแลวันงาน",
      "อาหารไทยและนานาชาติ",
      "แพ็กเกจฉลองพร้อมแชมเปญ",
      "มุมถ่ายรูปสวย",
      "เดินทางสะดวกกลางเมืองเก่าภูเก็ต",
      "แพ็กเกจห้องพักสำหรับแขก",
    ],
    traditions: [
      {
        title: "พิธีแลกแหวน",
        description: "ช่วงที่คู่หมั้นแลกแหวนต่อหน้าคนที่รัก ในห้องที่จัดให้ดูอบอุ่นและสง่างาม",
        image: "/images/HOTEL WEBSITE/Wedding/Wedding RPC 07.jpg",
      },
      {
        title: "กลิ่นอายไทย",
        description: "ใส่พิธีให้พรแบบไทยได้ ถ้าอยากให้งานมีรากวัฒนธรรมท้องถิ่น",
        image: "/images/HOTEL WEBSITE/Wedding/WED2_ENG_L02_forehead_touch.jpg",
      },
      {
        title: "ดินเนอร์ฉลอง",
        description: "ฉลองด้วยดินเนอร์ที่เชฟจัดเมนูพิเศษให้สำหรับค่ำนั้น",
        image: "/images/HOTEL WEBSITE/Wedding/WED2_ENG_L04_hands_table.jpg",
      },
    ],
  },
  "thai-wedding": {
    title: "งานแต่งไทย",
    subtitle: "พิธีงดงาม บรรยากาศไทยแท้",
    metaDescription:
      "จัดงานแต่งไทยในภูเก็ต พิธีสงฆ์ รดน้ำสังข์ และสถานที่จัดงานที่โรงแรมรอยัล ภูเก็ต ซิตี้",
    seoKeywords: ["งานแต่งไทยภูเก็ต", "พิธีรดน้ำสังข์", "สถานที่จัดงานแต่งไทย", "พิธีสงฆ์ภูเก็ต"],
    description: [
      "ฉลองงานแต่งแบบไทยที่โรงแรมรอยัล ภูเก็ต ซิตี้ ทีมงานจัดพิธีที่สืบทอดกันมาให้ครบ ตั้งแต่พิธีสงฆ์จนถึงรดน้ำสังข์ โดยไม่ต้องวิ่งหาทีมหลายเจ้า",
      "จัดให้ครบทั้งขบวนขันหมาก พิธีเปลือกหอย สายสิญจน์ และรดน้ำสังข์จากผู้ใหญ่ รายละเอียดตามธรรมเนียมไทยที่ครอบครัวคาดหวัง",
      "ทีมงานคุ้นกับจังหวะพิธีไทย ทั้งผ้า ดอกไม้ ดนตรี และไทม์มิ่ง คุณได้อยู่กับช่วงสำคัญ ไม่ต้องคอยไล่รายการเอง",
    ],
    highlights: [
      "พิธีสงฆ์ตามธรรมเนียม",
      "พิธีรดน้ำสังข์",
      "จัดขบวนขันหมากให้",
      "ตกแต่งและดอกไม้แบบไทย",
      "ดนตรีและการแสดงไทย",
      "ผู้ประสานงานที่คุ้นพิธีไทย",
      "อาหารไทยและฟิวชัน",
      "บอลรูมใหญ่รองรับได้ถึง 2,300 ท่าน",
    ],
    traditions: [
      {
        title: "พิธีสงฆ์",
        description: "เริ่มต้นชีวิตคู่ด้วยการรับพรจากพระสงฆ์ เป็นธรรมเนียมที่หลายครอบครัวให้ความสำคัญ",
        image: "/images/Thai Wed/RPC-Thai17.jpg",
      },
      {
        title: "รดน้ำสังข์",
        description: "รับน้ำพระพุทธมนต์จากผู้ใหญ่ เป็นการให้พรเรื่องความเจริญและความสุข",
        image: "/images/Thai Wed/RPC-Thai20.jpg",
      },
      {
        title: "ขบวนขันหมาก",
        description: "ฝ่ายเจ้าบ่าวเดินขบวนพร้อมพานขันหมาก มีดนตรีและการแสดงประกอบ",
        image: "/images/Thai Wed/RPC-Thai21.jpg",
      },
    ],
  },
  "chinese-wedding": {
    title: "งานแต่งจีน",
    subtitle: "พิธีชงชา โต๊ะจีนแปดคอร์ส และบรรยากาศมงคล",
    metaDescription:
      "จัดงานแต่งจีนในภูเก็ต พิธีชงชา ตกแต่งมงคล และโต๊ะจีนที่โรงแรมรอยัล ภูเก็ต ซิตี้",
    seoKeywords: ["งานแต่งจีนภูเก็ต", "พิธีชงชา", "โต๊ะจีนงานแต่ง", "สถานที่จัดงานแต่งจีนภูเก็ต"],
    description: [
      "จัดงานแต่งจีนที่โรงแรมรอยัล ภูเก็ต ซิตี้ ให้ครบทั้งพิธีชงชาและโต๊ะจีนแปดคอร์ส ทีมงานใส่ใจรายละเอียดที่ครอบครัวจีนให้ความสำคัญ",
      "ร้านอาหารเยาว์หลงและห้องเลี้ยงใหญ่เหมาะกับงานแบบนี้ ทีมงานช่วยเรื่องผ้าแดง พิธีชงชา และอาหารแบบครอบครัว ให้ค่ำนั้นเป็นงานมงคลจริง ๆ",
      "งานเล็กในวงญาติหรืองานใหญ่หลายร้อยท่าน เราล็อกจังหวะมงคลและรายละเอียดให้เรียบร้อย",
    ],
    highlights: [
      "จัดพิธีชงชาให้ครบ",
      "โต๊ะจีนแปดคอร์ส",
      "ตกแต่งธีมแดงทอง",
      "ใช้ร้านอาหารเยาว์หลงได้",
      "บอลรูมสำหรับงานใหญ่",
      "ธีมซังฮี้ (囍)",
      "สิงโตและการแสดงจีน",
      "อาหารกวางตุ้งแท้",
    ],
    traditions: [
      {
        title: "พิธีชงชา (敬茶)",
        description: "คู่บ่าวสาวชงชาให้พ่อแม่และผู้ใหญ่ เพื่อรับพรและของขวัญจากครอบครัว",
        image: "/images/HOTEL WEBSITE/Wedding/Chinese 1.jpg",
      },
      {
        title: "โต๊ะจีนแปดคอร์ส",
        description: "สำรับที่คัดเมนูเชิงสัญลักษณ์ เรื่องโชค ความสุข และความมั่งคั่งของคู่บ่าวสาว",
        image: "/images/HOTEL WEBSITE/Wedding/Chinese 11.jpg",
      },
      {
        title: "การแสดงสิงโต",
        description: "สิงโตเอาฤกษ์เอาชัย เติมพลังและความคึกคักให้งาน",
        image: "/images/HOTEL WEBSITE/Wedding/Chinese 10.jpg",
      },
    ],
  },
  "muslim-wedding": {
    title: "งานแต่งอิสลาม",
    subtitle: "ตามหลักชารีอะห์ อบอุ่น และสุภาพ",
    metaDescription:
      "จัดพิธีนิกะห์ในภูเก็ต มีอาหารฮาลาล จัดตามหลักชารีอะห์ ที่โรงแรมรอยัล ภูเก็ต ซิตี้",
    seoKeywords: ["งานแต่งอิสลามภูเก็ต", "พิธีนิกะห์", "สถานที่ฮาลาล", "งานแต่งมุสลิมภูเก็ต"],
    description: [
      "เรายินดีต้อนรับคู่มุสลิมด้วยการจัดงานที่เคารพศรัทธาและธรรมเนียม ทีมงานดูแลให้พิธีเป็นไปตามหลักชารีอะห์ และดูงดงามในวันที่สำคัญ",
      "มีเมนูฮาลาล และจัดพื้นที่แยกชายหญิงได้ถ้าต้องการ รองรับทั้งพิธีนิกะห์และงานวลิมะห์",
      "งานเล็กในวงครอบครัวหรืองานใหญ่ เราคุยรายละเอียดกับคุณจนบรรยากาศสุภาพ อบอุ่น และเป็นระเบียบตามที่ต้องการ",
    ],
    highlights: [
      "อาหารฮาลาล",
      "จัดพื้นที่แยกชายหญิงได้",
      "จัดพิธีนิกะห์ให้",
      "ห้องงานวลิมะห์",
      "มีห้องละหมาด",
      "ตกแต่งที่สุภาพ เหมาะสม",
      "รองรับการแต่งกายสุภาพ",
      "ประสานอิหม่ามให้ได้",
    ],
    traditions: [
      {
        title: "พิธีนิกะห์",
        description: "พิธีทำสัญญาสมรสอิสลาม มีอิหม่ามและพยาน ครอบครัวร่วมเป็นสักขี",
        image: "/images/HOTEL WEBSITE/Wedding/Moeslim 06.jpg",
      },
      {
        title: "งานวลิมะห์",
        description: "งานเลี้ยงฉลองหลังนิกะห์ ให้ญาติมิตรมาร่วมยินดี",
        image: "/images/Muslim/Photo-548_resize.jpg",
      },
      {
        title: "คืนเมห์นดี (เฮนนา)",
        description: "งานก่อนวันแต่ง ที่เจ้าสาวได้ลงลายเฮนนาอย่างสวยงาม",
        image: "/images/Muslim/Photo-595_resize.jpg",
      },
    ],
  },
  "western-wedding": {
    title: "งานแต่งสไตล์ตะวันตก",
    subtitle: "คลาสสิกที่ทันสมัย",
    metaDescription:
      "จัดงานแต่งสไตล์ตะวันตกในภูเก็ต พิธีเดินพรม เฟิร์สแดนซ์ และงานเลี้ยงที่โรงแรมรอยัล ภูเก็ต ซิตี้",
    seoKeywords: ["งานแต่งตะวันตกภูเก็ต", "เดสติเนชันเวดดิ้งไทย", "งานแต่งขาวภูเก็ต"],
    description: [
      "จัดงานแต่งสไตล์ตะวันตกตามภาพในหัวของคุณ ตั้งแต่เดินเข้ามาในพิธีจนถึงเฟิร์สแดนซ์ ทีมงานสร้างบรรยากาศให้ช่วงสำคัญดูสง่างาม",
      "ช่วยออกแบบทั้งตกแต่ง ดนตรี และโต๊ะอาหาร ชอบธีมขาว คลาสสิกชนบท หรือมินิมอลทันสมัย ก็จัดตามนั้นได้",
      "มีห้องที่สวย อาหารที่ดูแลได้ และผู้ประสานงานที่อยู่กับงานจริง งานแต่งตะวันตกที่นี่จึงไม่ใช่แค่ห้องสวย แต่เป็นวันที่ไหลลื่น",
    ],
    highlights: [
      "จัดฉากพิธีได้อย่างงดงาม",
      "ห้องเลี้ยงขนาดใหญ่",
      "ดีเจและดนตรีสด",
      "พื้นที่เฟิร์สแดนซ์",
      "เค้กแต่งงานหลายชั้น",
      "ห้องเจ้าสาวและห้องเจ้าบ่าว",
      "ธีมตกแต่งปรับได้",
      "เมนูนานาชาติ",
    ],
    traditions: [
      {
        title: "เดินเข้าพิธี",
        description: "ช่วงที่เจ้าสาวเดินเข้ามาหาคู่ของตนเอง ต่อหน้าแขกที่มาร่วมยินดี",
        image: "/images/HOTEL WEBSITE/Wedding/western wedding 8.jpg",
      },
      {
        title: "กล่าวคำสาบาน",
        description: "แลกคำสัญญาต่อหน้าคนที่รัก ในพิธีที่จัดให้ดูอบอุ่นและจริงใจ",
        image: "/images/HOTEL WEBSITE/Wedding/western wedding 2.jpg",
      },
      {
        title: "เฟิร์สแดนซ์",
        description: "เพลงแรกในฐานะคู่แต่งงาน ช่วงที่แขกมักจำได้นานที่สุด",
        image: "/images/Western Wdding/WeddingDay BT-1523_resize.jpg",
      },
    ],
  },
  "lgbtq-wedding": {
    title: "งานแต่ง LGBTQ+",
    subtitle: "เปิดกว้าง ฉลองได้ เป็นตัวของตัวเอง",
    metaDescription:
      "จัดงานแต่ง LGBTQ+ ในภูเก็ต โรงแรมรอยัล ภูเก็ต ซิตี้ ยินดีต้อนรับทุกคู่ ด้วยพิธีที่ออกแบบได้ตามแบบของคุณ",
    seoKeywords: ["งานแต่ง LGBTQ ภูเก็ต", "งานแต่งเพศเดียวกันไทย", "สถานที่แต่งงานเท่าเทียม"],
    description: [
      "ที่โรงแรมรอยัล ภูเก็ต ซิตี้ เราเชื่อว่ารักทุกแบบสมควรได้ฉลอง บริการงานแต่งสำหรับคู่ LGBTQ+ เป็นพื้นที่ที่ยินดีต้อนรับ และจัดตามเรื่องราวของคู่นั้นจริง ๆ",
      "งานเล็กหรืองานใหญ่ ทีมงานฟังก่อนแล้วจัดให้ ใส่ใจ เคารพ และไม่ยัดรูปแบบสำเร็จรูป",
      "ภูเก็ตเปิดกว้าง และโรงแรมเราตั้งใจให้ที่นี่เป็นพื้นที่ปลอดภัยสำหรับทุกคู่ มาคุยกันแล้วจัดวันที่เป็นคุณจริง ๆ",
    ],
    highlights: [
      "บรรยากาศที่ยินดีต้อนรับ",
      "ออกแบบพิธีได้ตามคู่",
      "ตกแต่งธีมไพรด์ได้",
      "พิธีให้คำมั่นเพศเดียวกัน",
      "ทีมงานที่เป็นมิตรกับ LGBTQ+",
      "ห้องจัดยืดหยุ่น",
      "เมนูปรับได้",
      "มุมถ่ายรูปสวย",
    ],
    traditions: [
      {
        title: "พิธีที่ออกแบบเอง",
        description: "จัดพิธีตามเส้นทางของคู่คุณ ไม่มีกรอบว่าต้องทำแบบไหน",
        image: "/images/HOTEL WEBSITE/Wedding/WED_LGBT_L02_twogrooms_altar_landscape.jpg",
      },
      {
        title: "ฉลองความรัก",
        description: "งานเลี้ยงที่ล้อมด้วยคนที่หนุนคุณ อบอุ่นหรือคึกคักก็ได้ตามสไตล์",
        image: "/images/HOTEL WEBSITE/Wedding/WED_LGBT_L01_twobrides_hands_landscape.jpg",
      },
      {
        title: "พิธีรวมใจ",
        description: "เลือกพิธีทราย พิธีเทียน หรือสร้างธรรมเนียมของคู่คุณเอง",
        image: "/images/HOTEL WEBSITE/Wedding/WED2_LGBT_L02_twogrooms_forehead.jpg",
      },
    ],
  },
};

export function getWeddingPageCopy(locale: Locale) {
  return weddingPage[locale];
}

export function getLocalizedWeddingType(slug: string, locale: Locale): WeddingTypeDetail | undefined {
  const base = WEDDING_TYPES[slug];
  if (!base) return undefined;
  if (locale !== "th") return base;
  const copy = weddingTypesTh[slug];
  if (!copy) return base;
  return {
    ...base,
    ...copy,
    traditions: copy.traditions.map((item, index) => ({
      ...item,
      image: base.traditions[index]?.image || item.image,
    })),
  };
}
