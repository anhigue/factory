const routes = require('express').Router();

module.exports = (app) => {

    const UserController = require('../controller/user.controller')(app);

    /**
     * @description routes for user factory
     */
    routes.get('/user/:factory', UserController.get)
    routes.post('/user/create', UserController.create)
    routes.post('/user/update', UserController.update)
    routes.delete('/user/delete', UserController.delete)
    return routes;
};