import React from 'react'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import MainInfo from './MainInfo';
import InfoBox from './InfoBox';
import Footer from '../Components/Footer';


export default function Frontpage() {

  const image1 = require('./images/station.jpg');
  const image2 = require('./images/city_center.jpg');



  const frontpageMainInfo = {
    title: 'Welcome to CityBikeInfo!',
    description:
      "Here you can find detailed information about HSL city bike stations. In addition to this, you can view the traveled distances and add your own.",
    image: image1,
    imageText: 'main image description',
  };


  const infoBoxes = [
    {
      title: 'Stations',
      description:
        'Detailed information about HSL city bike stations including names and locations',
      image: image1,
      imageLabel: 'Image Text',
    },
    {
      title: 'Journeys',
      description:
        'Journey data',
      image: image2,
      imageLabel: 'Image Text',
    },
  ];



  return (

    <Container maxWidth="lg">
      <main>
        {/* etusivun pääinfokuvan tekstit --> */}
        <MainInfo info={frontpageMainInfo} />
        {/* etusivun infolaatikoiden tekstit --> */}
        <Grid container spacing={4}>
          {infoBoxes.map((info) => (
            <InfoBox key={info.title} info={info} />
          ))}
        </Grid>
        {/* Footerin tekstit --> */}
        <Footer
          title="Helsinki City Bike app"
          description="Offering city bike info since 2023"
        />
      </main>
    </Container>

  );
}

