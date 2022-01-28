const mysql = require('mysql');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

//load environment variables
require('dotenv').config();

// create a connection to the database with multiple statements for seeding
console.log('Connecting to database...');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    // multipleStatements: true,
});

// open the MySQL connection
connection.connect((err) => {
    if (err) {
        console.error(`error connecting: ${err.stack}`);
        return;
    }
    console.log(`connected as id ${connection.threadId}`);
    //generateQuery('users',columns,generatUsers());
});



//hash password
hashPassword = (password) => {
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);
    return hash;
}

//no model so setup columns and values
const columns = '`name`, `email`, `password`,`created_at`,`updated_at`';
//generate 10 users
generatUsers = (limit) => {
    const users = [];
    for (let i = 0; i < limit; i++) {
        users.push(`('${faker.name.firstName()}', '${faker.internet.email()}', '${hashPassword(faker.internet.password())}',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)`);
    }

    return users;
}

generateQuery = (table, columns, values) => {
    let query = `INSERT INTO ${table} (${columns}) VALUES ${values}`;
    console.log(query);
    return query;
}


connection.query(generateQuery('users',columns,generatUsers(10)), (err, results) => {
    if (err) {
        console.error(`error: ${err.stack}`);
        return;
    }
    console.log(results);
});

connection.end();


