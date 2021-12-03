# 2021-fall-cs160-Ice-Cream

# Stack

- React.js
- Express.js
- Node.js
- MongoDB

# Installation

- Clone the repo
- Move into the folder repo from your terminal
- Move to the client folder: cd client
- Run npm install to install node dependencies for the UI
- Now go to server folder: cd ../server
- Run npm install to install node dependencies for the server

Env file
You’re going to need to have an env file with a constant to connect to a Mongo database as well as a key and secret for authentication and permission

DATABASE=your database connection uri
JWT_KEY= enter jwt key
REFRESH_TOKEN_SECRET = enter token secret

Running app
Open 2 terminal tabs to the project
Move to the client folder in one and server folder in the other
Run npm run in both tabs
The server would be running on port 2000
The client would run on port 3000, and you would be automatically be redirected to the page after starting the app on the UI
