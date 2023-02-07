
import React, { useEffect, useState } from 'react';
import TextField from "@mui/material/TextField";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import GMaps from  './GMaps';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

export default function StationsOnAMap(props) {

  const { info } = props;

    const [stations, setStations] = useState([]);
    const [inputText, setInputText] = useState("");

    useEffect(() => fetchData(), []);

  //const url = 'http://localhost:8080/stations'
     const url= 'https://helsinki-city-bike-app-backend.herokuapp.com/api/stations'

//cors -ongelma(access-to-fetch-at-from-origin--has-been-blocked-by-cors)
//--> lisää @CrossOrigin backendin controlleriin

// 1.  haetaan kaikki asemat ----------tämä koodi noutaa datan ---------
    const fetchData = () => {
        fetch(url) 
        .then(response => response.json())      
        .then(data => {   
            setStations(data.content);
        }
            )
        .catch(err=>console.log(err));  
    }

    
  // 2. JÄRJESTÄMINEN ----tämä laittaa asemat järjestykseen aseman nimen perusteella___________________

  stations.sort((a, b) => (a.name > b.name) ? 1 : -1)


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
      return stations.name.includes(inputText)
    }
  })


StationsOnAMap.propTypes = {
  info: PropTypes.shape({
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

 // ------Esitetään asemien nimet ----------------------------------------------------   


  return (
    <Paper
      sx={{
        position: 'relative', 
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',       
        marginTop: '60px'      
      }}
    >
            {/* Tämä on kuvan kehykselle */}
          <Box
            sx={{
              position: 'relative',
             
              p: { xs: 3, md: 6 },   
            
              alignItems: 'center',
              justifyContent: 'center',     
            }}
          >
             <Typography component="h2" variant="h5"color="inherit" gutterBottom>
              {info.title}
            </Typography>

        {/* Etusivun info-kuvan teksti */}
        <Typography variant="subtitle1" paragraph>
              {info.description}
            </Typography>
            
          <TextField
          id="outlined-basic"
          variant="outlined"
          label="Search"
          onChange={inputHandler}        
        />
          <GMaps {...filteredData}  /> 
    </Box>
    </Paper>
    
  );
  
}


