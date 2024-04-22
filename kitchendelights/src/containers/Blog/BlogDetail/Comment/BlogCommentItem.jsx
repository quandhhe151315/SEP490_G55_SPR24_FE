import {
  Avatar,
  Stack,
  Typography,
  Button,
  Box,
  Snackbar,
  Alert,
  TextField,
  InputAdornment,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import BlogCommentItemReup from "./BlogCommentItemReup";
import dayjs from "dayjs";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import Cookies from "js-cookie";
import {
  deleteComment,
  updateComment,
} from "../../../../services/BlogServices";
import SendIcon from "@mui/icons-material/Send";

export default function BlogCommentItem({
  item,
  delComment,
  setDelComment,
  commentLists,
  setCommentLists,
}) {
  console.log(commentLists);
  const [showReplySection, setShowReplySection] = useState(false);
  const userId = Cookies.get("userId");
  const isMyBlog = item?.userId === Number(userId);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [statusPostBlog, setStatusPostBlog] = useState();
  const [openSnackbar, setOpenSnackBar] = useState(false);
  const [contentSnackbar, setContentSnackbar] = useState("");
  const [isUpdateComment, setIsUpdateComment] = useState(-1);
  const [contentValue, setContentValue] = useState("");
  const handleDeleteComment = async (id) => {
    if (id) {
      await deleteComment(id)
        .then((res) => {
          if (res?.status) {
            setStatusPostBlog(res?.status);
            setOpenSnackBar(true);
            setDelComment([...delComment, id]);
            setContentSnackbar("Xoá bình luận thành công");
          }
        })
        .catch((er) => {
          setStatusPostBlog(er?.response?.status);
          setOpenSnackBar(true);
          setContentSnackbar("Xoá bình luận thất bại !");
          throw er;
        });
    } else {
      setDelComment([...delComment, id]);
    }
    handleClose();
  };
  const handleUpdateComment = async (item) => {
    setIsUpdateComment(item?.commentId);
    setContentValue(item?.commentContent);
    handleClose();
  };
  const handleUpdateNewComment = async (item) => {
    if (item?.commentId) {
      await updateComment({
        commentId: item?.commentId,
        blogId: item?.blogId,
        // parentId: 0,
        userId: item?.userId,
        userName: item?.userName,
        commentContent: contentValue,
        commentStatus: 1,
        createDate: item?.createDate,
      })
        .then((res) => {
          if (res?.status) {
            setStatusPostBlog(res?.status);
            setOpenSnackBar(true);
            setContentSnackbar("Chỉnh sửa bình luận thành công");
            const newCommentList = commentLists?.map((_comment) => {
              if (_comment?.commentId === item?.commentId) {
                return {
                  commentId: item?.commentId,
                  blogId: item?.blogId,
                  // parentId: 0,
                  userId: item?.userId,
                  userName: item?.userName,
                  commentContent: contentValue,
                  commentStatus: 1,
                  createDate: item?.createDate,
                };
              } else {
                return _comment;
              }
            });
            setCommentLists(newCommentList);
          }
        })
        .catch((er) => {
          setStatusPostBlog(er?.response?.status);
          setOpenSnackBar(true);
          setContentSnackbar("Chỉnh sửa bình luận thất bại !");
        });
    } else {
      setOpenSnackBar(true);
      setContentSnackbar("Chỉnh sửa bình luận thất bại !");
    }
    setIsUpdateComment(-1);
  };
  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;
  return (
    <Stack direction="row" alignItems="flex-start" spacing={2}>
      <Avatar>B</Avatar>
      <Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          columnGap={2}
        >
          <Box>
            <Typography fontWeight={600} sx={{ color: "#ff5e00" }}>
              {item?.userName}
            </Typography>
            <Stack direction={"row"} gap={2} alignItems={"center"}>
              <Typography fontWeight={300}>
                {dayjs(item?.createDate)?.format("DD-MM-YYYY hh:mm")}
              </Typography>
              <Stack>
                {userId && (
                  <Button
                    id="fade-button"
                    aria-controls={open ? "fade-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <MoreHorizIcon />
                  </Button>
                )}
                {userId && (
                  <Menu
                    id="fade-menu"
                    MenuListProps={{
                      "aria-labelledby": "fade-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                  >
                    {isMyBlog && (
                      <MenuItem
                        onClick={() => handleDeleteComment(item?.commentId)}
                      >
                        Xoá
                      </MenuItem>
                    )}
                    {isMyBlog && (
                      <MenuItem onClick={() => handleUpdateComment(item)}>
                        Chỉnh sửa
                      </MenuItem>
                    )}
                  </Menu>
                )}
              </Stack>
            </Stack>
          </Box>
        </Stack>
        {isUpdateComment === item?.commentId ? (
          <TextField
            value={contentValue}
            onChange={(e) => setContentValue(e?.target?.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Stack
                    onClick={() => {
                      handleUpdateNewComment(item);
                    }}
                  >
                    <SendIcon />
                  </Stack>
                </InputAdornment>
              ),
            }}
          />
        ) : (
          <Typography>{item?.commentContent}</Typography>
        )}
        {showReplySection && ( // To make TextareaAutosize invisible
          <BlogCommentItemReup />
        )}
      </Stack>
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
    </Stack>
  );
}
