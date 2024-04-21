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
  Alert,
  Snackbar,
} from "@mui/material";
import React, { useState } from "react";
import BlogEditor from "../../../components/TextEditor/BlogEditor.jsx";
import CreateIcon from "@mui/icons-material/Create";
import { Controller, useForm } from "react-hook-form";
import cookies from "js-cookie";
import dayjs from "dayjs";
import { createBlog } from "../../../services/ApiServices.jsx";
import { useGetAllCategory } from "../../../hook/useGetAllCategory.js";
import { uploadImage } from "../../../services/BlogServices.jsx";
import { useGetCategoryByParentId } from "../../../hook/useGetCategoryByParentId.js";
import { useNavigate } from "react-router-dom";

export default function CreateFormItem() {
  const navigate = useNavigate();
  const [files, setFiles] = useState();
  const { categoryByParentId } = useGetCategoryByParentId({
    categoryType: false,
  });
  const { categoryByParentId: categoriesList } = useGetCategoryByParentId({
    categoryType: false,
    parentId: categoryByParentId?.[0]?.categoryId,
  });
  const [statusPostBlog, setStatusPostBlog] = useState();
  const [openSnackbar, setOpenSnackBar] = useState(false);
  const [contentSnackbar, setContentSnackbar] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();
  const userId = cookies.get("userId");
  const onSubmit = async (data) => {
    if (!userId) {
      setOpenSnackBar(true);
      setContentSnackbar("Vui lòng đăng nhập để đăng blog");
      return;
    }
    if (!data?.blogTitle || !data?.blogContent) {
      setOpenSnackBar(true);
      setContentSnackbar("Vui lòng nhập đầy đủ tiêu đề và nội dung !");
      return;
    }
    if (!files?.[0]) {
      setOpenSnackBar(true);
      setContentSnackbar("Vui lòng nhập ảnh !");
      return;
    }
    if (files?.[0]) {
      await uploadImage(files?.[0], "blog").then((res) => {
        createBlog({
          ...data,
          userId: Number(userId),
          blogStatus: 0,
          createDate: dayjs().toISOString(),
          blogImage: res,
        })
          .then((res) => {
            if (res?.status) {
              setStatusPostBlog(res.status);
              setOpenSnackBar(true);
              reset({});
              setContentSnackbar("Đăng blog thành công");
              navigate("/blog");
            }
          })
          .catch((e) => {
            setStatusPostBlog(e?.response?.status);
            setOpenSnackBar(true);
            reset({});
            setContentSnackbar("Đã có lỗi xảy ra");
          });
      });
    }
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
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 4,
              position: "relative", // Đặt position: relative; cho container của nút
            }}
          >
            <label
              htmlFor="choose_image"
              style={{
                display: "inline-block",
                marginBottom: "10px",
                position: "absolute",
                left: 0,
              }}
            >
              <Button
                variant="contained"
                component="span"
                sx={{
                  backgroundColor: "#ff5e00",
                  "&:hover": {
                    backgroundColor: "#FFCF96",
                  },
                }}
              >
                {files?.[0]?.name ? (
                  <Typography>{files?.[0]?.name}</Typography>
                ) : (
                  <>
                    <CreateIcon sx={{ marginRight: "6px", fontSize: "16px" }} />
                    Chọn ảnh
                  </>
                )}
              </Button>
            </label>
            {/* Input chọn ảnh */}
            <input
              type="file"
              accept="image/*"
              id="choose_image"
              multiple={false}
              style={{ display: "none" }}
              onChange={(event) => {
                if (!!event?.target?.files?.[0]?.name) {
                  setFiles(event?.target?.files);
                }
              }}
            />
            {/* Nút đăng bài */}
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#ff5e00",
                "&:hover": {
                  backgroundColor: "#FFCF96",
                },
                mt: 10,
              }}
            >
              <CreateIcon sx={{ marginRight: "6px", fontSize: "16px" }} />
              Đăng bài
            </Button>
          </Stack>
        </>
      </form>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openSnackbar}
        onClose={() => setOpenSnackBar(false)}
      >
        <Alert
          onClose={() => setOpenSnackBar(false)}
          severity={statusPostBlog < 400 ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {contentSnackbar}
        </Alert>
      </Snackbar>
    </Box>
  );
}
