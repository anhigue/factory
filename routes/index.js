const routes = require('express').Router();

module.exports = (app,db) => {

    const UserController = require('../controller/user.controller')(app,db);
    const VehicleController = require('../controller/vehicle.controller')(app,db);
    const FactoryController = require('../controller/factory.controller')(app,db);

    /**
     * @description routes for user factory
     */
    routes.get('/user', UserController.get)
    routes.post('/user/create', UserController.create)
    routes.post('/user/update', UserController.update)
    routes.post('/user/delete', UserController.delete)

    /**
     * @description routes for user factory
     */
    routes.get('/factory', FactoryController.get)
    routes.post('/factory', FactoryController.create)
    routes.put('/factory', FactoryController.update)
    routes.delete('/factory/:_id', FactoryController.delete)

    /**
     * @description routes for user vehicle
     */
    routes.get('/user', VehicleController.get)
    routes.post('/user', VehicleController.create)
    routes.put('/user', VehicleController.update)
    routes.delete('/user/:_id', VehicleController.delete)
    return routes;
};