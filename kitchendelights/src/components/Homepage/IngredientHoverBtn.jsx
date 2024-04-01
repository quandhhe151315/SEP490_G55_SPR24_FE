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
import { useGetAllIngredient } from "../../hook/useGetAllIngredient";

export default function IngredientHoverBtn() {
  const [anchorEl, setAnchorEl] = useState(false);
  const navigate = useNavigate();
  const { allIngredient } = useGetAllIngredient();
  return (
    <Stack position={"relative"}>
      <Button
        onClick={() => {
          setAnchorEl((anchorEl) => !anchorEl);
        }}
        color="secondary"
        size="large"
        variant="text"
        sx={{
          color: "#000000",
          fontWeight: "bold",
        }}
      >
        {"Nguyên lieu"}
      </Button>
      {anchorEl && (
        <Card
          sx={{
            minWidth: 275,
            position: "absolute",
            display: "flex",
            height: "200px",
            backgroundColor: "#ffffff",
            top: 50,
            overflow: "auto",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <CardContent>
            {allIngredient?.map((item) => {
              return (
                <Typography
                  onClick={() =>
                    navigate(
                      `/ViewListRecipes?ingredientId=${item?.ingredientId}`
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
          </CardContent>
        </Card>
      )}
    </Stack>
  );
}
