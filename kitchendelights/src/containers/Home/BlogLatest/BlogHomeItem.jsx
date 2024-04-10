import {
  Avatar,
  Card,
  CardContent,
  Stack,
  Typography,
  Grid,
} from "@mui/material";
import React from "react";

export default function BlogHomeItem({
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
          <Grid container columnSpacing={2}>
            <Grid xs={4} item>
              <img
                src={
                  blogImage ||
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/600px-Good_Food_Display_-_NCI_Visuals_Online.jpg"
                }
                height={160}
                width={"100%"}
                style={{ marginTop: "8px" }}
              />
            </Grid>
            <Grid xs={8} item>
              <Stack justifyContent={"space-between"} height={"100%"}>
                <Stack height={"60px"} px={1}>
                  <Typography fontSize={20} fontWeight={600}>
                    {title}
                  </Typography>
                  <Stack >
                    <Typography
                      sx={{
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 3,
                      }}
                      WebkitLineClamp={1}
                      variant="body1"
                    >
                      {content}
                    </Typography>
                  </Stack>
                </Stack>

                <Stack
                  sx={{
                    px: 1.5,
                    display: "flex",
                    gap: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "end",
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
                    <Typography>{userName}</Typography>
                  </Stack>
                  <Stack
                    sx={{
                      display: "flex",
                      gap: 1,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Typography>{commentCount} thao luan</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </a>
  );
}
