import React, { useEffect, useState } from "react";
import Appbar from "../../components/Homepage/Appbar";
import GetInformationJWT from "../../components/JWT/GetInformationJWT";
import Layoutspacing from "../../components/Layoutspacing";
import Footer from "../../components/Footer/Footer";
import { Box, Grid, Stack, Typography } from "@mui/material";
import NewsTrend from "./NewsOutstanding";
import CarouselItem from "./CarouselHome/ CarouselItem";
import RecipeItem from "./RecipeHome/RecipeItem";
import RecipeItemList from "./RecipeHome";
import { useGetRecipeByFilter } from "../../hook/useGetRecipeByFilter";
import { useGetAllRecipebyRating } from "../../hook/useGetAllRecipebyRating";
import BlogLatest from "./BlogLatest";

function HomePage() {
  const { allRecipebyRating } = useGetAllRecipebyRating({count:6});
  const { recipList: allRecipeFree } = useGetRecipeByFilter({ isfree: 2 });
  const { recipList: allRecipePaid } = useGetRecipeByFilter({ isfree: 1 });
  return (
    <div>
      <Appbar />
      <Box width={"85%"} marginX={"auto"}>
        <Grid container columnSpacing={4}>
          <Grid sx={{ width: "60%", height: "600px" }} item xs={8}>
            <CarouselItem />
          </Grid>
          <Grid sx={{ mb: 2 }} item xs={4}>
            <NewsTrend />
          </Grid>
        </Grid>
        <Box sx={{ width: "100%", marginX: "auto", mt: 6 }}>
          <RecipeItemList
            title={"Công thức yêu thích"}
            recipeItemLists={allRecipebyRating}
          />
        </Box>
        <Box sx={{ width: "100%", marginX: "auto", mt: 6 }}>
          <RecipeItemList
            title={"Công thức miễn phí mới"}
            recipeItemLists={allRecipeFree}
          />
        </Box>
        <Box sx={{ width: "100%", marginX: "auto", mt: 6 }}>
          <RecipeItemList
            title={"Công thức trả phí mới"}
            recipeItemLists={allRecipePaid}
          />
        </Box>
        <Box sx={{ width: "100%", marginX: "auto", mt: 6 }}>
        <Typography
        fontSize={20}
        textTransform={"uppercase"}
        fontWeight={"bold"}
        mb={2} color="#ff5e00"
      
      >
        Blog mới nhất
      </Typography>
         <BlogLatest/>
        </Box>
      </Box>
    </div>
  );
}

export default HomePage;
