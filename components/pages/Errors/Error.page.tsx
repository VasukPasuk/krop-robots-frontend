import {MyButton} from "@/components/ui/button";
import Link from "next/link";
import {MdError} from "react-icons/md";
import "./style.scss";

const INTERVAL = 2000;

export default function ErrorPage({message = "Ой! Щось сталося не так!"}: {message: string}) {
  return (
    <div className="h-screen relative flex justify-center items-center overflow-hidden">
      <div className="absolute w-full h-full bg-black">
        {[...Array(3000)].map((_, index) => (
          <span key={index} className="binary-number"> {Number(Math.round(Math.random()))} </span>
        ))}
      </div>
      <div
        className="flex flex-col items-center justify-center gap-y-4 px-4 py-8 rounded bg-white/5 backdrop-blur-sm z-10">
        <MdError className=" text-[8rem] s480:text-[12rem] text-white"/>
        <h1 className="text-2xl s480:text-3xl text-white text-center">
          {message}
        </h1>
        <MyButton variant="link" className="text-white">
          <Link href="/">
            Повернутися на головну сторінку
          </Link>
        </MyButton>
      </div>
    </div>
  )
}

