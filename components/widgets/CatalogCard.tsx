import {IProduct} from "@/types";
import Image from "next/image";
import getImageSrc from "@/features/getImageSrc";
import {IoCart} from "react-icons/io5";
import Link from "next/link";
import Router from "@/config/routes";
import {ApiResponseSingle} from "@/types/api-response.type";


interface IProps {
  product: ApiResponseSingle<IProduct>
}

function CatalogCard({product}: IProps) {
  const {category, name, images, variants} = product.data.attributes;

  const standartVariant = variants.data.filter((variant) => variant.attributes.type === "Стандартний");

  const price = standartVariant[0].attributes.price;

  return (
    <Link href={`/shop/products/${product.data.id}`} className="
      flex flex-col rounded overflow-hidden shadow hover:shadow-lg
      dark:bg-[#B8CFE0]/10 hover:-translate-y-[2.5%] transition-all duration-300 ease-in
     ">
      <div className="relative w-full h-64 s:480:h-48">
        <Image alt={images.data[0].attributes.alternativeText} src={getImageSrc(images.data[0].attributes.url)} fill
               className="object-cover"/>
      </div>
      <div className="flex flex-col gap-y-2 p-2">
        <div className="flex flex-col">
          <span className="text-xl line-clamp-2 font-semibold">{name}</span>
          <span className="text-sm text-neutral-600 dark:text-white/70">{category.data.attributes.name}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xl">
            ₴ {price} грн. / шт.
          </span>
          <div
            className="p-2 rounded bg-amber-500 hover:bg-amber-400 transition-colors duration-300 ease-in cursor-pointer text-white w-fit">
            <IoCart size={24}/>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CatalogCard;