import {INewsItem} from "@/types";
import getImageSrc from "@/features/getImageSrc";
import Image from "next/image";
import { BiCalendarEvent } from "react-icons/bi";
import Link from "next/link";
import MarkdownView from "react-showdown";

export function NewsItem({data}: { data: INewsItem }) {
  return (
    <div className="overflow-hidden rounded shadow-xl dark:bg-white/5 h-fit">
      <div className="overflow-hidden relative h-72">
        <Image
          src={getImageSrc(data.main_photo.url)}
          alt={data.main_photo.alternativeText}
          className="hover:scale-105 transition-transform duration-700 object-cover w-full"
          fill
        />
        <div className="px-2 py-1 rounded bg-blue-600 text-white absolute top-4 left-4 font-extralight">
          {data.tag.name}
        </div>
      </div>
      <div className="flex flex-col gap-y-4 p-6 h-full">
        <Link href={`/news/${data.documentId}`} className="hover:text-green-500 transition-colors duration-500 text-2xl font-bold">
          {data.title}
        </Link>
        <div className="line-clamp-4">
          <MarkdownView
            markdown={data.text}
            options={{tables: true, emoji: true,}}
          />
        </div>
        <div className="flex items-center justify-between mt-auto">
          <Link href={`/news/${data.documentId}`} className="text-green-700 hover:text-green-500 transition-colors duration-500">
            Прочитати більше...
          </Link>
          <div className="flex items-center gap-x-2 text-sm">
            <BiCalendarEvent className="text-lg"/>
            <span>
              07.10.2024
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}