const cron = require("node-cron");
const axios = require('axios')
module.exports = (db) => {
    return {
        reportStore: () => {
            shoulderReport(db)
        }
    }
}

const reportStoreCollection = 'reportStore'
const clientsCollection = 'clients'

function shoulderReport(db) {
    cron.schedule("* * * * *", function () {
        db.connection(err => {
            if (err) {
                console.log(err)
            }
            getClient(db)
        })
    });
}

/* get Clients from data base */
function getClient(db) {
    return db.getDB().collection(clientsCollection).find({}).toArray((err, documents) => {
        foundOtherProducts(documents, db)
    })
}

/* do the request */
function foundOtherProducts(clients, db) {
    clients.forEach( client => {
        /* let url = 'http://' + client.ip + '/sale/fabric/12345' */
        axios.get('https://api.ipify.org?format=json')
        .then( responses => {
            /* const productSave = responses.data; */
            console.log(responses.data)
        }).catch( err => {
            console.log(err)
        })
    });
}

/* save response from request */
function convertDataResponse(db, data, client) {
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
}