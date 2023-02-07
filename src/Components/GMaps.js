
import { InfoWindowF,useJsApiLoader, GoogleMap, MarkerF} from "@react-google-maps/api";
import React, { useState } from 'react';


function GMaps(props) {

  const data = props

  const [selectedMarker, setSelectedMarker] = useState(null);

  //leveys 100% saa kartan skaalautumaan oikein suhteessa Boxiin
  const containerStyle = {
    width: '100%',
    height: '1000px',
    position: 'relative'
  };

  const API_KEY = process.env.REACT_APP_API_KEY;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY
  });

  
   return (  
  
    isLoaded && <GoogleMap  mapContainerStyle={containerStyle} zoom={10} center={{lat: 60.2417, lng: 24.8854}} mapContainerClassName="map-container">                
  {Object.keys(data).map((key => {

   return (  
    <MarkerF  
    onClick={()=>setSelectedMarker(data[key])} 
    key={key} 
    position= {{lat: Number(data[key].y) , lng: Number(data[key].x)}  } 
    />
 );
}))}

{selectedMarker && (
    <InfoWindowF
        position={{
            lat: Number(selectedMarker.y),
            lng: Number(selectedMarker.x),
        }}
        onCloseClick={() => {
            setSelectedMarker (null);
        }}
    >
        <div><b>{selectedMarker.name}</b> <br/>
        {selectedMarker.address}
        </div>
    
    </InfoWindowF>
)}
  </GoogleMap>
   ) 
}

export default  GMaps

