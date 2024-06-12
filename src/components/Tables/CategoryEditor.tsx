import { categories } from "@/lib/options";
import { CategoryTranslation } from "@/types/category";
import { useState } from "react";
import { Props } from "react-apexcharts";
import toast from "react-hot-toast";
import {
  useAddCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../../global/api/categoryApi";

const CategoryEditor: React.FC<Props> = ({
  category,
  setEditMode,
  editMode,
}) => {
  const { data } = useGetAllCategoriesQuery();
  const [eCategory, setCategory] = useState(
    category
      ? category
      : {
        id: 1,
        categoryTranslations: [
          {
            name: "Hii",
            languageCode: "az",
          },
        ],
        },
  );
  const [updateCategory] = useUpdateCategoryMutation();
  const [addCategory] = useAddCategoryMutation();
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (category) {
      updateCategory(eCategory);
      toast.success("Category updated successfully");
    } else {
      categories.push(eCategory);
      console.log(categories);
      console.log("hello from adding operation :)");
      console.log(eCategory);

      const dataa = eCategory;
      console.log(dataa);
      addCategory(dataa);
      setCategory({
        categoryTranslations: [],
      });
      toast.success("Category added successfully");
    }
    setEditMode(false);
  };
  const handleTranslationChange = (
    index: number,
    field: string,
    value: string,
  ) => {
    const updatedTranslations = [...eCategory.categoryTranslations];
    updatedTranslations[index] = {
      ...updatedTranslations[index],
      [field]: value,
    };
    setCategory({
      ...eCategory,
      categoryTranslations: updatedTranslations,
    });
  };

  const handleTranslationDeleteOp = (index: number) => {
    const updatedTranslations = [...eCategory.categoryTranslations];
    updatedTranslations.splice(index, 1);
    setCategory({
      ...eCategory,
      categoryTranslations: updatedTranslations,
    });
  };

  const addTranslation = () => {
    const newTranslation = {
      name: "Hii",
      languageCode: "az",
    };
    const updatedTranslations: any[] = [
      ...eCategory.categoryTranslations,
      newTranslation,
    ];
    console.log(updatedTranslations);

    setCategory({
      ...eCategory,
      categoryTranslations: updatedTranslations,
    });
  };

  return (
    <>
      <div
        className={`fixed ${editMode ? null : "hidden"} inset-0 flex items-center justify-center justify-items-center bg-black bg-opacity-25 backdrop-blur-sm`}
      >
        <div className="dark:bg-gray-800 h-800 rounded-lg bg-white p-6">
          <form onSubmit={submitHandler}>
            <div className="space-y-6">
              <input
                type="button"
                className="cursor-pointer"
                onClick={() => addTranslation()}
                value={"Add"}
              />
              <div className="m-2 flex justify-center">
                {eCategory.categoryTranslations.map(
                  (translation: CategoryTranslation, index: number) => (
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
                          value={translation.name}
                          onChange={(e) =>
                            handleTranslationChange(
                              index,
                              "name",
                              e.target.value,
                            )
                          }
                          placeholder="Name"
                          className="form-input border-gray-300 dark:border-gray-700 mt-1 block w-full rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                        />
                      </div>
                    </div>
                  ),
                )}
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
    </>
  );
};

export default CategoryEditor;
