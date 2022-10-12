"use strict";

/** Routes for companies. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureAdmin, ensureCorrectUserOrAdmin } = require("../middleware/auth");
const Booking = require("../models/booking");
const bookingNewSchema = require("../schemas/bookingNew.json");
const bookingUpdateSchema = require("../schemas/bookingUpdate.json");

const router = new express.Router();
 
/** GET /  =>
 *   { rentals: [ { booking_id, property_id, date, start_time, end_time, renter_id, status, payment }, ...] }
 * booking routes
 *
 * Authorization required: none
 */
router.get("/", async function (req, res, next) {
  console.log("query params")
  const q = req.query;
  
  try {
    const rentals = await Booking.findAll(q);
    return res.json({ rentals });
  } catch (err) {
    return next(err);
  }
});

router.get("/details/:username",  async function(req, res, next) {
  let renter_id = req.params.username;
  console.log("renter_id is " + renter_id)
  try {
    const my_bookings = await Booking.getMyBookingDetails(renter_id);
    console.log("my_bookings")
    return res.json({ my_bookings });
  } catch (err) {
    console.log(err);
    return next(err);
  }
});

/** POST / { booking } =>  { new booking }
 *
 *  should be { { property_id, date, start_time, end_time, renter_id } }
 *
 * Returns { booking_id, property_id, date, start_time, end_time, renter_id  }
 *
 * Authorization required: admin/user
 */

router.post("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, bookingNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      console.log("bad request");
      throw new BadRequestError(errs);
    }
    console.log("add booking");
    let booking = await Booking.addBooking(req.body);
    return res.status(201).json({ booking });
  } catch (err) {
    return next(err);
  }
});


/** PATCH /[booking_id] { fld1, fld2, ... } => { booking }
 *
 * Patches booking data.
 *
 * fields can be: { name, description, numEmployees, logo_url }
 *
 * Returns { handle, name, description, numEmployees, logo_url }
 *
 * Authorization required: admin/user
 */

router.patch("/:booking_id", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, bookingUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const booking = await Booking.update(req.params.booking_id, req.body);
    return res.json({ booking });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[booking_id]  =>  { deleted: booking_id}
 *
 * Authorization: admin/user
 */

router.delete("/:booking_id", ensureAdmin, async function (req, res, next) {
  try {
    await Booking.remove(req.params.booking_id);
    return res.json({ deleted: req.params.booking_id });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
