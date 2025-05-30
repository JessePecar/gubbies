## Auth API

# This api is built using NestJs using the standard RESTful API. 

To run this application you will want to use docker and have it always running in the background. 
There will be very little changes to this api, and any changes should be carefully monitoreds

## Controllers

# Auth
- Login

# Chain
- Get Chain
- Get Chains
- Subscribe to Chain
- Subscribe to Chains
- Create Chain
- Update Chain
- Retire Chain

# Store 
- Get Store
- Get Stores
- Subscribe to Stores
- Subscribe to Store
- Create Store
- Update Store
- Retire Store

# User
- Get User
- Get Users
- Subscribe to User
- Subscribe to Users
- Create User
- Update User
  - Update User's Application 
    - This is a subset of update, this might just be an easy way for use to update the user's soecific information
- Deactivate User

# Role 
- Get Role
- Get Roles
- Subscribe to Role
- Subscribe to Roles
- Create Role
- Update Role
*We will probably not want to remove or retire roles in this current iteration*

# Core 
This folder is where we will store our guards, repos and some utility functions/services