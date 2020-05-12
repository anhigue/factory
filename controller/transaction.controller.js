module.exports = (app, db) => {
    const dbMongo = db
    return {
        /** 
         * @description get all the internal transactions on the api
         * @param {req} req
         * @param {res} res
         * @param {db} dbMongo
        */
        get: (req, res) => {
            getTransaction(req, res, dbMongo)
        },
        /** 
         * @description register a new transaction
         * @param {req} req
         * @param {res} res
         * @param {db} dbMongo
        */
        create: (req, res) => {
            createTransaction(req, res, dbMongo)
        }
    }
}

const collection = 'log'

function getTransaction(req, res, dbMongo) {
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

function createTransaction(req, res, dbMongo) {
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