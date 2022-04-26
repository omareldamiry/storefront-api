# Storefront API

This project was developed for the purpose of fulfilling the requirements of the first project of the EgFWD initiative through Udacity.

# Overview

## Setup

- Clone this repository using `git clone https://github.com/omareldamiry/storefront-api.git`
- Open a terminal in the root directory of the project.
- Run `yarn` or `npm install` to install all dependencies.

### Environment

To successfully run the project locally, create a new `.env` file and paste the following in the file:

```s
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=store
POSTGRES_TEST_DB=store_test
POSTGRES_USER=store_user
POSTGRES_PASSWORD=password123
ENV=dev
SALT=10
SECRET=h4v3_a_w0nd3rfu1_d4y
```

### Database

This project uses PostgreSQL database for storing and managing data.
Please set up your local PostgreSQL database instances using the provided data in the environment variables in the `.env` file.

To set up the database, open your `psql` terminal and follow these steps:

1. Create a new user by running `CREATE USER store_user WITH PASSWORD password123;` .
2. Create a new database by running `CREATE DATABASE store;` .
3. Grant all privileges of `store` to `store_user` by running `GRANT ALL PRIVIEGES ON store TO store_user;`
4. Create a test database by running `CREATE DATABASE store_test;` .
5. Grant all privileges of `store_test` to `store_user` by running `GRANT ALL PRIVILEGES ON store_test TO store_user;` .

## Scripts

Here is a list of all available scripts:

| Script | Description |
| --- | --- |
| `npm start` | Starts the server using nodemon |
| `npm run test` | Executes all unit tests |
| `npm run migrate` | Runs all up migrations  |
| `npm run reset` | Runs all down migrations |
| `npm run tsc` | Builds the project |
| `npm run lint` | Runs ESLint on all typescript source files |

To start the server:

1. Run `npm run migrate` to set up all required tables for the project.
2. Run `npm run tsc` to build the project.
3. Run `npm start` to start hosing the project on port `3000` .

## Important Ports

- This project runs on port `3000` by default.
- PostgreSQL database should run on port `5432` by default.

## Endpoints

**All endpoints are described in the `REQUIREMENTS.md` file under the project root directory.