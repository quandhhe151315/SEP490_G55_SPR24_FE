import { Grid, Stack } from "@mui/material";
import React, { useState } from "react";
import BlogItem from "./BlogItem";
import CategoriesList from "./CategoriesList";
import BlogFilter from "./BlogFilter";
import InfiniteScroll from "react-infinite-scroll-component";

export default function BlogList() {
  const [value, setValues] = useState(
    Array.from({ length: 3 })?.map((item, index) => {
      return {
        x: "index",
      };
    })
  );
  const fetchMoreData = () => {
    console.log("abc");
    const x = Array.from({ length: value?.length + 3 })?.map((item, index) => {
      return {
        x: "index",
      };
    });
    setValues(x);
  };
  return (
    <Stack width={"100%"} height={"100%"} bgcolor={"#F9F9F9"} pt={4}>
      <Stack sx={{ marginX: "auto", maxWidth: "80%", px: 4 }}>
        <BlogFilter />
        <CategoriesList />
        <Grid
          container
          columnSpacing={3}
          mt={2}
          height={"100%"}
          mx={0}
          width={"100%"}
        >
          <InfiniteScroll
            dataLength={value?.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              rowGap: "24px",
              height: "800px",
            }}
          >
            {value?.map((item, index) => {
              return (
                <Grid item xs={3.8} key={index}>
                  <BlogItem />
                </Grid>
              );
            })}
          </InfiniteScroll>
        </Grid>
      </Stack>
    </Stack>
  );
}
