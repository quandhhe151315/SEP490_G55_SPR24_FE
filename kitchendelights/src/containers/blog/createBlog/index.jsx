
import { TextField, Typography, Stack,Box,Select,MenuItem } from '@mui/material';
import React from 'react';
import QuillEditor from '../../../components/QuillEditor';
export default function CreateBlog(){
  return (
    <form>
    <Box>
    <Stack sx={{ backgroundColor: '#f0f0f0', padding: 2 }}>
      <Typography variant="h1" sx={{color: "#ff5e00"}}>Tạo Blog mới</Typography>
      <Typography variant="h8">
        Chia sẻ bí quyết nấu ăn ngon và các câu chuyện ẩm thực đến mọi người
      </Typography>
    </Stack>
    <Stack>
      <Typography variant="h5">Chọn chủ đề</Typography>
      <Select
          labelId="select-label"
          id="select"
          label="Select Option"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="option1">Option 1</MenuItem>
          <MenuItem value="option2">Option 2</MenuItem>
          <MenuItem value="option3">Option 3</MenuItem>
        </Select>
      <TextField
      label="Tiêu đề bài viết"
      variant="outlined"
      fullWidth
      margin="normal"
    />
    </Stack>
    <Stack>
      <QuillEditor/>
    </Stack>
  </Box>
  </form>
  )
  }

