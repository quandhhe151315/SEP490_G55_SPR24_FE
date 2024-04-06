import { useGetBlogList } from "../../../hook/useGetBlogList";
import BlogItem from "../../Blog/BlogList/BlogItem";
import { Grid } from "@mui/material";
import React from "react";

export default function BlogLatest() {
  const { blogList } = useGetBlogList({
    id: "",
  });

  // Chỉ hiển thị 6 blog đầu tiên
  const slicedBlogList = blogList?.slice(0, 6);

  return (
    <div>
      <Grid
        container
        columnSpacing={3}
        rowSpacing={3}
        mt={2}
        height={"100%"}
        mx={0}
        width={"100%"}
      >
        {slicedBlogList?.map((item, index) => (
          <Grid item xs={4} key={`${item?.blogId}+${index}`}>
            <BlogItem
              title={item?.blogTitle}
              id={item?.blogId}
              content={item?.blogContent}
              createDate={item?.createDate}
              userName={item?.userName}
              blogImage={item?.blogImage}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
