import BlogDetails from "@/components/Tables/BlogDetails";
import { Props } from "react-apexcharts";

 const BlogById: React.FC<Props> = ({params})=>{

  return <><BlogDetails id={params.id}></BlogDetails></>
}

export default BlogById