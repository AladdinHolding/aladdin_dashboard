import React from "react";
import { Props } from "react-apexcharts";
import {
  useAddCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../../global/api/categoryApi";
import { useFormik } from "formik";
import { Category } from "@/types/category";

const CategoryEditor: React.FC<Props> = ({
  category,
  editMode,
  setEditMode,
}) => {
  const [updateCategories] = useUpdateCategoryMutation();
  const [addCategories] = useAddCategoryMutation();
  const { values, handleChange, handleSubmit } = useFormik<Category>({
    initialValues: category
      ? {
          ...category,
        }
      : {
          categoryTranslations: [
            {
              languageCode: "az",
              name: "string",
              description: "string",
            },
            {
              languageCode: "ru",
              name: "string",
            },
            {
              languageCode: "en",
              name: "string",
            },
          ],
        },
    validateOnChange: true,
    onSubmit: (values) => {
      console.log(values);

      if (category) {
        updateCategories(values);
      } else {
        addCategories(values);
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
        <button className="justify-items-left items-start" onClick={() => setEditMode(false)}>X</button>
        <form onSubmit={handleSubmit}>

          {values.categoryTranslations.map((translation, index) => (
            <>
              <div>
                <div>
                  <label>Language Code</label>
                </div>
                <input
                  name={`categoryTranslations[${index}].languageCode`}
                  value={translation.languageCode}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div>
                  <label>Name</label>
                </div>
                <input
                  name={`categoryTranslations[${index}].name`}
                  value={translation.name}
                  onChange={handleChange}
                />
              </div>
            </>
          ))}
          <div></div>
          <input type="submit" value={"Submit"} />
        </form>
      </div>
    </div>
  );
};

export default CategoryEditor;
