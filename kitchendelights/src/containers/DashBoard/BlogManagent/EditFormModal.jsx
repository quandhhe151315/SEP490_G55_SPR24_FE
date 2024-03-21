import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useGetAllCategory } from "../../../hook/useGetAllCategory";
import Cookies from "js-cookie";
import { Controller, useForm } from "react-hook-form";
import BlogEditor from "../../../components/TextEditor/BlogEditor";
import dayjs from "dayjs";
import { uploadImage } from "../../../services/BlogServices";
import { useGetBlogList } from "../../../hook/useGetBlogList";

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

export default function EditFormModal({ openModal, setOpenModal, id }) {
  const { blogList } = useGetBlogList({
    id: id,
    category: "",
    sort: "",
  });
  console.log(blogList);
  const handleClose = () => {
    setOpenModal(false);
    setIsChangeImage(false);
  };
  const [files, setFiles] = useState();
  const [isChangeImage, setIsChangeImage] = useState(false);
  const { categoriesList } = useGetAllCategory();
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
  React.useEffect(() => {
    reset(blogList);
  }, [blogList]);
  const userId = Cookies.get("userId");
  const onSubmit = async (data) => {
    if (!data?.blogTitle || !data?.blogContent) {
      setOpenSnackBar(true);
      setContentSnackbar("Vui lòng nhập đầy đủ tiêu đề và nội dung !");
      return;
    }
    if (files?.[0]) {
      await uploadImage(files?.[0], "blog").then((res) => {
        // createBlog({
        //   ...data,
        //   userId: Number(userId),
        //   blogStatus: 0,
        //   createDate: dayjs().toISOString(),
        //   blogImage: res,
        // })
        //   .then((res) => {
        //     if (res?.status) {
        //       setStatusPostBlog(res.status);
        //       setOpenSnackBar(true);
        //       reset({});
        //       setContentSnackbar("Đăng blog thành công");
        //     }
        //   })
        //   .catch((e) => {
        //     setStatusPostBlog(e?.response?.status);
        //     setOpenSnackBar(true);
        //     reset({});
        //     setContentSnackbar("Đã có lỗi xảy ra");
        //   });
      });
    } else {
      //   await createBlog({
      //     ...data,
      //     userId: Number(userId),
      //     blogStatus: 0,
      //     createDate: dayjs().toISOString(),
      //     blogImage: "",
      //   })
      //     .then((res) => {
      //       if (res.status) {
      //         setStatusPostBlog(res.status);
      //         setOpenSnackBar(true);
      //         reset({});
      //         setContentSnackbar("Đăng blog thành công");
      //       }
      //     })
      //     .catch((e) => {
      //       setStatusPostBlog(e?.response?.status);
      //       setOpenSnackBar(true);
      //       reset({});
      //       setContentSnackbar("Đã có lỗi xảy ra");
      //     });
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
                      style={{ height: 250 }}
                    />
                  )}
                />
              </Stack>
              {isChangeImage ? (
                <label htmlFor="choose_image" style={{}}>
                  <input
                    type="file"
                    accept="image/*"
                    id="choose_image"
                    style={{ overflow: "hidden", marginTop: "80px" }}
                    onChange={(event) => {
                      setFiles(event?.target?.files);
                    }}
                  />
                </label>
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
                    onClick={() => setIsChangeImage(true)}
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
    </div>
  );
}
