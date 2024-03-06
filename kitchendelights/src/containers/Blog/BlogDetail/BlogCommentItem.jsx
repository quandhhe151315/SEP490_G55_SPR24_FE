import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";

export default function BlogCommentItem() {
  return (
    <Stack direction={"row"} columnGap={2}>
      <Avatar>B</Avatar>
      <Stack>
        <Typography fontWeight={600}>Đỗ Hồng Quân</Typography>
        <Typography>
          cafe bột ngọt 1/2 muỗng cafe muối 1 muỗng canh tương ớt, 2 muỗng canh
          cà hộp, đảo đều rồi đun trên lửa vừa đến khi hỗn hợp hòa quyện.
        </Typography>
      </Stack>
    </Stack>
  );
}
