const routes = require('express').Router();

module.exports = (app,db) => {

    const UserController = require('../controller/user.controller')(app,db);

    /**
     * @description routes for user factory
     */
    routes.get('/user', UserController.get)
    routes.post('/user/create', UserController.create)
    routes.post('/user/update', UserController.update)
    routes.post('/user/delete', UserController.delete)
    return routes;
};