import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import SecondaryPagesInfo from '../Components/SecondaryPagesInfo';
import Footer from '../Components/Footer';



export default function ShowStations() {


  const [stations, setStations] = useState([]);
  const url = 'http://localhost:8080/api/stations'

  const Item = styled(Paper)(({ theme }) => ({
    textAlign: 'center',
    padding: theme.spacing(1),
  }));


  useEffect(() => fetchData(), []);

  // 1.  haetaan kaikki asemat ----------tämä koodi noutaa datan ---------
  const fetchData = () => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setStations(data);
      }
      )
      .catch(err => console.log(err));
  }


  const secondaryPagesInfo = {
    title: 'Stations',
    description:
      "Here you can find detailed information about HSL city bike stations.",
    image: 'https://source.unsplash.com/random/?citybike',

  };


  return (
    <div>
      <SecondaryPagesInfo info={secondaryPagesInfo} />

      {/* Listataan asemien nimet */}
      {stations.map((station, i) => {

        return (
          <Grid
            item key={i}>
            <Item>
              {station.station_name}
            </Item>
          </Grid>
        )
      })}

      <Footer></Footer>
    </div>
  );
}

