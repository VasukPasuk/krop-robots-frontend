"use client"

import {IImage, IRootImage} from "@/types/image.type";
import {Dialog, DialogContent} from "@/components/ui/dialog";
import getImageSrc from "@/features/getImageSrc";
import Image from "next/image"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useState } from "react";
import {ResponseItem} from "@/types/api-response.type";

interface ImagesViewerProps {
  images: {data: IRootImage[]};
  open: boolean
  onCloseModal: () => void
}

function ImagesViewer({images, open, onCloseModal}: ImagesViewerProps) {
  const [imageIndex, setImageIndex] = useState<number>(0)

  const moveRight = () => {
    setImageIndex(prev => imageIndex === images.data.length - 1 ? 0 : ++prev)
  }
  const moveLeft = () => {
    setImageIndex(prev => imageIndex === 0 ? images.data.length - 1 : --prev)
  }
  return (
    <Dialog open={open}>
      <DialogContent
        onDialogClose={onCloseModal}
        className="flex justify-center items-center w-full max-w-[1100px] h-[375px] s480:h-[475px] sm:h-[750px] dark:bg-white/5 backdrop-blur-md">
        <div className="relative flex h-[95%] w-full overflow-hidden rounded">
          <div className="flex w-full h-full overflow-hidden">
            <div
              className="flex w-full h-full transition-transform duration-500 ease-in"
              style={{
                transform: `translate(-${imageIndex * 100}%)`
              }}
            >
              {images.data.map((img) => (
                <div className="shrink-0 overflow-hidden rounded relative w-full h-full">
                  <Image src={getImageSrc(img.attributes.url)} alt={img.attributes.alternativeText} fill className="object-cover"/>
                </div>
              ))}
            </div>
          </div>
          <div
            onClick={moveRight}
            className="absolute w-8 s480:w-16 h-full top-0 right-0 flex justify-center items-center z-50 bg-black/50 hover:bg-black/75 transition-colors duration-300 ease-out cursor-pointer"
          >
            <MdKeyboardArrowRight size={24}/>
          </div>
          <div
            onClick={moveLeft}
            className="absolute w-8 s480:w-16 h-full top-0 left-0 flex justify-center items-center z-50 bg-black/50 hover:bg-black/75 transition-colors duration-300 ease-out cursor-pointer"
          >
            <MdKeyboardArrowLeft size={24}/>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ImagesViewer;