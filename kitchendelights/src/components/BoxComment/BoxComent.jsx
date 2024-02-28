import React from "react";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Avatar from "@mui/material/Avatar";
const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";
 
  function CommentBox() {
    return (
      <div sx={{padding: 14}}>
          <h1>Comment</h1>
          <Paper sx={{ padding: "40px 20px", marginTop: 10 }}>
        <Grid container wrap="nowap" spacing={3}>
            <Grid item>
            <Avatar alt="Tan123" src={imgLink}></Avatar>
            </Grid>
            <Grid justifyContent="left" item sx zeroMinWidth>
            <h4 sx={{ margin: 0, textAlign: "left"}}>Tan123</h4>
            <p sx={{ textAlign: "left" }} >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
              Suspendisse congue vulputate lobortis. Pellentesque at interdum
              tortor. Quisque arcu quam, malesuada vel mauris et, posuere
              sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
              metus, efficitur lobortis nisi quis, molestie porttitor metus.
              Pellentesque et neque risus. Aliquam vulputate, mauris vitae
              tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
              lectus vitae ex.
            </p>
            <p sx={{ textAlign: "left", color: "gray" }}>
              posted 1 minute ago
            </p>          
            </Grid>
        </Grid>
      </Paper>
      <Paper sx={{ padding: "40px 20px", marginTop: 10 }}>
        <Grid container wrap="nowap" spacing={2}>
            <Grid item>
            <Avatar alt="Tan123" src={imgLink}></Avatar>
            </Grid>
            <Grid justifyContent="left" item sx zeroMinWidth>
            <h4 sx={{ margin: 0, textAlign: "left"}}>Tan123</h4>
            <p sx={{ textAlign: "left" }} >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
              Suspendisse congue vulputate lobortis. Pellentesque at interdum
              tortor. Quisque arcu quam, malesuada vel mauris et, posuere
              sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
              metus, efficitur lobortis nisi quis, molestie porttitor metus.
              Pellentesque et neque risus. Aliquam vulputate, mauris vitae
              tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
              lectus vitae ex.
            </p>
            <p sx={{ textAlign: "left", color: "gray" }}>
              posted 1 minute ago
            </p>          
            </Grid>
        </Grid>
      </Paper>
      <Paper sx={{ padding: "40px 20px", marginTop: 10 }}>
        <Grid container wrap="nowap" spacing={2}>
            <Grid item>
            <Avatar alt="Tan123" src={imgLink}></Avatar>
            </Grid>
            <Grid justifyContent="left" item sx zeroMinWidth>
            <h4 sx={{ margin: 0, textAlign: "left"}}>Tan123</h4>
            <p sx={{ textAlign: "left" }} >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
              Suspendisse congue vulputate lobortis. Pellentesque at interdum
              tortor. Quisque arcu quam, malesuada vel mauris et, posuere
              sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
              metus, efficitur lobortis nisi quis, molestie porttitor metus.
              Pellentesque et neque risus. Aliquam vulputate, mauris vitae
              tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
              lectus vitae ex.
            </p>
            <p sx={{ textAlign: "left", color: "gray" }}>
              posted 1 minute ago
            </p>          
            </Grid>
        </Grid>
      </Paper>
      </div>
    );
  }
  
  export default CommentBox;