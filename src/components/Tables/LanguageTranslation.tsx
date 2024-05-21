"use client";
import Image from "next/image";
import { useState } from "react";
import { Props } from "react-apexcharts";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const LanguageTranslation: React.FC<Props> = ({
  blog,
  languageTranslation,
}) => {
  const submitHandle = () => {
    console.log();
  };

  return (
    <>
      <form className="mr-4">
        <div className="border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 mb-4 w-full rounded-lg border">
          <div className="dark:bg-gray-800 rounded-t-lg bg-white px-4 py-2">
            <input value={languageTranslation.title} />
            <textarea
              id="comment"
              className="text-gray-900 dark:bg-gray-800 dark:placeholder-gray-400 w-full border-0 bg-white px-0 text-sm focus:ring-0 dark:text-white"
              placeholder="Write Blog Post"
              value={languageTranslation.description}
              required
            ></textarea>
          </div>
          <div className="dark:border-gray-600 flex items-center justify-between border-t px-3 py-2">
            <button
              type="submit"
              className="inline-flex items-center rounded-lg bg-blue-700 px-4 py-2.5 text-center text-xs font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default LanguageTranslation;
