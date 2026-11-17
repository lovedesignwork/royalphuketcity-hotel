import Link from "next/link";
import type { VenuePlanningGuideData } from "@/lib/venue-planning-data";

export default function VenuePlanningGuide({ guide }: { guide: VenuePlanningGuideData }) {
  return (
    <section id={guide.id} aria-labelledby={`${guide.id}-title`} className="py-16 md:py-20 bg-[--color-surface] scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-10">
          <p className="label-accent text-[--color-accent] mb-3">{guide.label}</p>
          <h2 id={`${guide.id}-title`} className="font-heading text-3xl md:text-4xl text-[--color-text-primary] mb-5">
            {guide.title}
          </h2>
          <p className="text-[--color-text-secondary] leading-relaxed">{guide.introduction}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-10">
          {guide.options.map((option) => (
            <div key={option.title} className="bg-white border border-[#8B7355]/20 p-6">
              <h3 className="font-heading text-xl text-[--color-text-primary] mb-3">{option.title}</h3>
              <p className="text-[--color-text-secondary] leading-relaxed">{option.description}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="font-heading text-2xl text-[--color-text-primary] mb-4">{guide.briefTitle}</h3>
            <ul className="list-disc pl-5 space-y-3 text-[--color-text-secondary] leading-relaxed">
              {guide.briefItems.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-2xl text-[--color-text-primary] mb-4">{guide.questionsTitle}</h3>
            <div className="space-y-6">
              {guide.questions.map((item) => (
                <div key={item.question}>
                  <h4 className="font-medium text-[--color-text-primary] mb-2">{item.question}</h4>
                  <p className="text-[--color-text-secondary] leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-4 mt-10">
          {guide.links.map((link) => (
            <Link key={link.href} href={link.href} className="text-[--color-text-primary] underline underline-offset-4 decoration-[#8B7355] hover:text-[#8B7355] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8B7355]">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
