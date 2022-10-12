import axios from "axios";


const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

const p_type = ['', 'Backyard', 'Driveway' ]


/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class RentalApi {

  static getBaseURL(){
    return BASE_URL;
  }
  static getPropertyType(type){
    return p_type[type];
  }

  static async getListings(filterParams = {}){
    const { property_owner} = filterParams;
    let url = `${BASE_URL}/property`;
    if ( property_owner ){
      url = `${BASE_URL}/property?property_owner=${property_owner}`;
    }
    const response = await axios.get(url);
    return response.data;
  }

  // Individual API routes

  /** Get property based on property_id. */
  static async getProperty(property_id) {
    let url = `${BASE_URL}/property/${property_id}`;
    let res = await axios.get(url);
    //.log(res.data)
    return res.data;
  }


  static async getBookings(filterParams = {}) {
    const { renter_id, property_id } = filterParams;
    
    let url = `${BASE_URL}/booking`;
    if ( renter_id ){
      url = `${BASE_URL}/booking?renter_id=${renter_id}`;
    }
    if ( property_id ){
      //url = `${BASE_URL}/booking?property_id=${property_id}`;
      url = `${BASE_URL}/property/property_booking/${property_id}`;
    }
    let res = await axios.get(url);
    return res.data;
  }

  static async getMyBookings(renter_id) {

    let url = `${BASE_URL}/booking/details/${renter_id}`;
    let res = await axios.get(url);
    return res.data
  }

  static async addProperty(propertyData, header_data) {
    
    let res = {}
    let url = `${BASE_URL}/property/${propertyData.property_owner}`;
    let val = "";
    
    let data = {
        street: propertyData.street, city: propertyData.city, 
        state: propertyData.state, zip:propertyData.zip, property_type:propertyData.ptype, cost:propertyData.cost, 
        property_owner:propertyData.property_owner,
        description:propertyData.description
    };
    
    res = await axios.post(url, data, {
      headers: {Authorization: `Bearer ${ header_data }`}
    })       
    val = res.data.property_id
  
    return val;
    
  }

  static async addBookings(data,  header_data) {
    
    let res = {};
    let r_id = data.renter_id;

    let url = `${BASE_URL}/booking/${r_id}`;

    res = await axios.post( url, data, 
                          {headers: {Authorization: `Bearer ${ header_data }`}}
                         );
    return res.data;
  }

  /** Signup for site. */
  static async signup(data) {
    let res = {}
    let url = `${BASE_URL}/auth/register`;
    res = await axios.post(url, data);
    return {"token": res.data.token};
  }

  static async login(data) {
    let url = `${BASE_URL}/auth/token`;
    let res = await axios.post(url, data);
    return res.data;
  }

}

export default RentalApi;
