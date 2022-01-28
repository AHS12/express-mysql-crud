const connection = require('../../db/connection');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

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


