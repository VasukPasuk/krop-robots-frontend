import {ApiResponse} from "@/types/api-response.type";
import {IColor, IProduct} from "@/types";
import ProductPage from "@/components/pages/Product/ProductPage";

export default async function Page({params}: { params: { id: string } }) {
  const product_response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${params.id}?populate=*`, {
    cache: "no-cache"
  });
  const product: ApiResponse<IProduct> = await product_response.json();

  const color_response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/colors`);
  const colors: ApiResponse<IColor[]> = await color_response.json();

  return (
    <>
      <ProductPage data={product.data} colors={colors.data}/>
    </>
  )
}