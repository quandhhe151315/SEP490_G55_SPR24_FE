import React from "react";
import { Button, Paper } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { useGetAdvertisement } from "../../../hook/useGetAdvertisement";
import { useGetAllRecipebyRating } from "../../../hook/useGetAllRecipebyRating";

export default function CarouselItem(props) {
  const { allRecipebyRating } = useGetAllRecipebyRating({ count: 6 });

  return (
    <Carousel>
      {allRecipebyRating?.map((item, i) => {
        if (i < 6) {
          return <Item key={i} image={item?.featuredImage} />;
        }
      })}
    </Carousel>
  );
}

function Item(props) {
  return (
    <Paper sx={{ height: "500px" }}>
      <img
        src={props.image}
        alt="Ảnh về tin tức của bài viết"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </Paper>
  );
}
