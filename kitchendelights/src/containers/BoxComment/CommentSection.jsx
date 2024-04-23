import React, { useState, useEffect } from "react";
import {
  Avatar,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Rating,
  IconButton,
  Menu,
  MenuItem,
  InputAdornment,
  Stack,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import StarIcon from "@mui/icons-material/Star";
import SendIcon from "@mui/icons-material/Send";
import moment from "moment";
import {
  CreateReview,
  GetReviewByRecipeId,
  RemoveReview,
  UpdateReview,
} from "../../services/ApiServices";
import { useNavigate } from "react-router-dom";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { toast } from "react-toastify";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Cookies from "js-cookie";

const Comment = ({
  avatarSrc,
  username,
  content,
  timestamp,
  rating,
  recipeId,
  ratingId,
  loading,
  setLoading,
  userID,
  ratingValue,
  ratingContent,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const getUserIdFromCookie = () => {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "userId") {
        return value;
      }
    }
    return null;
  };
  const [ratingIdValue, setRatingIdValue] = useState(0);
  const [ratingvalue, setratingvalue] = useState(rating);
  const [contentValue, setContentValue] = useState(content);
  const role = Cookies.get("role");

  const uId = getUserIdFromCookie();

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = async () => {
    try {
      const response = await UpdateReview(
        ratingIdValue,
        recipeId,
        ratingvalue,
        contentValue
      );

      if (response.status === 200) {
        toast.success("Cập nhật thành công ");
        setLoading(!loading);
        setRatingIdValue(0);
      } else {
        toast.error("Khoong load dc list");
      }
    } catch (error) {
      console.error("ko xoá dc", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await RemoveReview(recipeId, ratingId);

      if (response.status === 200) {
        toast.success("Xoá thành công ");
        handleMenuClose();
        setLoading(!loading);
      } else {
        toast.error("Khoong load dc list");
      }
    } catch (error) {
      console.error("ko xoá dc", error);
    }
  };

  return (
    <Paper
      sx={{
        padding: "20px",
        marginTop: "10px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <Avatar alt={username} src={avatarSrc} />
        </Grid>
        <Grid item xs zeroMinWidth>
          <Typography variant="subtitle1" gutterBottom>
            {username}
          </Typography>
          {rating !== undefined && (
            <Typography variant="caption" color="textSecondary">
              <Rating
                onChange={(e) => setratingvalue(e?.target.value)}
                value={ratingIdValue && uId == userID ? ratingvalue : rating}
                precision={0.5}
                readOnly={uId != userID}
                emptyIcon={<StarIcon fontSize="inherit" />}
                icon={<StarIcon fontSize="inherit" />}
              />
            </Typography>
          )}

          {ratingIdValue ? (
            <TextField
              sx={{
                display: "block",
              }}
              value={uId == userID ? contentValue : content}
              onChange={(e) => setContentValue(e?.target?.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Stack
                    // onClick={() => {
                    //   handleUpdateNewComment(item);
                    // }}
                    >
                      <SendIcon onClick={handleEdit} />
                    </Stack>
                  </InputAdornment>
                ),
              }}
            />
          ) : (
            <Typography variant="body1" gutterBottom>
              {content}
            </Typography>
          )}
          <Typography variant="caption" color="textSecondary">
            {moment(timestamp).format("DD/MM/YYYY")}
          </Typography>
        </Grid>
        <Grid
          item
          hidden={
            (role === "users" && userID != uId) ||
            ["Moderator", "Writer", "Chef", undefined].includes(role)
          }
        >
          <IconButton onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {userID == uId ? (
              <MenuItem onClick={() => setRatingIdValue(ratingId)}>
                Sửa
              </MenuItem>
            ) : null}

            <MenuItem onClick={handleDelete}>Xoá</MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </Paper>
  );
};

const getUserIdFromCookie = () => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === "userId") {
      return value;
    }
  }
  return null;
};
const userId = getUserIdFromCookie();

const ListComment = ({ comments, loading, setLoading }) => {
  return (
    <div>
      {comments.map((comment, index) => (
        <Comment
          key={index}
          loading={loading}
          setLoading={setLoading}
          ratingId={comment.ratingId}
          recipeId={comment.recipeId}
          avatarSrc={comment.avatar}
          username={comment.username}
          content={comment.ratingContent}
          timestamp={comment.createDate}
          rating={comment.ratingValue}
          userID={comment.userId}
          ratingValue={comment.ratingValue}
          ratingContent={comment.ratingContent}
        />
      ))}
    </div>
  );
};

const PostComment = ({ recipeId, loading, setLoading }) => {
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const isUserLoggedIn = () => {
    const cookies = document.cookie.split("; ");
    return cookies.some((cookie) => cookie.startsWith("userId="));
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleRatingChange = (event, value) => {
    setRating(value);
  };

  const handleSubmit = async () => {
    if (!isUserLoggedIn()) {
      navigate("/Login");
      toast.warning("Vui lòng đăng nhập để đánh giá !");
      return;
    }
    if (!rating) {
      toast.warning("Vui lòng vote sao !");
      return;
    }
    if (!newComment) {
      toast.warning("Vui lòng nhập bình luận !");
      return;
    }
    if (userId && newComment && recipeId) {
      try {
        const response = await CreateReview(
          recipeId,
          userId,
          rating,
          newComment
        );
        if (response.status === 200) {
          setRating(0);
          setNewComment("");
          setLoading(!loading);
          toast.success("Đăng thành công");
        } else {
        }
      } catch (error) {
        toast.error("Bạn không được phép đánh giá nữa. ");
      }
    }
  };

  return (
    <Paper sx={{ padding: "20px", marginTop: "10px" }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Typography color="#ff5e00" variant="body1" gutterBottom>
            Hãy vote sao cho công thức
          </Typography>
        </Grid>
        <Grid item>
          <Rating name="rating" value={rating} onChange={handleRatingChange} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Thêm bình luận"
            fullWidth
            sx={{ width: "100%" }}
            value={newComment}
            onChange={handleCommentChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            size="small"
            variant="contained"
            sx={{
              bgcolor: "#ff5e00",
              borderRadius: "15px",
              width: "100px",
              height: "35px",
              color: "white",
            }}
            onClick={handleSubmit}
          >
            Đăng
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

const CommentSection = ({ recipeId }) => {
  const [loading, setLoading] = useState(false);

  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;

  const getListComment = async () => {
    try {
      const response = await GetReviewByRecipeId(recipeId);
      if (response.status === 200) {
        setComments(response.data);
      } else {
      }
    } catch (error) {}
  };
  useEffect(() => {
    debugger;
    if (recipeId) {
      getListComment();
    }
  }, [recipeId, loading]);

  const totalPages = Math.ceil(comments.length / commentsPerPage);
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div>
      <PostComment
        setLoading={setLoading}
        loading={loading}
        recipeId={recipeId}
      />
      <Typography
        color="#ff5e00"
        variant="h5"
        sx={{ marginTop: 3, fontWeight: "bold" }}
      >
        Đánh giá ({comments.length})
      </Typography>
      <ListComment
        comments={currentComments}
        loading={loading}
        setLoading={setLoading}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          sx={{ mr: 1, p: 2 }}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <ArrowLeftIcon fontSize="large" />
        </Button>
        <Typography variant="h6">{currentPage}</Typography>
        <Button
          sx={{ mr: 1, p: 2 }}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <ArrowRightIcon fontSize="large" />
        </Button>
      </div>
    </div>
  );
};

export default CommentSection;
