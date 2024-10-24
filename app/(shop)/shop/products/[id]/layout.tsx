"use client"
import ProductTabs from "@/components/widgets/ProductTabs";
import { usePathname } from "next/navigation";

export default function Layout({children}:{children: React.ReactNode}) {
  const documentId = usePathname().split("/").pop();
  return (
    <div className="max-w-[1500px] mx-auto py-6 px-4 flex flex-col gap-y-8 justify-start">
      <ProductTabs options={[
        {value: "product", label: "Товар"},
        {value: "reviews", label: "Відгуки"},
      ]}/>
      {
        children
      }
    </div>
  )
}