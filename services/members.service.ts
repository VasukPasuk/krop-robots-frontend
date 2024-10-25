import {axiosBasic} from "@/config/axios";
import {ApiResponseMultiple} from "@/types/api-response.type";
import {IImage} from "@/types/image.type";



interface IMember {
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
    return await axiosBasic.get<ApiResponseMultiple<IMember>>(`/members?populate=avatar`)
  }
}