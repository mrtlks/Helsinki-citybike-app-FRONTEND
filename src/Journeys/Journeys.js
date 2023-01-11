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



export default function Journeys() {

  const [journeys, setJourneys] = useState([]);
  const url = 'http://localhost:8080/api/journeys'

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

//_________________________________________________________________________________________________


  const secondaryPagesInfo = {
    title: 'Journeys',
    description:
      "Here you can find detailed information about the journeys made with citybikes. You can also add your own journey",
    image: 'https://source.unsplash.com/random/?citybike',
  };




  return (
    <div>
      < SecondaryPagesInfo info={secondaryPagesInfo} />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Departure Station</StyledTableCell>
              <StyledTableCell align="right">Return Station</StyledTableCell>
              <StyledTableCell align="right">Covered distance </StyledTableCell>
              <StyledTableCell align="right">Journey Duration</StyledTableCell>

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
                <StyledTableRow key={journey.departureStationName}>
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



