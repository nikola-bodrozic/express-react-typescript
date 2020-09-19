# Debug Express server & React App

## Node.js

in nodejs folder `npm start` starts express server with API endpoints at
- <http://localhost:3008/users> 
- <http://localhost:3008/users/:id>

## React

in react folder `npm start` starts React app on <http://localhost:3000> It calls node Express end-point to get JSON.


## Debug React app

- install extension "Debugger for Chrome" on VS Code
- `yarn start`
- set break points
- run debugger

## Debug NodeJS

- set break points
- run debugger
- hit end-point with `curl localhost:3008/users/1`
