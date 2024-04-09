import { Box, Typography, Stack } from "@mui/material";
import NewsItem from "./NewsItem";
export default function NewsTrend({newsItemLists}) {
  return (
    <Box
      sx={{
        height: "500px",
        width: "386px",
        bgcolor: "rgba(255, 165, 0, 0.1)",
        position: "relative",
      }}
    >
      <Stack>
        <Typography
          variant="h5"
          fontWeight={"bold"}
          sx={{ textAlign: "center", mt: 4,color:"#ff5e00" }}
        >
          Tin nổi bật
        </Typography>
      </Stack>

      <Stack sx={{ mt: 3, mx: 3 }}>
      {newsItemLists?.map((item, index) => {
          if (index < 4) {
            return (
              
              <NewsItem item={item}/>
            );
          }
        })}
       
      </Stack>
    </Box>
  );
}
