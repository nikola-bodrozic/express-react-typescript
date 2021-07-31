# Express server, React TypeScript & MySQL service 

## Run Docker stack

Set MySQL root password in .env file. 

```sh
docker-compose up 
```

## MySQL

MySQL service is running on localhost:3306 and it's used by nodejs service to get a row from database. Database is pre populated with data from `./mysql/init.sql` script.

## Nodejs

Starts express server with API endpoints at 
- <http://localhost:3008/task> gets data from database
- <http://localhost:3008/users> gets users
- <http://localhost:3008/users/:id>

Route `/users/*` has 4 secs delay.  

## React

Prod. build is running on <http://localhost> It calls Nodejs service to get data from the API endpoints.

Async / Await, Loader, Routes, Retry API calls, deal with error HTTP responses.


## Debug locally react app

- install `Debugger for Chrome` on Code
- `yarn start`
- set break points & run debugger

## Debug locally NodeJS

- set break points
- run debugger
