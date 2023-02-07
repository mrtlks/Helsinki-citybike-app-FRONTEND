import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import SecondaryPagesInfo from '../Components/SecondaryPagesInfo';
import Footer from '../Components/Footer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';




export default function Journeys() {


  const [journeys, setJourneys] = useState([]);
  //const url = 'http://localhost:8080/api/journeys'
  const url = 'https://helsinki-city-bike-app-backend.herokuapp.com/api/alljourneys'



  useEffect(() => fetchData(), []);

  // haetaan kaikki asemat ----------tämä koodi noutaa datan ---------
  const fetchData = () => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setJourneys(data);
      }
      )
      .catch(err => console.log(err));  
  }

  
  // Journeys-datan esittämiseen käytetään react mui:n kustomoitua taulukkoa (Table) _____________
  //https://mui.com/material-ui/react-table/
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  //________________________________________________________________________________________________

  const secondaryPagesInfo = {
    title: 'Journeys',
    description:
      "Here you can find detailed information about the journeys made with citybikes. Journeys can be filttered by Departure Station, Return Station, Covered Distance and Journey Duration.",
    image: 'https://source.unsplash.com/random/?citybike',
  };



  // DATA TABLE ----  SORTING  ____________________________________________________________________

  const sortByDepartureStation = () => {

    //luodaan kopio journeys-objektista
    const sortedJourneys = [...journeys];
    // muokataan kopiota
    sortedJourneys.sort((a, b) => {
      return a.departureStationName > b.departureStationName ? 1 : -1;
    });

    console.log('testi sortByDepartureStation:')
    console.log(sortedJourneys);

    return setJourneys(sortedJourneys);
  }

  const sortByReturnStation = () => {
    const sortedJourneys = [...journeys];
    sortedJourneys.sort((a, b) => {
      return a.returnStationName > b.returnStationName ? 1 : -1;
    });
    return setJourneys(sortedJourneys);
  }

  const shortestDistance = () => {
    const sortedJourneys = [...journeys];
    sortedJourneys.sort((a, b) => {
      return a.coveredDistance < b.coveredDistance ? 1 : -1;
    });
    return setJourneys(sortedJourneys);
  }

  const longestDistance = () => {
    const sortedJourneys = [...journeys];
    sortedJourneys.sort((a, b) => {
      return a.coveredDistance > b.coveredDistance ? 1 : -1;
    });
    return setJourneys(sortedJourneys);
  }

  const shortestDuration = () => {
    const sortedJourneys = [...journeys];
    sortedJourneys.sort((a, b) => {
      return a.duration < b.duration ? 1 : -1;
    });
    return setJourneys(sortedJourneys);
  }
  
  const longestDuration = () => {
    const sortedJourneys = [...journeys];
    sortedJourneys.sort((a, b) => {
      return a.duration > b.duration ? 1 : -1;
    });
    return setJourneys(sortedJourneys);
  }


  return (
    <div>
      < SecondaryPagesInfo info={secondaryPagesInfo} />


      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell onClick={sortByDepartureStation} style={{cursor:'pointer'}}> Departure Station</StyledTableCell>
              <StyledTableCell onClick={sortByReturnStation} style={{cursor:'pointer'}} align="right">Return Station</StyledTableCell>
              <StyledTableCell align="right">Covered distance
                <Select sx={{
                  height: '2.5rem',
                  color: 'white',
                  '& .MuiSvgIcon-root': {
                    color: 'white'
                  }
                }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem onClick={shortestDistance} >Longest</MenuItem>
                  <MenuItem onClick={longestDistance} >Shortest</MenuItem>
                </Select>
              </StyledTableCell>

              <StyledTableCell align="right">Journey Duration
                <Select sx={{
                  height: '2.5rem',
                  color: 'white',
                  '& .MuiSvgIcon-root': {
                    color: 'white'
                  }
                }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem onClick={shortestDuration} >Longest</MenuItem>
                  <MenuItem onClick={longestDuration} >Shortest</MenuItem>
                </Select>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {journeys.map((journey, i) => {

              const coveredDistanceKilometers = journey.coveredDistance / 1000
              //     const durationMinutes = journey.duration / 60


              //2. Muutetaan matkan kesto sekunneista esitysmuotoon minuutit ja sekunnit:
              const totalSeconds = journey.duration;

              //Math.floor-funktio pyöristää alaspäin lähimpään kokonaislukuun 
              // --> kun sekunnit jaetaan 60:llä saadaan minuutteja ja sekunteja mutta Math.floor "poistaa" sekunnit
              const minutes = Math.floor(totalSeconds / 60);

              // poistetut sekunnit saadaan modulo-operaattorin (mod, %) avulla 
              // wiki "In computing, the modulo operation returns the remainder or signed remainder of a division, 
              //after one number is divided by another (called the modulus of the operation).
              //In computing, the modulo operation returns the remainder or signed remainder of a division, 
              //after one number is divided by another (called the modulus of the operation)."
              //--> käytännössä siis saadaan ne sekunnit jotka jäävät yli täysistä minuuteista
              //jos jaettava määrä on pienempi kuin jakaja, ei synny ylijäämää ja tulokseksi saadaan alkuperäinen jaettava luku

              const seconds = totalSeconds % 60;

              return (
                <StyledTableRow key={i}>
                  <StyledTableCell component="th" scope="row">
                    {journey.departureStationName}
                  </StyledTableCell>
                  <StyledTableCell align="right">{journey.returnStationName}</StyledTableCell>
                  <StyledTableCell align="right">{coveredDistanceKilometers} km</StyledTableCell>
                  <StyledTableCell align="right">{minutes}min  {seconds}sec </StyledTableCell>
                </StyledTableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Footer
        title="Helsinki City Bike app"
        description="Offering city bike info since 2023"
      />
    </div>
  );
}



