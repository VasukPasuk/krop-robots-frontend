import CatalogFilter from "@/components/pages/Catalog/CatalogFilter";
import CatalogBar from "@/components/pages/Catalog/CatalogBar";
import Catalog from "@/components/pages/Catalog/Catalog";

export default async function Page({params}: { params: { partner: string } }) {
  return (
    <>
      <main className="flex w-full py-6 px-4">
        <div className="w-full flex gap-x-8 max-w-[1400px] mx-auto">
          <div className="w-64 hidden lg:block">
            <CatalogFilter/>
          </div>
          <div className="flex flex-col gap-y-8 w-full">
            <CatalogBar/>
            <Catalog/>
          </div>
        </div>
      </main>
    </>
  )
}