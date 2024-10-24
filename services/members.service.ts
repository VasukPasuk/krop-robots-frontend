import {axiosBasic} from "@/config/axios";
import {PaginationMeta} from "@/types/api-response.type";
import {IImage} from "@/types/image.type";


interface DataResponse {
  data: IMember[];
  meta: PaginationMeta;
}

interface IMember {
  id: number;
  documentId: string;
  name: string;
  surname: string;
  occupation: string;
  quote: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  avatar: IImage;
}

export default class MembersService {
  static URL: string = "/members"

  static async getMany() {
    return await axiosBasic.get<DataResponse>(`/members?populate=avatar`)
  }
}