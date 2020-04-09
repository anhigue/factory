const config = require('../config/config')
const sgMail = require('@sendgrid/mail');
module.exports = (app, db) => {
    const dbMongo = db
    return {
        send: (req, res) => {
            sendMail(req, res)
        }
    }
}

function sendMail(req, res) {
    try {
        sgMail.setApiKey(config.sendGridKey);
        const msg = {
            to: 'higueros71@gmail.com',
            from: 'higueros71@gmail.com',
            subject: 'Sending with Twilio SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        };
        sgMail.send(msg).then(response => {
            res.json({
                ok: true,
                status: 200,
                response
            })
        }).catch(err => {
            res.json(err)
        })
    } catch (error) {
        res.json({
            message: 'Something is wrong, error ocurred.',
            error: error
        })
    }
}