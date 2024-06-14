
export type BlogTranslations = {
    languageCode: string;
    title: string;
    description: string;
  };
  

export type Blogs = {
  id: number;
  isMain: boolean;
  imageUrl: string;
  blogTranslations: BlogTranslations[];
};


export type BlogEdit={
  id: number;
  isMain: boolean;
  ImageFile: any;
  CategoryId: number;
  BlogTranslations: BlogTranslations[];
}