"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");


/** Related functions for companies. */

class Booking {
  /** Create a company (from data), update db, return new company data.
   *
   * data should be { handle, name, description, numEmployees, logoUrl }
   *
   * Returns { handle, name, description, numEmployees, logoUrl }
   *
   * Throws BadRequestError if company already in database.
   * */
  static async addBooking({ property_id, date, start_time, end_time, renter_id } ) {
    console.log("propertey_id " + property_id);
    const result = await db.query(
          `INSERT INTO bookings
           (property_id,  date, start_time, end_time, renter_id)
           VALUES ($1, $2, $3, $4, $5 )
           RETURNING booking_id, property_id, date, start_time, end_time, renter_id, status, payment `,
        [
          property_id,
          date,
          start_time,
          end_time,
          renter_id
        ]
    );
    const booking = result.rows[0];
    return booking;
    
  }

  
  /** Find all bookings (optional filter on searchFilters).
   * Returns all the rows of the table bookings
   * */

  static async findAll(searchFilters = {}) {
    let query = `SELECT * FROM bookings`;
    let whereExpressions = "";
    // Finalize query and return results
    const { renter_id, bookingId, property_id } = searchFilters;
    
    if ( renter_id ){
      whereExpressions =  ` where renter_id = '${renter_id}' `;
    }
    if ( property_id ){
      whereExpressions =  ` where property_id = '${property_id}' `;
    }
    query = query + whereExpressions;
   
    const bookingsRes = await db.query(query);
    return bookingsRes.rows;
  }

  /** Given a booking_id, return data about booking.
   *
   *
   * Throws NotFoundError if not found.
   **/
  static async get(booking_id) {
    const bookingRes = await db.query(
          `SELECT *
           FROM bookings
           WHERE booking_id = $1`,
        [booking_id]);

    const booking = bookingRes.rows[0];

    if (!booking) throw new NotFoundError(`No Property: ${booking}`);
    return booking;
  }

  /////
  static async getMyBookingDetails(renter_id) {
    //console.log("renter is " + renter_id)
    let query = 
    `SELECT Bookings.booking_id, Bookings.property_id, Bookings.date, Bookings.start_time, 
      Bookings.end_time, Bookings.status, Bookings.renter_id, 
      Properties.property_owner, Properties.cost, 
      Users.email
      From Bookings, Properties, Users
      WHERE Bookings.renter_id='${renter_id}' 
      AND Bookings.property_id = Properties.property_id
      AND Users.username = Properties.property_owner`;
    
    console.log("query is " + query)
    const result = await db.query(query);

    const bookings = result.rows;
    console.log("my bookings " + bookings)

    if (!bookings) throw new NotFoundError(`No Property: ${renter_id}`);
    return bookings;
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
  static async update(booking_id, data) {
    
    const { setCols, values } = sqlForPartialUpdate( data ) ;
    //like $5
    const bookingIdx = "$" + (values.length + 1);

    const querySql = `UPDATE bookings 
                      SET ${setCols} 
                      WHERE booking_id = ${bookingIdx} 
                      RETURNING booking_id, 
                                property_id, 
                                date, 
                                start_time,
                                end_time,
                                renter_id,
                                status,
                                payment`;
    const result = await db.query(querySql, [...values, booking_id]);
    const booking = result.rows[0];

    if (!booking) throw new NotFoundError(`No booking: ${booking_id}`);

    return booking;
  }

  /** Delete given booking from database; returns undefined.
   *
   * Throws NotFoundError if booking_id not found.
   **/

  static async remove(booking_id) {
    console.log("Booking Id " + booking_id);
    const result = await db.query(
          `DELETE
           FROM bookings
           WHERE booking_id = $1
           RETURNING booking_id`,
        [booking_id]);

    const booking = result.rows[0];

    if (!booking) throw new NotFoundError(`No booking: ${booking_id}`);
  }
}


module.exports = Booking;
