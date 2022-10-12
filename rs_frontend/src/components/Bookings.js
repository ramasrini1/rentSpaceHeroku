import React, { useState,  useEffect } from "react";
import { useParams } from "react-router-dom";
import RentalApi from "../api/api";
import "./Card.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import { useAuth } from './auth';
import { useNavigate } from 'react-router-dom';

function Bookings(){
  const { property_id } = useParams();
  const auth = useAuth();
  const navigate = useNavigate()

  const [startDate, setStartDate] = useState(new Date());
  const [start_time, setStartTime] = useState('08:00');
  const [end_time, setEndTime] = useState('10:00');
  const [added_booking, setAddedBooking] = useState(false);
  
  const [blocked, setBlocked] = useState(true);
  const [blockedDates, setBlockedDates] = useState([]);
 


  function toggleAddedBooking(){
    let val = added_booking? false:true;
    setAddedBooking(val);
  }

  function toggleBlocked(){
    let val = blocked? false:true;
    setBlocked(val);
  }

  async function getBlockedDates(){
    try {
      const list = await RentalApi.getBookings({property_id});
  
      if ( list ){
        //TODO:
        //setBlockedDates(list.rentals );
        let disabledDates = [];
        console.log("Rentals " + list.rentals);
        list.rentals.map((b, i) => {
          let dateStr = (b.date).substring(0,10);
          let y = dateStr.substring(0,4);
          let m = dateStr.substring(5, 7);
          let d = dateStr.substring(8, 10);
          console.log("date " + y + " " + m + " " + d );
          m = m -1; //counting starts from 0
          disabledDates.push(new Date(y, m, d));
        });
        setBlockedDates(disabledDates);
        toggleBlocked();
      }
      //toggleBlocked();
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(function effectFunction() { 
    let mounted = true;
    getBlockedDates();
    if( mounted ){
      toggleBlocked();
    }
    return function cleanup(){
      mounted = false;
    }
  }, []);


  async function postData(){
    
    try {
      let year = startDate.getFullYear();
      let day = startDate.getDate();
      let month = startDate.getMonth() + 1;
      let dateStr = year + "-" + month + "-" + day;
      let renter_id = auth.user;
      //let renter_id = "testuser3";//TODO get from userprofile
      let propertyIdIntVal = parseInt(property_id);

      let data = {
        property_id:propertyIdIntVal, 
        date:dateStr,
        start_time: start_time,
        end_time: end_time,
        renter_id: renter_id
      }
      const booking = await RentalApi.addBookings(data, auth.token)
      if ( booking ){
        toggleAddedBooking();
        navigate("/profile/mybookings");

      }
      
    } catch(error) {
      console.log(error);
      alert("Error " + error);
    }
  }

  function handleSubmit(e){
    e.preventDefault();
    console.log("startDate " + startDate);
    let date = startDate.getDate();
    let year = startDate.getFullYear();
    console.log("year is " + year);
    console.log("date is " + date);
    console.log("Month is " + startDate.getMonth());
    console.log("Year is " + year );
    console.log("start time is " + start_time);
    console.log("end time is " + end_time);
    // Error checking to see if end_time > start_time
    //TO Do server should implement this as well.
    if (end_time < start_time){
      alert("Give 2 hr window b/w the start and end times")
    }
    // Make the api call
    postData();

  }
  
  return (
    <div className="container">
      <h2 className="mt-4 mb-2">Bookings Page</h2> <span>For property Id: {property_id}</span>
      <hr></hr>
      <h6 className="mt-2">Select Day:</h6>
      <DatePicker 
        selected={startDate} onChange={(date) => setStartDate(date)} 
        //filterDate={isWeekday}
        excludeDates={blockedDates}
      />
      <br></br>
      <div className="mt-4">
        <h6>Enter Start Time:</h6>
        <TimePicker 
          onChange={setStartTime} 
          start_time={start_time} 
          maxDetail={'minute'}
          //disableClock={true}
        />
     </div>
     <div className="mt-4">
        <h6>Enter End Time:</h6>
        <TimePicker 
          onChange={setEndTime} 
          end_time={end_time} 
          //maxDetail={'minute'}
          // disableClock={true}
        />
     </div>
     <div className="mt-4">
      <button className="btn-primary" onClick={handleSubmit}> Confirm Booking</button>
     </div>
     
    </div>
  );
}

export default Bookings;


