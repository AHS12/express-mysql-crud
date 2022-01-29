const { http } = require('npmlog');
const User = require('../models/user.model');


//returns all users
exports.index = (req, res) => {
    User.all((err, data) => {
        //console.log(data);
        if (err) {
            res.json({
                error: err
            });
        } else {
            res.json({
                data: data
            });
        }
    });
};

//returns user find by id
exports.findById = (req, res) => {
    User.getUserById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `User not Found! with id ${req.params.id}`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving User with id ${req.params.id}`
                });
            }
        }
        else {
            res.json({
                data: data
            });
        }
    });
};

//returns user find by name
exports.findByName = (req, res) => {
    User.findByName(req.params.name, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `User not Found! with name ${req.params.name}`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving User with name ${req.params.name}`
                });
            }
        } else {
            res.json({
                data: data
            });
        }
        
    });
};


//search users by email
exports.searchUsersByEmail = (req, res) => {
    User.SearchUsers(req.params.email, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `No user found with email ${req.params.email}`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving User with email ${req.params.email}`
                });
            }
        } else {
            res.json({
                data: data
            });
        }
        
    });
};


//create a new user
exports.create = (req, res) => {

    //console.log(req.body);
    //basic validation
    if (!req.body.name || !req.body.email || !req.body.password) {
        res.status(422).send({
            message: 'Content can not be empty!'
        });
    }

    //create user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    console.log(user);

    User.emailExists(user.email, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                //save user in the database
                User.create(user, (err, data) => {
                    if (err) {
                        res.status(500).send({
                            message: `Error creating user ${err}`
                        });
                    } else {
                        res.json({
                            data: data
                        });
                    }
                });
            } else {
                res.status(500).send({
                    message: `Error creating user ${err}`
                });
            }
        } else {
            res.status(500).send({
                message: `User already exists with email ${user.email}`
            });
        }
    });

    // if(User.emailExists(req.body.email)){
    //     res.status(422).send({
    //         message: 'Email already exists!'
    //     });
    // }
    //save user in the database
   


};


//update a user
exports.update = (req, res) => {

    //basic validation
    if (!req.body.name || !req.body.email || !req.body.password) {
        res.status(422).send({
            message: 'Content can not be empty!'
        });
    }

    //create user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    //update user in the database
    User.updateById(req.params.id, user, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `User not found with id ${req.params.id}`
                });
            } else {
                res.status(500).send({
                    message: `Error updating user with id ${req.params.id}`
                });
            }
        } else {
            res.json({
                data: data
            });
        }
    });
};


//delete a user
exports.delete = (req, res) => {
    User.delete(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `User not found with id ${req.params.id}`
                });
            } else {
                res.status(500).send({
                    message: `Could not delete user with id ${req.params.id}`
                });
            }
        } else {
            res.json({
                //message: `User deleted successfully!`
            },204);
        }
    });
};