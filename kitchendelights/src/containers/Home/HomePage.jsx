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
import { useGetAllRecipeASCbyRating } from "../../hook/useGetAllRecipeASCbyRating";
import { useGetAllRecipePaid } from "../../hook/useGetAllRecipePaid";
import { useGetAllRecipeFree } from "../../hook/useGetAllRecipeFree";

function HomePage() {
  const { allRecipeASCbyRating } = useGetAllRecipeASCbyRating();
  const { allRecipePaid } = useGetAllRecipePaid();
  const { allRecipeFree } = useGetAllRecipeFree();
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
            title={"Công thức giảm giá"}
            recipeItemLists={allRecipeASCbyRating}
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
      </Box>
    </div>
  );
}

export default HomePage;
