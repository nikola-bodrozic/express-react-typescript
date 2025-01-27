# Full Stack

Express server, React TypeScript & MySQL on Docker. 

React calls Nodejs service to get data from the API endpoints.

Axios in useEffect with Async / Await and unmount, Loader, Retry API calls, deal with error HTTP responses and axios timeout

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
- <http://localhost:4000/api/v1/task> gets data from database
- <http://localhost:4000/api/v1/users> gets users
- <http://localhost:4000/api/v1/users/:id> gets user

## React

Production build is running on <http://localhost> after `docker-compose up` 

## Comunication between containers in Docker stack

Shell in react container and cURL to nodejs container
```sh
curl nodejs:4000/api/v1/task
{"title":"get milk"}
```

## Comunication between host and nodejs container in Docker stack

in host machine cURL to nodejs microservice
```sh
curl http://localhost:4000/api/v1/task
{"title":"get milk"}
```

## Debug locally react app

- install `Debugger for Chrome` on Code
- in react folder run `yarn` to install dependanices and `yarn start` to start app on port 3000
- set break points & run debugger
