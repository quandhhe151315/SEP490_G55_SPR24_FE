import { Box, Typography, Stack } from "@mui/material";
import NewsItem from "./NewsItem";
const newsData = [1, 2, 3, 4];
export default function NewsTrend() {
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
          sx={{ textAlign: "center", mt: 4 }}
        >
          Tin nổi bật
        </Typography>
      </Stack>

      <Stack sx={{ mt: 3, mx: 3 }}>
        {newsData.slice(0, 4).map((item, index) => (
          <NewsItem />
        ))}
      </Stack>
    </Box>
  );
}
