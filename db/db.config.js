const config = require('../config/config')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID
const MongoOpt = { useUnifiedTopology: true }
const dbName = 'factory'

const state = {
    db: null
}

const connection = (callback) => {
    if (state.db){
        callback()
    } else {
        MongoClient.connect(config.develop.mongodb, MongoOpt, (err, client) =>{
            if (err)
                callback(err)
            else {
                state.db = client.db(dbName)
                callback()
            }
        })
    }
}

const getObjectIdDocument = (_id) => {
    return ObjectId(_id)
}

const getDB = () => {
    return state.db
}

module.exports = {
    connection,
    getObjectIdDocument,
    getDB
}