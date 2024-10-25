import {IImage, IImageFormat, IRootImage} from "@/types/image.type";
import {ResponseItem} from "@/types/api-response.type";

export type VariantType = "Стандартний" | "Великий" | "Малий";





export interface IReview {
  text: string;
  name: string;
  surname: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface INewsItem {
  title: string;
  text: string;
  main_photo: IImage;
  tag: {
    data: ResponseItem<INewsTag>
  }
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface INewsTag {
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}


export interface IVariant {
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
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface IProduct {
  name: string;
  published: boolean;
  popular: boolean;
  discount: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  description: string;
  tags?: {
    data: ResponseItem<ITag>[]
  };
  images: {
    data: IRootImage[]
  };
  variants?: {
    data: ResponseItem<IVariant>[]
  };
  category: {
    data: ResponseItem<ICategory>
  }
  partner: {
    data: ResponseItem<IPartner>
  }
}

export interface IPartner {
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  logo: IImage;
}

export interface IShopPartner {
  urk_name: string;
  eng_name: string;
  logo: IImage;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}


export interface ICategory {
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface IColor {
  color: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
