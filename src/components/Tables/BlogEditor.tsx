import React, { useEffect, useState } from "react";
import { blogs, languageCodes } from "@/lib/options";
import Image from "next/image";
import toast from "react-hot-toast";
import { Props } from "react-apexcharts";
import { BlogEdit, BlogTranslations, Blogs } from "@/types/blogs";
import {
  useAddBlogMutation,
  useGetBlogsByIdQuery,
  useUpdateBlogMutation,
} from "../../../global/api/blogsApi";
import { useGetAllCategoriesQuery } from "../../../global/api/categoryApi";
import { Formik, useFormik } from "formik";

const BlogEditor: React.FC<Props> = ({ blog, editMode, setEditMode }) => {
  const [image, setImage] = useState<File>();
  const translation: BlogTranslations = {
    languageCode: 'az',
    title: "",
    description: "",
  };
  const [preview, setPreview] = useState(blog ? blog.imageUrl : "");
  const [updateBlogs] = useUpdateBlogMutation();
  const [addBlogs] = useAddBlogMutation();
  const { data } = useGetAllCategoriesQuery();
  const { values, handleChange, handleSubmit } = useFormik<BlogEdit>({
    initialValues: blog
      ? {
          ...blog,
          BlogTranslations: blog.blogTranslations,
          ImageFile: image,
        }
      : {
          ImageFile: image,
          isMain: false,
          CategoryId: data?.[0].id,
          BlogTranslations: [
            {
              languageCode: "az",
              title: "string",
              description: "string",
            },
          ],
        },
    onSubmit: (values) => {
      const formData = new FormData();
      blog ? formData.append("id", blog.id) : null;
      formData.append("isMain", values.isMain.toString());
      formData.append("CategoryId", values.CategoryId.toString());
      formData.append("ImageFile", image!);
      console.log(values.BlogTranslations[1]);
      values.BlogTranslations.forEach((translation, index) => {
        formData.append(
          `BlogTranslations[${index}]`,
          JSON.stringify(translation),
        );
      });
      console.log(image);
      if (blog) {
        updateBlogs(formData);
        toast.success("Blog Edited Successfully");
      } else {
        addBlogs(formData);
        toast.success("Blog Created Successfully");
      }
      setEditMode(false);
    },
  });
  const useBlogByIdAndLanguage = (blogId: number, languageCode: string) => {
    const { data, isLoading, isError } = useGetBlogsByIdQuery({
      blogId,
      languageCode,
    });
    return { data, isLoading, isError };
  };
  console.log(values.BlogTranslations);
  return (
    <div
      className={`fixed ${editMode ? null : "hidden"} inset-0 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm`}
    >
      <div
        className="dark:bg-gray-800 flex-col  items-center justify-center  
               justify-items-center   overflow-y-auto rounded-lg  border bg-white p-6 text-center"
      >
        <form onSubmit={handleSubmit}>
          <button onClick={() => setEditMode(false)}>X</button>
          <div>
            <label
              htmlFor="file"
              className="text-gray-700 dark:text-gray-300 block text-sm font-medium"
            >
              Image
            </label>
            <label htmlFor="file" className="cursor-pointer">
              <Image
                src={preview}
                width={300}
                height={300}
                alt="Blog"
                className="mt-2 cursor-pointer items-center justify-center"
              />
            </label>
            <input
              type="file"
              name="file"
              className=""
              onChange={(event) => {
                if (
                  FileReader &&
                  event.currentTarget.files &&
                  event.currentTarget.files.length
                ) {
                  setImage(event.currentTarget.files[0]);
                  var fr = new FileReader();
                  fr.onload = function () {
                    setPreview(fr.result);
                  };
                  fr.readAsDataURL(event.currentTarget.files[0]);
                }
              }}
            />
          </div>
          <div>
            <label
              className={`relative m-0 block h-7.5 w-14 rounded-full ${
                values.isMain ? "bg-primary" : "bg-stroke"
              }`}
            >
              <input
                type="checkbox"
                onChange={handleChange}
                name="isMain"
                className="dur absolute top-0 z-50 m-0 h-full w-full cursor-pointer opacity-0"
              />
              <span
                className={`absolute left-[3px] top-1/2 flex h-6 w-6 -translate-y-1/2 translate-x-0 items-center justify-center rounded-full bg-white shadow-switcher duration-75 ease-linear ${
                  values.isMain && "!right-[3px] !translate-x-full"
                }`}
              ></span>
            </label>
          </div>
          <div>
            <label>Translation</label>
            <div>
              <button onClick={() => values.BlogTranslations.push(translation)}>
                +
              </button>
            </div>
            {values.BlogTranslations.map((translation, index) => (
              <div key={index}>
                <div>
                  <p>{translation.languageCode}</p>
                </div>
                <div>
                  <div>Title</div>
                  <input
                    name={`BlogTranslations[${index}].title`}
                    value={translation.title}
                    className="border-2	"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <div>Description</div>

                  <textarea
                    name={`BlogTranslations[${index}].description`}
                    value={translation.description}
                    className="border-2	"
                    onChange={handleChange}
                  />
                </div>
              </div>
            ))}
          </div>
          <div>
            <div>Category</div>
            <select
              name="CategoryId"
              value={values.CategoryId}
              onChange={handleChange}
            >
              {data?.map((category, index) => {
                return (
                  <>
                    <option value={category.id}>
                      {category.categoryTranslations[0].name}
                    </option>
                  </>
                );
              })}
            </select>
          </div>
          <div></div>
          <input type="submit" value={"Submit"} />
        </form>
      </div>
    </div>
  );
};

export default BlogEditor;
