const config = require('../config/config')
const sgMail = require('@sendgrid/mail')
const template = require('../template/template.email')
const excel = require('node-xlsx')
const fs = require('fs')
const util = require('../utiles/utiles')
module.exports = (app, db) => {
    return {
        /** 
         * @description send a mail with report sale
         * @param {req} req
         * @param {res} res
        */
        send: (req, res) => {
            sendMail(req, res)
        }
    }
}

const path = './files/reporte-ventas.xlsx'

function sendMail(req, res) {
    try {
        /* get data to create excel file */
        const dataExcel = req.body.data

        /* delete file */
        fs.unlinkSync(path)
        /* create file excel again */
        let buffer = excel.build([{
            name: "mySheetName",
            data: dataExcel
        }]);

        /* create on directory */
        fs.writeFile('./files/reporte-ventas.xlsx', new Buffer(buffer, "base64"), (err) => {
            if (err) throw err;
            console.log("The file was succesfully saved!");
            /* read file to send */
            const fileBase64 = util.base64_encode('./files/reporte-ventas.xlsx')

            /* set configuration of mail */
            sgMail.setApiKey(config.sendGridKey);

            const msg = {
                to: req.body.to,
                from: req.body.from,
                subject: req.body.subject,
                text: req.body.text,
                html: template.TEMPLATE_STRING_BASE,
                attachments: [{
                    content: fileBase64,
                    filename: 'reporte-ventas.xlsx',
                    type: 'xlsx',
                    disposition: 'attachment',
                    contentId: 'test'
                }, ],
            };
            /* send a mail */
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
        });
    } catch (error) {
        res.json({
            message: 'Something is wrong, error ocurred.',
            error
        })
    }
}