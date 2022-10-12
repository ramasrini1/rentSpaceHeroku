import { NavLink } from 'react-router-dom'
import { useAuth } from './auth';


export const Navbars = () => {
  const auth = useAuth()
  
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? 'bold' : 'normal',
      textDecoration: isActive ? 'none' : 'underline'
    }
  }

return (
  <nav className='primary-nav'>
      <NavLink to='/' style={navLinkStyles}>
        <b style={{ color: "red" }}>Rent_My_Space</b>
      </NavLink>
      <NavLink to='/' style={navLinkStyles}>
        Home
      </NavLink>
      <NavLink to='/add_property' style={navLinkStyles}>
        Host
      </NavLink>
      <NavLink to='/about' style={navLinkStyles}>
        About
      </NavLink>
      
      { auth.user && (<NavLink to='/profile' style={navLinkStyles}>
         MyProfile 
      </NavLink>
      )}

      { auth.user && (<NavLink to='/login' onClick={auth.logout} style={navLinkStyles}>
           Logout {auth.user}
      </NavLink>
      )}
     
      {!auth.user && (
        <NavLink to='/login' style={navLinkStyles}>
          Login
        </NavLink>
      )}
    </nav>

)
    
  
}
