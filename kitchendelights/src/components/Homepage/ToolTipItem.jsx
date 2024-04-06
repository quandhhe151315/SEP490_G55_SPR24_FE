import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { LightTooltip } from "./IngredientHoverBtn";
import { useGetCategoryByParentId } from "../../hook/useGetCategoryByParentId";

export default function TooltipItem({ categoryItem }) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const navigate = useNavigate();
  const { categoryByParentId } = useGetCategoryByParentId(
    categoryItem?.categoryId,categoryItem?.categoryType
  );
  return (
    <LightTooltip
      open={open}
      onClose={handleClose}
      onOpen={handleOpen}
      title={
        <Stack sx={{ height: "200px", width: "250px", overflow: "auto" }}>
          {categoryByParentId?.map((item) => {
            return (
              <Typography
                onClick={() =>
                  navigate(
                    `/recipeListByFilter?childCategoryId=${item?.categoryId}`
                  )
                }
                key={item?.categoryId}
                sx={{
                  color: "#000",
                  px: 1.5,
                  py: 1,
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  ":hover": {
                    bgcolor: "#ff5e00",
                    color: "#ffffff",
                  },
                  cursor: "pointer",
                }}
              >
                {item?.categoryName}
              </Typography>
            );
          })}
        </Stack>
      }
    >
      <Button sx={{ color: "#000000", fontWeight: "600", fontSize: "16px" }}>
        {categoryItem?.categoryName}
      </Button>
    </LightTooltip>
  );
}
