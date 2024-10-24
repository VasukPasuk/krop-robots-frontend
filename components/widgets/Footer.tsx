"use client"
import {FaFacebookF, FaInstagram, FaTelegramPlane, FaTiktok, FaYoutube} from "react-icons/fa";
import {
  FACEBOOK_FOLLOW_LINK,
  INSTAGRAM_FOLLOW_LINK,
  TELEGRAM_FOLLOW_LINK, TIKTOK_FOLLOW_LINK,
  YOUTUBE_FOLLOW_LINK
} from "@/constants/follow-links";
import Link from "next/link";
import NavLinks from "@/constants/nav-links";
import {toast} from "react-toastify";
import Image from "next/image"

const FollowLinks = [
  {
    icon: <FaInstagram className="text-2xl"/>,
    link: INSTAGRAM_FOLLOW_LINK
  },
  {
    icon: <FaTelegramPlane className="text-2xl"/>,
    link: FACEBOOK_FOLLOW_LINK
  },
  {
    icon: <FaFacebookF className="text-2xl"/>,
    link: TELEGRAM_FOLLOW_LINK
  },
  {
    icon: <FaYoutube className="text-2xl"/>,
    link: YOUTUBE_FOLLOW_LINK
  },
  {
    icon: <FaTiktok className="text-2xl"/>,
    link: TIKTOK_FOLLOW_LINK
  },
]


function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-blue-950/5 py-8 px-6 lg:py-16 lg:px-8">
      <div className="flex flex-col gap-y-4 lg:gap-y-16 text-zinc-200 font-light">
        <div className="flex flex-col gap-y-4 lg:flex-row lg:justify-between items-start max-w-[1300px] mx-auto w-full">
          <div>
            <Link href="/">
              <Image src="/logo_white.png" alt="Picture" width={150} height={150}/>
            </Link>

          </div>
          <div className="flex flex-col gap-y-8 mb-8 md:flex-row md:gap-x-24">
            <div className="flex flex-col gap-y-2">
              <h2 className="text-xl font-semibold">
                Корисні посилання
              </h2>
              <ul className="flex flex-col gap-y-2">
                {NavLinks.map((link) => (
                  <li
                    key={link.name}
                    onClick={link.available ? undefined : () => toast.warn(`Вкладка ${link.name} поки що у розробці!`)}
                  >
                    <Link href={link.available ? `/${link.href}` : "/"}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-y-2">
              <h2 className="text-xl font-semibold">
                Слідкуйте за нами
              </h2>
              <ul className="flex flex-row gap-x-2">
                {
                  FollowLinks.map(({icon, link}) => (
                    <li>
                      <Link
                        target="_self"
                        href={link}
                      >
                        {icon}
                      </Link>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center">
          © ГО "КРОП РОБОТС", Всі Права Захищені
        </div>
      </div>
    </footer>
  )
}

export default Footer;