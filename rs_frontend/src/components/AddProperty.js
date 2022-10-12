import React from "react";
//import Alert from "../common/Alert";
import RentalApi from "../api/api";
import { useNavigate} from 'react-router-dom';
import { useAuth } from './auth';
import { useForm } from "react-hook-form";

function AddProperty() {
  const navigate = useNavigate();
  
  const auth = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();

  async function handleAddProperty( data) { 
    
    let newPropertyId;
    try {
      data.property_owner = auth.user;
      let type = parseInt(data.ptype);
      let  z = parseInt(data.zip);
      let c = parseInt(data.cost)
      //Now replace form Data with int values
      data.ptype = type;
      data.zip = z;
      data.cost = c;

      newPropertyId = await RentalApi.addProperty(data, auth.token);
      console.log("property id returned " + newPropertyId)
      let url = `/upload/${newPropertyId}`
      navigate(url);
    } catch (Error){
      console.log("in catch block " + errors);
      alert("Error " + errors);
    }

  }

  const handleError = (errors) => {};

  const registerOptions = {
      street: { required: "Street is required" },
      city: { required: "City is required" },
      state: { required: "State is required" },
      zip: { required: "Zip is required" },
      cost: { required: "Cost is required" },
      description: { required: "Description is required" },
  };

  return (
    <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <h3 className="mt-4">List Your Property</h3>
      <hr></hr>
      <div className="card mt-4">
        <div className="card-body">
          <form onSubmit={handleSubmit(handleAddProperty, handleError)}>
            <div className="form-group">
                <label>Street</label>
                <input
                    name="street"
                    className="form-control" 
                    type="text" {...register('street', registerOptions.street) }/>     
                  <small className="text-danger">
                        {errors?.street && errors.street.message}
                  </small>
            </div>
            <div className="form-group">
              <label>City</label>
              <input name="city" className="form-control" 
                  type="text" {...register('city', registerOptions.city) }/>
                <small className="text-danger">
                    {errors?.city && errors.city.message}
                </small>
            </div>
            <div className="form-group">
              <label>State</label>
              <input
                  name="state" className="form-control" 
                  type="text" {...register('state', registerOptions.state)}
              />
              <small className="text-danger">
                {errors?.state && errors.state.message}
              </small>
            </div>
            <div className="form-group">
              <label>Zip</label>
              <input
                name="zip" className="form-control" 
                type="number" {...register('zip', registerOptions.zip)}
              />
              <small className="text-danger">
                  {errors?.zip && errors.zip.message}
              </small>
            </div>
            <div className="form-group">
              <label>What you want to rent your property for?</label>
              <select className="form-control mt-2" {...register("ptype")}>
                <option value="1">Backyard</option>
                <option value="2">Driveway</option>
              </select>
            </div>
            <div className="form-group">
              <label>Short Description of rental property</label>
              <input
                name="description" className="form-control" 
                type="text" {...register('description', registerOptions.description)}
              />
            </div>
            <div className="form-group">
              <label>Cost per hr</label>
              <input
                name="cost" className="form-control" 
                type="number" {...register('cost', registerOptions.cost)}
              />
              <small className="text-danger">
                  {errors?.cost && errors.cost.message}
              </small>
            </div>
            <button className="mt-4">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
  
}

export default AddProperty;



