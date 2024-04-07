import { Box, Stack, Typography } from "@mui/material";

export default function NewsItem({ item }) {
  return (
    <a href={`/ViewDetailNews/${item.newsId}`} style={{ textDecoration: "none",color:'black'}}>
    <Box sx={{display:'flex',maxWidth:'420px',gap: '20px',mb:3}}>
     <Stack>
        <img
          src={item?.featuredImage}
          style={{
            width: "120px",
            height: "80px",
          }}
        />
      </Stack>
      <Stack>
        <Typography variant="h7" fontWeight={"bold"} style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
         {item?.newsTitle}
        </Typography>
      </Stack>
    
    </Box>
    </a>
  );
}
