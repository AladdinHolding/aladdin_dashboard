import React from "react";
import { Props } from "react-apexcharts";
import {
  useAddCategoryMutation,
  useUpdateCategoryMutation,
} from "../../../global/api/categoryApi";
import { useFormik } from "formik";
import { Category, CategoryTranslation } from "@/types/category";

const CategoryEditor: React.FC<Props> = ({
  category,
  editMode,
  setEditMode,
}) => {
  const [updateCategories] = useUpdateCategoryMutation();
  const [addCategories] = useAddCategoryMutation();
  const translation: CategoryTranslation = {
    languageCode: "",
    name: "",
  };
  const { values, handleChange, handleSubmit } = useFormik<Category>({
    initialValues: category
      ? {
          ...category,
        }
      : {
          categoryTranslations: [
            {
              languageCode: "az",
              name: "",
              description: "",
            },{
              languageCode: "en",
              name: "",
              description: "",
            },{
              languageCode: "ru",
              name: "",
              description: "",
            },
          ],
        },
    validateOnChange: true,
    onSubmit: (values) => {

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
        <button
          className="justify-items-left items-start"
          onClick={() => setEditMode(false)}
        >
          X
        </button>
        <form onSubmit={handleSubmit}>
        <button onClick={() => values.categoryTranslations.push(translation)} className="cursor-pointer">+</button>
        <div className="flex flex-wrap">
            {values.categoryTranslations.map((translation, index) => (
              <div key={index}>
                <div>
                  <select onChange={handleChange} name={`categoryTranslations[${index}].languageCode`}>
                    <option>az</option>
                    <option>en</option>
                    <option>ru</option>
                  </select>
                </div>
                <div>
                  <div>Name</div>
                  <input
                    name={`categoryTranslations[${index}].name`}
                    value={translation.name}
                    className="border-2	"
                    onChange={handleChange}
                  />
                </div>
              </div>
            ))}
          </div>
          <div></div>
          <input type="submit" value={"Submit"} />
        </form>
      </div>
    </div>
  );
};

export default CategoryEditor;
