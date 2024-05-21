import { Blogs } from "@/types/blogs";

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



export {blogs}