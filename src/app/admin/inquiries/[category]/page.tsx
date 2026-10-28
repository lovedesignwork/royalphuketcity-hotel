import { notFound } from "next/navigation";
import HotelInquiries from "@/components/admin/HotelInquiries";
import { isInquiryCategory } from "@/lib/inquiry-categories";

export default async function InquiryCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!isInquiryCategory(category)) notFound();
  return <HotelInquiries key={category} category={category} />;
}
