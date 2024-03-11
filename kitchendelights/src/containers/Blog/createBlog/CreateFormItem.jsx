import {
  TextField,
  Typography,
  Stack,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import React from "react";
import BlogEditor from "../../../components/TextEditor/BlogEditor.jsx";
import CreateIcon from "@mui/icons-material/Create";
import { useCreateBlog } from "../../../hook/useCreateBlog.js";
import { useEffect, useRef } from "react";
import { mutate } from "swr";
import { useGetCategoryList } from "../../../hook/useGetCategoryList.js";
import { Controller, useForm } from "react-hook-form";
import cookies from "js-cookie";
import dayjs from "dayjs";
import { createBlog } from "../../../services/ApiServices.jsx";

export default function CreateFormItem() {
  const editorRef = useRef(null);
  const { categoriesList } = useGetCategoryList();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const userId = cookies.get('userId')
  const onSubmit = async (data) => {
    const x = await createBlog({
      ...data,
      userId: Number(userId),
      blogStatus: 0,
      createDate: dayjs().toISOString(),
    });

    
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Stack sx={{ backgroundColor: "#f0f0f0", padding: 2 }}>
        <Typography variant="h5" sx={{ color: "#ff5e00" }}>
          Tạo Blog mới
        </Typography>
        <Typography variant="h8">
          Chia sẻ bí quyết nấu ăn ngon và các câu chuyện ẩm thực đến mọi người
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ marginTop: "20px" }}
          >
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <InputLabel>Chọn chủ đề</InputLabel>
              <Controller
                control={control}
                name="categoryId"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Select onChange={onChange} value={value}>
                    {categoriesList?.map((item, index) => {
                      return (
                        <MenuItem
                          value={item?.categoryId}
                          key={"category" + index}
                        >
                          {item?.categoryName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
              />
            </FormControl>
            <Controller
              control={control}
              name="blogTitle"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <TextField
                  label="Tiêu đề bài viết"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </Stack>
          <Stack sx={{ marginTop: "20px" }}>
            <Controller
              control={control}
              name="blogContent"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <BlogEditor
                  value={value}
                  onChange={(value) => {
                    onChange(value);
                  }}
                />
              )}
            />
          </Stack>
          <label htmlFor="choose_image" style={{}}>
            <input
              type="file"
              id="choose_image"
              style={{ overflow: "hidden", marginTop: "80px" }}
            />
          </label>
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 4,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{
                mx: "0",
                width: "150px",
                backgroundColor: "#ff5e00",
                "&:hover": {
                  backgroundColor: "#FFCF96",
                },
              }}
            >
              <CreateIcon sx={{ marginRight: "6px", fontSize: "16px" }} />
              Đăng bài
            </Button>
          </Stack>
        </>
      </form>
    </Box>
  );
}
