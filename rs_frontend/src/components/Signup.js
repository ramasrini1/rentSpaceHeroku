import React, { useState } from "react";
import RentalApi from "../api/api";
import { useNavigate } from 'react-router-dom';


function Signup(){
  const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
      });
  
  const navigate = useNavigate()
  

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {

      if (formData.username === "" || formData.password === "" ||
        formData.firstName === "" || formData.lastName === "" || formData.email === ""
      ){
        throw new Error("Enter valid form fields");
      }
      let data = {
        username: formData.username,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        isAdmin: false
      }
      let result = await RentalApi.signup(data);
      if (result.token) {
        let url = `/`
        navigate(url);
      
      } else {
        alert( "Error " + result.error);
      }
    } catch(error) {
      console.log(error);
      alert(error);
    }
  }

   /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }
  return (
    <div className="SignupForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <h2 className="mb-3">Sign Up</h2>
           <div className="card">
             <div className="card-body">
             <form onSubmit={handleSubmit}>
                <div className="form-group">
                   <label>Username</label>
                   <input
                       name="username"
                      className="form-control"
                      value={formData.username}
                      onChange={handleChange}
                  />
               </div>
                <div className="form-group">
                   <label>Password</label>
                   <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                  />
                </div>

             <div className="form-group">
                   <label>First name</label>
                   <input
                      name="firstName"
                      className="form-control"
                      value={formData.firstName}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Last name</label>
                  <input
                      name="lastName"
                      className="form-control"
                      value={formData.lastName}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                  />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary float-right"
                    onSubmit={handleSubmit}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
    
}

export default Signup;



