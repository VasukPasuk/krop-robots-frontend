import {axiosBasic} from "@/config/axios";
import {ApiResponseMultiple} from "@/types/api-response.type";
import {ITag} from "@/types";


export default class TagsService {
  static URL: string = "/tags"

  static async getMany(query?: string) {
    return await axiosBasic.get<ApiResponseMultiple<ITag>>(`${this.URL}${!!query ? `?${query}` : ""}`)
  }
}