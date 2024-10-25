export interface IRootImage {
  id: number;
  attributes: {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      large: IImageFormat;
      small: IImageFormat;
      medium: IImageFormat;
      thumbnail: IImageFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any | null; // Replace 'any' with a more specific type if known
    createdAt: string; // ISO 8601 date string
    updatedAt: string; // ISO 8601 date string
  };
}

export interface IImage {
  data: IRootImage
}

export interface IImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}
