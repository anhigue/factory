const bcrypt = require('bcrypt');
module.exports = (app, db) => {
    const dbMongo = db
    return {
        get: (req, res) => {
            getClient(req, res, dbMongo)
        },
        delete: (req, res) => {
            deleteClient(req, res, dbMongo)
        },
        create: (req, res) => {
            createClient(req, res, dbMongo)
        },
        update: (req, res) => {
            updateClient(req, res, dbMongo)
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
            
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(client.token, salt);
            
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
                        url: req.body.url
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