import {axiosBasic} from "@/config/axios";
import {ApiResponseMultiple} from "@/types/api-response.type";
import qs from "qs";
import {IReview} from "@/types";


interface ISearchQueries {
  limit: number;
  page: number;
  productId: string;
  order: "asc" | "desc"
}

export default class ReviewsService {
  static URL: string = "/reviews"

  static async getManyOfProduct(
    {page = 1, limit, productId, order = 'asc'}: Partial<ISearchQueries>
  ) {
    const searchQuery = qs.stringify({
      populate: ['product'],
      filters: {
        product: {
          documentId: {
            $contains: productId
          },
        }
      },
      sort: `createdAt:${order}`,
      pagination: {
        pageSize: limit,
        page: page,
      }
    }, {skipNulls: true, allowEmptyArrays: false, arrayFormat: "repeat", encode: false})

    return await axiosBasic.get<ApiResponseMultiple<IReview[]>>(`${this.URL}?${searchQuery}`)
  }

  static async create(createReviewDto: Pick<IReview, "text" | "name" | "surname"> & {productId: string}) {
    const {productId, ...rest} = createReviewDto;
    return await axiosBasic.post(`/reviews`, {
      data: {
        ...rest,
        product: productId
      }
    })
  }
}