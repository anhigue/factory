const config = require('../config/config')
const sgMail = require('@sendgrid/mail')
const template = require('../template/template.email')
const xlsx = require('node-xlsx')
module.exports = (app, db) => {

    return {
        send: (req, res) => {
            sendMail(req, res)
        }
    }
}

function sendMail(req, res) {
    try {

        const dataExcel = req.body.data

        if (!dataExcel) {
            res.json({
                ok: false,
                data: null
            })
        }

        /* generate workbook */
        /* const ws = XLSX.utils.aoa_to_sheet(dataExcel);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "reporte-ventas");

        var buffer = XLSX.write(wb, {type:'buffer', bookType: "xlsx"}).toString('base64');

        console.log(buffer); */

        /* if (!buffer) {
            res.json({
                ok: false,
                data: {
                    message: 'Error, buffer not function'
                }
            })
        } */

        var buffer = xlsx.build([{name: "reporte", data: data}]) // Returns a buffer

        sgMail.setApiKey(config.sendGridKey);

        const msg = {
            to: req.body.to,
            from: req.body.from,
            subject: req.body.subject,
            text: req.body.text,
            html: template.TEMPLATE_STRING_BASE,
            /* attachments: [{
                content: fileBase64,
                filename: 'reporte-ventas.xlsx',
                type: 'xlsx',
                disposition: 'attachment',
                contentId: 'test'
            }, ], */
        };

        sgMail.send(msg).then(response => {
            res.json({
                ok: true,
                data: response
            })
        }).catch(err => {
            res.json({
                ok: false,
                data: err
            })
        })
    } catch (error) {
        res.json({
            message: 'Something is wrong, error ocurred.',
            error: error
        })
    }
}