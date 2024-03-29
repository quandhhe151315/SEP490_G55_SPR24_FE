import React from "react";
import RecipeItem from "./RecipeItem";
import { Grid, Typography } from "@mui/material";

export default function RecipeItemList({ title, recipeItemLists }) {
  return (
    <>
      <Typography
        fontSize={20}
        textTransform={"uppercase"}
        fontWeight={"bold"}
        mb={2}
      >
        {title}
      </Typography>
      <Grid container columnSpacing={8} rowSpacing={8}>
        {recipeItemLists?.map((item, index) => {
          if (index < 6) {
            return (
              <Grid item xs={4}>
                <RecipeItem item={item} />
              </Grid>
            );
          }
        })}
      </Grid>
    </>
  );
}
