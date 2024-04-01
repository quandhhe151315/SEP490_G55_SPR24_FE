import { Box, Stack, Typography } from "@mui/material";

export default function NewsItem() {
  return (
    <Box sx={{display:'flex',maxWidth:'420px',gap: '20px',mb:3}}>
     <Stack>
        <img
          src="https://lavenderstudio.com.vn/wp-content/uploads/2017/03/chup-san-pham.jpg"
          style={{
            width: "120px",
            height: "80px",
          }}
        />
      </Stack>
      <Stack>
        <Typography variant="h7" fontWeight={"bold"} >
          Những công thức nấu ăn bạn không nên bỏ lỡ trong tháng 2 co nhieu uu dai cho ban
        </Typography>
      </Stack>
    </Box>
  );
}
