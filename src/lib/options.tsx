import { Blogs } from "@/types/blogs";
import { Category } from "@/types/category";

const blogs: Blogs[] = [
  {
    id: 0,
    imageUrl: "/images/blogs/blog-01.png",
    isMain: false,
    blogTranslations: [
      {
        languageCode: "en",
        title: "English Example",
        description: "Hello",
      },
    ],
  },
  {
    id: 1,
    imageUrl: "/images/blogs/blog-02.png",
    isMain: false,
    blogTranslations: [
      {
        languageCode: "en",
        title: "English Example 2",
        description: "Hello 2",
      },
    ],
  },
  {
    id: 2,
    imageUrl: "/images/blogs/blog-03.png",
    isMain: false,
    blogTranslations: [
      {
        languageCode: "en",
        title: "string",
        description: "string",
      },
    ],
  },
  {
    id: 3,
    imageUrl: "/images/blogs/blog-01.png",
    isMain: false,
    blogTranslations: [
      {
        languageCode: "en",
        title: "English Example 3",
        description: "string",
      },
      {
        languageCode: "ru",
        title: "Russian Example",
        description: "Russian",
      },
    ],
  },
];

const categories: Category[] = [
  {
    id: 1,
    categoryTranslations: [
      {
        languageCode: "en",
        name: "English Category 1",
      },
      {
        languageCode: "ru",
        name: "Ru Category 1",
      },
    ],
  },
  {
    id: 2,
    categoryTranslations: [
      {
        languageCode: "en",
        name: "English Category 2",
      },
    ],
  },
  {
    id: 3,
    categoryTranslations: [
      {
        languageCode: "ru",
        name: "Ru Category 2",
      },
    ],
  },
];

export { blogs, categories };
