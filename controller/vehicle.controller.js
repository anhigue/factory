module.exports = (app, db) => {
    const dbMongo = db
    return {
        /** 
         * @description get all vehicles
         * @param {req} req
         * @param {res} res
         * @param {db} dbMongo
        */
        get: (req, res) => {
            getVehicle(req, res, dbMongo)
        },
        /** 
         * @description delete a vehicle
         * @param {req} req
         * @param {res} res
         * @param {db} dbMongo
        */
        delete: (req, res) => {
            deleteVehicle(req, res, dbMongo)
        },
        /** 
         * @description create a new vehicle
         * @param {req} req
         * @param {res} res
         * @param {db} dbMongo
        */
        create: (req, res) => {
            createVehicle(req, res, dbMongo)
        },
        /** 
         * @description update a vehicle
         * @param {req} req
         * @param {res} res
         * @param {db} dbMongo
        */
        update: (req, res) => {
            updateVehicle(req, res, dbMongo)
        }
    }
}

const collection = 'vehicles'

function getVehicle(req, res, dbMongo) {
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

function deleteVehicle(req, res, dbMongo) {
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

function createVehicle(req, res, dbMongo) {
    try {
        dbMongo.connection(err => {
            let user = req.body
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

function updateVehicle(req, res, dbMongo) {
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
                        universalCode: req.body.universalCode,
                        brand: req.body.line,
                        line: req.body.line,
                        year: req.body.year
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