import { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import CTABanner from "@/components/CTABanner";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Royal Green | Royal Phuket City Hotel",
  description:
    "Royal Phuket City Hotel's RoyalGreen campaign - our step toward responsible, sustainable hospitality benefiting our guests, community, and planet.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/royal-green`,
  },
  openGraph: {
    title: "Royal Green | Royal Phuket City Hotel",
    description:
      "Our commitment to sustainability through eco-friendly practices and community engagement.",
    url: `${SITE_CONFIG.url}/royal-green`,
    siteName: SITE_CONFIG.name,
    locale: "en_US",
    type: "website",
  },
};

export default function RoyalGreenPage() {
  return (
    <main>
      {/* Hero Section */}
      <HeroSection
        title="Royal Green"
        subtitle="Sustainability"
        image="/images/HOTEL WEBSITE/RPC-Main.jpg"
        height="medium"
      />

      {/* Introduction */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              Royal Phuket City Hotel is proud to launch the <span className="font-semibold text-[#8B7355]">RoyalGreen</span> campaign.
              This is our step toward responsible, sustainable hospitality — benefiting our guests, our community, and our planet.
            </p>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              โรงแรมรอยัลภูเก็ตซิตี้ขอเชิญทุกท่านร่วมเป็นส่วนหนึ่งในโครงการรอยัลกรีน
              ก้าวแรกสู่การเป็นโรงแรมที่ยั่งยืน เป็นมิตรต่อชุมชน แขกผู้เข้าพัก และโลกของเรา
            </p>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-16 md:py-24 bg-[#FAF8F5]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl text-center text-gray-900 mb-4">
              Join Us in the RoyalGreen Journey
            </h2>
            <p className="text-center text-gray-600 mb-2">
              We are committed to sustainable hospitality. You can help too!
            </p>
            <p className="text-center text-gray-500 mb-10">
              เรามุ่งมั่นในการเป็นโรงแรมที่ยั่งยืน และท่านสามารถมีส่วนร่วมได้เช่นกัน
            </p>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="font-medium text-gray-900 mb-2">
                Here&apos;s how you can help during your stay:
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                สิ่งที่ท่านสามารถทำได้ระหว่างเข้าพัก:
              </p>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#8B7355]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-800">Reuse towels and linens for multiple days</p>
                    <p className="text-gray-500 text-sm">ใช้ผ้าเช็ดตัวและผ้าปูที่นอนซ้ำ</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#8B7355]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-800">Turn off lights and air-conditioning when leaving the room</p>
                    <p className="text-gray-500 text-sm">ปิดไฟและแอร์เมื่อออกจากห้อง</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#8B7355]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-800">Request our eco amenity kit at reception</p>
                    <p className="text-gray-500 text-sm">ขอชุดอุปกรณ์อีโค่ได้ที่แผนกต้อนรับ</p>
                  </div>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-[#8B7355] font-medium">Thank you for supporting a greener tomorrow.</p>
                <p className="text-gray-500 text-sm">ขอบคุณที่ร่วมสร้างอนาคตสีเขียวไปด้วยกัน</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supplier Engagement */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-2xl md:text-3xl text-gray-900 mb-6">
              RoyalGreen Supplier Engagement Letter
            </h2>
            
            <div className="bg-[#FAF8F5] rounded-xl p-8 mb-8">
              <p className="text-gray-600 mb-4">Dear Valued Partner,</p>
              <p className="text-gray-600 mb-4">
                As part of our hotel&apos;s sustainability commitment under the RoyalGreen campaign, we are working toward certifications such as <span className="font-medium text-gray-800">Green Key, Green Hotel Plus, STAR, and TSEM</span>. Your support is essential in achieving these goals.
              </p>
              <p className="text-gray-600">
                We kindly invite you to join our efforts by agreeing to the <span className="font-medium text-gray-800">RoyalGreen Supplier Pledge</span>, which outlines simple sustainable practices in packaging, sourcing, and waste reduction. This collaboration strengthens our shared values and enhances our mutual reputation.
              </p>
            </div>

            <h3 className="font-heading text-xl md:text-2xl text-gray-900 mb-4">
              จดหมายเชิญชวนพันธมิตรโครงการรอยัลกรีน
            </h3>
            
            <div className="bg-[#FAF8F5] rounded-xl p-8">
              <p className="text-gray-600 mb-4">เรียน คู่ค้าที่เคารพ,</p>
              <p className="text-gray-600 mb-4">
                ตามที่โรงแรมของเรามุ่งมั่นในการดำเนินธุรกิจอย่างยั่งยืนภายใต้โครงการ RoyalGreen ซึ่งสอดคล้องกับมาตรฐานต่าง ๆ เช่น Green Key, Green Hotel Plus, STAR และ TSEM เราจึงขอความร่วมมือจากท่านในฐานะพันธมิตรทางธุรกิจ
              </p>
              <p className="text-gray-600">
                ขอเชิญท่านร่วมลงนามใน RoyalGreen Supplier Pledge ซึ่งระบุแนวปฏิบัติที่ยั่งยืนง่าย ๆ ในด้านบรรจุภัณฑ์ แหล่งวัตถุดิบ และการลดขยะ เพื่อสร้างประโยชน์ร่วมกันและเสริมสร้างภาพลักษณ์ที่ดีต่อกัน
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Staff Campaign */}
      <section className="py-16 md:py-24 bg-[#FAF8F5]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm text-[#8B7355] uppercase tracking-wider mb-2">
              คู่มือโครงการรอยัลกรีนสำหรับพนักงาน
            </p>
            <h2 className="font-heading text-2xl md:text-3xl text-gray-900 mb-10">
              RoyalGreen Staff Campaign Brief
            </h2>

            {/* Section 1 */}
            <div className="mb-10">
              <h3 className="font-heading text-xl text-gray-900 mb-4">
                1. What is RoyalGreen? | โครงการรอยัลกรีนคืออะไร?
              </h3>
              <p className="text-gray-600 mb-3">
                RoyalGreen is our hotel&apos;s commitment to sustainability, aligned with certifications like Green Key, Green Hotel Plus, STAR, and TSEM. It involves staff, guests, and partners in making our operations greener, cleaner, and more responsible.
              </p>
              <p className="text-gray-500">
                รอยัลกรีนเป็นความมุ่งมั่นของโรงแรมในการดำเนินงานอย่างยั่งยืน สอดคล้องกับการรับรองมาตรฐานต่าง ๆ เช่น Green Key, Green Hotel Plus, STAR และ TSEM โดยเน้นความร่วมมือจากพนักงาน แขก และพันธมิตรของเราในการทำให้การดำเนินงานของโรงแรมสะอาด เป็นมิตรต่อสิ่งแวดล้อม และมีความรับผิดชอบยิ่งขึ้น
              </p>
            </div>

            {/* Section 2 */}
            <div className="mb-10">
              <h3 className="font-heading text-xl text-gray-900 mb-4">
                2. What Staff Can Do | สิ่งที่พนักงานสามารถทำได้
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#8B7355]">•</span>
                    <span className="text-gray-600">Join monthly training and green tips</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8B7355]">•</span>
                    <span className="text-gray-600">Reduce waste and report overuse</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8B7355]">•</span>
                    <span className="text-gray-600">Turn off lights/equipment when not in use</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8B7355]">•</span>
                    <span className="text-gray-600">Encourage guests to participate (e.g., Skip-a-Clean)</span>
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#8B7355]">•</span>
                    <span className="text-gray-500">เข้าร่วมการฝึกอบรมรายเดือนและเรียนรู้เคล็ดลับสีเขียว</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8B7355]">•</span>
                    <span className="text-gray-500">ลดของเสียและรายงานการใช้เกินความจำเป็น</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8B7355]">•</span>
                    <span className="text-gray-500">ปิดไฟหรืออุปกรณ์เมื่อไม่ใช้งาน</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8B7355]">•</span>
                    <span className="text-gray-500">แนะนำแขกให้เข้าร่วมกิจกรรม เช่น ไม่เปลี่ยนผ้าทุกวัน</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 3 */}
            <div>
              <h3 className="font-heading text-xl text-gray-900 mb-4">
                3. Green Hero Recognition | รางวัลพนักงานดีเด่นด้านสิ่งแวดล้อม
              </h3>
              <p className="text-gray-600 mb-3">
                Staff who actively support sustainability will be featured monthly and eligible for rewards such as certificates, vouchers, or a bonus day off.
              </p>
              <p className="text-gray-500">
                พนักงานที่มีบทบาทในการสนับสนุนความยั่งยืนจะได้รับการประกาศเกียรติคุณประจำเดือน และมีสิทธิได้รับรางวัล เช่น ใบประกาศนียบัตร คูปอง หรือวันหยุดพิเศษ
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        title="Stay Green with Us"
        description="Join our commitment to sustainable hospitality"
        image="/images/HOTEL WEBSITE/RPC-Wide.jpg"
      />
    </main>
  );
}
