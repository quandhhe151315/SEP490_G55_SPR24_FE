import React from "react";
import RecipeItem from "./RecipeItem";
import { Grid, Typography } from "@mui/material";

export default function RecipeItemList({title, recipeItemList}) {
  const recipeItemList = Array.from({ length: 6 });
  return (
    <>
      <Typography
        variant="h5"
        textTransform={"uppercase"}
        fontWeight={"bold"}
        mb={4}
      >
        Đánh giá cao
      </Typography>
      <Grid container columnSpacing={8} rowSpacing={8}>
        {recipeItemList.map((item) => {
          return (
            <Grid item xs={4}>
              <RecipeItem />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
