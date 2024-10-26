"use client"

import Link from "next/dist/client/link";
import Image from "next/image";
import NavLinks from "@/constants/nav-links";
import {toast} from 'react-toastify';
import {ThemeSwitcher} from "@/components/widgets/ThemeSwitcher";
import {IoMenu} from "react-icons/io5";
import {Sheet, SheetContent, SheetHeader, SheetTrigger} from "@/components/ui/sheet";

type HeaderType = "default" | "shop"

interface IHeaderProps {
  h_type?: HeaderType
}


const IMAGES_DICTIONARY: {[key: string]: {src: string, url: string}} = {
  shop: {
    src: "/logo_shop_white_upper.png",
    url: "/shop"
  },
  default: {
    src:  "/logo_white.png",
    url: "/"
  },
}

function Header({h_type = "default"}: IHeaderProps) {

  const links = NavLinks.map((link) => (
      <li
        key={link.name}
        onClick={link.available ? undefined : () => toast.warn(`Вкладка ${link.name} поки що у розробці!`)}
        className="text-white"
      >
        <Link href={link.available ? `/${link.href}` : "/"}>
          {link.name}
        </Link>
      </li>
    ))
  return (
    <header
      className="h-16 dark:bg-blue-800 fixed flex justify-between items-center w-full bg-blue-600  backdrop-blur-md px-8 z-50">
      <Link
        href={IMAGES_DICTIONARY[h_type].url}
        className={`logo-container h-16 w-40 relative object-cover object-center`}
      >
        <Image fill src={IMAGES_DICTIONARY[h_type].src} alt="krop_robots logo-text"/>
      </Link>
      <ul className="flex flex-row gap-x-4 items-center justify-center">
        <ThemeSwitcher/>
        <Sheet>
          <SheetTrigger>
            <div
              className="block lg:hidden text-white hover:text-gray-300 transition-colors duration-300 ease-in cursor-pointer">
              <IoMenu size={32}/>
            </div>
          </SheetTrigger>
          <SheetContent className="flex flex-col gap-y-4 backdrop-blur-md bg-white/15 w-full s480:w-64">
            <SheetHeader className="text-2xl text-white">
                Навігація
            </SheetHeader>
            <ul className="flex flex-col gap-y-4">
              {links}
            </ul>
          </SheetContent>
        </Sheet>
        <div className="hidden lg:flex flex-row gap-x-4">
          {
            h_type === "shop" && (
              <li
                className="text-white"
              >
                <Link href="/">
                  Головна
                </Link>
              </li>
            )
          }
          {links}
        </div>
      </ul>
    </header>
  )
}

export default Header;