

Post request: add users (register first time)
-------------------
With authentication Most routes need authentication

http://localhost:3001/auth/register
Post Request

{"username": "testuser5", "password": "testpass5", "firstName": "Test5", "lastName":"user5", "email":"joel5@joelburton.com", "isAdmin": false }

{
    "token": "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyNSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NjUxOTQwNDV9.zNVaMjqW3WsQ84i0YegpyPE1RmN3cq6eymbSMRGqG5E""
}

http://localhost:3001/auth/register
For admin set isAdmin: true

{"username": "useradmin", "password": "passadmin", "firstName": "AdminFirst", "lastName": "AdminLast", "email":"joel5@joelburton.com", "isAdmin": true }
Response:
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJhZG1pbiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2NDQzMTUzNn0.x74j9n3IJIXm04DUzeJE2VLtDePq-slouXuB0CMxtrc"
}


For Login
Post
http://localhost:3001/auth/token
{
    "username": "testuser5", 
    "password": "testpass5"   
}
Response
{
  
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyNSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NjUxOTQxMzJ9.aQzOzGXgHFg_18m0qLH816zo5uAXGldFQXuUQs6j9aI"
}


Admin Login token
Post
http://localhost:3001/auth/token
{
    "username": "useradmin", 
    "password": "passadmin"   
}
Response
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJhZG1pbiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NjQ0MzAxODF9.tQi2rUmWhBmHv5St792xLHWgAuKkIeSn0RxEtFn7xIM"
}


For adding properties:
Post
http://localhost:3001/property/testuser5

Header contains
key: authorization
Value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJhZG1pbiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NjQ0MzAxODF9.tQi2rUmWhBmHv5St792xLHWgAuKkIeSn0RxEtFn7xIM

Body contains:
{"street": "1234 DirtDrive", "city": "San Diego", "state": "CA", "zip":92331, "property_type":1, "cost":900, "property_owner":"testuser4"}


Post
http://localhost:3001/property/testuser4
Headers
Key: authorization 
Value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJhZG1pbiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NjQ0MzAxODF9.tQi2rUmWhBmHv5St792xLHWgAuKkIeSn0RxEtFn7xIM
Body contains:
{"street": "1234 DirtDrive", "city": "San Diego", "state": "CA", "zip":92331, "property_type":1, "cost":900, "property_owner":"testuser4"}

For booking properties
Post
http://localhost:3001/booking/testuser2
Headers
key: authorization
Value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJhZG1pbiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NjQ0MzAxODF9.tQi2rUmWhBmHv5St792xLHWgAuKkIeSn0RxEtFn7xIM

Body Request:

{ "property_id" : 2, "date": "2022-8-23", "start_time": "06:00:00", "end_time": "07:00:00", "renter_id": "testuser2" }

Get request to get ones listings

http://localhost:3001/property?property_owner=testuser
-------------
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY2NTUxNDE5Nn0.stjHkh-dKOtgc1cHVGx74PrwkHPxkhpau7vTfK-G0eA"
}