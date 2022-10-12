import React, { useState, useEffect } from "react";
import RentalApi from "../api/api";
import PropertyCard from "./PropertyCard";
import "./PropertyCard.css";

function Home(){

  const [listings, setListings] = useState([]);
  const [loaded, setLoaded] = useState(true);

  const baseURL = RentalApi.getBaseURL()
  const baseLink =`/reservations/`;

  function setLoadValue(){
    let loadData = loaded? false: true;
    setLoaded(loadData);
  }

  function setListingsValue(apiData){
    setListings(apiData);
  }

  async function fetchApiData(){
    try {
      const lists = await RentalApi.getListings()
      if ( lists ){
        setListingsValue(lists.rentals);
      }
      setLoadValue();
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(function effectFunction() {
    let mounted = true;
    fetchApiData();
    if ( mounted ){
      setLoaded(false);
    }
    return function cleanup(){
      mounted = false;
    }
  }, []);

  return (
    <>
      <div className="container mb-4">
        <h2 className="mt-4">Property Listings:</h2>
        <hr></hr>
      {listings
            ? (
                <div className="wrapper">
                  {listings.map((p, i) => (
                      <PropertyCard
                      key={p.property_id}
                      propertyId={p.property_id}
                      city={p.city}
                      zip={p.zip}
                      cost={p.cost}
                      imgUrl= {`${baseURL}/images/${p.image_url}`}
                      propertyType = {RentalApi.getPropertyType(p.property_type)}
                      btnName = "Make Your Reservations"
                      btnLink = {`${baseLink}${p.property_id}`}
                      
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
export default Home;


