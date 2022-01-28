
# express-mysql-crud

 A basic crud api using express mysql(without orm)



## Installation & Setup

yarn is used here. start server by the following commands
```bash
  cd project
  yarn
  node server.js
```
if you have nodemon setup then start server by the following commands

```bash
yarn start
```

Server Port & Db Credentials are stored in .env file.Check .env.example for more details.
```bash
SERVER_PORT=

DB_CONNECTION=
DB_HOST=
DB_PORT=
DB_DATABASE=
DB_PASSWORD=
DB_USERNAME=
  
```
Databse migraton(table creation) & seeder is also available.to use them run the following commands

```bash
yarn migrate
yarn seed
```
    
