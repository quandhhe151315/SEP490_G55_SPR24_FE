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

export default function BtnHandleHoverItem() {
  const [anchorEl, setAnchorEl] = useState(false);
  const navigate = useNavigate();
  const { allCountryList } = useGetAllCountry();
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
        {"Quốc gia"}
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
            {allCountryList?.map((item) => {
              return (
                <Typography
                  onClick={() =>
                    navigate(`/ViewListRecipes?countryId=${item?.countryId}`)
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
          </CardContent>
        </Card>
      )}
    </Stack>
  );
}
