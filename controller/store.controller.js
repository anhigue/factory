const axios = require('axios')
module.exports = (app, db) => {
    const dbMongo = db
    return {
        call: (req, res) => {
            callOtherAPI(req, res, dbMongo)
        },
        registerOrder: (req, res) => {

        }
    }
}

function callOtherAPI(req, res, dbMongo) {
    try {
        const options = {
            url: req.body.url,
            method: req.body.method,
            headers: req.body.headers,
            data: req.body.data
        }

        axios.get(options)
            .then(response => {
                res.json({
                    ok: true,
                    data: response.data
                })
            })
            .catch(error => {
                res.send({
                    ok: false,
                    error
                })
            });

        res.json({
            ok: true,
            data: options
        })


    } catch (error) {
        res.status(500).send({
            ok: false,
            error
        })
    }
}

function verifyOrder(req, res, dbMongo) {

    const data = req.body

    if (!data.order) {
        res.status(401).send({
            ok: false,
            data: {
                message: 'Operacion no valida'
            }
        })
    }


}

function transformDataToOrder(data, order, client) {
    
    if (!data) {
        return { ok: false, order: null }
    }

    if (!order) {
        return { ok: false, order: null }
    }

    if (!client) {
        return { ok: false, order: null }
    }

    order = {

    }

    return { ok: true, order }
}