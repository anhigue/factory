module.exports = (app, db) => {
    const dbMongo = db
    return {
        /** 
         * @description get all reports
         * @param {req} req
         * @param {res} res
         * @param {db} dbMongo
         */
        get: (req, res) => {
            getReport(req, res, dbMongo)
        },
        /** 
         * @description do aggregation to search data from report
         * @param {req} req
         * @param {res} res
         * @param {db} dbMongo
         */
        create: (req, res) => {
            createReport(req, res, dbMongo)
        },
        /** 
         * @description register data from aggregation searched
         * @param {req} req
         * @param {res} res
         * @param {db} dbMongo
         */
        register: (req, res) => {
            registerReport(req, res, dbMongo)
        },
        /** 
         * @description get data from store to create a new report
         * @param {req} req
         * @param {res} res
         * @param {db} dbMongo
         */
        getStore: (req, res) => {
            getReportStore(req, res, dbMongo)
        },
        /** 
         * @description register data that comes from store
         * @param {req} req
         * @param {res} res
         * @param {db} dbMongo
        */
        registerStore: (req, res) => {
            registerReportStore(req, res, dbMongo)
        },
    }
}

const collection = 'reports'
const reportStoreCollection = 'reportStore'

function getReport(req, res, dbMongo) {
    try {
        dbMongo.connection(err => {
            if (err) {
                errorResponse(res, err)
            } else {
                dbMongo.getDB().collection(collection).find({}).toArray((err, documents) => {
                    if (err)
                        errorResponse(res, err)
                    else {
                        res.json(documents)
                    }
                })
            }
        })
    } catch (error) {
        errorResponse(res, error)
    }
}

function createReport(req, res, dbMongo) {
    try {
        dbMongo.connection((err) => {
            if (err)
                errorResponse(res, err)

            dbMongo.getDB().collection('orders').aggregate([{
                $match: {
                    status: JSON.parse(req.params.status),
                    timeCreate: {
                        $gte: req.params.dateInit,
                        $lt: req.params.dateFinal
                    }
                }
            }, {
                $group: {
                    _id: '$client.name',
                    'order': {
                        $addToSet: '$_id'
                    },
                    parts: {
                        $addToSet: '$parts.product'
                    },
                    total: {
                        $sum: '$total'
                    }
                }
            }, {
                $sort: {
                    total: req.params.sort * 1
                }
            }]).toArray((err, documents) => {
                res.json(documents)
            });
        })
    } catch (error) {
        errorResponse(res, error)
    }
}

function errorResponse(res, err) {
    return res.json({
        message: 'Something is wrong',
        err
    })
}

function registerReport(req, res, dbMongo) {
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

function registerReportStore(req, res, dbMongo) {
    try {
        dbMongo.connection(err => {
            let user = req.body
            dbMongo.getDB().collection(reportStoreCollection).insertOne(user, (err, response) => {
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

function getReportStore(req, res, dbMongo) {
    try {
        dbMongo.connection(err => {
            if (err) {
                errorResponse(res, err)
            } else {
                dbMongo.getDB().collection(reportStoreCollection).find({}).toArray((err, documents) => {
                    if (err)
                        errorResponse(res, err)
                    else {
                        res.json(documents)
                    }
                })
            }
        })
    } catch (error) {
        errorResponse(res, error)
    }
}