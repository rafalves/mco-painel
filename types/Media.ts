export interface Media {
  data: {
    id: number;
    attributes: {
      name?: string;
      alternativeText?: string;
      caption?: string;
      width?: number;
      height?: number;
      formats?: {
        small?: Formats;
        medium?: Formats;
        large?: Formats;
        thumbnail?: Formats;
      };
      hash?: string;
      ext?: string;
      mime?: string;
      size?: number;
      url?: string;
      preview?: string;
      provider?: string;
      provider_metadata?: string;
      createdAt?: string;
      updatedAt?: string;
    };
  }[];
}


export interface Formats {
  ext?: string;
  url?: string;
  hash?: string;
  mime?: string;
  name?: string;
  path?: any;
  size?: number;
  width?: number;
  height?: number;
} 
