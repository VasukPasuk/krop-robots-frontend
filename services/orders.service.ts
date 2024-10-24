import {axiosBasic} from "@/config/axios";
import {PlasticType} from "@/constants/plastic";

export interface CreateOrderDto {
  phone: string;
  email: string;
  name: string;
  surname: string;
  region: string;
  locality: string;
  comment?: string;
  EDRPOY_CODE?: string;
  legal_entity?: string;
  street: string;
  floor?: string;
  house: string;
  apartment?: string;
  delivery_type: string;
  payment_type: string;
  department_adress?: string;
  total_price: number;
  total_items: number;
}
export interface OrderItemDto {
  amount: number
  price: number
  plastic: PlasticType
  product: number
  color: number
  variant: number
}


export default class OrdersService {
  static URL: string = "/orders"

  static async create({items, ...order}: CreateOrderDto & {items: OrderItemDto[]}) {
    return axiosBasic.post(this.URL, {
      data: {
        ...order,
        items: items.map((item) => ({
          amount: item.amount,
          price: item.price,
          product: item.product,
          color: item.color,
          variant: item.variant,
          plastic: item.plastic,
        }))
      }
    })
  }
}
