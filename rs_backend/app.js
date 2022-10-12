"use strict";

/** Express app for rentMySpace. */

const express = require("express");
const fileUpload = require('express-fileupload');
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const propertyRoutes = require("./routes/properties");
const bookingRoutes = require("./routes/booking");
const uploadRoutes = require("./routes/upload");
const usersRoutes = require("./routes/users");
// const jobsRoutes = require("./routes/jobs");

const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(fileUpload());
//Function to serve all static files
// inside public directory.
app.use(express.static('public')); 
app.use('/images', express.static('images'));

app.use(authenticateJWT);
app.use("/auth", authRoutes);
app.use("/booking", bookingRoutes)
app.use("/users", usersRoutes);
app.use("/property", propertyRoutes);
app.use("/upload", uploadRoutes);


/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;
  console.log("Message " + message);
  console.log("status " + status)

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
