import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router-dom'

function Infobox(props) {
  const { info } = props;
  
  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component={Link} to={`/${info.link}`} >
        <Card sx={{ display: 'flex', height: 250}}>
          <CardContent sx={{ flex: 10 }}>
            <Typography component="h2" variant="h5">
              {info.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {info.date}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {info.description}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 250, display: { xs: 'none', sm: 'block' } }}
            image={info.image}
            alt={info.imageLabel}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}

Infobox.propTypes = {
  info: PropTypes.shape({
   
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default Infobox;