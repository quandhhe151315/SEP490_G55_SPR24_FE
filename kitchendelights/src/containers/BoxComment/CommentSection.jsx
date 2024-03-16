import React, { useState } from 'react';
import { Avatar, Typography, Paper, Grid, TextField, Button, Rating } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import StarIcon from '@mui/icons-material/Star';

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

const ListComment = ({ comments }) => {
  return (
    <div style={{ maxHeight: '300px', overflowY: 'auto' }} >
      {comments.map((comment, index) => (
        <Comment
          key={index}
          avatarSrc={comment.avatarSrc}
          username={comment.username}
          content={comment.content}
          timestamp={comment.timestamp}
          rating={comment.rating} // Truyền xếp hạng vào Comment
        />
      ))}
    </div>
  );
};
const PostComment = ({ onCommentSubmit }) => {
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0); // Thêm state cho giá trị rating

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleRatingChange = (event, value) => {
    setRating(value); // Cập nhật giá trị rating khi thay đổi
  };

  const handleSubmit = () => {
    if (newComment.trim() !== '') {
      onCommentSubmit(newComment, rating); // Truyền giá trị rating vào hàm xử lý gửi bình luận
      setNewComment('');
      setRating(0); // Reset giá trị rating sau khi gửi bình luận
    }
  };

  return (  
    <Paper sx={{ padding: "20px", marginTop: "10px" }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <TextField
            label="Add a comment"
            fullWidth
            value={newComment}
            onChange={handleCommentChange}
            
          />
        </Grid>
        <Grid item>
          <Rating
            name="rating"
            value={rating}
            onChange={handleRatingChange}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Đăng 
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

const CommentSection = () => {
  const [comments, setComments] = useState([
    {
      avatarSrc: 'avatar1.jpg',
      username: 'John Doe',
      content: 'This is the first comment.',
      timestamp: new Date().toISOString()
    },
    {
      avatarSrc: 'avatar2.jpg',
      username: 'Jane Smith',
      content: 'This is the second comment.',
      timestamp: new Date().toISOString()
    },
    // Add more comments as needed
  ]);

  const handleCommentSubmit = (newComment, rating) => {
    const newCommentObj = {
      avatarSrc: 'avatar3.jpg', // Thay đổi thành avatar của người dùng hiện tại
      username: 'Current User', // Thay đổi thành tên người dùng hiện tại
      content: newComment,
      timestamp: new Date().toISOString(),
      rating: rating // Lưu giá trị rating vào bình luận mới
    };
    setComments([...comments, newCommentObj]);
  };

  return (
    <div>
       <PostComment onCommentSubmit={handleCommentSubmit} />
      <ListComment comments={comments} />
    </div>
  );
};

export default CommentSection;