import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { Box, Button } from '@mui/material';
import TextField from "@mui/material/TextField";
import '../App.css';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';


function CommentForm() {



  //const [open, setOpen] = useState(false)
  const [comment_text, setComment] = useState('');
  const [nickname, setNickname] = useState('');
  const [stars, setStars] = React.useState(0);


  //Tehdään POST-pyyntö 
  const sendCommentToApi = event => {

    event.preventDefault()

    const obj = {
      nickname: nickname,
      comment_text: comment_text,
      stars: stars
    };

    axios.post('http://citybikebackend.eu-north-1.elasticbeanstalk.com/api/comments', obj)
      .then(response => {
        console.log(response)
        console.log('success!')
      })
      .catch(error => {
        console.log('fail')
      })


    window.location.reload(true);
  }
  //--------------------------------------------------------


  const userInput1 = (a) => {

    setNickname(a.target.value)
    console.log(a)
  }

  const userInput2 = (e) => {

    setComment(e.target.value)
    console.log(e)
  }


  return (
    <div>
      {/* KOMMENTIN LISÄYS _________________________________________________________________________*/}
      <div className="form-container">
        <Container maxWidth="sm">
          <Typography variant="h6" >
            Write your comment here and rate the experience with Helsinki City Bike! </Typography>
          <Box
            sx={{

              maxWidth: '0%',
              maxHeight: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              margin: 5
            }}
          >

            <Grid
              container
              direction="column"
              justifyContent="space-evenly"
              alignItems="left"
            >
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="Nickname"
                onChange={userInput1}
                style={{ width: 200, margin: 10 }}
              />

              <TextField
                id="outlined-basic"
                variant="outlined"
                label="Write your comment"
                onChange={userInput2}
                multiline={true}
                style={{ minHeigth: 200, width: 500, margin: 10 }}
              />

              <Rating
                name="simple-controlled"
                value={stars}
                onChange={(event, newValue) => {
                  setStars(newValue);
                }}

                style={{ width: 200, margin: 10 }}
              />

              <Button variant="contained" style={{ width: 200, margin: 10 }} onClick={sendCommentToApi}> Save your comment </Button>
            </Grid>
          </Box>
        </Container>
      </div>
    </div>
  );
}


export default CommentForm;