import { redirect } from "next/navigation";

export default function HiddenBlogLayout() {
  redirect("/admin");
}
