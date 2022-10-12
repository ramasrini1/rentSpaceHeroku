
import { Link, Outlet } from 'react-router-dom'
import { useAuth } from './auth'

export const Profile = () => {
  const auth = useAuth();

  return (
    <div className="container">
     
      <h3 className="mt-4">Booking and Listings for user: {auth.user}</h3>
      <hr></hr>
      <nav>
        <Link to='mybookings'>My Bookings</Link>
        <Link to='mylistings'>My Listings</Link>
      </nav> 
      <Outlet />
    </div>
  )
}

