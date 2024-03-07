import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";

export default function BlogContent() {
  return (
    <Stack sx={{ mt: 2 }}>
      <Stack>
        <Typography fontSize={24} fontWeight={500}>
          Top 4 Combo Cơm Nhà "Chuẩn Vị Mẹ Nấu" Dành Cho Những Người Con Xa Quê
        </Typography>
        <Stack direction={"row"} justifyContent={"start"} alignItems={"center"}>
          <Stack direction={"row"} alignItems={"center"} gap={2}>
            <Avatar>A</Avatar>
            <Typography>Đỗ Hồng Quân</Typography>
          </Stack>
          <Stack>
            <Typography>24/02/2024</Typography>
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
        <Typography>
          Bạn cho dầu vào chảo, dầu nóng cho vào tỏi, ớt, hành tím vào phi vàng.
          Kế đến thêm 3 muỗng canh nước mắm, 2 muỗng cafe bột nêm, 1 muỗng cafe
          bột ngọt 1/2 muỗng cafe muối 1 muỗng canh tương ớt, 2 muỗng canh cà
          hộp, đảo đều rồi đun trên lửa vừa đến khi hỗn hợp hòa quyện.Bạn cho
          dầu vào chảo, dầu nóng cho vào tỏi, ớt, hành tím vào phi vàng. Kế đến
          thêm 3 muỗng canh nước mắm, 2 muỗng cafe bột nêm, 1 muỗng cafe bột
          ngọt 1/2 muỗng cafe muối 1 muỗng canh tương ớt, 2 muỗng canh cà hộp,
          đảo đều rồi đun trên lửa vừa đến khi hỗn hợp hòa quyện.
        </Typography>
      </Stack>
    </Stack>
  );
}
