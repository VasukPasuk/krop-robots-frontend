"use client"

import {Skeleton} from "@/components/ui/skeleton";

const classNames = [
  'row-span-2'
]

export default function Loading () {
  return (
    <div className="w-full h-screen grid grid-cols-2 grid-rows-12">
      {
        classNames.map((className, i) => (
          <Skeleton key={i} className={'col-span-1 ' + className}/>
        ))
      }
    </div>
  )
}