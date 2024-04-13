import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

export default function BlogFilter({ setSearchKey }) {
  const [searchKeyInput, setSearchKeyInput] = useState("");
  return (
    <Stack
      className=""
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <input
          style={{
            height: "36px",
            borderRadius: "10px",
            outline: "none",
            border: "1px",
            borderStyle: "solid",
            borderColor: "#ccc",
            paddingLeft: "16px",
            minWidth: "600px",
          }}
          onChange={(e) => {
            if (!e.target.value) {
              setSearchKey("");
            }
            setSearchKeyInput(e.target.value);
          }}
          placeholder="Tìm kiếm bài viết"
        ></input>
        <Button sx={{mr:28,bgcolor:'#ff5e00'}}
          variant="contained"
          onClick={() => setSearchKey(searchKeyInput)}
        >
          Tìm kiếm
        </Button>
        <Stack sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <Typography>Sắp xếp theo: </Typography>
          <Typography>Mới nhất</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
