"use client"
import {RiRobot2Fill} from "react-icons/ri";
import {LuMove3D} from "react-icons/lu";
import {SiBlueprint} from "react-icons/si";
import Image from "next/image"
import {useAppSelector} from "@/store/hooks";

const STEM_BRICKS = [
  {
    icon: <RiRobot2Fill/>,
    title: "Робототехніка",
    body: "Учасники вивчають, як створювати та програмувати роботів, проводять дослідження в галузі автоматизації" +
      " та беруть участь у змаганнях з робототехніки.",
  },
  {
    icon: <LuMove3D/>,
    title: "3D-моделювання",
    body: "Учасники мають змогу створювати власні моделі, використовувати сучасні інструменти моделювання.",
  },
  {
    icon: <SiBlueprint/>,
    title: "3D-друк",
    body: "В межах організації розробляються унікальні" + " вироби, такі як фігурки тварин, декорації, елементи дизайну та освітні моделі.",
  },
]

function StemBlock() {
  const theme = useAppSelector((state) => state.theme.theme)
  return (
    <section className="flex flex-col gap-y-16">
      <div className="flex flex-col items-center gap-y-4 lg:flex-row lg:gap-x-24">
        <div className="lg:w-[600px] flex items-center justify-center lg:h-[400px] relative rounded-full overflow-hidden"
             style={{
               // clipPath: `circle(40%)`,
               boxShadow: theme === "dark" && '0 0 10px #00f, 0 0 20px #00f, 0 0 40px #00f, 0 0 80px #00f, 0 0 120px #00f'
             }}
        >
          <Image src="/STEM_picture.jpg" alt="STEM" className="object-cover" fill/>
        </div>
        <div className="w-full flex flex-col gap-y-4 text-lg justify-center">
          <h1 className="text-2xl lg:text-4xl font-semibold">
            STEM-освіта без обмежень
          </h1>
          <p className="common_text">
            &#34;KROP_ROBOTS&#34; активно просуває STEM через навчальні програми,
            гуртки
            та освітні заходи. Програми орієнтовані на розвиток критичного мислення, логіки, інженерних рішень та
            творчого
            підходу до вирішення завдань.
          </p>
          <p className="common_text">
            STEM — це абревіатура, яка означає науково-технічні дисципліни: Science (наука), Technology (технології),
            Engineering (інженерія) та Mathematics (математика). STEM-освіта зосереджена на розвитку навичок у цих
            галузях для вирішення реальних проблем через практичний підхід та інновації.
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row w-full p-4 lg:gap-x-12 gap-y-12 items-start ">
        {STEM_BRICKS.map(({body, icon, title}) => (
          <ul className="flex items-start gap-x-8 w-full rounded-xl shadow-lg p-6 dark:bg-white/5" key={title}>
            <li className="text-5xl text-blue-700">
              {icon}
            </li>
            <li className="flex flex-col gap-y-2">
              <h2 className="text-2xl font-normal">
                {title}
              </h2>
              <span className="font-light">
                {body}
              </span>
            </li>
          </ul>
        ))}
      </div>
    </section>
  )
}

export default StemBlock