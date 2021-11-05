<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Installation

```bash
$ yarn install
```

## Other tools to be installed
Docker
PGAdmin

### Run Postgres service in a Docker container
```bash
docker run --name postgres-nest -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres
```

### Setting up Postgres database
- Open PGAdmin, Create a new server
- In the General Tab, add name as "Nest Js"
- In the connection tab, add host as "localhost" and password "postgres"
- Click on "Save"
- Click on NestJs under "Servers"
- Go to Databases and click on create new database
- In the General Tab, add database name as "task-management" and save

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## PORT
3002

## Swagger
``` bash
http://localhost:3002/api/
```

## Endpoints

### Get all tasks
``` bash
/tasks
```