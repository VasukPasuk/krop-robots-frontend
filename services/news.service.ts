import {axiosBasic} from "@/config/axios";
import {ApiResponseMultiple, ApiResponseSingle} from "@/types/api-response.type";
import qs from "qs";
import {INewsItem} from "@/types";


export default class NewsService {
  static URL: string = "/news"

  static async getMany({limit, page}: {limit?: number, page?: number}) {
    const searchQuery = qs.stringify({
      populate: ['*'],
      pagination: {
        pageSize: limit,
        page: page,
      },
    }, {skipNulls: true, allowEmptyArrays: false, arrayFormat: "repeat", encode: false})
    return await axiosBasic.get<ApiResponseMultiple<INewsItem>>(`${this.URL}?${searchQuery}`)
  }

  static async getOneById({id}: {id: string}) {
    const searchQuery = qs.stringify({
      populate: ['main_photo', 'tag'],
    })
    return await axiosBasic.get<ApiResponseSingle<INewsItem>>(`${this.URL}/${id}?${searchQuery}`)
  }
}