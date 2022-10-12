import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './components/auth';
import Home from "./components/Home";
import Signup from "./components/Signup";
import Reservations from "./components/Reservations";
import FileUpload from "./components/FileUpload";
import AddProperty from "./components/AddProperty";
import Bookings from "./components/Bookings";
import { Navbars } from './components/Navbar';
import MyListings  from './components/MyListings';
import BookingDetails  from './components/BookingDetails';
import { MyBookings } from './components/MyBookings';
import { NoMatch } from './components/NoMatch';
import { Profile } from './components/Profile';
import Login from './components/Login';
import About from './components/About';
import { RequireAuth } from './components/RequireAuth';
import "./App.css";


function App() {

  return (
    <AuthProvider>
      <Navbars />
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='about' element={ <About />}/>
          <Route path='signup' element={<Signup />} /> 
        
          <Route path='profile' element={ <RequireAuth><Profile /></RequireAuth>}>
            <Route index element={<MyBookings />} />
            <Route path='mybookings' element={<MyBookings />} />
            <Route path='mylistings' element={<MyListings />} />
            <Route path='mylistings/bookingDetails/:property_id' element={<BookingDetails />} />
          </Route>
           
          <Route path='reservations' element={<Reservations />} />
          <Route path='reservations/:property_id' 
            element={<Reservations />} />
          
          <Route path='reservations/:property_id/book' 
            element={ <RequireAuth>
                        <Bookings/>
                      </RequireAuth>} />
          
          {/* <Route path='reservations/bookingDetails/:property_id' 
            element={ <RequireAuth>
                        <BookingDetails/>
                      </RequireAuth>} /> */}
          
          <Route path='add_property' 
            element={
              <RequireAuth>
                  <AddProperty /> 
              </RequireAuth>} />
          
          <Route path='upload/:property_id' 
            element={
              <RequireAuth>
              <FileUpload />
              </RequireAuth>}/>
         
          <Route path='*' element={<NoMatch />} />
      </Routes>
    </AuthProvider>
  );
}

export default App




