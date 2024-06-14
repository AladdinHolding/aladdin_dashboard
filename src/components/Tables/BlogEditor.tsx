import React, { useEffect, useState } from "react";
import { blogs } from "@/lib/options";
import Image from "next/image";
import toast from "react-hot-toast";
import { Props } from "react-apexcharts";
import { BlogEdit, BlogTranslations, Blogs } from "@/types/blogs";
import {
  useAddBlogMutation,
  useUpdateBlogMutation,
} from "../../../global/api/blogsApi";
import { useGetAllCategoriesQuery } from "../../../global/api/categoryApi";
import { Formik, useFormik } from "formik";

const BlogEditor: React.FC<Props> = ({ blog, editMode, setEditMode }) => {
  const [image, setImage] = useState<File>();
  const [updateBlogs] = useUpdateBlogMutation();
  const [addBlogs] = useAddBlogMutation();
  const { data } = useGetAllCategoriesQuery();
  const { values, handleChange, handleBlur, handleSubmit } =
    useFormik<BlogEdit>({
      initialValues: blog
        ? {
            ...blog,
            BlogTranslations: blog.blogTranslations,
            ImageFile: image,
          }
        : {
            ImageFile: image,
            isMain: false,
            CategoryId: 0,
            BlogTranslations: [
              {
                languageCode: "az",
                title: "string",
                description: "string",
              },
            ],
          },
      validateOnChange: true,
      onSubmit: (values) => {
        const formData = new FormData();
        blog ? formData.append("id", blog.id) : null;
        formData.append("isMain", values.isMain.toString());
        formData.append("CategoryId", values.CategoryId.toString());
        formData.append("ImageFile", image!);

        values.BlogTranslations.forEach((translation, index) => {
          formData.append(
            `BlogTranslations[${index}].languageCode`,
            translation.languageCode,
          );
          formData.append(
            `BlogTranslations[${index}].title`,
            translation.title,
          );
          formData.append(
            `BlogTranslations[${index}].description`,
            translation.description,
          );
        });
        console.log(image);
        if (blog) {
          updateBlogs(formData);
        } else {
          addBlogs(formData);
        }
        setEditMode(false);
      },
    });

  return (
    <div
      className={`fixed ${editMode ? null : "hidden"} inset-0 flex items-center justify-center justify-items-center bg-black bg-opacity-25 backdrop-blur-sm`}
    >
      <div
        className="dark:bg-gray-800 w-1/4 flex-col  items-center justify-center  
               justify-items-center   overflow-y-auto rounded-lg  border bg-white p-6 text-center"
      >
        <form onSubmit={handleSubmit}>
          <label className="text-gray-700 dark:text-gray-300 block text-sm font-medium">
            Image
          </label>
          <label htmlFor="ImageFile" className="cursor-pointer">
            {/* <Image
              src={image}
              width={300}
              height={300}
              alt="Blog"
              className="mt-2 cursor-pointer items-center justify-center"
            /> */}
            <input
              type="file"
              name="file"
              onChange={(event) => setImage(event.currentTarget.files[0])}
            />
          </label>
          {values.BlogTranslations.map((translation, index) => (
            <>
              <input
                name={`BlogTranslations[${index}].languageCode`}
                value={translation.languageCode}
                onChange={handleChange}
              />
              <input
                name={`BlogTranslations[${index}].title`}
                value={translation.title}
                onChange={handleChange}
              />
              <input
                name={`BlogTranslations[${index}].description`}
                value={translation.description}
                onChange={handleChange}
              />
            </>
          ))}
          <select
            name="CategoryId"
            value={values.CategoryId}
            onChange={handleChange}
          >
            {data?.map((category, index) => (
              <>
                <option value={category.id}>{category.id}</option>
              </>
            ))}
          </select>
          <div></div>
          <input type="submit" value={"Submit"} />
        </form>
      </div>
    </div>
  );
};

export default BlogEditor;
