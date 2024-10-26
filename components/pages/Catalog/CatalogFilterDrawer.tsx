"use client"
import {Sheet, SheetContent, SheetHeader, SheetTrigger} from "@/components/ui/sheet";
import useMediaQuery from "@/hooks/useMediaQuery";
import CatalogFilter from "@/components/pages/Catalog/CatalogFilter";

interface ICatalogFilterDrawerProps {
  open: boolean;
  closeFn: () => void;
}

function CatalogFilterDrawer({closeFn, open}: ICatalogFilterDrawerProps) {
  const matches = useMediaQuery(1023, "greater")
  if (matches) {
    return null
  }
  return (
    <Sheet open={open}>
      <SheetContent closeFn={closeFn} className="flex flex-col gap-y-4 dark:backdrop-blur-md dark:bg-black/50 w-full s480:w-96">
       <div className="mt-6 dark:text-white">
         <CatalogFilter/>
       </div>
      </SheetContent>
    </Sheet>
  )
}

export default CatalogFilterDrawer;