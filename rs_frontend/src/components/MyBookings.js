import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RentalApi from "../api/api";
import "./Card.css";
import { useAuth } from './auth';
const {formatTime, getTotalCost } = require("../utils/helper");

export const MyBookings = () => {
 
  const [myBookings, setMyBookings] = useState(true);
  const [myBookingList, setMyBookingList] = useState(null);
  const auth = useAuth();
  

  function setStateProperty(){
    let loadData = myBookings? false: true;
    setMyBookings(loadData);
  }

  async function getMyBookings(){
    try {
      let renter_id = auth.user;
      
      const list = await RentalApi.getMyBookings(renter_id);
      if ( list ){
        setMyBookingList(list.my_bookings );
      }
      setStateProperty();
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(function effectFunction() { 
    let mounted = true;
    getMyBookings();
    if( mounted ){
      setStateProperty();
    }
    return function cleanup(){
      mounted = false;
    }
  }, []);

  return (
    <div className="container">
    <h4 className="mt-4">My Bookings:</h4>
    <hr></hr>
    
    {myBookingList
            ? (
                <div className="container card wrapper mt-4 mb-4">
                  {myBookingList.map((b, i) => (
                      <div className="card wrapper mt-2 mb-2">
                        <div className="body ml-2">
                         
                          <h6>
                            <Link to={`/reservations/${b.property_id}`}>
                            <button className="btn-primary m-2 mb-2">Get Property Details</button>
                          </Link>
                          </h6>
                          <div className="m-2">
                            <h6>
                              <b>Booking Date:</b>{ (b.date).substring(0,10)} - <b>Timings:</b> {formatTime(b.start_time)} To {formatTime(b.end_time)}
                            </h6>
                            <h6>Property Id: {b.property_id} Booking Id: {b.booking_id}</h6>
                            <hr></hr>
                            <h6>Info About Property Owner:</h6>
                            <h6><b> Username:</b> {b.property_owner} <b>Email:</b> {b.email}</h6>
                            <hr></hr>
                            <h6>Cost: {b.cost}/hr <b>Total Cost:</b> ${getTotalCost(b.start_time, b.end_time, b.cost)}</h6>
                          <h6>Payment Status: {b.status}</h6>
                          <h6> <a href="https://venmo.com/signup/"  target="_blank" rel="noopener noreferrer">Make Payment</a></h6>
                          </div>
                        </div>
                        
                     </div>
                  ))}
                 
                </div>
            ) : (
                <p className="lead">Sorry, no results were found!</p>
            )}
  </div>
  
  );
  
}
