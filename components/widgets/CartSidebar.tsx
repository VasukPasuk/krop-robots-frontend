"use client"
import {Sheet, SheetContent, SheetHeader, SheetTitle} from "@/components/ui/sheet";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {
  closeCart,
  deleteAllItems,
} from "@/store/slices/cart.slice";
import {MyButton} from "@/components/ui/button";
import Link from "next/link";
import CartItemBar from "@/components/widgets/CartItemBar";

interface Props {
  open: boolean;
}

function CartSidebar({open}: Props) {
  const {items} = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch()
  return (
    <Sheet open={open}>
      <SheetContent className={"w-full sm:w-96 flex flex-col dark:bg-black/50 backdrop-blur-md dark:border-neutral-900"}
                    closeFn={() => dispatch(closeCart())}>
        <SheetHeader>
          <SheetTitle className="text-2xl dark:text-white/90 text-start">Кошик</SheetTitle>
        </SheetHeader>
        {
          !items.length && (
            <div className="text-center text-xl font-light text-neutral-500 mt-24">
              Ваш кошик пустий! :(
            </div>
          )
        }

        {
          !!items.length && (
            <div className="flex flex-col gap-y-4 overflow-y-auto overflow-x-hidden p-1 dark:bg-white/5 rounded w-full">
              {
                items.map((item) => (
                  <CartItemBar key={item.key} item={item}/>
                ))
              }
            </div>
          )
        }
        <div>

        </div>
        <div className="flex flex-col gap-y-2 min-[400]:flex-row min-[400]:gap-x-2 mt-auto">
          <Link href="/checkout" className="flex-1">
            <MyButton
              className="w-full bg-green-800 hover:bg-green-700"
              onClick={() => dispatch(closeCart())}
            >
              Оформити замовлення
            </MyButton>
          </Link>
          <MyButton
            className="flex-1"
            variant="destructive"
            onClick={() => dispatch(deleteAllItems())}
          >
            Очистити кошик
          </MyButton>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default CartSidebar;