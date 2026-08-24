import type { Locale } from "./config";

export type ArtistWork = { src: string; title: string };

export type LocalizedArtist = {
  id: string;
  name: string;
  nameSecondary?: string;
  specialty: string;
  bio: string;
  portrait: string;
  works: ArtistWork[];
  showCaptions: boolean;
};

export const artistPage = {
  en: {
    metaTitle: "Artist",
    metaDesc:
      "Meet the artists whose works grace Royal Phuket City Hotel. Discover paintings and sketches of Phuket Old Town's Sino-Portuguese heritage by Ch'ng Kiah Kiean, Pitirat Yosawat, and Dr. Thiwawat.",
    ogDesc:
      "The artists behind the art at Royal Phuket City Hotel - celebrating Phuket's heritage through local and regional talent.",
    heroTitle: "Artist",
    heroSubtitle: "Art & Heritage",
    heroDesc: "The artists whose works bring Phuket's story to life inside our hotel.",
    label: "Our Collection",
    title: "Meet the Artists",
    intro:
      "Royal Phuket City Hotel is proud to host the work of artists whose craft celebrates Phuket's heritage, culture, and sense of place. Each of the three featured artists brings a distinct voice - from sketched streetscapes of the Old Town to contemporary canvases and heritage illustration - together forming a quiet gallery that greets our guests throughout the property.",
    artistLabel: "Artist",
    selectedWorks: "Selected Works",
    portraitAlt: (name: string) => `Portrait of ${name}`,
  },
  th: {
    metaTitle: "ศิลปิน",
    metaDesc:
      "ศิลปินที่ผลงานอยู่ในโรงแรมรอยัล ภูเก็ต ซิตี้ ภาพสเก็ตเมืองเก่า ภาพวาดร่วมสมัย และภาพเมืองเก่าภูเก็ตของ Ch'ng Kiah Kiean, ปิติรัตน์ ยศวัฒน์ และหมอทิววัฒน์",
    ogDesc: "ศิลปินที่เล่าเรื่องภูเก็ตผ่านภาพในโรงแรมรอยัล ภูเก็ต ซิตี้",
    heroTitle: "ศิลปิน",
    heroSubtitle: "ศิลปะในโรงแรม",
    heroDesc: "ผลงานที่แขกเจอระหว่างพัก และศิลปินที่วาดเรื่องภูเก็ตไว้ในโรงแรมนี้",
    label: "คอลเลกชันในโรงแรม",
    title: "ทำความรู้จักศิลปิน",
    intro:
      "โรงแรมรอยัล ภูเก็ต ซิตี้แขวนผลงานของศิลปินที่ทำงานกับเมืองเก่าโดยตรง มีสามคน ลายเส้นคนละแบบ ตั้งแต่สเก็ตถนนเมืองเก่า ภาพสีร่วมสมัย ไปจนถึงภาพวาดเมืองเก่าแบบแผนที่ แขกเดินผ่านแล้วเจอภาพเหล่านี้ตามทางเดินและมุมนั่ง",
    artistLabel: "ศิลปิน",
    selectedWorks: "ผลงานคัดสรร",
    portraitAlt: (name: string) => `ภาพเหมือนของ ${name}`,
  },
};

const artistsEn: LocalizedArtist[] = [
  {
    id: "chng-kiah-kiean",
    name: "Ch'ng Kiah Kiean",
    specialty: "Ink & Watercolour Sketch",
    bio: "A celebrated urban sketch artist from Penang whose pen-and-ink and watercolour works capture the fading beauty of Southeast Asian heritage streets. His Phuket series - sketched on location between 2014 and 2017 - records the timeworn shophouses, fishing villages, and colonial landmarks of Phuket Old Town with an unmistakable gestural line.",
    portrait: "/images/Artist/chng-kiah-kiean/portrait.jpg",
    showCaptions: true,
    works: [
      { src: "/images/Artist/chng-kiah-kiean/work-1.jpg", title: "Yaowarad Road, Phuket (2014)" },
      { src: "/images/Artist/chng-kiah-kiean/work-2.jpg", title: "Ban Zan, Phuket (2014)" },
      { src: "/images/Artist/chng-kiah-kiean/work-3.jpg", title: "Fishing Village, Sirea Island, Phuket (2014)" },
      { src: "/images/Artist/chng-kiah-kiean/work-5.jpg", title: "The Chartered Bank, Phuket Road (2017)" },
      { src: "/images/Artist/chng-kiah-kiean/work-4.jpg", title: "The Big Lobster, Phang Nga Road, Phuket (2017)" },
    ],
  },
  {
    id: "pitirat-yosawat",
    name: "Pitirat Yosawat",
    nameSecondary: "คุณปิติรัตน์ ยศวัฒน์",
    specialty: "Contemporary Painting",
    bio: "A Thai painter whose canvases blend memory, place, and personal narrative. Pitirat's body of work - presented here as a curated selection - moves fluidly between impressionistic landscapes and quiet portrait studies, a visual diary of the artist's journey through colour, form, and the Thai south.",
    portrait: "/images/Artist/pitirat-yosawat/portrait.jpg",
    showCaptions: false,
    works: Array.from({ length: 15 }, (_, i) => ({
      src: `/images/Artist/pitirat-yosawat/work-${i + 1}.jpg`,
      title: `Selected Work ${i + 1}`,
    })),
  },
  {
    id: "dr-thiwawat",
    name: "Dr. Thiwawat",
    nameSecondary: "หมอทิววัฒน์",
    specialty: "Phuket Heritage Illustration",
    bio: "A physician-artist whose detailed illustration of Phuket Old Town is a love letter to the city's Sino-Portuguese soul. Created in 2024, the piece assembles landmark after landmark - shophouses, temples, cafés, and street corners - into a single, joyful map of a place the artist calls home.",
    portrait: "/images/Artist/mor-thiwawat/portrait.jpg",
    showCaptions: true,
    works: [
      { src: "/images/Artist/mor-thiwawat/work-1.jpg", title: "Phuket Old Town Illustrated (2024)" },
    ],
  },
];

const artistsTh: LocalizedArtist[] = [
  {
    id: "chng-kiah-kiean",
    name: "Ch'ng Kiah Kiean",
    specialty: "ภาพสเก็ตหมึกและสีน้ำ",
    bio: "ศิลปินสเก็ตเมืองจากปีนัง วาดด้วยปากกาหมึกและสีน้ำ เก็บถนนเก่าของเอเชียตะวันออกเฉียงใต้ที่กำลังเปลี่ยนไป ชุดภูเก็ตวาดที่สถานที่จริงระหว่างปี 2557-2560 มีทั้งตึกแถวเก่า หมู่บ้านประมง และอาคารสมัยอาณานิคมในเมืองเก่า ลายเส้นชัด ดูแล้วรู้ว่ายืนวาดอยู่ตรงนั้น",
    portrait: "/images/Artist/chng-kiah-kiean/portrait.jpg",
    showCaptions: true,
    works: [
      { src: "/images/Artist/chng-kiah-kiean/work-1.jpg", title: "ถนนเยาวราช ภูเก็ต (2557)" },
      { src: "/images/Artist/chng-kiah-kiean/work-2.jpg", title: "บ้านจั่น ภูเก็ต (2557)" },
      { src: "/images/Artist/chng-kiah-kiean/work-3.jpg", title: "หมู่บ้านประมง เกาะสิเหร่ ภูเก็ต (2557)" },
      { src: "/images/Artist/chng-kiah-kiean/work-5.jpg", title: "อาคารธนาคารชาร์เตอร์ด ถนนภูเก็ต (2560)" },
      { src: "/images/Artist/chng-kiah-kiean/work-4.jpg", title: "ล็อบสเตอร์ยักษ์ ถนนพังงา ภูเก็ต (2560)" },
    ],
  },
  {
    id: "pitirat-yosawat",
    name: "ปิติรัตน์ ยศวัฒน์",
    nameSecondary: "Pitirat Yosawat",
    specialty: "จิตรกรรมร่วมสมัย",
    bio: "จิตรกรไทยที่วาดจากความจำ สถานที่ และเรื่องส่วนตัว ภาพในชุดนี้คัดมาให้ดูทั้งทิวทัศน์แบบอิมพรสชันและภาพคนที่เงียบ ๆ เป็นเหมือนสมุดภาพของการเดินทางผ่านสี รูปทรง และภาคใต้",
    portrait: "/images/Artist/pitirat-yosawat/portrait.jpg",
    showCaptions: false,
    works: Array.from({ length: 15 }, (_, i) => ({
      src: `/images/Artist/pitirat-yosawat/work-${i + 1}.jpg`,
      title: `ผลงานคัดสรร ${i + 1}`,
    })),
  },
  {
    id: "dr-thiwawat",
    name: "หมอทิววัฒน์",
    nameSecondary: "Dr. Thiwawat",
    specialty: "ภาพวาดเมืองเก่าภูเก็ต",
    bio: "แพทย์ที่วาดภาพเมืองเก่าภูเก็ตไว้อย่างละเอียด งานปี 2567 รวบตึกแถว วัด คาเฟ่ และมุมถนนไว้ในภาพเดียว ดูแล้วเหมือนแผนที่ที่คนในพื้นที่วาดให้คนอื่นเดินตามได้",
    portrait: "/images/Artist/mor-thiwawat/portrait.jpg",
    showCaptions: true,
    works: [
      { src: "/images/Artist/mor-thiwawat/work-1.jpg", title: "เมืองเก่าภูเก็ตในภาพเดียว (2567)" },
    ],
  },
];

export function getArtistPageCopy(locale: Locale) {
  return artistPage[locale];
}

export function getLocalizedArtists(locale: Locale) {
  return locale === "th" ? artistsTh : artistsEn;
}
