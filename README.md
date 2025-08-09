# Full Stack

Express server, React TypeScript & MySQL on Docker. 

React calls Nodejs service to get data from the API endpoints.

Axios in useEffect with Async / Await, Loader, dealing with error HTTP responses and axios timeout. Code coverage in HTML format.

## Prepare

Rename `.env.template` to `.env`. Set MySQL credentials in .env file: 
- MYSQL_HOST must match name of MySQL service
- MYSQL_DATABASE must match with database in mysql/init.sql 
- MYSQL_PASSWORD must match with password in mysql/init.sql

```sh
MYSQL_PASSWORD=
MYSQL_DATABASE=mydb
MYSQL_HOST=mysql-service
MYSQL_USER=
MYSQL_ROOT_PASSWORD=
```

and start docker stack

```sh
docker compose up
```

## MySQL

MySQL service is running on mysql-service:3306 and it's used by nodejs service to get a row from database. Database is pre populated with data from `./mysql/init.sql` script.

## Nodejs

Express server with API endpoints at 
- <http://localhost:4000/api/v1/task/1> gets task from database
- <http://localhost:4000/api/v1/users> gets users
- <http://localhost:4000/api/v1/users/1> gets user

## React

Production build is running on <http://localhost> after `docker-compose up` 

## Comunication between containers in Docker stack

Shell in react container and cURL to nodejs container
```sh
curl nodejs:4000/api/v1/task/1
{"title":"get milk"}
```

## Comunication between host and nodejs container in Docker stack

in host machine cURL to nodejs microservice
```sh
curl http://localhost:4000/api/v1/task/1
{"title":"get milk"}
```

## Code coverage

```sh
yarn jest --coverage
```

open file in `nodejs/coverage/lcov-report/app.js.html` to see what lines are covered


## Retry till Express server is up
it is in route `/api/v1/serverboot` and react componet that waits and shows data from server is `RaxCall.tsx`


## Debug React app
- in folder `nodejs` install dependancies `yarn` and start Express server `yarn start`
- install `Debugger for Chrome` on Code
- in react folder run `yarn` to install dependanices and `yarn start` to start app on port 3000
- set break points & run debugger


## Run k8s

in nodejs folder 

```sh
docker build -t nodejs-app:latest ./nodejs
```

in k8s folder
Set credentials in `mysql-secrets.yaml`
Apply all your Kubernetes YAML files in order:

```sh
kubectl apply -f mysql-secrets.yaml
kubectl apply -f mysql-init-configmap.yaml
kubectl apply -f mysql-persistent-volume-claim.yaml
kubectl apply -f mysql-service.yaml
kubectl apply -f mysql-deployment.yaml
kubectl apply -f nodejs-service.yaml
kubectl apply -f nodejs-deployment.yaml
```

## clean up k8s

```sh
kubectl delete deployment nodejs-deployment mysql-deployment
kubectl delete service nodejs-service mysql-service
kubectl delete pvc mysql-pv-claim
kubectl delete secret mysql-secrets
kubectl delete configmap mysql-init-scripts
```
