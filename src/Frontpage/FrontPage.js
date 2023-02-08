import React from 'react'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import MainInfo from './MainInfo';
import InfoBox from './InfoBox';
import Footer from '../Components/Footer';
import StationsOnAMap from '../Components/StationsOnAMap';


export default function Frontpage() {

  const image1 = require('./images/station.jpg');
  const image2 = require('./images/city_center.jpg');
  const image3 = require('./images/balloons.jpg');
  const image4 = require('./images/map.png');


  const frontpageMainInfo = {
    title: 'Welcome to CityBike!',
    description:
      "Here you can find detailed information about HSL city bike stations. In addition to this, you can view the travelled distances.",
    image: image1,
    imageText: 'main image description',
  };

  const infoBoxes = [
    {
      title: 'Stations',
      link: 'stations',
      description:
        'Detailed information about HSL city bike stations including names and locations.',
      image: image1,
      imageLabel: 'Image Text',
    },
    {
      title: 'Journeys',
      link: 'journeys',
      description:
        'Journey data.',
      image: image2,
      imageLabel: 'Image Text',
    },
    {
      title: 'User Experiences',
      link: 'userexperiences',
      description:
        'Read user experiences and reviews and give your own.',
      image: image3,
      imageLabel: 'Image Text',
    },
    {
      title: 'Maps',
      link: '',
      description:
        'Check out all the maps.',
      image: image4,
      imageLabel: 'Image Text',
    },
  ];

  const stationsOnAMap = {
    title: 'All Stations on a map. Make your search!',
   
    description:
      "Check out all available HSL citybike stations and plan your cycling route! Using a bike could not be easier.",
    image: 'https://source.unsplash.com/random/?bike',
    linkText: 'Continue reading…',
  };

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

        
        <StationsOnAMap info={stationsOnAMap} />      
        

        {/* Footerin tekstit --> */}
        <Footer
          title="Helsinki City Bike app"
          description="Offering city bike info since 2023"
        />


      </main>
    </Container>

  );
}

