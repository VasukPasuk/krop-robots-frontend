import {axiosBasic} from "@/config/axios";
import {ApiResponseMultiple} from "@/types/api-response.type";
import {IProduct} from "@/types";
import qs from "qs";
import {ISearchQueries} from "@/hooks/useSearchQueriesFunctions";


export default class ProductsService {
  static URL: string = "/products"

  static async getMany(
    {categories = [], max = null, tags = [], min = null, searchByName, partner}: Partial<ISearchQueries>
  ) {


    const searchQuery = qs.stringify({
      populate: ['images', 'category', 'variants', 'partner'],
      filters: {
        category: {
          name: {
            $contains: categories
          }
        },
        tags: {
          name: {
            $contains: tags
          }
        },
        variants: {
          type: {
            $eq: "Стандартний"
          },
          price: {
            $lte: max,
            $gte: min,
          }
        },
        name: {
          $contains: searchByName,
        },
        partner: partner ? {
          eng_name: {
            $contains: partner
          }
        } : undefined
      },
    }, {skipNulls: true, allowEmptyArrays: false, arrayFormat: "repeat", encode: false})

    return await axiosBasic.get<ApiResponseMultiple<IProduct[]>>(`${this.URL}?${searchQuery}`)
  }

}