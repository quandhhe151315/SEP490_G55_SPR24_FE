import React, { useState, useEffect } from "react";
import {
  Avatar,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Rating,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import StarIcon from "@mui/icons-material/Star";
import { CreateReview, GetReviewByRecipeId } from "../../services/ApiServices";
import { useNavigate } from "react-router-dom";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { toast } from "react-toastify";

const Comment = ({ avatarSrc, username, content, timestamp, rating }) => {
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
                value={rating}
                precision={0.5}
                readOnly
                emptyIcon={<StarIcon fontSize="inherit" />}
                icon={<StarIcon fontSize="inherit" />}
              />
            </Typography>
          )}
          <Typography variant="body1" gutterBottom>
            {content}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
          </Typography>
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

const ListComment = ({ comments }) => {
  return (
    <div>
      {comments.map((comment, index) => (
        <Comment
          key={index}
          avatarSrc={comment.avatar}
          username={comment.username}
          content={comment.ratingContent}
          timestamp={comment.createDate}
          rating={comment.ratingValue}
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
        } else {
          toast.error("Lỗi tải danh sách bình luận");
        }
      } catch (error) {
        toast.error("Lỗi tải danh sách bình luận");
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
        Bình luận ({comments.length})
      </Typography>
      <ListComment comments={currentComments} />
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
