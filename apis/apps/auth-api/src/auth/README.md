### Auth 

## Auth Service

# Goal
This will be a service that will take in a username and password from the caller, and possibly attach an application id if we want to have logins for each application
If a login is successful, the service will return a list of user claims for the user. 

On change of the user, there will be a change to the their claims that will be fired from the user service to the auth service.  

Auth service will manage claims and user logins, once the login is successful, the controller will determine if there needs to be a token that is returned for a redirect or if the claims themselves need to be returned.

We will not send back full user objects form the auth controller but just list of claims that will build out a contextual object.

If we want a user object, we will then turn around and grab the user object from the user controller, but the object ids for fetching will be provided from the claims

## Auth Controller

# Endpoints

// TODO