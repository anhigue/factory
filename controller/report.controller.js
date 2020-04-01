module.exports = (app, db) => {
    const dbMongo = db
    return {
        get: (req, res) => {
            getReport(req, res, dbMongo)
        },
        create: (req, res) => {
            createReport(req, res, dbMongo)
        }
    }
}

const collection = 'reports'

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
                    status: (req.params.status === 'true')
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