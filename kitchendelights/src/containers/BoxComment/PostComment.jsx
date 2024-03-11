import React, { useState } from 'react';
import { Paper, Grid, TextField, Button } from '@mui/material';

const PostComment = ({ onCommentSubmit }) => {
  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmit = () => {
    if (newComment.trim() !== '') {
      onCommentSubmit(newComment);
      setNewComment('');
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
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Post
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PostComment;