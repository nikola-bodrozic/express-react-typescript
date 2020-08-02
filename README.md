# Express server, React TypeScript & MySQL service 

## Run Docker stack

```sh
docker-compose up 
```

## mysql

MySQL service is running on localhost:3306 and it's used by nodejs service to get a row from database. Database is pre populated with data from `./mysql/init.sql` script.

## nodejs

Starts express server with API endpoints at 
- <http://localhost:3008/task> gets data from database
- <http://localhost:3008/users> 
- <http://localhost:3008/users/:id>

## react

is running on <http://localhost:3000> It calls nodejs service to get data from the API endpoints.

## Debug locally react app

- install `Debugger for Chrome` on vs code
- `yarn start`
- set break points & run debugger

## Debug locally NodeJS

- set break points
- run debugger
