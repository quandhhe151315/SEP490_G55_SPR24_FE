import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import dayjs from "dayjs";
export default function BlogContent({
  title,
  content,
  image,
  createDate,
  userName,
}) {
  return (
    <Stack sx={{ mt: 2 }}>
      <Stack>
        <Typography fontSize={24} fontWeight={500}>
          {title}
        </Typography>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Stack direction={"row"} alignItems={"center"} gap={2}>
            <Avatar>A</Avatar>
            <Typography>{userName}</Typography>
          </Stack>
          <Stack>
            <Typography>{dayjs(createDate).format("DD/MM/YYYY")}</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack mt={4}>
        <img
          src="https://cdn.tgdd.vn/Files/2022/03/12/1420043/30-status-caption-nau-an-mua-dich-cuc-doc-dao-va-thu-vi-202203122354092008.jpg"
          width={"100%"}
          height={"400px"}
          style={{
            objectFit: "cover",
            borderRadius: "4px",
          }}
        />
      </Stack>
      <Stack mt={2}>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </Stack>
    </Stack>
  );
}
