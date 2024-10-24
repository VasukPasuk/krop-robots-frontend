import {IImage} from "@/types/image.type";

export type VariantType = "Стандартний" | "Великий" | "Малий";



export interface INewsItem {
  id: number;
  documentId: string;
  title: string;
  text: string;
  main_photo: IImage;
  tag: INewsTag
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface INewsTag {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}


export interface IVariant {
  id: number;
  documentId: string;
  type: VariantType;
  height: number;
  width: number;
  length: number;
  weight: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ITag {
  id: number;
  documentId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface IProduct {
  id: number;
  documentId: string;
  name: string;
  published: boolean;
  popular: boolean;
  discount: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  description: string;
  tags?: ITag[];
  images: IImage[];
  variants?: IVariant[];
  category: ICategory
  partner: IShopPartner
}

export interface IPartner {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  logo: IImage;
}

export interface IShopPartner {
  id: number;
  documentId: string;
  urk_name: string;
  eng_name: string;
  logo: IImage;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}


export interface ICategory {
  id: number;
  documentId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface IColor {
  id: number;
  documentId: string;
  color: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
