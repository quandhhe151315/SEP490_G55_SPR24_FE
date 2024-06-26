import { Avatar, Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";

export default function BlogItem({
  id,
  content,
  title,
  image,
  createDate,
  userName,
  blogImage,
  commentCount
}) {
  return (
    <a href={`/blog/${id}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          minWidth: 275,
          paddingX: 0,
          "& .MuiCardContent-root": {
            paddingX: 0,
          },
          "&.MuiCard-root": { borderRadius: 4 },
        }}
      >
        <CardContent>
          <Stack height={'50px'}>
            <Typography
              sx={{
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                px: 1,
              }}
              fontSize={18}
              fontWeight={600}
              WebkitLineClamp={1}
              variant="body1"
            >
              {title}
            </Typography>
          </Stack>
          <img
            src={
              blogImage ||
              "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/600px-Good_Food_Display_-_NCI_Visuals_Online.jpg"
            }
            height={200}
            width={"100%"}
            style={{ marginTop: "8px" }}
          />
          {/* <Typography
            variant="body2"
            mt={1}
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              px: 1,
              mt: 1,
            }}
          > */}
          <Stack height={"60px"} px={1}>
            <Stack
              dangerouslySetInnerHTML={{ __html: content }}
              sx={{
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
                px: 1,
                mt: 1,
              }}
            ></Stack>
          </Stack>

          {/* </Typography> */}
          <Stack
            sx={{
              mt: 1,
              px: 1.5,
              display: "flex",
              gap: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Stack
              sx={{
                display: "flex",
                gap: 1,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Avatar
                width={24}
                height={24}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/600px-Good_Food_Display_-_NCI_Visuals_Online.jpg"
              />
              <Typography sx={{fontWeight:'bold'}}>{userName}</Typography>
            </Stack>
            <Stack
              sx={{
                display: "flex",
                gap: 1,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography>{commentCount} thảo luận</Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </a>
  );
}
