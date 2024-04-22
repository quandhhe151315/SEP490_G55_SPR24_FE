import React, { useState } from "react";
import PrimarySearchAppBar from "../Homepage/Appbar";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { useGetRecipeByFilter } from "../../hook/useGetRecipeByFilter";
import { Box, Grid, Typography } from "@mui/material";
import RecipeItemList from "../../containers/Home/RecipeHome";
import { useGetBlogList } from "../../hook/useGetBlogList";
import BlogItem from "../../containers/Blog/BlogList/BlogItem";

export default function SearchItemAll() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchName = queryParams.get("searchName");

  const { recipList } = useGetRecipeByFilter({
    searchName: searchName,
  });
  const { blogList } = useGetBlogList({
    search: searchName,
  });
  if (!recipList || recipList.length === 0) {
    return (
      <div>
        <PrimarySearchAppBar />
        <Box
          width={"85%"}
          marginX={"auto"}
          height={"600px"}
          sx={{ color: "#ff5e00", textTransform: "uppercase" }}
        >
          Không tìm thấy công thức nấu ăn nào
        </Box>
      </div>
    );
  }
  return (
    <div>
      <PrimarySearchAppBar />
      <Box width={"85%"} marginX={"auto"}>
        <Box sx={{ width: "100%", marginX: "auto" }}>
          <Box sx={{ display: "flex" }}>
            <Typography
              fontSize={28}
              fontWeight={600}
              sx={{ textTransform: "uppercase", color: "#ff5e00" }}
            >
              công thức tìm thấy cho từ khoá
            </Typography>
            <Typography variant="h4" sx={{ ml: 2 }}>
              "{searchName}"
            </Typography>
          </Box>

          <RecipeItemList title={""} recipeItemLists={recipList} />
        </Box>
        <Box sx={{ width: "100%", marginX: "auto", mt: 6 }}>
          <Box sx={{ display: "flex" }}>
            <Typography
              fontWeight={600}
              fontSize={28}
              sx={{ textTransform: "uppercase",color:'#ff5e00' }}
            >
              Blog tìm thấy cho từ khoá
            </Typography>
            <Typography variant="h4" sx={{ ml: 2 }}>
              "{searchName}"
            </Typography>
          </Box>

          <Grid
            container
            columnSpacing={3}
            rowSpacing={3}
            mt={2}
            height={"100%"}
            mx={0}
            width={"100%"}
          >
            {blogList?.map((item, index) => {
              return (
                <Grid item xs={4} key={`${item?.blogId}+${index}`}>
                  <BlogItem
                    title={item?.blogTitle}
                    id={item?.blogId}
                    content={item?.blogContent}
                    createDate={item?.createDate}
                    userName={item?.userName}
                    blogImage={item?.blogImage}
                    commentCount={item?.commentCount}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </div>
  );
}
