const routes = require('express').Router();

module.exports = (app,db) => {

    const UserController = require('../controller/user.controller')(app,db);
    const VehicleController = require('../controller/vehicle.controller')(app,db);
    const FactoryController = require('../controller/factory.controller')(app,db);
    const ClientController = require('../controller/client.controller')(app,db);
    const PartController = require('../controller/part.controller')(app,db);
    const OrderController = require('../controller/order.controller')(app, db);

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
    routes.get('/vehicle', VehicleController.get)
    routes.post('/vehicle', VehicleController.create)
    routes.put('/vehicle', VehicleController.update)
    routes.delete('/vehicle/:_id', VehicleController.delete)

    /**
     * @description routes for user vehicle
     */
    routes.get('/client', ClientController.get)
    routes.post('/client', ClientController.create)
    routes.put('/client', ClientController.update)
    routes.delete('/client/:_id', ClientController.delete)

    /**
     * @description routes for user part
     */
    routes.get('/part', PartController.get)
    routes.post('/part', PartController.create)
    routes.put('/part', PartController.update)
    routes.delete('/part/:_id', PartController.delete)
    routes.put('/part/vehicle', PartController.updateVehicle)

    /**
     * @description routes for user order
     */
    routes.get('/order', OrderController.get)
    routes.post('/order', OrderController.create)
    routes.put('/order', OrderController.update)
    routes.delete('/order/:_id', OrderController.delete)
    routes.put('/order/part', OrderController.updatePart)
    routes.put('/order/state', OrderController.updateState)

    return routes;
};