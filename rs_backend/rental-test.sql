\connect rental

-- SELECT * FROM BOOKINGS;

-- SELECT Bookings.booking_id, Bookings.property_id, Bookings.date, Bookings.start_time, 
-- Bookings.end_time, Bookings.renter_id, Properties.property_owner, Properties.cost
-- From Bookings, Properties
-- WHERE Bookings.renter_id='rsuser' AND Bookings.property_id = Properties.property_id; 

-- SELECT Bookings.booking_id, Bookings.property_id, Bookings.date, Bookings.start_time, 
-- Bookings.end_time, Bookings.renter_id, Properties.property_owner, Properties.cost, Users.email
-- From Bookings, Properties, Users
-- WHERE Bookings.renter_id='rsuser' 
-- AND Bookings.property_id = Properties.property_id AND Users.username = Properties.property_owner; 

-- SELECT Bookings.booking_id, Bookings.property_id, Bookings.date, Bookings.start_time, 
-- Bookings.end_time, Bookings.renter_id, Properties.property_owner, Properties.cost, Properties.property_id
-- From Bookings, Properties
-- WHERE Properties.property_owner='rsuser' 
-- -- AND Users.username = Bookings.renter_id
-- AND Bookings.property_id = Properties.property_id ;
--   AND Users.username = Bookings.renter_id; 

-- SELECT * FROM properties where property_owner = 'rsuser' ORDER BY property_id;

-- SELECT Bookings.booking_id, Bookings.property_id, Bookings.date, Bookings.start_time, 
-- Bookings.end_time, Bookings.renter_id, Properties.property_owner, Properties.cost, Properties.property_id
-- From Properties JOIN Bookings
-- ON Bookings.property_id = Properties.property_id
-- AND Properties.property_owner='rsuser';

SELECT Bookings.booking_id, Bookings.property_id AS BookingsPId, 
Bookings.date, Bookings.start_time, Bookings.renter_id As RenterID,
Bookings.end_time, Bookings.renter_id, Properties.property_owner, Properties.cost, 
Properties.property_id AS PropertyID
From Bookings, Properties
WHERE Properties.property_id =7 AND Bookings.property_id = 7 
