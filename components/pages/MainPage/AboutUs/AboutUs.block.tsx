"use client"
import {useEffect, useState} from "react";
import CountUp from 'react-countup';
import clsx from "clsx";
import {countDaysAfter} from "@/features/countDaysAfter";
import {IoTodayOutline} from "react-icons/io5";
import {MdEmojiEvents} from "react-icons/md";
import {FaGraduationCap} from "react-icons/fa6";
import Image from "next/image";

const CAROUSEL_LENGTH = 5;

const CAROUSEL_INTERVAL = 5000;


function AboutUsBlock() {
  const [carouselIndex, setCarouselIndex] = useState<number>(0)


  useEffect(() => {

    const interval = setInterval(() => {
      setCarouselIndex(prev => prev !== CAROUSEL_LENGTH - 1 ? prev + 1 : 0)
    }, CAROUSEL_INTERVAL)

    return () => {
      clearInterval(interval)
    }
  }, [carouselIndex])
  return (
    <section className="flex flex-col gap-y-8 lg:flex-row lg:gap-x-8 items-start ">
      <div className="flex flex-col gap-y-4 w-full lg:w-1/2">
        <h1 className="text-4xl font-semibold">Що ми робимо?</h1>
        <p className="common_text">
          Громадська організація &#34;KROP_ROBOTS&#34; — це некомерційна ініціатива, що спрямована на розвиток інноваційної
          освіти та технологій, з особливим акцентом на STEM-напрямок. Організація базується в місті Кропивницький і
          активно працює з дітьми, підлітками та молоддю, впроваджуючи передові методи навчання та залучаючи їх до
          практичного вивчення технологій.
        </p>
        <p className="common_text">
          Основна мета &#34;KROP_ROBOTS&#34; — надати молодим людям можливість отримати якісну освіту в галузі технологій,
          зокрема робототехніки, програмування, 3D-моделювання та 3D-друку. Це дозволяє учасникам не тільки теоретично
          освоїти матеріал, але й застосовувати отримані знання на практиці, розвиваючи свої інженерні та технічні
          навички.
        </p>
        <div className="flex flex-col gap-y-4">
          <div className="text-white bg-green-600 rounded py-4 px-8 flex flex-row justify-between items-center dark:bg-green-600/50">
            <div className="flex gap-x-4 items-center justify-center">
              <IoTodayOutline className="text-3xl"/>
              <h3 className="text-xl">Днів існуємо</h3>
            </div>
            <span className="text-2xl lg:text-4xl -translate-x-1/2">
              <CountUp start={1} end={countDaysAfter('2024-05-08')} duration={3} delay={1}/>
            </span>
          </div>
          <div className="text-white bg-green-600 rounded py-4 px-8 flex flex-row justify-between items-center dark:bg-green-600/50">
            <div className="flex gap-x-4 items-center justify-center">
              <MdEmojiEvents className="text-3xl" />
              <h3 className="text-xl">Заходів проведено</h3>
            </div>
            <span className="text-2xl lg:text-4xl ">
              <CountUp start={1} end={300} duration={3} delay={1}/>+
            </span>
          </div>
          <div className="text-white bg-green-600 rounded py-4 px-8 flex flex-row justify-between items-center dark:bg-green-600/50">
            <div className="flex gap-x-4 items-center justify-center">
              <FaGraduationCap className="text-3xl" />
              <h3 className="text-xl">Випускників навчання</h3>
            </div>
            <span className="text-2xl lg:text-4xl -translate-x-[100%]">
              <CountUp start={1} end={63} duration={3} delay={1}/>
            </span>
          </div>
        </div>
      </div>

      <div className="track-wrapper">
        <div
          className="track"
          style={{
            transform: `translateX(-${carouselIndex * 100}%)`
          }}
        >
          <div className="track-item">
            <Image
              src={`/TeachingChildren2.jpg`}
              alt={`Teaching children image.`}
              fill
            />
          </div>
          <div className="track-item">
            <Image
              src={`/TeachingChildren1.jpg`}
              alt={`Teaching children image.`}
              fill
            />
          </div>
          <div className="track-item">
            <Image
              src={`/TeachingChildren5.jpg`}
              alt={`Teaching children image.`}
              fill
            />
          </div>
          <div className="track-item">
            <Image
              src={`/TeachingChildren4.jpg`}
              alt={`Teaching children image.`}
              fill
            />
          </div>
          <div className="track-item">
            <Image
              src={`/TeachingChildren3.jpg`}
              alt={`Teaching children image.`}
              fill
            />
          </div>
        </div>

        <ul className="flex items-center justify-center gap-x-4 p-4">
          {
            [...Array(CAROUSEL_LENGTH)].map((_, i) => (
              <li className={clsx("rounded-full cursor-pointer transition-colors duration-300 ease-in-out w-3 h-3", {
                "bg-neutral-500": i === carouselIndex,
                "bg-neutral-300": i !== carouselIndex,
              })}
                  key={i}
                  onClick={() => {
                    setCarouselIndex(i);
                  }}
              >

              </li>
            ))
          }
        </ul>
      </div>
    </section>
  )
}

export default AboutUsBlock