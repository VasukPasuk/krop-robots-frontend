import {axiosBasic} from "@/config/axios";
import {ApiCreateFeedback} from "@/types/feedback.type";


export default class FeedbackService {
  static URL: string = "/feedback-data-forms"

  static async create(data: ApiCreateFeedback) {
    return await axiosBasic.post(this.URL, data)
  }
}