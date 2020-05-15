const axios = require('axios')
const util = require('../utiles/utiles')
module.exports = (app, db) => {
    const dbMongo = db
    return {
        /** 
         * @description get data from store, do a call from other external api
         * @param {req} req
         * @param {res} res
         * @param {db} dbMongo
         */
        call: (req, res) => {
            callOtherAPI(req, res, dbMongo)
        },
        /** 
         * @description register data that comes from store
         * @param {req} req
         * @param {res} res
         * @param {db} dbMongo
         */
        registerOrder: (req, res) => {
            createOrder(req, res, dbMongo)
        },
        /** 
         * @description cancel order from store
         * @param {req} req
         * @param {res} res
         * @param {db} dbMongo
         */
        cancel: (req, res) => {
            cancelOrder(req, res, dbMongo)
        },
        /** 
         * @description cancel order from factory
         * @param {req} req
         * @param {res} res
         * @param {db} dbMongo
         */
        cancelOrderStore: (req, res) => {
            cancelOrderStoreC(req, res, dbMongo)
        }
    }
}

/* collections */
const orderCollection = 'orders'
const clientCollection = 'clients'
const statusCollection = 'status'

/* get report product store */
function callOtherAPI(req, res, dbMongo) {

    const pass = req.body.password
    const client = req.body.client

    const url = 'http://' + client.ip + '/sale/fabric/' + pass

    axios.get(url)
        .then((response) => {
            res.json({
                ok: true,
                data: response.data
            })
        })
        .catch((error) => {
            res.json({
                ok: false,
                error
            })
        })
}

/* cancel order store */
function cancelOrderStoreC(req, res, dbMongo) {
    const idOrder = req.body.id
    const client = req.body.client

    const url = 'http://' + client.ip + '/request/cancel/' + idOrder

    axios.put(url)
        .then((response) => {
            res.json({
                ok: true,
                data: response.data
            })
        })
        .catch((error) => {
            res.json({
                ok: false,
                error
            })
        })
}

/* get the data to create a order  */
function createOrder(req, res, dbMongo) {

    try {

        const data = req.body

        /* valid if order comes !data.order || */
        if (!data) {
            res.json({
                ok: false,
                data: {
                    message: 'Operacion no valida'
                }
            })
        }

        dbMongo.connection(err => {
            if (err) {
                res.json({
                    message: 'Something is wrong, error ocurred.',
                    error: err
                })
            }

            /* get the status value */
            dbMongo.getDB().collection(statusCollection).findOne({
                name: 'Creada'
            }, (err, document) => {

                if (err) {
                    res.json({
                        ok: false,
                        data: null,
                        error: err
                    })
                }

                /* set value of status */
                const status = document

                /* find client */
                verifyClient(req, res, status, dbMongo)

            })
        })

    } catch (error) {
        res.json({
            ok: false,
            data: null,
            error
        })
    }

}

/* verify if client exist and have credential ok */
function verifyClient(req, res, status, dbMongo) {

    console.log(req.body.ip)
    dbMongo.getDB().collection(clientCollection).findOne({
        token: req.body.password
    }, (err, document) => {

        if (err) {
            res.json({
                ok: false,
                data: null,
                error: err
            })
        }

        /* set value of client */
        const client = document

        saveOrder(req, res, status, client, dbMongo)

    })
}

/* save order on collection */
function saveOrder(req, res, status, client, dbMongo) {

    console.log(req.body)

    const orderCreate = util.transformDataToOrder(req.body.id, req.body.product, req.body.date, client, status)

    dbMongo.getDB().collection(orderCollection).insertOne(orderCreate, (err, document) => {
        if (err) {
            res.json({
                ok: false,
                data: null,
                error: err
            })
        }

        res.json({
            ok: true,
            data: orderCreate.timeFullDelivery
        })
    })
}

/* cancel order from store */
function cancelOrder(req, res, dbMongo) {
    try {
        dbMongo.connection(err => {
            if (err) {
                res.json({
                    message: 'Something is wrong, error ocurred.',
                    error: err
                })
            }

            /* verify status */
            dbMongo.getDB().collection(statusCollection).findOne({
                name: 'Cancelada'
            }, (err, document) => {

                if (err) {
                    res.json({
                        ok: false,
                        data: null,
                        error: err
                    })
                }

                /* set value of status */
                const status = document

                /* find client */
                updateOrder(req, res, status, dbMongo)

            })
        })
    } catch (error) {
        res.json({
            ok: false,
            data: null,
            error
        })
    }
}

/* update status order by id store */
function updateOrder(req, res, status, dbMongo) {
    dbMongo.getDB().collection(orderCollection).findOneAndUpdate({
        id: req.body.id
    }, {
        $set: {
            status: status
        }
    }, {
        returnOriginal: false
    }, (err, result) => {
        if (err) {
            res.json({
                ok: false,
                data: null,
                error: err
            })
        }

        res.json({
            ok: true,
            updated: result.lastErrorObject.updatedExisting
        })

    })
}