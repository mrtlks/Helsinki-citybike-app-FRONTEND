import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

function MainInfo(props) {
  const { info } = props;

  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${info.image})`,
        marginTop: '30px',
        marginBottom:'40px'
        
      }}
    >
      
      {/* Increase the priority of the hero background image 
      Tämä tummentaa kuvaa */}
      {<img style={{ display: 'none' }} src={info.image} alt={info.imageText} />}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.1)',
          
        }}
        
      />

            {/* Tämä on kuvan kehykselle */}
      <Grid container>
        <Grid item md={6}>

    {/*    https://mui.com/system/getting-started/the-sx-prop/ */}
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
              height: 600,
            
            }}
          >
             {/* Etusivun info-kuvan otsikko */}
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              {info.title}
            </Typography>

        {/* Etusivun info-kuvan teksti */}
            <Typography variant="h5" color="inherit" paragraph>
              {info.description}
            </Typography>

            
            <Link variant="subtitle1" href="#">
              {info.linkText}
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

MainInfo.propTypes = {
  info: PropTypes.shape({
    description: PropTypes.string.isRequired,
    
    imageText: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default MainInfo;