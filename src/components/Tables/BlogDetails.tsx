"use client";
import { Props } from "react-apexcharts";
import { useGetBlogsByIdQuery } from "../../../global/api/blogsApi";

const BlogDetails: React.FC<Props> = ({ id }) => {
  const { data, isLoading, error } = useGetBlogsByIdQuery(id);
  console.log(data);
  return (
    <div>
      <div>Is Main: {data?.isMain ? "Yes" : "No"}</div>
      {/* <div>Image:</div>
      <Image
        src={data?.imageUrl}
        width={300}
        height={300}
        alt="Blog"
        className="mt-2 cursor-pointer items-center justify-center"
      /> */}
      {data?.blogTranslations.map((translations, index) => (
        <>
          <div>{translations.languageCode}</div>
          <div>{translations.title}</div>
          <div>{translations.description}</div>
        </>
      ))}
    </div>
  );
};

export default BlogDetails;
