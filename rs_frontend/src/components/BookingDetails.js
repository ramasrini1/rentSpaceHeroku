import React, { useState, useEffect } from "react";
import RentalApi from "../api/api";
import "./Card.css";
import { useParams } from "react-router-dom";
const {formatTime, getTotalCost } = require("../utils/helper");

function BookingDetails(){

  const [bookingDetails, setBookingDetails] = useState(true);
  const [bookingList, setBookingList] = useState(null);
  const { property_id } = useParams();
 
 

  function setStateProperty(){
    let loadData = bookingDetails? false: true;
    setBookingDetails(loadData);
  }

  async function getBookingDetails(){
    try {
           
      const list = await RentalApi.getBookings({property_id});
      if ( list ){
        setBookingList(list.property );
      }
      setStateProperty();
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(function effectFunction() { 
    let mounted = true;
    getBookingDetails();
    if( mounted ){
      setStateProperty();
    }
    return function cleanup(){
      mounted = false;
    }
  }, []);

  if ( !bookingList ) return (<p className="lead">Sorry, no results were found!</p>);
  
  return (
    <div className="container">
    <h4 className="mt-4">Booking Details:</h4>
    <hr></hr>
    
    {bookingList.length !== 0 
            ? (
                <div className="container card wrapper mt-4 mb-4">
                  {bookingList.map((b, i) => (
                      <div className="card wrapper mt-2 mb-2">
                        <div className="body ml-2">
                          
                          <div className="m-2">
                            <h6><b>Booking Details:</b></h6>
                            <h6>
                              <b>Booking Date:</b>{ (b.date).substring(0,10)} - <b>Timings:</b> {formatTime(b.start_time)} To {formatTime(b.end_time)}
                            </h6>
                            <h6>Property Id: {b.property_id} Booking Id: {b.booking_id}</h6>
                            <hr></hr>
                            <h6>Info About Renter:</h6>
                            <h6><b> Username:</b> {b.renter_id} <b>Email:</b> {b.email}</h6>
                            <hr></hr>
                            <h6>Cost: {b.cost}/hr <b>Total Cost:</b> ${getTotalCost(b.start_time, b.end_time, b.cost)}</h6>
                          <h6>Payment Status: {b.status}</h6>
                          
                          {/* <Link to={`/payment?property_owner=${b.property_owner}`}>
                          <button>Make Payment</button>
                         </Link> */}
                          </div>
                        </div>
                        
                     </div>
                  ))}
                 
                </div>
            ) : (
                <p className="lead">No bookings for this property {property_id}</p>
            )}
  </div>
  
  );

  // return (
  //   <>
  //     <div className="container">
  //       <h2 className="mt-4">Booking Details:</h2>
  //       <hr></hr>
  //     {myList
  //           ? (
  //               <div className="wrapper">
  //                 {myList.map((p, i) => (
  //                     <PropertyDisplayCard
  //                     key={p.property_id}
  //                     propertyId={p.property_id}
  //                     city={p.city}
  //                     zip={p.zip}
  //                     cost={p.cost}
  //                     imgUrl= {p.image_url}
  //                     propertyType = {RentalApi.getPropertyType(p.property_type)}
  //                     btnName = "Get Booking Details"
  //                     btnLink = "bookingDetails"
  //                 />
  //                 ))}
  //               </div>
  //           ) : (
  //               <p className="lead">Sorry, no results were found!</p>
  //           )}
  //     </div>
     
  //   </>
  // )
}

export default BookingDetails;