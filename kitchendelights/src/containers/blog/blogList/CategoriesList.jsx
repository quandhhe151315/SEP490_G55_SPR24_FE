import { Stack, Box } from "@mui/material";
import React from "react";
import { useGetAllCategory } from "../../../hook/useGetAllCategory";

export default function CategoriesList({ categorySelect, setCategorySelect }) {
  const { categoriesList } = useGetAllCategory();
  return (
    <Stack sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 2 }}>
      {categoriesList?.map((item) => {
        return (
          <div onClick={() => setCategorySelect(item?.categoryId)}>
            <Box
              sx={{
                borderRadius: "28px",
                py: 1.5,
                px: 3,
                display: "flex",
                alignItems: "center",
                transition: " 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                boxShadow:
                  "0px 1px 1px 0px rgba(0,0,0,0.12),0px 1px 1px 0px rgba(0,0,0,0.12), 0px 1px 1px 0px rgba(0,0,0,0.12), 0px 1px 1px 0px rgba(0,0,0,0.12)",
                overflow: "hidden",
                cursor: "pointer",
                ":hover": {
                  color: "#ffffff",
                  bgcolor: "#FF642F",
                },
                color: categorySelect === item?.categoryId && "#ffffff",
                bgcolor:
                  categorySelect === item?.categoryId ? "#FF642F" : "#fff",
              }}
            >
              {item?.categoryName}
            </Box>
          </div>
        );
      })}
    </Stack>
  );
}
