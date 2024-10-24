import {ApiResponse} from "@/types/api-response.type";

export type FeedbackDTO = {
  id: number;
  name: string;
  surname: string
  email: string
  phone: string
  message: string
}

export type ApiCreateFeedback = ApiResponse<Omit<FeedbackDTO, "id">>