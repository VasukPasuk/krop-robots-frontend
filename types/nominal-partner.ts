import {IImage} from "@/types/image.type";

export interface NominalPartner {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  logo: IImage;
}
