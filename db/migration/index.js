const connection = require('../../db/connection');

const usertableName = `users`;
const userTableColumns = `id BIGINT NOT NULL AUTO_INCREMENT,
name VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL,
created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,`;
const userTableConstrains = `PRIMARY KEY (id),
UNIQUE email_unique (email)`;
const userTableCreateQuery = `CREATE TABLE ${usertableName} (${userTableColumns} ${userTableConstrains})ENGINE = InnoDB;`;

console.log(userTableCreateQuery);

//create users table
connection.query(userTableCreateQuery, (err, results) => {
    if (err) {
        console.error(`error: ${err.stack}`);
        return;
    }
    console.log(results);
});

connection.end();
//process.exit();
