import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RentalApi from "../api/api";
import "./Card.css";
import { Link } from "react-router-dom";
import Map from "./Map";

function Reservations(){
  const { property_id } = useParams();
  const [house, setHouse] = useState(null);
  const [gotProperty, setGotProperty] = useState(true);
  const link = RentalApi.getBaseURL();
  const baseLink = `${link}/images`;
  

  function setStateProperty(){
    let loadData = gotProperty? false: true;
    setGotProperty(loadData);
  }
  
  async function getProperty(property_id){
    try {
      const list = await RentalApi.getProperty(property_id);
      
      if ( list ){
        setHouse(list.property );
      }
      setStateProperty();
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(function effectFunction() { 
    let mounted = true;
    getProperty(property_id);
    if( mounted ){
      setGotProperty(false);
    }
    return function cleanup(){
      mounted = false;
    }
  }, []);

  return (
    <>
      <div className="container">
        
        <hr></hr>
      {house
            ? (
                <div className="card1">
                  <h2 className="mt-4">Property Details:{house.property_id}</h2>
                   <div className="imgDiv">{ <img src={`${baseLink}/${house.image_url}`} alt="" className="card_image2" /> }</div>
                  <hr></hr>
                  <h6><b>Address:</b> City: {house.city}, State: {house.state}, Zip:{house.zip}</h6>
                  <h6><b>Owner: </b>{house.property_owner}</h6>
                  <h6><b>Rental Type:</b> {RentalApi.getPropertyType(house.property_type)}, <b>Rental Cost:</b> ${house.cost}/hr</h6>
                  <div><b>Description:</b> {house.description}</div>
                  <Link to={`/reservations/${property_id}/book`}>
                    <button className="mt-2 btn-primary">Book Property</button>
                  </Link>
                  <Map street={house.street} city={house.city} state={house.state} zip={house.zip}>

                  </Map>
                </div>
            ) : (
                <p className="lead">Sorry, no results were found!</p>
            )}
      </div>
     
    </>
  )
  
} 

export default Reservations;


