import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import  {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import './map.css';
//import "./App.css";

export default function Map({street, city, state, zip}) {
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  })

  // Set to some default value
  const [cordinates, setCordinates] = useState({lat:32.9271209, lng:-117.1034257});
  //const [cordinates, setCordinates] = useState({});
  const [loaded, setLoaded] = useState(true);
  
  function setLoadValue(){
    let loadData = loaded? false: true;
    setLoaded(loadData);
  }


  async function fetchApiData(){
    let value = `${street} ${city} ${state} ${zip}`;
    try {
      const results = await geocodeByAddress(value);
      const ll = await getLatLng(results[0]);
      setCordinates(ll);
      setLoadValue();
    } catch(error) {
      console.log("Error is " + error);   
    }   
  }

  useEffect(function effectFunction() {
    let mounted = true;
    fetchApiData();
    if ( mounted ){
      setLoaded();
    }
    return function cleanup(){
      mounted = false;
    }
  }, [loaded, setLoaded, isLoaded]);


  
  //const [loaded, setLoaded] = useState(true);

  if ( !isLoaded ) return <div>Loading...</div>

  if (isLoaded ) return <div><hr></hr><h4>Property Map:</h4><GMap l={cordinates.lat} ln={cordinates.lng}/></div>
  
}
function GMap({l, ln}){
  return (
   <GoogleMap zoom={10} 
    center={{lat:l, lng:ln}} 
    mapContainerClassName="map-container"> <Marker position={{lat:l, lng:ln}}/> 
  </GoogleMap>);
}


