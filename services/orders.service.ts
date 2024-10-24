import {axiosBasic} from "@/config/axios";

export interface CreateOrderDto {

}
export interface OrderItemDto {

}

export default class OrdersService {
  static URL: string = "/orders"

  static async create({items, order}: {order: CreateOrderDto, items: OrderItemDto[]}) {
    return axiosBasic.post(this.URL, {data: {...items, order}})
  }
}