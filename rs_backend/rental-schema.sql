CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE properties (
  property_id SERIAL PRIMARY KEY,
  street TEXT NOT NULL,
  city VARCHAR(25) NOT NULL,
  state VARCHAR(25) NOT NULL,
  zip INTEGER NOT NULL,
  image_url TEXT DEFAULT 'generic.jpeg',
  property_type INTEGER  DEFAULT 1,
  cost INTEGER,
  description VARCHAR(150),
  property_owner VARCHAR(25) NOT NULL
    REFERENCES users ON DELETE CASCADE

);

CREATE TABLE bookings (
  booking_id SERIAL PRIMARY KEY,
  property_id INTEGER NOT NULL REFERENCES properties,
  date  DATE  NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL, 
  renter_id TEXT REFERENCES users,
  status VARCHAR(10) DEFAULT 'unpaid',
  payment INTEGER,
  UNIQUE (property_id, date)
  
);


-- CREATE TABLE listings (
--   listing_id INTEGER REFERENCES properties ON DELETE CASCADE,
--   show BOOLEAN NOT NULL DEFAULT TRUE
-- );


-- CREATE TABLE applications (
--   username VARCHAR(25)
--     REFERENCES users ON DELETE CASCADE,
--   job_id INTEGER
--     REFERENCES jobs ON DELETE CASCADE,
--   PRIMARY KEY (username, job_id)
-- );
