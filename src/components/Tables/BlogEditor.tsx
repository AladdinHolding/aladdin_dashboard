import React, { useState } from "react";
import { blogs } from "@/lib/options";
import Image from "next/image";
import toast from "react-hot-toast";
import { Props } from "react-apexcharts";
import { BlogTranslations, Blogs } from "@/types/blogs";

const BlogEditor: React.FC<Props> = ({ blog, editMode, setEditMode }) => {
  const [eblog, setBlog] = useState<Blogs>(
    blog
      ? blog
      : {
          id: blogs.length,
          imageUrl: "/images/blogs/sample.jpg",
          isMain: false,
          blogTranslations: [],
        },
  );
  const submitHandle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (blog) {
      const updatedBlogs = [...blogs];
      updatedBlogs[blog.id] = {
        ...eblog,
      };
      console.log(updatedBlogs);
      toast.success("blog edited successfully");
    } else {
      blogs.push(eblog);
      toast.success("blog added successfully");
    }
    setEditMode(false);
  };
  const toggleHandle = () => {
    setBlog({
      ...eblog,
      isMain: !eblog.isMain,
    });
  };
  const handleTranslationChange = (
    index: number,
    field: string,
    value: string,
  ) => {
    const updatedTranslations = [...eblog.blogTranslations];
    updatedTranslations[index] = {
      ...updatedTranslations[index],
      [field]: value,
    };
    setBlog({
      ...eblog,
      blogTranslations: updatedTranslations,
    });
  };

  const handleTranslationDeleteOp = (index: number) => {
    const updatedTranslations = [...eblog.blogTranslations];
    updatedTranslations.splice(index, 1);
    setBlog({
      ...eblog,
      blogTranslations: updatedTranslations,
    });
  };

  const addTranslation = () => {
    const newTranslation:BlogTranslations = {
      languageCode: "",
      title: "",
      description: "",
    };
    const updatedTranslations: BlogTranslations[] = [
      ...eblog.blogTranslations,
      newTranslation,
    ];

    setBlog({
      ...eblog,
      blogTranslations: updatedTranslations,
    });
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
    <div
      className={`fixed ${editMode ? null : "hidden"} inset-0 flex items-center justify-center justify-items-center bg-black bg-opacity-25 backdrop-blur-sm`}
    >
      <div className="dark:bg-gray-800 rounded-lg bg-white p-6">
        <form onSubmit={submitHandle}>
          <div className="space-y-6">
            <div>
              <label className="text-gray-700 dark:text-gray-300 block text-sm font-medium">
                Image
              </label>
              <label htmlFor="uploadImg" className="cursor-pointer">
                <Image
                  src={eblog.imageUrl}
                  width={300}
                  height={300}
                  alt="Blog"
                  className="mt-2 cursor-pointer"
                />
                <input
                  name="uploadImg"
                  id="uploadImg"
                  className="hidden"
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
            <div>
              <label className="text-gray-700 dark:text-gray-300 block text-sm font-medium">
                Is Main?
              </label>
              <input
                onClick={toggleHandle}
                className="cursor-pointer rounded bg-primary px-4 py-2 text-white"
                type="button"
                value={eblog.isMain ? "Yes" : "No"}
              />
            </div>
            <input
              type="button"
              onClick={() => addTranslation()}
              value={"Add"}
            />
            <div className="m-2 flex justify-center">
              {eblog.blogTranslations.map((translation, index) => (
                <div className="m-2 space-y-3" key={index}>
                  <input
                    className="text-sm	"
                    type="button"
                    onClick={() => handleTranslationDeleteOp(index)}
                    value={"X"}
                  />
                  <div>
                    <input
                      type="text"
                      value={translation.languageCode}
                      onChange={(e) =>
                        handleTranslationChange(
                          index,
                          "languageCode",
                          e.target.value,
                        )
                      }
                      placeholder="Language Code"
                      className="form-input border-gray-300 dark:border-gray-700 mt-1 block w-full rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                    />
                    <input
                      type="text"
                      value={translation.title}
                      onChange={(e) =>
                        handleTranslationChange(index, "title", e.target.value)
                      }
                      placeholder="Title"
                      className="form-input border-gray-300 dark:border-gray-700 mt-1 block w-full rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                    />
                  </div>
                  <textarea
                    rows={6}
                    value={translation.description}
                    onChange={(e) =>
                      handleTranslationChange(
                        index,
                        "description",
                        e.target.value,
                      )
                    }
                    placeholder="Description"
                    className="form-textarea border-gray-300 dark:border-gray-700 mt-1 block w-full rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  ></textarea>
                </div>
              ))}
            </div>
            <div className="flex ">
              <input
                className="m-2 cursor-pointer rounded bg-primary px-4 py-2 text-white"
                type="submit"
                value={"Save"}
              />
              <input
                onClick={() => setEditMode(false)}
                className="m-2 cursor-pointer rounded bg-red px-4 py-2 text-white"
                value={"Cancel"}
                type="button"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogEditor;
