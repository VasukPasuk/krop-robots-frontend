import {axiosBasic} from "@/config/axios";
import {ApiResponseMultiple} from "@/types/api-response.type";
import {IColor} from "@/types";


export default class ColorsService {
  static URL: string = "/colors"

  static async getMany(query?: string) {
    return await axiosBasic.get<ApiResponseMultiple<IColor>>(`${this.URL}${!!query ? `?${query}` : ""}`)
  }
}