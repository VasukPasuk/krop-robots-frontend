"use client"
import getImageSrc from "@/features/getImageSrc";
import {MyButton} from "@/components/ui/button";
import {decreaseItemAmount, deleteItem, ICartItem, increaseItemAmount, setItemAmount} from "@/store/slices/cart.slice";
import {Input} from "@/components/ui/input";
import {useAppDispatch} from "@/store/hooks";
import Image from "next/image"
import {FaTrash} from "react-icons/fa";
import {toast} from "react-toastify";

export default function CartItemBar({item}: { item: ICartItem }) {
  const dispatch = useAppDispatch()
  return (
    <div className="px-4 py-4 rounded shadow flex flex-col gap-y-4">
      <div className=" flex flex-row gap-x-2">
        <div className="w-24 s480:w-32 h-28 s480:h-24 relative rounded overflow-hidden shrink-0">
          <Image src={getImageSrc(item.product.attributes.images.data[0].attributes.url)} alt={item.product.attributes.images.data[0].attributes.alternativeText} fill/>
        </div>
        <div className="w-full shrink-0">
          <h1 className="font-bold text-xl line-clamp-2">{item.product.attributes.name}</h1>
          <h2 className="text-sm s420:text-base">{item.product.attributes.category.data.attributes.name}</h2>
          <h2 className="text-sm s420:text-base">Колір: {item.color.attributes.name}</h2>
          <h2 className="text-sm s420:text-base">Варіант: {item.type}</h2>
          <h2 className="text-sm s420:text-base">Пластик: {item.plastic}</h2>
        </div>
      </div>
      <h1 className="text-2xl font-semibold">
        {item.price * item.quantity} грн.
      </h1>
      <div className="flex justify-between items-center">
        <div className="flex gap-x-2 items-center justify-center">
          <div
            className="text-xl rounded transition-colors duration-300 select-none ease-out w-8 h-8 dark:hover:bg-green-600 text-center cursor-pointer hover:bg-black/5"
            onClick={() => dispatch(increaseItemAmount({key: item.key}))}
          >
            +
          </div>
          <Input
            type="number" value={item.quantity}
            className="w-[12ch] text-center py-0"
            onChange={e => dispatch(setItemAmount({
              key: item.key,
              quantity: Number(e.currentTarget.value)
            }))}
            max={999}
            min={1}
          />
          <div
            className="text-xl rounded transition-colors duration-300 select-none ease-out text-center w-8 h-8 dark:hover:bg-red-400 cursor-pointer hover:bg-black/5"
            onClick={() => dispatch(decreaseItemAmount({key: item.key}))}
          >
            -
          </div>
        </div>
        <div
          className="text-red-700 cursor-pointer"
          onClick={() => {
            dispatch(deleteItem({key: item.key}))
            toast.success("Товар вилучено з Вашого кошику!")
          }}
        >
          <FaTrash size={20}/>
        </div>
      </div>
    </div>
  )
}