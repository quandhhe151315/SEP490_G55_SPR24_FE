import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

export default function BlogFilter({ setSearchKey, setSortKey }) {

  const [sort, setSort] = useState(''); 
  const [searchKeyInput, setSearchKeyInput] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSort(value);
    setSortKey(value); 
  };

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
        <Button
          sx={{ mr: 24, bgcolor: "#ff5e00",width: "100px",
          height: "40px"}}
          variant="contained" 
          onClick={() => setSearchKey(searchKeyInput)}
        >
          Tìm kiếm
        </Button>
        <Stack sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <FormControl sx={{ m: 1, minWidth: 136 }} size="small">
            <InputLabel id="demo-select-small-label">Sắp xếp theo</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={sort}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value="desc">Mới nhất</MenuItem>
              <MenuItem value="asc">Cũ nhất</MenuItem>
             
            </Select>
          </FormControl>
        </Stack>
      </Stack>
    </Stack>
  );
}
