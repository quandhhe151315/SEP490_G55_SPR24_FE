import {
  Alert,
  Button,
  ButtonBase,
  Divider,
  Pagination,
  Snackbar,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import BlogCommentItem from "./BlogCommentItem";
import { Link, useParams, useSearchParams } from "react-router-dom";
import BlogCommentItemReup from "./BlogCommentItemReup";
import { useEffect, useState } from "react";
import { uploadComment } from "../../../../services/BlogServices";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { useGetComment } from "../../../../hook/useGetComment";
import { useGetProfile } from "../../../../hook/useGetProfile";

export default function BlogComment() {
  const [content, setContent] = useState("");
  const { slug } = useParams();
  const [statusPostComment, setStatusPostComment] = useState();
  const [openSnackbar, setOpenSnackBar] = useState(false);
  const userId = Cookies.get("userId");
  const [commentLists, setCommentList] = useState();
  const { profile } = useGetProfile(userId);
  const { commentList } = useGetComment(slug);
  const [delComment, setDelComment] = useState([]);

  useEffect(() => {
    setCommentList(commentList);
  }, [commentList]);
  const postComment = async () => {
    await uploadComment({
      blogId: slug,
      // parentId: 0,
      userId: profile?.userId,
      userName: profile?.username,
      commentContent: content,
      // commentStatus: 0,
      createDate: dayjs().toISOString(),
      // subComments: ["string"],
    })
      .then((res) => {
        if (res.status) {
          console.log(res);
          setStatusPostComment(res.status);
          setOpenSnackBar(true);
          setContent("");
          setCommentList([
            ...commentLists,
            {
              blogId: slug,
              // parentId: 0,
              userId: profile?.userId,
              commentContent: content,
              userName: `${profile?.lastName} ${profile?.middleName} ${profile?.firstName}`,
              commentStatus: 1,
              createDate: dayjs().toISOString(),
              commentId: res?.data,
            },
          ]);
        }
      })
      .catch((e) => {
        setStatusPostComment(e.response.status);
        setOpenSnackBar(true);
      });
  };
  const commentPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastComment = currentPage * commentPerPage;
  const indexOfFirstComment = indexOfLastComment - commentPerPage;
  const currentComments = commentLists
    ?.filter(
      (item) =>
        !delComment?.includes(item?.commentId) && item?.commentStatus === 1
    )
    ?.slice(indexOfFirstComment, indexOfLastComment);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Stack mt={4}>
      <Stack>
        <Typography fontSize={22} fontWeight={600} sx={{ color: "#ff5e00" }}>
          Bình luận
        </Typography>
      </Stack>
      <Divider sx={{ width: "100%", mt: 1 }} />
      <Stack rowGap={2} mt={4}>
        {currentComments?.map((item, index) => (
          <BlogCommentItem
            key={`comment_list_${index}+${item?.commentContent}`}
            item={item}
            delComment={delComment}
            setDelComment={setDelComment}
            commentLists={commentLists}
            setCommentLists={setCommentList}
          />
        ))}
      </Stack>
      {currentComments?.length > 0 && (
        <Pagination
          count={Math.ceil(
            commentLists?.filter(
              (x) =>
                !delComment?.includes(x?.commentId) && x?.commentStatus === 1
            )?.length / commentPerPage
          )}
          page={currentPage}
          onChange={handlePageChange}
          color="secondary"
          sx={{
            marginTop: 4,
            "& .Mui-selected": {
              backgroundColor: "#FF642F",
            },
            marginBottom: 4,
          }}
        />
      )}
      <Stack
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
        }}
      >
        <Divider sx={{ my: 1 }} />
        {!!profile?.userId && (
          <textarea
            minRows={8}
            maxRows={12}
            style={{
              borderRadius: "12px",
              borderColor: "#ccc",
              outline: "none",
              marginTop: "12px",
              padding: "8px",
              width: "100%",
              height: "200px",
            }}
            placeholder="Bình luận về bài viết"
            onChange={(e) => setContent(e.target.value)}
            value={content}
            disabled={!profile?.userId}
          />
        )}
        {profile?.userId ? (
          <Button
            variant="contained"
            sx={{ mt: 1, bgcolor: "#ff5e00" }}
            onClick={postComment}
            disabled={!content}
          >
            Bình luận bài viết
          </Button>
        ) : (
          <Typography>Đăng nhập để bình luận</Typography>
        )}
      </Stack>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openSnackbar}
        onClose={() => setOpenSnackBar(false)}
      >
        <Alert
          onClose={() => setOpenSnackBar(false)}
          severity={statusPostComment < 400 ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {statusPostComment < 400
            ? "Bình luận thành công"
            : "Đã có lỗi xảy ra"}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
