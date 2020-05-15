const bcrypt = require('bcrypt')
const config = require('../config/config')
const jwt = require('jsonwebtoken');
module.exports = (app, db) => {
    const dbMongo = db
    return {
        /** 
         * @description get all the clients
         * @param {req} req
         * @param {res} res
         * @param {db} dbMongo
        */
        get: (req, res) => {
            getClient(req, res, dbMongo)
        },
        /** 
         * @description delete a client
         * @param {req} req
         * @param {res} res
         * @param {db} dbMongo
        */
        delete: (req, res) => {
            deleteClient(req, res, dbMongo)
        },
        /** 
         * @description create a new client
         * @param {req} req
         * @param {res} res
         * @param {db} dbMongo
        */
        create: (req, res) => {
            createClient(req, res, dbMongo)
        },
        /** 
         * @description update a client
         * @param {req} req
         * @param {res} res
         * @param {db} dbMongo
        */
        update: (req, res) => {
            updateClient(req, res, dbMongo)
        },
        /** 
         * @description login client api
         * @param {req} req
         * @param {res} res
         * @param {db} dbMongo
        */
        login: (req, res) => {
            loginClient(req, res, dbMongo)
        },
        /** 
         * @description consult orders from client
         * @param {req} req
         * @param {res} res
         * @param {db} dbMongo
        */
        getData: (req, res) => {
            consultOrder(req, res, dbMongo)
        }
    }
}

const collection = 'clients'

function getClient(req, res, dbMongo) {
    try {
        dbMongo.connection(err => {
            if (err) {
                res.json({
                    message: 'Something is wrong, error ocurred.',
                    error: err
                })
            } else {
                dbMongo.getDB().collection(collection).find({}).toArray((err, documents) => {
                    if (err)
                        res.json({
                            message: 'Something is wrong with the documents',
                            err
                        })
                    else {
                        res.json(documents)
                    }
                })
            }
        })
    } catch (error) {
        res.json({
            message: 'Something is wrong, error ocurred.',
            error: error
        })
    }
}

function deleteClient(req, res, dbMongo) {
    try {
        const _idDocument = req.params._id
        dbMongo.connection(err => {
            if (err) {
                res.json({
                    err
                })
            } else {
                dbMongo.getDB().collection(collection).findOneAndDelete({
                    _id: dbMongo.getObjectIdDocument(_idDocument)
                }, (err, result) => {
                    if (err)
                        res.json({
                            message: 'Something is wrong',
                            err
                        })
                    else
                        res.json(result);
                })
            }
        })
    } catch (error) {
        res.json({
            message: 'Something is wrong',
            error
        })
    }
}

function createClient(req, res, dbMongo) {
    try {
        dbMongo.connection(err => {

            if (err) {
                res.status(401).send({
                    message: 'Something is wrong',
                    err
                })
            }

            const client = req.body

            /* const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(client.token, salt); */

            client.token = hash
            dbMongo.getDB().collection(collection).insertOne(client, (err, response) => {
                if (err) {
                    res.json({
                        message: 'Something is wrong',
                        err
                    })
                } else {
                    res.json(response)
                }
            })
        })
    } catch (error) {
        res.json({
            message: 'Something is wrong',
            error
        })
    }
}

function updateClient(req, res, dbMongo) {
    try {
        const userUpdate = req.body
        dbMongo.connection(err => {
            if (err) {
                res.json({
                    message: 'Something is wrong',
                    err
                })
            } else {
                dbMongo.getDB().collection(collection).findOneAndUpdate({
                    _id: dbMongo.getObjectIdDocument(userUpdate._id)
                }, {
                    $set: {
                        name: req.body.name,
                        timeDelivery: req.body.timeDelivery,
                        status: req.body.status,
                        token: req.body.token,
                        address: req.body.address,
                        url: req.body.url,
                        ip: req.body.ip
                    }
                }, {
                    returnOriginal: false
                }, (err, result) => {
                    if (err)
                        console.log(err);
                    else {
                        res.json(result);
                    }
                });
            }
        })
    } catch (error) {
        res.json({
            message: 'Something is wrong',
            error
        })
    }
}

function loginClient(req, res, dbMongo) {
    try {
        const clientSend = req.body
        dbMongo.connection(err => {
            if (err) {
                res.json({
                    message: 'Something is wrong, error ocurred.',
                    error: err
                })
            } else {
                dbMongo.getDB().collection(collection).findOne({
                    url: clientSend.name
                }, (err, client) => {
                    if (err) {
                        res.json({
                            message: 'Something is wrong',
                            err
                        })
                    }

                    if (client === null) {
                        res.json({
                            ok: false,
                            client: null,
                            token: null
                        })
                    } else {
                        if (clientSend.password === client.token) {
                            const token = jwt.sign({
                                data: client
                            }, config.seed, {
                                expiresIn: 60 * 60 * 24
                            });

                            res.json({
                                ok: true,
                                client,
                                token
                            })
                        } else {
                            res.json({
                                ok: false,
                                client: null,
                                token: null
                            })
                        }
                    }
                })
            }
        })
    } catch (error) {
        res.json({
            message: 'Something is wrong',
            error
        })
    }
}


function validatePassword(password, hash) {
    return bcrypt.compareSync(password, hash)
}

function consultOrder(req, res, dbMongo) {
    try {
        const clientSend = req.body
        dbMongo.connection(err => {
            if (err) {
                res.json({
                    message: 'Something is wrong, error ocurred.',
                    error: err
                })
            }


            dbMongo.getDB().collection('orders').find({
                'client.ip': clientSend.ip
            }).toArray((err, orders) => {
                if (err) {
                    res.json({
                        ok: false,
                        orders: null,
                        error: err
                    })
                }

                if (orders === null) {
                    res.json({
                        ok: false,
                        orders: null
                    })
                }

                res.json({
                    ok: true,
                    orders
                })
            })
        })
    } catch (error) {
        res.json({
            message: 'Something is wrong',
            error
        })
    }
}