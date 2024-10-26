import {ApiResponseMultiple, ApiResponseSingle} from "@/types/api-response.type";
import {IColor, IProduct} from "@/types";
import ProductPage from "@/components/pages/Product/ProductPage";

export default async function Page({params}: { params: { id: string } }) {
  const productUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/products/${params.id}?populate=*`;
  const colorUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/colors`;

  const [productResponse, colorResponse] = await Promise.all([
    fetch(productUrl, {cache: "no-cache"}),
    fetch(colorUrl, {cache: "no-cache"}),
  ]);

  if (!productResponse.ok || !colorResponse.ok) {
    throw new Error("Сталася помилка. Не вдалося отримати інформацію про товар.");
  }

  const product: ApiResponseSingle<IProduct> = await productResponse.json();
  const colors: ApiResponseMultiple<IColor> = await colorResponse.json();

  return <ProductPage data={product} colors={colors}/>;
}
