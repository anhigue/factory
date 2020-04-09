const bcrypt = require('bcrypt')
const config = require('../config/config')
const jwt = require('jsonwebtoken');
module.exports = (app, db) => {
    const dbMongo = db
    return {
        get: (req, res) => {
            getUser(req, res, dbMongo)
        },
        delete: (req, res) => {
            deleteUser(req, res, dbMongo)
        },
        create: (req, res) => {
            createUser(req, res, dbMongo)
        },
        update: (req, res) => {
            updateUser(req, res, dbMongo)
        },
        login: (req, res) => {
            logIn(req, res, dbMongo)
        }
    }
}

const collection = 'users'

function getUser(req, res, dbMongo) {
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

function deleteUser(req, res, dbMongo) {
    try {
        const _idDocument = req.body._id
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

function createUser(req, res, dbMongo) {
    try {
        dbMongo.connection(err => {

            if (err) {
                res.status(401).send({
                    message: 'Something is wrong',
                    err
                })
            }

            const user = req.body

            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(user.password, salt);

            user.password = hash
            dbMongo.getDB().collection(collection).insertOne(user, (err, response) => {
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

function updateUser(req, res, dbMongo) {
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
                        name: userUpdate.name,
                        lastname: userUpdate.lastname,
                        password: userUpdate.password
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

function logIn(req, res, dbMongo) {
    try {
        const userSend = req.body
        dbMongo.connection(err => {
            if (err) {
                res.json({
                    message: 'Something is wrong, error ocurred.',
                    error: err
                })
            } else {
                dbMongo.getDB().collection(collection).findOne({
                    name: userSend.name
                }, (err, userFind) => {

                    if (err) {
                        res.json({
                            message: 'Something is wrong',
                            err
                        })
                    }

                    if (validatePassword(userSend.password, userFind.password)) {
                        const token = jwt.sign({
                            data: {
                                _id: userFind._id,
                                name: userFind.name,
                                lastName: userFind.lastName,
                                position: userFind.position
                            }
                        }, config.seed, {
                            expiresIn: 60 * 60
                        });

                        res.json({
                            ok: true,
                            user: {
                                _id: userFind._id,
                                name: userFind.name,
                                lastName: userFind.lastName,
                                position: userFind.position
                            },
                            token
                        })
                    } else {
                        res.json({
                            ok: false,
                            user: null,
                            token: null
                        })
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