import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useGetAllCountry } from "../../hook/useGetAllCountry";
import { useNavigate } from "react-router-dom";
import { LightTooltip } from "./IngredientHoverBtn";

export default function BtnHandleHoverItem() {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const navigate = useNavigate();
  const { allCountryList } = useGetAllCountry();
  return (
    <LightTooltip
      open={open}
      onClose={handleClose}
      onOpen={handleOpen}
      title={
        <Stack sx={{ height: "200px", width: "250px", overflow: "auto" }}>
          {allCountryList?.map((item) => {
            return (
              <Typography
                onClick={() =>
                  navigate(`/recipeListByFilter?countryId=${item?.countryId}`)
                }
                key={item?.countryId}
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
                {item?.countryName}
              </Typography>
            );
          })}
        </Stack>
      }
    >
      <Button sx={{ color: "#000000", fontWeight: "600", fontSize: "16px" }}>
        {"Quốc gia"}
      </Button>
    </LightTooltip>
  );
}
