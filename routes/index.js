const routes = require('express').Router();

module.exports = (app,db) => {

    /**
     * @description logic for collections
     */
    const UserController = require('../controller/user.controller')(app,db)
    const VehicleController = require('../controller/vehicle.controller')(app,db)
    const FactoryController = require('../controller/factory.controller')(app,db)
    const ClientController = require('../controller/client.controller')(app,db)
    const PartController = require('../controller/part.controller')(app,db)
    const OrderController = require('../controller/order.controller')(app, db)
    const TransactionController = require('../controller/transaction.controller')(app, db)
    const ReportController = require('../controller/report.controller')(app, db)
    const StatusController = require('../controller/status.controller')(app, db)
    const EmailController = require('../controller/email.controller')(app, db)
    const StoreController = require('../controller/store.controller')(app, db)

    /**
     * @description middleware for routes
     */
    const MiddleWareController = require('../middleware/middleware.controller');

    /**
     * @description routes for user
     */
    routes.get('/user', UserController.get)
    routes.post('/user/create', UserController.create)
    routes.post('/user/update', UserController.update)
    routes.post('/user/delete', UserController.delete)
    routes.post('/user/login', UserController.login);

    /**
     * @description routes for factory
     */
    routes.get('/factory', FactoryController.get)
    routes.post('/factory', FactoryController.create)
    routes.put('/factory', FactoryController.update)
    routes.delete('/factory/:_id', FactoryController.delete)

    /**
     * @description routes for vehicle
     */
    routes.get('/vehicle', MiddleWareController.verifyToken, VehicleController.get)
    routes.post('/vehicle', VehicleController.create)
    routes.put('/vehicle', VehicleController.update)
    routes.delete('/vehicle/:_id', VehicleController.delete)

    /**
     * @description routes for status
     */
    routes.get('/status', StatusController.get)
    routes.post('/status', StatusController.create)
    routes.put('/status', StatusController.update)
    routes.delete('/status/:_id', StatusController.delete)

    /**
     * @description routes for client
     */
    routes.get('/client', ClientController.get)
    routes.post('/client', ClientController.create)
    routes.put('/client', ClientController.update)
    routes.delete('/client/:_id', ClientController.delete)

    /**
     * @description routes for part
     */
    routes.get('/part', PartController.get)
    routes.post('/part', PartController.create)
    routes.put('/part', PartController.update)
    routes.delete('/part/:_id', PartController.delete)
    routes.put('/part/vehicle', PartController.updateVehicle)

    /**
     * @description routes for order
     */
    routes.get('/order', OrderController.get)
    routes.post('/order', OrderController.create)
    routes.put('/order', OrderController.update)
    routes.delete('/order/:_id', OrderController.delete)
    routes.put('/order/part', OrderController.updatePart)
    routes.put('/order/state', OrderController.updateState)

    /**
     * @description routes for transaction
     */
    routes.get('/log', TransactionController.get)
    routes.post('/log', TransactionController.create)

    /**
     * @description routes for transaction
     */
    routes.get('/report', ReportController.get)
    routes.get('/report/new/:sort/:status/:dateInit/:dateFinal', ReportController.create)
    routes.post('/report', ReportController.register)

    /**
     * @description routes for email
     */
    routes.post('/email', MiddleWareController.verifyToken, EmailController.send)

    /**
     * @description routes for store
     */
    routes.post('/store/report', StoreController.call)

    return routes;
};