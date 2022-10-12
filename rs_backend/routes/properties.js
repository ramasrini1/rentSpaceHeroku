"use strict";

/** Routes for companies. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureAdmin, ensureCorrectUserOrAdmin, ensureLoggedIn } = require("../middleware/auth");
const Property = require("../models/property");
const propertyNewSchema = require("../schemas/propertyNew.json");
const propertyUpdateSchema = require("../schemas/propertyUpdate.json");
const router = new express.Router();

/** GET /  =>
 *   { rentals: [ { property_id, street, city, state, zip, imag_url, property_type,
 *                  cost, description, property_owner}, ... }
 *
 * Authorization required: none
 * property route
 */
router.get("/", async function (req, res, next) {
  const q = req.query;
  try {
    const rentals = await Property.findAll(q);
    return res.json({ rentals });
  } catch (err) {
    return next(err);
  }
});

/** POST 
 *  Add property for the user
 * Request Body:
 * { street, city, state, zip, image_url, property_type, cost, description, property_owner }, file=null
 * Returns 
 * {property_id, street, city, state, zip, image_url, property_type, cost, description, property_owner}
 * the image of the property is not sent through this request
 *
 * Authorization required: admin/user
 */
router.post("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, propertyNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      console.log("bad request");
      throw new BadRequestError(errs);
    }
    let property;
    if ( req.files ){
      property = await Property.addProperty(req.body, req.files.sampleFile);
    } else {
      property = await Property.addProperty(req.body);
      let id = property.property_id;
      return res.json({ property_id: id });
    }
    //console.log("SERVER " + res.status(201).json({property}));
    //return res.status(201).json({ property });
  } catch (err) {
    console.log("server " + err)
    return next(err);
  }
});


/** PATCH 
 *
 * Patches property data.
 * Authorization required: admin/user
 */
router.patch("/:property_id", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, propertyUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const property = await Property.update(req.params.property_id, req.body);
    return res.json({ property });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[property_id]  =>  { deleted: property_id }
 *
 * Authorization: admin/owner of property
 */

router.delete("/:property_id", ensureAdmin, async function (req, res, next) {
  try {
    await Property.remove(req.params.property_id);
    return res.json({ deleted: req.params.property_id });
  } catch (err) {
    return next(err);
  }
});

/** GET /[property_id]  =>  { property }
 *
 * Authorization required: none
 */

router.get("/:property_id", async function (req, res, next) {
  try {
    const property = await Property.get(req.params.property_id);
    return res.json({ property });
  } catch (err) {
    return next(err);
  }
});

/** GET /[property_Id]  =>  { booking details for the property }
 *
 * Authorization required: none
 */

router.get("/property_booking/:property_id", async function (req, res, next) {
  try {
    console.log("pdid " + req.params.property_id)
    const property = await Property.getPropertyBookingDetails(req.params.property_id);
    return res.json({ property });
  } catch (err) {
    console.log("err " + err)
    return next(err);
  }
});

module.exports = router;
