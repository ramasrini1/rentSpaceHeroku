-- both test users have the password "password"

INSERT INTO users (username, password, first_name, last_name, email, is_admin)
VALUES 
       ('testuser1',
        'testpass1',
        'Test1',
        'User1',
        'joel1@joelburton.com',
        FALSE ),
         ('testuser2',
        'testpass2',
        'Test2',
        'user2',
        'joel2@joelburton.com',
        FALSE),
        ('testuser3',
        'testpass3',
        'Test3',
        'user3',
        'joel3@joelburton.com',
        FALSE),
       ('testuser4',
        'testpass4',
        'Test4',
        'user4',
        'joel4@joelburton.com',
        FALSE);
       


INSERT INTO properties (street,
                        city,
                        state,
                        zip,
                        image_url,
                       property_type,
                       cost,
                       description,
                       property_owner)
VALUES  ('11491 Trillium Court', 'San Diego', 'CA', 92131, 'house.jpeg', 1, '100', 'Beautiful tropical backyard', 'testuser1'),
        ('11492 Bent Court', 'San Diego', 'CA', 92131,  'house4.jpeg', 2, '200', 'Two blocks from the famous Del Sur Beach', 'testuser2' ),
        ('11492 Swan Court', 'San Diego', 'CA', 92131, 'house3.jpeg', 1, '200', 'Spacious backyard with a 10 feet pool', 'testuser3' ),
        ('11492 Swiss Court', 'San Ramon', 'CA', 92131, 'house5.jpeg', 1, '200','Big enough to host weddings and graduation parties', 'testuser3' ),
        ('11492 Swiss Court', 'San Ramon', 'CA', 92131, 'house6.jpg', 1, '200', 'Big backyard with barbeque grill and heated pool', 'testuser4' ),
         ('11492 Swiss Court', 'San Ramon', 'CA', 92131, 'house6.jpg', 2, '200', 'Five blocks from airport', 'testuser2' );



INSERT INTO bookings ( property_id,
                       date,
                       start_time,
                       end_time,
                       renter_id)
VALUES (1, '2022-10-26', '09:00', '10:00', 'testuser3'),
       (1, '2022-12-21', '09:10', '11:10', 'testuser2' ),
       (1, '2022-11-21', '09:10', '11:10', 'testuser2' );

-- INSERT INTO listings(listing_id, show)
-- VALUES( 1, TRUE),
--         (2, TRUE);


-- SELECT Bookings.booking_id, Bookings.property_id, Bookings.date, Bookings.start_time, 
-- Bookings.end_time, Bookings.renter_id, Properties.property_owner, Properties.cost
-- From Bookings, Properties
-- WHERE Bookings.renter_id='rsuser' AND Bookings.property_id = Properties.property_id; 

-- SELECT Bookings.booking_id, Bookings.property_id, Bookings.date, Bookings.start_time, 
-- Bookings.end_time, Bookings.renter_id, Properties.property_owner, Properties.cost
-- From Bookings, Properties
-- WHERE Properties.property_owner='rsuser' AND Bookings.property_id = Properties.property_id; 
