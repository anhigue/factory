module.exports = (app, db) => {
    const dbMongo = db
    return {
        /** 
         * @description get all types of status
         * @param {req} req
         * @param {res} res
         * @param {db} dbMongo
        */
        get: (req, res) => {
            getStatus(req, res, dbMongo)
        },
        /** 
         * @description delete a type of status
         * @param {req} req
         * @param {res} res
         * @param {db} dbMongo
        */
        delete: (req, res) => {
            deleteStatus(req, res, dbMongo)
        },
        /** 
         * @description create a new type of status
         * @param {req} req
         * @param {res} res
         * @param {db} dbMongo
        */
        create: (req, res) => {
            createStatus(req, res, dbMongo)
        },
        /** 
         * @description update a type of status
         * @param {req} req
         * @param {res} res
         * @param {db} dbMongo
        */
        update: (req, res) => {
            updateStatus(req, res, dbMongo)
        }
    }
}

const collection = 'status'

function getStatus(req, res, dbMongo) {
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

function deleteStatus(req, res, dbMongo) {
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

function createStatus(req, res, dbMongo) {
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

function updateStatus(req, res, dbMongo) {
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
                        name: req.body.name
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