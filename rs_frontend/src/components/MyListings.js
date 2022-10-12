import React, { useState, useEffect } from
 "react";
import RentalApi from "../api/api";
import "./Card.css";
import { useAuth } from './auth';
import PropertyCard from "./PropertyCard";

function MyListings(){

  const [myListings, setMyListings] = useState(true);
  const [myList, setMyList] = useState(null);
  const auth = useAuth();

  const baseURL = RentalApi.getBaseURL()
  
  function setStateProperty(){
    let loadData = myListings? false: true;
    setMyListings(loadData);
  }

  async function getMyListings(){
    try {
      let property_owner = auth.user;
      
      const list = await RentalApi.getListings({property_owner});
      //console.log("LIST" + list.property.city)
      if ( list ){
        setMyList(list.rentals );
      }
      setStateProperty();
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(function effectFunction() { 
    let mounted = true;
    getMyListings();
    if( mounted ){
      setStateProperty();
    }
    return function cleanup(){
      mounted = false;
    }
  }, []);

  return (
    <>
      <div className="container">
        <h2 className="mt-4">Property Listings:</h2>
        <hr></hr>
      {myList
            ? (
                <div className="wrapper">
                  {myList.map((p, i) => (
                      <PropertyCard
                      key={p.property_id}
                      propertyId={p.property_id}
                      city={p.city}
                      zip={p.zip}
                      cost={p.cost}
                      imgUrl= {`${baseURL}/images/${p.image_url}`}
                      propertyType = {RentalApi.getPropertyType(p.property_type)}
                      btnName = "Get Booking Details"
                      btnLink = {`bookingDetails/${p.property_id}`}
                  />
                  ))}
                </div>
            ) : (
                <p className="lead">Sorry, no results were found!</p>
            )}
      </div>
     
    </>
  )
}

export default MyListings;