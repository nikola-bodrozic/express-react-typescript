# Express server, React TypeScript & MySQL service 

## Run Docker stack

Set your public IP in react/package.json in scripts.build

```text
"build": "REACT_APP_NODE_IP=your-ip-address:3008 react-scripts build"
```

Set MySQL root password in .env file and start docker stack

```sh
echo 'MYSQL_ROOT_PASSWORD=secret' > .env
docker-compose up 
```

## MySQL

MySQL service is running on dbmysql:3306 and it's used by nodejs service to get a row from database. Database is pre populated with data from `./mysql/init.sql` script.

## Nodejs

Starts express server with API endpoints at 
- <http://your-public-ip:3008/task> gets data from database
- <http://your-public-ip:3008/users> gets users
- <http://your-public-ip:3008/users/:id>

Route `/users/*` has 4 secs delay.  

## React

Prod. build is running on <http://your-public-ip> It calls Nodejs service to get data from the API endpoints.

Async / Await, Loader, Routes, Retry API calls, deal with error HTTP responses and axios timeout


## Debug locally react app

- install `Debugger for Chrome` on Code
- `yarn start`
- set break points & run debugger

## Debug locally NodeJS

- set break points
- run debugger
