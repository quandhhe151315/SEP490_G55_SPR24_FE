import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  ClickAwayListener,
  Menu,
  MenuItem,
  Typography,
  styled,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useGetAllCountry } from "../../hook/useGetAllCountry";
import { useNavigate } from "react-router-dom";
import { useGetAllIngredient } from "../../hook/useGetAllIngredient";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

export const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip
    placement="bottom-start"
    {...props}
    classes={{ popper: className }}
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));
export default function IngredientHoverBtn() {
  const navigate = useNavigate();
  const { allIngredient } = useGetAllIngredient();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <LightTooltip
      open={open}
      onClose={handleClose}
      onOpen={handleOpen}
      title={
        <Stack sx={{ height: "200px", width: "250px", overflow: "auto" }}>
          {allIngredient?.map((item) => {
            return (
              <Typography
                onClick={() =>
                  navigate(
                    `/recipeListByFilter?ingredientId=${item?.ingredientId}`
                  )
                }
                key={item?.ingredientId}
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
                {item?.ingredientName}
              </Typography>
            );
          })}
        </Stack>
      }
    >
      <Button sx={{ color: "#000000", fontWeight: "600", fontSize: "16px" }}>
        Nguyên liệu
      </Button>
    </LightTooltip>
  );
}
