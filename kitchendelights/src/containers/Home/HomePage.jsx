import React, { useEffect, useState } from "react";
import Appbar from "../../components/Homepage/Appbar";
import GetInformationJWT from "../../components/JWT/GetInformationJWT";
import Layoutspacing from "../../components/Layoutspacing";
import Footer from "../../components/Footer/Footer";
import { Box, Stack, Typography } from "@mui/material";
import NewsTrend from "./NewsOutstanding";
import CarouselItem from "./CarouselHome/ CarouselItem";
import RecipeItem from "./RecipeHome/RecipeItem";

function HomePage() {
  return (
    <div>
      <Appbar />
      <Box sx={{ml:10}}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Stack sx={{ width: '60%',height:'600px',mr:4 }}><CarouselItem/></Stack>
          <Stack sx={{ mb: 2,mr:12 }}>
            <NewsTrend />
          </Stack>
        </Box>
        <Box>
        <Typography variant="h5" textTransform={'uppercase'} fontWeight={'bold'} textAlign={'center'}>Đánh giá cao</Typography>
          <RecipeItem/>
        </Box>
      </Box>
    </div>
  );
}

export default HomePage;
