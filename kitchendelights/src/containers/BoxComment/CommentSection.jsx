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
import { formatDistanceToNow, set } from "date-fns";
import StarIcon from "@mui/icons-material/Star";
import { CreateReview, GetReviewByRecipeId } from "../../services/ApiServices";
const Comment = ({ avatarSrc, username, content, timestamp, rating }) => {
  return (
    <Paper sx={{ padding: "20px", marginTop: "10px" }}>
      <Grid container spacing={2}>
        <Grid item>
          <Avatar alt={username} src={avatarSrc} />
        </Grid>
        <Grid item xs zeroMinWidth>
          <Typography variant="subtitle1" gutterBottom>
            {username}
          </Typography>
          {rating !== undefined && ( // Hiển thị rating nếu có
            <Typography variant="caption" color="textSecondary">
              <Rating
                value={rating}
                precision={0.5} // Điều chỉnh độ chính xác của rating
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
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0); // Thêm state cho giá trị rating

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleRatingChange = (event, value) => {
    setRating(value); // Cập nhật giá trị rating khi thay đổi
  };

  const handleSubmit = async () => {
    //recipeId , userId, ratingValue,ratingStatus,ratingContent
    if (userId && newComment && recipeId) {
      try {
        const response = await CreateReview(
          recipeId,
          userId,
          rating,
          newComment
        );
        if (response.status === 200) {
          //  setListMenu(response.data);
          setRating(0);
          setNewComment("");
          setLoading(!loading);
        } else {
          console.error("lỗi khi tải danh sách menu");
        }
      } catch (error) {
        console.error("lỗi API getMenu", error);
      }
    }
  };

  return (
    <Paper sx={{ padding: "20px", marginTop: "10px" }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Typography variant="body1" gutterBottom>
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

  return (
    <div>
      <PostComment
        setLoading={setLoading}
        loading={loading}
        recipeId={recipeId}
      />
      <ListComment comments={comments} />
    </div>
  );
};

export default CommentSection;
