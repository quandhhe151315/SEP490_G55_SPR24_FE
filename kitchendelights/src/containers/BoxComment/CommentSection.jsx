import React, { useState } from 'react';
import ListComment from './ListComment';
import PostComment from './PostComment';

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

  const handleCommentSubmit = (newComment) => {
    const newCommentObj = {
      avatarSrc: 'avatar3.jpg', // Thay đổi thành avatar của người dùng hiện tại
      username: 'Current User', // Thay đổi thành tên người dùng hiện tại
      content: newComment,
      timestamp: new Date().toISOString()
    };
    setComments([...comments, newCommentObj]);
  };

  return (
    <div>
      <ListComment comments={comments} />
      <PostComment onCommentSubmit={handleCommentSubmit} />
    </div>
  );
};

export default CommentSection;