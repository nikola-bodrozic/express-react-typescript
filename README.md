# Express server, React TypeScript & MySQL service 

Full Stack solution on Docker

## Prepare

Set MySQL root password and database name in .env file and start docker stack

```sh
echo 'MYSQL_ROOT_PASSWORD=secret' > .env
echo 'MY_SQL_DATABASE=mydb' >> .env
echo 'MYSQL_HOST=dbmysql' >> .env
docker-compose up 
```

## MySQL

MySQL service is running on dbmysql:3306 and it's used by nodejs service to get a row from database. Database is pre populated with data from `./mysql/init.sql` script.

## Nodejs

Starts express server with API endpoints at 
- <http://localhost:3008/task> gets data from database
- <http://localhost:3008/users> gets users
- <http://localhost:3008/users/:id>

Route `/task` has 4 secs delay. It simulates latency.

## React

Development

`yarn`

`yarn start`

Production build is running on <http://localhost> after `docker-compose up` 

It calls Nodejs service to get data from the API endpoints.

Async / Await, Loader, Routes, Retry API calls, deal with error HTTP responses and axios timeout

## Debug locally react app

- install `Debugger for Chrome` on Code
- `yarn start`
- set break points & run debugger

## Debug locally NodeJS

- set break points
- run debugger
