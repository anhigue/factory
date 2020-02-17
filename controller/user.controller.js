module.exports = (db) => {
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
                    error: error
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

function deleteUser(req, res, dbMongo) {}

function createUser(req, res, dbMongo) {}

function updateUser(req, res, dbMongo) {}