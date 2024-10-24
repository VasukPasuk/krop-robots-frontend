"use client"
import {IColor, IProduct, IVariant} from "@/types";
import {Separator} from "@/components/ui/separator";
import {CiBoxList} from "react-icons/ci";
import MarkdownView from 'react-showdown';
import {MyButton} from "@/components/ui/button";
import {useState} from "react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import Image from "next/image"
import getImageSrc from "@/features/getImageSrc";
import ImagesViewer from "@/components/pages/Product/ImagesViewer";
import {useBooleanToggler} from "@/hooks/useBooleanToggler";
import { MdShoppingCart } from "react-icons/md";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {addItem} from "@/store/slices/cart.slice";
import {Plastic, PlasticType} from "@/constants/plastic";
import { toast } from "react-toastify";


interface ProductPageProps {
  data: IProduct;
  colors: IColor[];
}

function ProductPage({data, colors}: ProductPageProps) {
  const {variants, images, category, popular, tags, discount, description} = data;
  const {booleanState, disable, enable} = useBooleanToggler()

  const dispatch = useAppDispatch();

  const test = useAppSelector(state => state.cart);
  console.log(test)

  const [config, setConfig] = useState<{
    plastic: PlasticType;
    variant: IVariant;
    color: IColor | null
  }>({
    plastic: Plastic.PLA,
    variant: variants[0],
    color: colors[0]
  })

  const standartVariant = variants.filter((variant) => variant.type === "Стандартний")[0];


  return (
    <>
      <div className="flex flex-col gap-y-8 lg:flex-row lg:gap-x-8">
        <div className="flex flex-col gap-y-8 flex-1">
          <BlockWrapper>

            <div className="relative w-full h-[275px] s480:h-[375px] sm:h-[475px] rounded overflow-hidden cursor-pointer" onClick={enable}>
              <Image src={getImageSrc(images[0].url)} alt={images[0].alternativeText} fill className="object-cover"/>
            </div>
            <div className="flex flex-row gap-x-2 overflow-x-auto">
              {
                images.map((image, i) => (
                  <div
                    key={image.name}
                    className="w-24 h-24 rounded shadow relative overflow-hidden cursor-pointer shrink-0"
                    onClick={enable}
                  >
                    <Image src={getImageSrc(image.url)} alt={image.alternativeText} fill className="object-cover"/>
                  </div>
                ))
              }
            </div>

          </BlockWrapper>
          <BlockWrapper>
            <div className="flex flex-row gap-x-2 justify-center items-center w-fit">
              <CiBoxList size={24}/>
              <span className="text-xl font-semibold">
              Характеристики
            </span>
            </div>

            <ul className="flex flex-col gap-y-2 w-full">
              <li className="flex justify-between items-center w-full gap-x-2">
                <span>Висота</span> <Separator className="flex-1"/> {standartVariant.height} мм.
              </li>
              <li className="flex justify-between items-center w-full gap-x-2">
                <span>Довжина</span> <Separator className="flex-1"/> {standartVariant.length} мм.
              </li>
              <li className="flex justify-between items-center w-full gap-x-2">
                <span>Ширина</span> <Separator className="flex-1"/> {standartVariant.width} мм.
              </li>
              <li className="flex justify-between items-center w-full gap-x-2">
                <span>Вага</span> <Separator className=" flex-1"/> {standartVariant.weight} г.
              </li>
            </ul>
          </BlockWrapper>
        </div>
        <div className="flex flex-col gap-y-8 flex-1 rounded">
          <BlockWrapper>
            <h1 className="text-3xl font-semibold">{data.name}</h1>
            <h2 className="text-lg text-neutral-500 ">{category.name}</h2>
            <MarkdownView
              markdown={description}
              options={{tables: true, emoji: true, }}
            />
            <ul className="flex flex-wrap gap-4">
              {
                tags.map((tag) => (
                  <li className="py-1 px-3 rounded bg-black/5 dark:bg-white/10 font-light" key={tag.name}>
                    {tag.name}
                  </li>
                ))
              }
            </ul>
          </BlockWrapper>
          <BlockWrapper>
            <h2 className="text-lg">
              Колір: {config.color.name}
            </h2>
            <ul className="flex items-center justify-start gap-x-2">
              {
                colors.map((color) => (
                  <TooltipProvider key={color.name}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <li
                          onClick={() => setConfig(prev => ({...prev, color}))}
                          className={`w-8 h-8 rounded shadow cursor-pointer`}
                          style={{backgroundColor: color.color}}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{color.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))
              }
            </ul>
          </BlockWrapper>
          <BlockWrapper>
            <h2 className="text-lg">
              Пластик: {config.plastic}
            </h2>
            <ul className="flex items-center justify-start gap-x-2">
              {
                ["PLA", "CoPET"].map((plastic) => (
                  <li key={plastic} onClick={() => setConfig(prev => ({...prev, plastic: plastic as PlasticType}))}>
                    <MyButton variant={plastic === config.plastic ? "default" : "secondary"}>
                      {plastic}
                    </MyButton>
                  </li>
                ))
              }
            </ul>
          </BlockWrapper>

          <BlockWrapper>
            <h2 className="text-lg">
              Варіант: {config.variant.type}
            </h2>
            <ul className="flex items-center justify-start gap-x-2">
              {
                variants.map((variant) => (
                  <li key={variant.documentId} onClick={() => setConfig(prev => ({...prev, variant}))}>
                    <MyButton variant={variant.documentId === config.variant.documentId ? "default" : "secondary"}>
                      {variant.type}
                    </MyButton>
                  </li>
                ))
              }
            </ul>
          </BlockWrapper>
          <BlockWrapper>
            <div className="flex w-full justify-between items-center">
              <h2 className="text-3xl p-2 rounded dark:bg-orange-500/60">
                {config.variant.price} грн.
              </h2>
              <div>
                <MyButton
                  className="bg-green-800 hover:bg-green-700" size="lg"
                  onClick={() => {
                    dispatch(addItem({
                      quantity: 1,
                      price: config.variant.price,
                      color: config.color,
                      plastic: config.plastic,
                      type: config.variant.type,
                      product: data
                    }))
                    toast.success("Товар додано до вашого кошику!")
                  }}
                >
                  <span>До кошика</span>
                  <MdShoppingCart/>
                </MyButton>
              </div>
            </div>
          </BlockWrapper>
        </div>
      </div>
      <ImagesViewer open={booleanState} images={images} onCloseModal={disable}/>
    </>
  );
}

const BlockWrapper = ({children}: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-y-2 shadow py-6 px-4 rounded dark:bg-white/5 backdrop-blur-md">
      {children}
    </div>
  );
};

export default ProductPage;