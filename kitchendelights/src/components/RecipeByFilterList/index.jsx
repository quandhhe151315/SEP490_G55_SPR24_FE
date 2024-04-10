import React from "react";
import PrimarySearchAppBar from "../Homepage/Appbar";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { useGetRecipeByFilter } from "../../hook/useGetRecipeByFilter";
import { Box, Grid } from "@mui/material";
import RecipeItemList from "../../containers/Home/RecipeHome";

export default function RecipeByFilter() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ingredientId = queryParams.get("ingredientId");
  const countryId = queryParams.get("countryId");
  const childCategoryId = queryParams.get("childCategoryId");

  const { recipList, error,isLoading } = useGetRecipeByFilter({
    country: countryId,
    ingredient: ingredientId,
    category: childCategoryId,
  });
  if (!recipList || recipList.length === 0) {
    return (
      <div>
        <PrimarySearchAppBar />
        <Box width={"85%"} marginX={"auto"} height={"600px"} sx={{color:"#ff5e00",textTransform:'uppercase'}}>
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
          <RecipeItemList title={""} recipeItemLists={recipList} />
        </Box>
      </Box>
    </div>
  );
}
