import Image from "next/image"
import AboutUsBlock from "@/components/pages/MainPage/AboutUs/AboutUs.block";
import StemBlock from "@/components/pages/MainPage/AboutUs/STEM.block";
import DirectionsBlock from "@/components/pages/MainPage/AboutUs/Directions.block";
import FeedbackFormBlock from "@/components/pages/MainPage/FeedbackForm.block";
import NewsBlock from "@/components/pages/MainPage/News.block";
import PartnersBlock from "@/components/pages/MainPage/Partners.block";
import Header from "@/components/widgets/Header";
import "./style.scss"
import MembersBlock from "@/components/pages/MainPage/AboutUs/Members.block";
import Footer from "@/components/widgets/Footer";
function StartPage() {
  return (
    <>
      <Header/>
      <main className="flex items-center justify-center flex-col gap-y-8 w-full">
        <div className="flex items-center justify-center w-full relative h-dvh">
          <div className="w-full h-full absolute">
            <Image alt={""} src="/main-preview-photo.JPG" className="w-full object-cover select-none" fill/>
          </div>
          <div
            className="
              w-full h-full absolute z-10 bg-gradient-to-t from-blue-800/75 via-blue-950/50 to-blue-800/25
              dark:from-[#02090D]/100 dark:via-[#02090D]/75 dark:to-[#02090D]/25
            "/>
          <div className="flex text-white flex-col items-center justify-center gap-y-2 w-64 h-64 absolute z-20">
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold">KROP_ROBOTS</h1>
            <h3 className="text-xl sm:text-2xl lg:text-3xl whitespace-nowrap">Дивовижна STEM-освіта</h3>
            <h3 className="text-xl sm:text-2xl lg:text-3xl"> без обмежень</h3>
          </div>
        </div>
        <AboutUsBlock/>
        <StemBlock/>
        <DirectionsBlock/>
        <MembersBlock/>
        {/*<GeneralBlock/>*/}
        <PartnersBlock/>
        <FeedbackFormBlock/>
        <NewsBlock/>
      </main>
      <Footer/>
    </>
  )
}

export default StartPage;