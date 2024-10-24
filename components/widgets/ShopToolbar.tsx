"use client"
import {FaShoppingCart} from "react-icons/fa";
import CartSidebar from "@/components/widgets/CartSidebar";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {openCart} from "@/store/slices/cart.slice";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {FaFilter} from "react-icons/fa";
import CatalogFilterDrawer from "@/components/pages/Catalog/CatalogFilterDrawer";
import {useBooleanToggler} from "@/hooks/useBooleanToggler";

function ShopToolbar() {
  const {disable, booleanState, enable} = useBooleanToggler()
  const {amount, opened} = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();
  const pathnames = usePathname().split("/")

  return (
    <div
      className="h-12 shadow fixed top-16 w-full flex items-center justify-between px-6 bg-white dark:bg-blue-900 z-50">
      <div>
        {
          (pathnames.length >= 4) && (
            <Link href={"/shop"} className="font-light">
              Повернутися до товарів
            </Link>
          )
        }
      </div>
      <div className="flex items-center justify-center gap-x-2">
        <div
          className="p-2 rounded  hover:bg-black/10 dark:bg-white/20 hover:dark:bg-white/25 transition-colors duration-200 ease-in cursor-pointer relative"
          onClick={() => dispatch(openCart())}
        >
          <div
            className="z-50 absolute top-0 right-0 translate-x-1/2 -translate-y-1/4 text-sm px-2 rounded bg-red-600 text-white">
            {amount}
          </div>
          <FaShoppingCart className="text-xl"/>
        </div>
        <div
          className="p-2 rounded  hover:bg-black/10 dark:bg-white/20 hover:dark:bg-white/25 transition-colors duration-200 ease-in cursor-pointer block lg:hidden"
          onClick={enable}
        >
          <FaFilter className="text-xl"/>
        </div>
        <CartSidebar open={opened}/>
        <CatalogFilterDrawer closeFn={disable} open={booleanState}/>
      </div>
    </div>
  )
}

export default ShopToolbar;