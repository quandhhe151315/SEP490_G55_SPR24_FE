// BlogForm.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, FormControl } from '@mui/material';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = () => {
    // Handle form submission here, e.g., send data to server
    console.log('Title:', title);
    console.log('Content:', content);
    // You can perform further actions, like sending data to a server, here
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add Blog
      </Typography>
      <FormControl onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={handleTitleChange}
        />
        <TextField
          label="Content"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={content}
          onChange={handleContentChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Blog
        </Button>
      </FormControl>
    </Container>
  );
};

export default BlogForm;
