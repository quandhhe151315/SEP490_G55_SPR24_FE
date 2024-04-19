import { useGetBlogList } from "../../../hook/useGetBlogList";
import BlogItem from "../../Blog/BlogList/BlogItem";
import { Grid, Typography, Stack } from "@mui/material";
import React, { useState } from "react";
import BlogHomeItem from "./BlogHomeItem";
import { useGetAdvertisementList } from "../../../hook/useGetAdvertisement";
import AdBanner from "../../../components/ADS/AdBanner";
import CloseIcon from "@mui/icons-material/Close";
export default function BlogLatest() {
  const [showAd, setShowAd] = useState(true);
  const handleCloseAds = () => {
    setShowAd(false);
  };
  const { blogList } = useGetBlogList({
    id: "",
  });
  const { advertisementList } = useGetAdvertisementList({
    id: "",
  });

  // Chỉ hiển thị 6 blog đầu tiên
  const slicedBlogList = blogList?.slice(0, 6);

  return (
    <div>
      <Grid>
        <Grid
          container
          rowSpacing={4}
          mt={2}
          height={"100%"}
          width={"100%"}
          xs={8}
        >
          {slicedBlogList?.filter(item => item.blogStatus === 1).map((item, index) => (
            <Grid item xs={12} key={`${item?.blogId}+${index}`}>
              <BlogHomeItem
                title={item?.blogTitle}
                id={item?.blogId}
                content={item?.blogContent}
                createDate={item?.createDate}
                userName={item?.userName}
                blogImage={item?.blogImage}
                commentCount={item?.commentCount}
              />
            </Grid>
          ))}
        </Grid>
        <AdBanner/>
        {/* <Grid item xs={4}>
        {showAd && (
          <div style={{ position: "relative" }}>
          <button
            onClick={handleCloseAds}
            style={{ position: "absolute", top: 8, right: -30,borderRadius:'50%',color: "#fff",cursor:'pointer',backgroundColor:'#ff5e00'}}
          >
            <CloseIcon />
          </button>
            <a
              href={advertisementList?.[0]?.advertisementLink}
              target="_blank"
              style={{
                textDecoration: "none",
                textTransform: "uppercase",
                color: "#ff5e00",
              }}
            >
             
              <Stack sx={{ height: "350px", my: 9 }}>
               
                <Typography sx={{ textAlign: "center", mb: 2 }}>
                  Quảng cáo
                </Typography>
                <img
                  src={advertisementList?.[0]?.advertisementImage}
                  style={{ width: "100%", height: "350px", objectFit: "cover" }}
                />
              </Stack>
            </a>
            
        
           </div>
             )}
        </Grid> */}
      </Grid>
    </div>
  );
}
