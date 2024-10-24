"use client"
import {Input} from "@/components/ui/input";
import { MdSearch } from "react-icons/md";
import {ChangeEvent, useState} from "react";
import useSearchQueriesFunctions from "@/hooks/useSearchQueriesFunctions";


function CatalogBar() {
  const {appendSearchQuery} = useSearchQueriesFunctions()
  const [currentSearchByName, setCurrentSearchByName] = useState<string>("")
  const handleSearchByName = (e:ChangeEvent<HTMLInputElement>) => {
    setCurrentSearchByName(prev => e.target.value.trim())
  }
  const handleApplySearchByName = () => {
    appendSearchQuery({
      searchByName: currentSearchByName
    })
  }
  return (
    <nav className="flex flex-col sm:flex-row gap-y-4 sm:justify-between items-center shadow rounded py-4 px-4 dark:bg-white/5">
      <div className="flex h-full w-full sm:w-fit">
        <div className="flex items-center justify-center gap-x-2 h-full w-full">
          <Input
            placeholder="Шукаю..."
            onChange={handleSearchByName}
          />
          <MdSearch
            className="text-6xl px-4 rounded shadow h-full dark:bg-white/5 hover:dark:bg-white/10 transition-colors duration-200 ease-in cursor-pointer"
            onClick={handleApplySearchByName}
          />
        </div>
      </div>
      <div className="w-full sm:w-fit">
        {/* PLAN: БУДЕ ДОДАНО ПРИ МОЖЛИВОСТІ СОРТУВАННЯ VARIANT(WHERE TYPE=[СТАНДАРТНИЙ]).PRICE BY ASC | DESC*/}
        {/*<Select>*/}
        {/*  <SelectTrigger className="w-full sm:w-[220px]">*/}
        {/*    <SelectValue placeholder="Сортування"/>*/}
        {/*  </SelectTrigger>*/}
        {/*  <SelectContent>*/}
        {/*    <SelectGroup>*/}
        {/*      <SelectLabel>Ціна</SelectLabel>*/}
        {/*      <SelectItem value="exp-to-chp">Від дорогих до дешевих</SelectItem>*/}
        {/*      <SelectItem value="chp-to-exp">Від дешевих до дорогих</SelectItem>*/}
        {/*    </SelectGroup>*/}
        {/*  </SelectContent>*/}
        {/*</Select>*/}
      </div>
    </nav>
  )
}

export default CatalogBar;