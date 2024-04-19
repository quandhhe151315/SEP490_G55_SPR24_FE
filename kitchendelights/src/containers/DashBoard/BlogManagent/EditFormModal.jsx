import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useGetAllCategory } from "../../../hook/useGetAllCategory";
import Cookies from "js-cookie";
import { Controller, useForm } from "react-hook-form";
import BlogEditor from "../../../components/TextEditor/BlogEditor";
import dayjs from "dayjs";
import { updateBlog, uploadImage } from "../../../services/BlogServices";
import { useGetBlogList } from "../../../hook/useGetBlogList";
import { useGetCategoryByParentId } from "../../../hook/useGetCategoryByParentId";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  px: 4,
  py: 2,
  height: "90%",
};

export default function EditFormModal({
  openModal,
  setOpenModal,
  id,
  setBlogList,
  blogLists,
}) {
  const { blogList } = useGetBlogList({
    id: id,
    category: "",
    sort: "",
  });
  const handleClose = () => {
    setOpenModal(false);
    setIsChangeImage(false);
  };
  const { categoryByParentId } = useGetCategoryByParentId({
    categoryType: false,
  });
  const { categoryByParentId: categoriesList } = useGetCategoryByParentId({
    categoryType: true,
    parentId: categoryByParentId?.[0]?.categoryId,
  });
  const [files, setFiles] = useState();
  const [isChangeImage, setIsChangeImage] = useState(false);
  const [statusPostBlog, setStatusPostBlog] = React.useState();
  const [openSnackbar, setOpenSnackBar] = useState(false);
  const [contentSnackbar, setContentSnackbar] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();
  const [imgUrl, setImgUrl] = useState("");
  React.useEffect(() => {
    const currentBlog = blogLists?.find((item) => item?.blogId === id);
    setImgUrl(currentBlog?.blogImage);
    reset({
      ...blogList,
      blogTitle: currentBlog?.blogTitle,
      blogContent: currentBlog?.blogContent,
      blogImage: currentBlog?.blogImage,
      categoryId: currentBlog?.categoryId,
    });
  }, [blogList, blogLists]);
  const userId = Cookies.get("userId");
  const onSubmit = async (data) => {
    if (!imgUrl && !files?.[0]) {
      setOpenSnackBar(true);
      setContentSnackbar("Vui lòng nhập ảnh !");
      return;
    }
    if (!data?.blogTitle || !data?.blogContent) {
      setOpenSnackBar(true);
      setContentSnackbar("Vui lòng nhập đầy đủ tiêu đề và nội dung !");
      return;
    }
    if (files?.[0]) {
      await uploadImage(files?.[0], "blog").then((res) => {
        updateBlog({
          ...data,
          blogImage: res,
        })
          .then((res) => {
            if (res?.status) {
              const newBlogList = blogLists?.map((item) => {
                if (item?.blogId === data?.blogId) {
                  return data;
                }
                return item;
              });
              setBlogList(newBlogList);
              setStatusPostBlog(res.status);
              setOpenSnackBar(true);
              reset({});
              setContentSnackbar("Sua blog thành công");
              handleClose();
              setFiles([]);
            }
          })
          .catch((e) => {
            setStatusPostBlog(e?.response?.status);
            setOpenSnackBar(true);
            reset({});
            setContentSnackbar("Đã có lỗi xảy ra");
          });
      });
    } else {
      await updateBlog({
        ...data,
      })
        .then((res) => {
          if (res.status) {
            const newBlogList = blogLists?.map((item) => {
              if (item?.blogId === data?.blogId) {
                return data;
              }
              return item;
            });
            console.log(newBlogList);
            setBlogList(newBlogList);
            setStatusPostBlog(res.status);
            setOpenSnackBar(true);
            reset({});
            setContentSnackbar("Sua blog thành công");
            handleClose();
            setFiles([]);
          }
        })
        .catch((e) => {
          setStatusPostBlog(e?.response?.status);
          setOpenSnackBar(true);
          reset({});
          setContentSnackbar("Đã có lỗi xảy ra");
        });
    }
  };
  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel>Chọn chủ đề</InputLabel>
                  <Controller
                    control={control}
                    name="categoryId"
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <Select onChange={onChange} value={value} inputRef={ref}>
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
                      style={{ height: 250 }}
                    />
                  )}
                />
              </Stack>

              {isChangeImage ? (
                <>
                  <label
                    htmlFor="choose_image"
                    style={{ display: "inline-block", marginBottom: "10px" }}
                  >
                    <Button
                      variant="contained"
                      component="span"
                      sx={{
                        backgroundColor: "#ff5e00",
                        "&:hover": {
                          backgroundColor: "#FFCF96",
                        },mt:8
                      }}
                    >
                      {files?.[0]?.name ? (
                        <Typography>{files?.[0]?.name}</Typography>
                      ) : (
                        <>Chọn ảnh</>
                      )}
                    </Button>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    id="choose_image"
                    multiple={false}
                    style={{ display: "none" }}
                    onChange={(event) => {
                      if (!!event?.target?.files?.[0]?.name) {
                        console.log(234);
                        setFiles(event?.target?.files);
                      }
                    }}
                  />
                </>
              ) : (
                <Stack
                  width={200}
                  height={200}
                  mt={10}
                  sx={{ position: "relative" }}
                >
                  <img src={blogList?.blogImage} />
                  <Stack
                    style={{
                      position: "absolute",
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      top: 1,
                      right: 1,
                      backgroundColor: "#ddd",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#ffffff",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setIsChangeImage(true);
                      setImgUrl("");
                    }}
                  >
                    X
                  </Stack>
                </Stack>
              )}
              <Stack
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  bottom: 4,
                  right: 2,
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
                  Sửa bài đăng
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Modal>
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
    </div>
  );
}
