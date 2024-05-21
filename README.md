# Bank Manager App

## Description

App for managing bank clients

## System Requirements

- Node.js ~20.12.0
- NPM ^10.5.0
- TypeScript ~5.3.0
- Postgres 16 and higher

## Installation
1. Clone project
```bash
$ git clone https://github.com/MalinavyBusel/nest-bank-app
```
2. install dependencies
```bash
$ yarn install
```
3. Create .env files with following variables in services:\
    account - postgres vars\
    auth - postgres vars, jwt vars\
    api-gateway - jwt vars\
    bank - postgres vars\
    client - postgres vars\
    transaction - postgres vars

postgres vars:
 - POSTGRES_PASSWORD
 - POSTGRES_USER
 - POSTGRES_DB
 - POSTGRES_PORT
 - POSTGRES_HOST

jwt vars:
 - JWT_SECRET
 - ACCESS_TOKEN_EXPIRATION
 - REFRESH_TOKEN_EXPIRATION

## Running the app

```bash
# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```