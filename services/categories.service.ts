import {axiosBasic} from "@/config/axios";
import {ApiResponseMultiple} from "@/types/api-response.type";
import {ICategory} from "@/types";


export default class CategoriesService {
  static URL: string = "/categories"

  static async getMany(query?: string) {
    return await axiosBasic.get<ApiResponseMultiple<ICategory>>(`${this.URL}${!!query ? `?${query}` : ""}`)
  }
}