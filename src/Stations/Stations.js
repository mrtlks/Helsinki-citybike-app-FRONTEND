import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import SecondaryPagesInfo from '../Components/SecondaryPagesInfo';
import Footer from '../Components/Footer';
import Pagination from 'jt-react-pagination';
import StationInfo from './StationInfo';


export default function DemoStations() {


  const [stations, setStations] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => fetchData(), []);

  const url = 'http://localhost:8080/api/stations'


  // 1.  haetaan kaikki asemat ----------tämä koodi noutaa datan _____________________________________
  const fetchData = () => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setStations(data);
      }
      )
      .catch(err => console.log(err));
  }


  // 2. JÄRJESTÄMINEN ----tämä laittaa asemat järjestykseen aseman nimen perusteella___________________

  stations.sort((a, b) => (a.station_name > b.station_name) ? 1 : -1)



  // 3. HAKUTOIMINTO joka filteröi asemat ______________________________________________________________

  // 3.a  Käyttäjä syöttää hakukenttään merkkejä. 
  //Huom! Asemien nimet on tallennettu tietokantaan isolla alkukirjaimella (haku on kirjainsensitiivinen)
  //--> Tehdään haku, joka muuttaa ensimmäisen kirjaimen isoksi ja muut pieneksi
  const inputHandler = (e) => {

    const input = e.target.value;

    const inputCase = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();

    setInputText(inputCase);
    console.log(inputText)
  };

  // 3.b Katsotaan sisältääkö minkään aseman nimi kyseisiä merkkejä annetussa järjestyksessä
  const filteredData = stations.filter(stations => {

    if (inputText.length === 0) {
      return stations;
    }
    //palautetaan aseman/asemien nimet jotka sisältävät käyttäjän syötteen
    else {
      return stations.station_name.includes(inputText)
    }
  })



  const Item = styled(Paper)(({ theme }) => ({
    textAlign: 'center',
    padding: theme.spacing(1),
  }));


  const secondaryPagesInfo = {
    title: 'Stations',
    description:
      "Here you can find detailed information about HSL city bike stations.",
    image: 'https://source.unsplash.com/random/?citybike',
  };


  return (
    <div>

      <SecondaryPagesInfo info={secondaryPagesInfo} />

      <Box
        sx={{

          maxWidth: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          margin: 5
        }}
      >
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="Search"
          onChange={inputHandler}
        />
      </Box>

      <Pagination
        prevText='<'
        nextText='>'
        pageNeighbours={2}
        itemPerPage={3}>

        {filteredData.map((station, i) => {
          return (

            <Grid
              item key={i}>
              <Item>
            <StationInfo station={station}/>

              </Item>
            </Grid>
          )
        })}
      </Pagination>

      <Footer
        title="Helsinki City Bike app"
        description="Offering city bike info since 2023"
      />

    </div>
  );
}

