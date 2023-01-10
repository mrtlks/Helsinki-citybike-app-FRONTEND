import React, { useState } from 'react';
import { Button, Dialog, DialogTitle } from "@mui/material";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';



export default function StationInfo(props) {



  const [station] = useState(props.station)
  const [open, setOpen] = useState(false)



  // avataan ikkuna  ------------------------------------
  const showInfo = () => {
    setOpen(true)
  }

  // suljetaan ikkuna
  const closeInfo = () => {
    setOpen(false)
  }

  //________ Ikkuna, jossa info näytetään _____________________________________________________________________________________

  return (
    <div>

      <Button onClick={() => showInfo()}> <b> {station.station_name} </b> </Button>

      <Dialog
        open={open}
        onClose={closeInfo}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >

        <DialogTitle id="alert-dialog-title">
          The name of the station: {station.station_name}

        </DialogTitle>

        <DialogContent>

          <DialogContentText id="alert-dialog-description">
            <b> Address:  {station.station_address}</b><br />
            <b>x:  {station.x} </b>  <br />
            <b>y: {station.y} </b>  <br />

          </DialogContentText>

        </DialogContent>
        <DialogActions>

          <Button onClick={closeInfo} autoFocus>
            Close info
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}



