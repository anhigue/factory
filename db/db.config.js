/**
 * @description instance of config
 * @typedef {config}
 */
const config = require('../config/config')
/**
 * @description instance of mongodb package
 * @typedef {MongoClient}
 */
const MongoClient = require('mongodb').MongoClient
/**
 * @description instance of mongodb 
 * @typedef {ObjectId}
 */
const ObjectId = require('mongodb').ObjectID
const MongoOpt = { useUnifiedTopology: true }
const dbName = 'factory'

/**
 * @description Describes the status of the database connection instance
 * @typedef {boolean}
 */
const state = {
    db: null
}

/** 
 * @description function that allows establishing a database connection if state is not null
 * @param {callback} callback
 * @returns {callback}
*/
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

/**
 * @description get the object id to a specific document
 * @param {string} _id 
 * @returns {string}
 */
const getObjectIdDocument = (_id) => {
    return ObjectId(_id)
}

/**
 * @description get the value of the connection to a database
 * @returns {state.db}
 */
const getDB = () => {
    return state.db
}

module.exports = {
    connection,
    getObjectIdDocument,
    getDB
}