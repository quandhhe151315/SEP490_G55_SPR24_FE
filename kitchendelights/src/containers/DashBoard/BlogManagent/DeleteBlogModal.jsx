import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { deleteBlog } from "../../../services/BlogServices";
import { Alert, Snackbar } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function DeleteBlogModal({
  openDelModal,
  setOpenDelModal,
  delId,
  setBlogList,
  blogList,
}) {
  const handleClose = () => setOpenDelModal(false);
  const [statusPostBlog, setStatusPostBlog] = React.useState();
  const [openSnackbar, setOpenSnackBar] = React.useState(false);
  const [contentSnackbar, setContentSnackbar] = React.useState("");
  const handleDelBlog = async () => {
    await deleteBlog(delId)
      .then((res) => {
        setBlogList(blogList?.filter((item) => item?.blogId !== delId));
        setStatusPostBlog(res.status);
        setOpenSnackBar(true);
        setContentSnackbar("Xoá blog thành công");
        handleClose();
      })
      .catch((er) => {
        setStatusPostBlog(er?.response?.status);
        setOpenSnackBar(true);
        setContentSnackbar("Đã có lỗi xảy ra");
        handleClose();
        throw er;
      });
    setOpenDelModal(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={openDelModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Bạn có chắc chắn muốn xóa blog này?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDelBlog}>Xoá</Button>
          <Button onClick={handleClose} autoFocus>
            Huỷ
          </Button>
        </DialogActions>
      </Dialog>
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
    </React.Fragment>
  );
}
