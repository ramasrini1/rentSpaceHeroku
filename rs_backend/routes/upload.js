"use strict";

/** Routes for uploading image of property. */

const jsonschema = require("jsonschema");
const express = require("express");
const { BadRequestError } = require("../expressError");
const Property = require("../models/property");

const router = new express.Router();


/** POST 
 *  Uploads image of the property
 *  Stores image in images folder
 * Authorization required: admin/user
 */
router.post("/:property_id", async function (req, res, next) {
  try {
    
    const property_id = req.params.property_id;
    console.log("IN UPLOAD " + property_id);
  
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
  //let textName = req.body.username;
  const file = req.files.file;
  //const file = req.files.sampleFile;
  console.error(req)
  console.log("fileName " + file.name);
  
  async function moveFile(){
    await file.mv(`${__dirname}/../images/${file.name}`, err => {
      if (err) {
        console.error(err);
        //return res.status(500).send(err);
        return next(err);
        //res.status(500).send(err);
      } 
      res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    });
  }
  moveFile();
  //Update the properties table with the file name as image_url
  async function uploadUrl(){
    let r= await Property.updateImgUrl(property_id, file.name);
  }
  uploadUrl();
 
  } catch (err) {
    return next(err);
  }
  
});

module.exports = router;
