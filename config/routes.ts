const shop_root = "shop";

const Router = {
  product: (productIdentifier: string | number = "") => [shop_root, "products", productIdentifier].join("/"),
  catalog: (url: string = "") => `${shop_root}${url}`,
  reviews: (productIdentifier: string = "") => [productIdentifier, "reviews"].join("/"),
  main: () => ("/")
}

export default Router