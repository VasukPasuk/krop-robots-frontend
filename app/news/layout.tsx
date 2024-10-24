import Header from "@/components/widgets/Header";
import Footer from "@/components/widgets/Footer";

function Layout({children}: { children: React.ReactNode }) {
  return (
    <>
      <Header/>
      <div className="pt-16">
        {children}
      </div>
      <Footer/>
    </>
  )
}

export default Layout;