import CategoryDetails from "@/components/Tables/CategoryDetails";
import { Props } from "react-apexcharts";

 const CategoryById: React.FC<Props> = ({params})=>{

  return <><CategoryDetails id={params.id}></CategoryDetails></>
}

export default CategoryById