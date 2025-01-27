# Full Stack

Express server, React TypeScript & MySQL on Docker. 

It calls Nodejs service to get data from the API endpoints.

Axios in useEffect with Async / Await and unmount, Loader, Routes, Retry API calls, deal with error HTTP responses and axios timeout

## Prepare

Rename `.env.template` to `.env`. Set MySQL credentials in .env file. 
MYSQL_HOST must match name of MySQL service
MYSQL_DATABASE must match with database in mysql/init.sql MYSQL_PASSWORD must match with password in mysql/init.sql

```sh
MYSQL_PASSWORD=
MYSQL_DATABASE=mydb
MYSQL_HOST=dbmysql
MYSQL_USER=
MYSQL_ROOT_PASSWORD=
```

and start docker stack

```sh
docker compose up
```

## MySQL

MySQL service is running on dbmysql:3306 and it's used by nodejs service to get a row from database. Database is pre populated with data from `./mysql/init.sql` script.

## Nodejs

Express server with API endpoints at 
- <http://localhost:3008/api/v1/task> gets data from database
- <http://localhost:3008/api/v1/users> gets users
- <http://localhost:3008/api/v1/users/:id> gets user

Route `/task` has 1 second delay. It simulates latency so that loader icon is visible for 1 second.

## React

Production build is running on <http://localhost> after `docker-compose up` 

## Debug locally react app

- install `Debugger for Chrome` on Code
- in react folder run `yarn` to install dependanices and `yarn start` to start app on port 3000
- set break points & run debugger
