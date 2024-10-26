import Header from "@/components/widgets/Header";
import Footer from "@/components/widgets/Footer";
import { Suspense } from "react";
import NewsLoading from "@/app/news/loading";

function Layout({children}: { children: React.ReactNode }) {
  return (
    <>
      <Header/>
      <div className="pt-16">
        <Suspense fallback={<NewsLoading/>}>
          {children}
        </Suspense>
      </div>
      <Footer/>
    </>
  )
}

export default Layout;