const cron = require("node-cron");
const axios = require('axios')
module.exports = (app, db) => {
    return {
        reportStore: (req, res) => {
            shoulderReport(db, req, res)
        }
    }
}

const reportStoreCollection = 'reportStore'
const clientsCollection = 'clients'

function shoulderReport(db,  req, res) {
    cron.schedule("* * * * *", function () {
        db.connection(err => {
            if (err) {
                console.log(err)
            }
            getClient(db, req, res)
        })
    });
}

/* get Clients from data base */
function getClient(db, req, res) {
    return db.getDB().collection(clientsCollection).find({}).toArray((err, documents) => {
        foundOtherProducts(documents, db, req, res)
    })
}

/* do the request */
function foundOtherProducts(clients, db, req, res) {
    clients.forEach(client => {
        let url = 'http://' + client.ip + '/sale/fabric/12345'
        axios.get('https://api.ipify.org?format=json')
            .then(responses => {
                /* const productSave = responses.data; */
                console.log(responses.data)
                /* saveDataResponse(db, productSave, client, req, res) */
                res.send('OK')
            }).catch(err => {
                console.log(err)
            })
    });
}

/* save response from request */
function saveDataResponse(dbMongo, data, client, req, res) {
    saveData = convertDataResponse(data ,client)

    if (!saveData.length > 0) {
        res.send('OK')
    }
    dbMongo.getDB().collection(reportStoreCollection).insertMany(saveData, (err, response) => {
        if (err) {
            res.json({
                message: 'Something is wrong',
                err
            })
        } else {
            res.send('OK')
        }
    })
}

function convertDataResponse(data, clientRequest) {
    let dataConverted = []

    data.forEach(productStore => {
        dataConverted.push({
            id: productStore.id,
            fabric: productStore.fabric,
            salePrice: productStore.salePrice,
            valueWithoutIVA: productStore.valueWithoutIVA,
            name: productStore.name,
            description: productStore.description,
            partNo: productStore.partNo,
            price: productStore.price,
            stock: productStore.stock,
            vehicles: productStore.vehicles,
            dateSale: new Date(),
            client: clientRequest
        })
    });

    if (dataConverted.length > 0) {
        return dataConverted
    } else {
        return []
    }
}