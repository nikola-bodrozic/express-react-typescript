# Full Stack

Express server, React TypeScript & MySQL on Docker. 

## Prepare

For prod environment you need to set public IP or domain in react/package.json

```
"build": "REACT_APP_NODE_IP=nnn.nnn.nnn.nnn:3008 react-scripts build",
```

Set MySQL credentials in .env file. MYSQL_HOST must match name of MySQL service and database name must match with database name in mysql/init.sql

```sh
MYSQL_DATABASE=mydb
MYSQL_HOST=dbmysql
MYSQL_ROOT_PASSWORD=
```

and start docker stack

```sh
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

Axios in useEffect with Async / Await and unmount, Loader, Routes, Retry API calls, deal with error HTTP responses and axios timeout

## Debug locally react app

- install `Debugger for Chrome` on Code
- `yarn start`
- set break points & run debugger

## Debug locally NodeJS

- set break points
- run debugger
