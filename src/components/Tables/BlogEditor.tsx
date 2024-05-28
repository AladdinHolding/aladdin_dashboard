import React, { useState } from "react";
import { blogs } from "@/lib/options";
import Image from "next/image";
import LanguageTranslation from "./LanguageTranslation";
import toast from "react-hot-toast";
import { Props } from "react-apexcharts";

const BlogEditor: React.FC<Props> = ({ blog, editMode }) => {
  const [eblog, setBlog] = useState(
    blog
      ? blog
      : {
          id: blogs.length,
          imageUrl: "/images/blogs/sample.jpg",
          isMain: false,
          blogTranslations: [],
        },
  );
  console.log(eblog);
  const toggleHandle = (from: string) => {
    if (from === "main"){
      setBlog({
        ...eblog,
        isMain: !eblog.isMain,
      })
    }
    else if(blog){
      blog = eblog
      toast.success('BLOG UPDATED!')
      editMode = false;
    }
    else{
      blogs.push(eblog);
      toast.success('BLOG Created!')
    }

  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        if (typeof reader.result === "string") {
          setBlog({
            ...eblog,
            imageUrl: reader.result,
          });
        }
      });
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <>
      <td>
        <label htmlFor="uploadImg">
          <Image src={eblog.imageUrl} width={60} height={50} alt="Blog" />
        </label>

        <input
          name="uploadImg"
          id="uploadImg"
          className="hidden"
          type="file"
          accept="image/png, image/gif, image/jpeg"
          onChange={handleFileUpload}
        />
      </td>
      <td className="flex">
        {/* {eblog.blogTranslations.map((key) => (
          <LanguageTranslation key={key} />
        ))} */}
      </td>
      <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
        <button
          onClick={() => toggleHandle('main')}
          className="font-medium text-black dark:text-white"
        >
          {eblog.isMain ? "True" : "False"}
        </button>
      </td>
      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
        <div className="flex items-center space-x-3.5">
          <button
            onClick={() => toggleHandle("edit")}
            className="hover:text-primary"
          >
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.75 11.25L3.75 8.25L2.25 9.75L6.75 14.25L15.75 5.25L14.25 3.75L6.75 11.25Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </td>
    </>
  );
};

export default BlogEditor;
