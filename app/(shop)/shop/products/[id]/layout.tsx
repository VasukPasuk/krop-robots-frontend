"use client"
import ProductTabs from "@/components/widgets/ProductTabs";
import {useParams, usePathname, useRouter } from "next/navigation";

export default function Layout({children}:{children: React.ReactNode}) {
  const {id: param} = useParams()
  const router = useRouter();
  return (
    <div className="max-w-[1500px] mx-auto py-6 px-4 flex flex-col gap-y-8 justify-start">
      <ProductTabs options={[
        {
          value: "product",
          label: "Товар",
          onTabClick: () => router.push(`/shop/products/${param}`)
        },
        {
          value: "reviews",
          label: "Відгуки",
          onTabClick: () => router.push(`/shop/products/${param}/reviews`)
        },
      ]}/>
      {
        children
      }
    </div>
  )
}