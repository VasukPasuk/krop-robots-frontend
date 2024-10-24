import Header from "@/components/widgets/Header";
import Footer from "@/components/widgets/Footer";
import ShopToolbar from "@/components/widgets/ShopToolbar";

export default function ShopLayout({children}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header h_type="shop"/>
      <ShopToolbar/>
      <div className="pt-28">
        {children}
      </div>
      <Footer/>
    </>
  )
}