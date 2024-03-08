
import { TextField, Typography, Stack,Box,Select,MenuItem,FormControl,InputLabel,Button } from '@mui/material';
import React from 'react';
import BlogEditor from '../../../components/TextEditor/BlogEditor.jsx';
import CreateIcon from '@mui/icons-material/Create';
import { useCreateBlog } from '../../../hook/useCreateBlog.js';
import { useEffect, useRef } from "react";
import {mutate} from "swr";
export default function CreateFormItem(){
  const { data, isLoading, error } = useCreateBlog();
  const editorRef = useRef(null);
  useEffect(() => {
    if (data) {
       
        editorRef.current?.setContent(data.content); 
    }
}, [data]);
  return (
    <Box sx={{width:'100%'}}>
    <Stack sx={{ backgroundColor: '#f0f0f0', padding: 2 }}>
      <Typography variant="h5" sx={{color: "#ff5e00"}}>Tạo Blog mới</Typography>
      <Typography variant="h8">
        Chia sẻ bí quyết nấu ăn ngon và các câu chuyện ẩm thực đến mọi người
      </Typography>
    </Stack>
    <Stack direction="row" spacing={2} alignItems="center" sx={{marginTop:'20px'}}>

    <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel>Chọn chủ đề</InputLabel>
        <Select
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Twenty</MenuItem>
          <MenuItem value={21}>Twenty one</MenuItem>
          <MenuItem value={22}>Twenty one and a half</MenuItem>
        </Select>
      </FormControl>
      <TextField
      label="Tiêu đề bài viết"
      variant="outlined"
      fullWidth
      margin="normal"
    />
    </Stack>
    <Stack sx={{marginTop:'20px'}}>
       <BlogEditor />
       <Stack sx={{justifyContent:"center",alignItems:'center'}}><Button variant="contained" sx={{mx:'0',marginTop:'100px',width:'150px',    backgroundColor: '#ff5e00', '&:hover': {
            backgroundColor: '#FFCF96', 
          },}}  onClick={() => {
            // Access editor content from BlogEditor (modify as needed)
            const content = editorRef.current?.getContent();
            if (content) {
                mutate(content); // Trigger API call with content
            } else {
                // Handle case where content is empty
            }
        }}>
            <CreateIcon sx={{marginRight:'6px',fontSize:'16px'}}/>Đăng bài</Button></Stack>
    </Stack>
    
  </Box>
  )
  }

