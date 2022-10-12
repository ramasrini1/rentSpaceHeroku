import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './auth';
import RentalApi from "../api/api";
import { Link } from "react-router-dom";


function Login(){
  const [LoginData, setLoginData] = useState({
    username: "",
    password: ""
  });

  //const [formErrors, setFormErrors] = useState([]);
  const navigate = useNavigate()
  const auth = useAuth();

  async function  handleLogin(evt) {
    evt.preventDefault();
    try {

      if (LoginData.username === "" || LoginData.password === "" ){
        throw new Error("Enter valid username/password");
      }

      let user = {
        username: LoginData.username,
        password: LoginData.password,
      }
   
      let result = await RentalApi.login(user);
      if (result.token ){
        user.token = result.token;
        console.log("token from api " + result.token )
        auth.login(user);
        navigate("/");
      } else {
        alert("Error logging in")
      }
    } catch(error) {
      console.log(error);
      alert(error);
    }
  }

    /** Update form data field */
    function handleChange(evt) {
      const { name, value } = evt.target;
      setLoginData(data => ({ ...data, [name]: value }));
    }
  
  return (
    <div className="LoginForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <h2 className="mb-3">Login</h2>
           <div className="card">
             <div className="card-body">
             <form onSubmit={handleLogin}>
                <div className="form-group">
                   <label>Username</label>
                   <input
                       name="username"
                      className="form-control"
                      value={LoginData.username}
                      onChange={handleChange}
                  />
               </div>
                <div className="form-group">
                   <label>Password</label>
                   <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={LoginData.password}
                      onChange={handleChange}
                  />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary mt-2 float-right"
                    onSubmit={handleLogin}
                >
                  Submit
                </button>
              </form>
              <div className="mt-4">
                If you don't have an account<Link to={`/signup`}>
                            <button className="btn btn-link">Sign Up</button>
                    </Link>
               </div>
            </div>
          </div>
        </div>
      </div>
  );
}
export default Login;
