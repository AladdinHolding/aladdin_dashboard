"use client";
import { Props } from "react-apexcharts";
import { useGetCategoryByIdQuery } from "../../../global/api/categoryApi";

const CategoryDetails: React.FC<Props> = ({ id }) => {
  const { data, isLoading, error } = useGetCategoryByIdQuery(id);
  console.log(data)
    return <div>{data?.categoryTranslations.map((translations, index)=>
    <><div>{translations.languageCode}</div>
    <div>{translations.name}</div></>)}</div>;
};


export default CategoryDetails;