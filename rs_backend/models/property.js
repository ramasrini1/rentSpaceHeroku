"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");


/** Related functions for companies. */

class Property {
  /** Create a company (from data), update db, return new company data.
   *
   * data should be { handle, name, description, numEmployees, logoUrl }
   *
   * Returns { handle, name, description, numEmployees, logoUrl }
   *
   * Throws BadRequestError if company already in database.
   * */
  static async addProperty({ street, city, state, zip, image_url, property_type, cost, description, property_owner }, file=null) {
    //console.log("propertey_addr " + property_addr);
    let result;
    result = await db.query(
          `INSERT INTO properties
           (street, city, state, zip,  property_type, cost, description, property_owner)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           RETURNING property_id, street, city, state, zip, property_type, cost, description, property_owner `,
        [
          street,
          city,
          state,
          zip,
          property_type,
          cost,
          description,
          property_owner
        ]
    );
    let p_id = result.rows[0].property_id;

    console.log("SERVER property_id after adding " + p_id);

    // Add the property_id to listings table
    //addToListing(p_id);

    if (file === null) {
      console.log("no files to upload");
    } else {
      console.log("fileName " + file.name);
      let imgFile = p_id + "_" + file.name
      file.mv(`${__dirname}/../client/public/uploads/${file.name}`, err => {
        if (err) {
          //console.error(err);
          return res.status(500).send(err);
        }
        // upload the name of the file image_url to the record
        let qString = "img_url"
        const querySql = `UPDATE properties 
        SET ${querySql}
        WHERE property_id = ${p_id} 
        RETURNING property_id, property_addr, image_url, property_type, cost, description, property_owner `;
        async function updateUrl(qString){
          result = await db.query(querySql, [imgFile]);
        }
        updateUrl(querySql);
      });
    }
    const property = result.rows[0];
    return property;
    
  }

  

  /** Find all companies (optional filter on searchFilters).
   *
   * searchFilters (all optional):
   * - minEmployees
   * - maxEmployees
   * - name (will find case-insensitive, partial matches)
   *
   * Returns [{ handle, name, description, numEmployees, logoUrl }, ...]
   * */

  static async findAll(searchFilters = {}) {
    let query = `SELECT * FROM properties`;
    // Finalize query and return results
    let whereExpressions = "";
    // Finalize query and return results
    const { property_owner } = searchFilters;
    
    if ( property_owner ){
      whereExpressions =  ` where property_owner = '${property_owner}' `;
    }
    query = query + whereExpressions;

    const propertiesRes = await db.query(query);
    return propertiesRes.rows;
  }

  /** Given a company handle, return data about company.
   *
   * Returns { handle, name, description, numEmployees, logoUrl, jobs }
   *   where jobs is [{ id, title, salary, equity }, ...]
   *
   * Throws NotFoundError if not found.
   **/

  static async get(property_id) {
    const propertyRes = await db.query(
          `SELECT property_id,
                  street,
                  city,
                  state,
                  zip,
                  image_url,
                  property_owner,
                  property_type,
                  description,
                  cost
           FROM properties
           WHERE property_id = $1`,
        [property_id]);

    const property = propertyRes.rows[0];

    if (!property) throw new NotFoundError(`No Property: ${property}`);
    return property;
  }

  /** Update company data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {name, description, numEmployees, logoUrl}
   *
   * Returns {handle, name, description, numEmployees, logoUrl}
   *
   * Throws NotFoundError if not found.
   */
  static async update(property_id, data) {
    
    const { setCols, values } = sqlForPartialUpdate( data ) ;
    const propertyIdx = "$" + (values.length + 1);

   
    const querySql = `UPDATE properties 
                      SET ${setCols} 
                      WHERE property_id = ${propertyIdx} 
                      RETURNING property_id, 
                                street,
                                city,
                                state,
                                zip, 
                                image_url, 
                                property_type,
                                cost,
                                description,
                                property_owner`;
    const result = await db.query(querySql, [...values, property_id]);
    const property = result.rows[0];

    if (!property) throw new NotFoundError(`No property: ${property_id}`);

    return property;
  }

  /** Update property table's image_url data.
   
   */
  static async updateImgUrl(property_id, img_url) {
    console.log("property_id " + property_id + " " + img_url);
    
    const query = `Update properties set image_url='${img_url}' 
                    where property_id=${property_id} RETURNING property_id, street`;
    console.log("query is " + query);
    const result = await db.query(query);
    console.log(result);
    console.log("url updated");
    const property = result.rows[0];

    if (!property) throw new NotFoundError(`No property: ${property_id}`);

    return property;
  }


  /** Delete given company from database; returns undefined.
   *
   * Throws NotFoundError if company not found.
   **/

  static async remove(property_id) {
    console.log("PROP " + property_id);
    const result = await db.query(
          `DELETE
           FROM properties
           WHERE property_id = $1
           RETURNING property_id`,
        [property_id]);

    const property = result.rows[0];

    if (!property) throw new NotFoundError(`No property: ${property_id}`);
  }

  static async getPropertyBookingDetails(property_id) {
  
    const propertyRes = await db.query(
      `SELECT Bookings.booking_id, Bookings.property_id, Bookings.date, 
      Bookings.start_time, 
      Bookings.end_time, Bookings.status, Bookings.renter_id, 
      Properties.property_owner, Properties.cost, Users.email
      From Bookings, Properties, Users 
      WHERE Properties.property_id='${property_id}' 
      AND Bookings.property_id = '${property_id}' 
      AND Users.username = Bookings.renter_id`);

      const propertyBookings = propertyRes.rows;
      console.log("propertyBookings " + propertyRes.rows )

      if (!propertyBookings) throw new NotFoundError(`No Property: ${propertyBookings}`);
      return propertyBookings;
  }

}

module.exports = Property;
