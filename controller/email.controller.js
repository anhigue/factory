const config = require('../config/config')
const sgMail = require('@sendgrid/mail')
const util = require('../utiles/utiles')
const template = require('../template/template.email')
module.exports = (app, db) => {

    return {
        send: (req, res) => {
            sendMail(req, res)
        }
    }
}

function sendMail(req, res) {
    try {

        const data = req.body
        const fileBase64 = util.base64_encode('./files/presupuesto.xlsx')

        if (!data) {
            res.json({
                ok: false,
                data: null
            })
        }

        if (!fileBase64) {
            res.json({
                ok: false,
                data: {
                    message: 'Error, parsing base 64 file'
                }
            })
        }

        sgMail.setApiKey(config.sendGridKey);

        const msg = {
            to: data.to,
            from: data.from,
            subject: data.subject,
            text: data.text,
            html: template.TEMPLATE_STRING_BASE,
            attachments: [{
                content: fileBase64,
                filename: 'presupuesto.xlsx',
                type: 'xlsx',
                disposition: 'attachment',
                contentId: 'test'
            }, ],
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