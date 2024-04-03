import React from "react";
import { Card, Typography, Avatar, Button, Divider } from "@mui/material";

export default function BlogItemUser() {
  return (
    <div>
      <Card variant="outlined">
        <div style={{ padding: "16px" }}>
          <Typography variant="h6">
            Có phải chỉ kinh doanh mới giàu có lên được?
          </Typography>
          <Divider />
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar variant="rounded" src="https://i.imgur.com/avatar.png" />
            <Typography variant="body1" style={{ marginLeft: "8px" }}>
              Siêu nhân xanh lá
            </Typography>
          </div>
          <Typography variant="body1" style={{ marginTop: "8px" }}>
            Hiện tại t vẫn đang làm tròn trách nhiệm với vợ con, và có thời gian
            để chăm lo sức khỏe bản thân nữa
          </Typography>
        </div>
      </Card>
    </div>
  );
}
