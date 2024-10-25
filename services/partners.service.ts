import {axiosBasic} from "@/config/axios";
import {ApiResponseMultiple} from "@/types/api-response.type";
import {IPartner, IShopPartner} from "@/types";


export default class PartnersService {
  static URL: string = "/partners"

  static async getMany() {
    return await axiosBasic.get(this.URL)
  }

  static async getManyNominalPartners() {
    return await axiosBasic.get<ApiResponseMultiple<IPartner>>(`/nominal-partners?populate=logo`)
  }

  static async getManyShopPartners() {
    return await axiosBasic.get<ApiResponseMultiple<IShopPartner>>(this.URL + "?populate=logo")
  }
}