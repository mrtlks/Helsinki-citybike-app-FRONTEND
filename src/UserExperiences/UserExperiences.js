import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Box} from '@mui/material';
import SecondaryPagesInfo from '../Components/SecondaryPagesInfo';
import Pagination from 'jt-react-pagination';
import Footer from '../Components/Footer';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import CommentForm from '../Components/CommentForm';


export default function UserExperiences() {

  const [comments, setComments] = useState([])

  const secondaryPagesInfo = {
    title: 'User Experiences - Share Yours!',
    description:
      "Give a comment about your experience with Helsinki City Bike",
    image: 'https://source.unsplash.com/random/?citybike',
  };


  useEffect(() => fetchData(), []);

  const url = 'https://citybikebackend.eu-north-1.elasticbeanstalk.com/api/comments'

  const fetchData = () => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setComments(data);
      }
      )
      .catch(err => console.log(err));
  }


  return (
    <div>
      <SecondaryPagesInfo info={secondaryPagesInfo} />

      
      <CommentForm></CommentForm>


<Box sx={{ margin: 10 }}>

        <Pagination
          prevText='<'
          nextText='>'
          pageNeighbours={2}
          itemPerPage={20}>


          <Grid container spacing={3} columns={{ xs: 20 }} >
            {/* käännetään kommenttien esitysjärjestys päinvastaiseksi eli uusimmasta vanhimpaan*/}
            {[...comments].reverse().map((comment, i) => (
              
              <Grid
                item key={i} xs={3} sx={{ minWidth:320, minHeigth: '100%' }}  >
                
                <Card sx={{ minHeight: 300, maxWidth:320 }}>
                  <CardContent sx={{ minHeight: 300, maxWidth:350 }}>
                    <Typography variant="h6" >
                      <b> {comment.nickname || "John Doe"}</b> </Typography>
                      <br></br>
                    <Rating name="read-only" value={comment.stars} readOnly />
                  
                    
                    <Divider />
                    <Typography variant="subtitle1" color="text.secondary" >
                    <br></br>
                    <b> {comment.comment_text}</b> 
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Pagination>
      </Box>

      <Footer
        title="Helsinki City Bike app"
        description="Offering city bike info since 2023"
      />
    </div>
  );
            }