import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { deleteBlog, updateBlog } from "../../../services/BlogServices";
import { Alert, Snackbar } from "@mui/material";
import { useGetBlogList } from "../../../hook/useGetBlogList";

export default function UpdateStatusModal({
  statusId,
  openUpdateStatus,
  setOpenUpdateStatus,
  setBlogList,
  blogList,
}) {
  const { blogList: blogItem } = useGetBlogList({
    id: statusId,
    category: "",
    sort: "",
  });
  console.log(blogItem);
  const handleClose = () => {
    setOpenUpdateStatus(false);
  };
  
  const [statusPostBlog, setStatusPostBlog] = React.useState();
  const [openSnackbar, setOpenSnackBar] = React.useState(false);
  const [contentSnackbar, setContentSnackbar] = React.useState("");
  const handleUpdateStatus = async () => {
    await updateBlog({
      ...blogItem,
      blogStatus: blogItem?.blogStatus === 0 ? 2 : 0,
    })
      .then((res) => {
        const newBlogList = blogList?.map((item) => {
          if (item?.blogId === statusId) {
            return { ...item, blogStatus: item?.blogStatus === 0 ? 2 : 0 };
          }
          return item;
        });
        setBlogList(newBlogList);
        setStatusPostBlog(res.status);
        setOpenSnackBar(true);
        setContentSnackbar("Phê duyệt thành công");
        handleClose();
      })
      .catch((er) => {
        setStatusPostBlog(er?.response?.status);
        setOpenSnackBar(true);
        setContentSnackbar("Đã có lỗi xảy ra");
        handleClose();
        throw er;
      });
    handleClose();
  };

  return (
    <React.Fragment>
      <Dialog
        open={openUpdateStatus}
        onClose={() => setOpenUpdateStatus(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {blogItem?.blogStatus != 2
              ? "Bạn có đồng ý phê duyệt hay không"
              : "Bạn muốn huỷ phê duyệt hay không ?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateStatus}>Dồng Ý</Button>
          <Button onClick={() => setOpenUpdateStatus(false)} autoFocus>
            Hủy
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
