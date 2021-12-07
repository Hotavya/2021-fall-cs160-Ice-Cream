# 2021-fall-cs160-Ice-Cream

## Stack

- React.js
- Express.js
- Node.js
- MongoDB

## Installation

- Clone the repo
- Move into the folder repo from your terminal
- Move to the client folder: `cd client`
- Run `npm install` to install node dependencies for the UI
- Now go to server folder: `cd ../server`
- Run npm install to install node dependencies for the server

## Environment variables

You’re going to need to have 3 environments variable for the server to connect to a Mongo database as well as a key and secret for authentication and permission. You could have those in a .env file inside the server folder and the file would look like this.

```
DATABASE=your database connection uri
JWT_KEY= enter jwt key
REFRESH_TOKEN_SECRET = enter token secret
```

## Running app

- Open 2 terminal tabs to the project
- Move to the client folder in one and server folder in the other
- Run `npm start` in both tabs
- The server would be running on port 2000
- The client would run on port 3000, and you would be automatically be redirected to the page after starting the app on the UI

## Branching

- Main branch is the development branch
- Please create a branch for all the changes/features you work on
- Once you done with your change/feature, create a pull request and only merge to main branch when it is approved
