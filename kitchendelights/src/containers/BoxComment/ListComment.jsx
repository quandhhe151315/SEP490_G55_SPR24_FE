import React from 'react';
import { Avatar, Typography, Paper, Grid, Rating } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';

const Comment = ({ avatarSrc, username, content, timestamp ,rating}) => {
  return (
    <Paper sx={{ padding: "20px", marginTop: "10px" }}>
      <Grid container spacing={2}>
        <Grid item>
          <Avatar alt={username} src={avatarSrc} />
        </Grid>
        <Grid item xs zeroMinWidth>
          <Typography variant="subtitle1" gutterBottom>
            {username}
            <Rating name="read-only" value={5} readOnly />
          </Typography>
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
    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
      {comments.map((comment, index) => (
        <Comment
          key={index}
          avatarSrc={comment.avatarSrc}
          username={comment.username}
          content={comment.content}
          timestamp={comment.timestamp}
        />
      ))}
    </div>
  );
};

export default ListComment;