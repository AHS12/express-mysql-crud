module.exports = app => {
    const UserController = require('../app/controllers/user.controller');

    var router = require('express').Router();

    // User Routes

    // GET all users
    router.get('/', UserController.index);

    // GET all users filtered by name
    router.get('/filter/:name', UserController.findByName);

    // GET all users search by name/email
    router.get('/search/:email', UserController.searchUsersByEmail);

    //GET user by id
    router.get('/:id', UserController.findById);

    // POST a new user
    router.post('/insert', UserController.create);

    // PUT update a user
    router.put('/update/:id', UserController.update);

    // DELETE a user
    router.delete('/delete/:id', UserController.delete);

    app.use('/api/users', router);


}