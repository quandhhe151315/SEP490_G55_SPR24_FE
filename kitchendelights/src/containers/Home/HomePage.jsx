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

function HomePage() {
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
        <Box sx={{ width: "100%", marginX: "auto" }}>
     
          <RecipeItemList />
        </Box>
      </Box>
    </div>
  );
}

export default HomePage;
