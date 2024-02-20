import { Avatar, Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";

export default function BlogItem(id) {
  const x =
    "Gợi Ý 4 Cách Nấu Cháo Yến Mạch Cho Bé Gợi Ý 4 Cách Nấu Cháo Yến Mạc Cho Bé Gợi Ý 4 Cách Nấu Cháo Yến Mạch Cho Bé";
  return (
    <a href={`/blog/${id}`}>
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
            {x}
          </Typography>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/600px-Good_Food_Display_-_NCI_Visuals_Online.jpg"
            height={200}
            width={"100%"}
            style={{ marginTop: "8px" }}
          />
          <Typography
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
          >
            Có thể mẹ chưa biết, yến mạch là loại thực phẩm chứa hàm lượng dinh
            dưỡng cũng như các khoáng chất thiết yếu cao.ẹ chưa biết, yến mạch
            là loại thực phẩm chứa hàm lượng dinh dưỡng cũng như các khoáng chất
            thiết yếu cao.
          </Typography>
          <Stack
            sx={{
              mt: 1,
              px: 1,
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
              <Typography>Do Hong Quan</Typography>
            </Stack>
            <Stack
              sx={{
                display: "flex",
                gap: 1,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography>0 thao luan</Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </a>
  );
}
