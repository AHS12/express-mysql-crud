const sql = require('../../db/connection');
const bcrypt = require('bcrypt');

const TableName = 'users';
// constructor
const User = function(user) {
    this.name = user.name;
    this.email = user.email;
    this.password = hashPassword(user.password);
    this.created_at = new Date();
    this.updated_at = new Date();
}

// Create a new user
// User.create = (newUser, result) => {
//     return new Promise((resolve, reject) => {
//         sql.query('INSERT INTO users SET ?', this, (err, res) => {
//             if (err) {
//                 reject(err);
//             }
//             resolve(res);
//         });
//     });
// }


// Get a single user
User.getUserById = (userId, result) => {

    sql.query(`SELECT * FROM ${TableName} WHERE id = ?`, userId, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('Found user: ', res[0]);
            result(null, res[0]);
            return;
        }

        // not found User with the id
        result({ kind: 'not_found' }, null);

    });

}

// Get all users
User.all = result => {

    sql.query(`SELECT * FROM ${TableName}`, (err, res) => {
        if (err) {
            console.log(err);
            result(null, err);
            return;
        }

        console.log('Users: ', res);
        result(null, res);

    });

}

// Get all users filtered by name
User.findByName = (name, result) => {

    sql.query(`SELECT * FROM ${TableName} WHERE name = ?`, name, (err, res) => {

        if (err) {
            console.log(err);
            result(null, err);
            return;
        }

        if (res.length) {
            console.log('Found user: ', res[0]);
            result(null, res[0]);
            return;
        }

        // not found User with the name
        result({ kind: 'not_found' }, null);
        //result(null, res);

    });
}

// Get all users search by email
User.SearchUsers = (email, result) => {

    sql.query(`SELECT * FROM ${TableName} WHERE email LIKE ?`, [email], (err, res) => {

        if (err) {
            console.log(err);
            result(null, err);
            return;
        }

        console.log('Users: ', res);
        result(null, res);

    });

}

//insert a new user
User.create = (newUser, result) => {
    sql.query(`INSERT INTO ${TableName} SET ?`, newUser, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        console.log(res);
        console.log('New user created: ', { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
}

// Update a user
User.updateById = (id, user, result) => {

    sql.query(`UPDATE ${TableName} SET ? WHERE id = ?`, [user, id], (err, res) => {
        if (err) {
            console.log(err);
            result(null, err);
            return;

        }
        // not found User with the id
        if (res.affectedRows == 0) {
            result({ kind: 'not_found' }, null);
            return;
        }

        console.log('Updated user: ', { id: id, ...user });
        result(null, { id: id, ...user });

    });

}

// Delete a user
User.delete = (id, result) => {

    sql.query(`DELETE FROM ${TableName} WHERE id = ?`, id, (err, res) => {
        if (err) {

            console.log(err);
            result(null, err);
            return;
        }

        // not found User with the id
        if (res.affectedRows == 0) {
            result({ kind: 'not_found' }, null);
            return;
        }

        console.log('Deleted user with id: ', id);
        result(null, res);

    });

}

//hash password
function hashPassword(password){
    const saltRounds = 10;
    const hash = bcrypt.hashSync(String(password), saltRounds);
    return hash;
}

//email exists
User.emailExists = (email,result) => {
    sql.query(`SELECT * FROM ${TableName} WHERE email = ?`, email, (err, res) => {
        if (err) {
            console.log(err);
            result(null, err);
            return false;
        }

        if (res.length) {
            console.log('Found user: ', res[0]);
            result(null, res[0]);
            return;
        }

        // not found User with the name
        result({ kind: 'not_found' }, null);

    });
}


module.exports = User;