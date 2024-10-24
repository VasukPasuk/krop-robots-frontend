"use client"


import {GiTeacher} from "react-icons/gi";
import {FaHandsHelping} from "react-icons/fa";
import {AiOutlineFundProjectionScreen} from "react-icons/ai";


function DirectionsBlock() {
  return (
    <section className="flex flex-col gap-y-6">
      <h1 className="title_text">
        Наші інші напрями
      </h1>
      <div className="flex flex-col gap-y-8 lg:flex-row lg:gap-x-8">
        <div className="w-full lg:w-[60%] grid grid-cols-6 grid-rows-6 md:h-[800px] gap-4">
          <div className="bg-black/5 col-span-full row-span-2 md:row-span-6 md:col-span-3 rounded overflow-hidden">
            <img src="./TeachingChildren1.jpg" alt="Picture" className="hover-image-effect"/>
          </div>
          <div className="bg-black/5 col-span-full row-span-2 md:row-span-3 md:col-span-3 rounded overflow-hidden">
            <img src="./TeachingChildren2.jpg" alt="Picture" className="hover-image-effect"/>
          </div>
          <div className="bg-black/5 col-span-full row-span-2 md:row-span-3 md:col-span-3 rounded overflow-hidden">
            <img src="./TeachingChildren3.jpg" alt="Picture" className="hover-image-effect"/>
          </div>
        </div>
        <ul className="common_text w-full lg:w-[40%] flex flex-col gap-y-8">
          <li className="flex flex-col gap-y-2 rounded shadow-lg p-4 lg:p-8 dark:bg-white/5">
            <div className="flex flex-row gap-x-4 items-center ">
              <div>
                <GiTeacher className="text-5xl text-blue-800"/>
              </div>
              <div className="subtitle_text">
                Освітні семінари та тренінги
              </div>
            </div>
            <p>
              Організація постійно проводить різноманітні освітні заходи, семінари,
              тренінги
              та майстер-класи, спрямовані на популяризацію технологічної освіти.
            </p>
          </li>
          <li className="flex flex-col gap-y-2 rounded shadow-lg p-4 lg:p-8 dark:bg-white/5">
            <div className="flex flex-row gap-x-4 items-center ">
              <div>
                <FaHandsHelping className="text-5xl text-blue-800"/>
              </div>
              <div className="subtitle_text">
                Підтримка інклюзивності
              </div>
            </div>
            <p>
              "KROP_ROBOTS" приділяє особливу увагу створенню інклюзивного освітнього
              середовища,
              де кожен учасник, незалежно від віку, статі чи рівня підготовки, може реалізувати свої таланти в галузі
              технологій.
            </p>
          </li>
          <li className="flex flex-col gap-y-2 rounded shadow-lg p-4 lg:p-8 dark:bg-white/5">
            <div className="flex flex-row gap-x-4 items-center ">
              <div>
                <AiOutlineFundProjectionScreen className="text-5xl text-blue-800"/>
              </div>
              <div className="subtitle_text">
                Соціальні проєкти та партнерства
              </div>
            </div>
            <p>
              Організація активно співпрацює з місцевими громадами, освітніми закладами
              та іншими організаціями, просуваючи технологічну освіту та реалізуючи спільні проєкти. Це дає змогу
              популяризувати технології та надихати молодь на самореалізацію через інноваційні рішення.
            </p>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default DirectionsBlock;