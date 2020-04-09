require('dotenv').config();
module.exports = {
    develop: {
        user: process.env.USER_DB || 'root',
        password: process.env.PASS_DB || '',
        port: process.env.PORT || 4000,
        mongodb: process.env.MONGO || 'mongodb://localhost:27017',
        status: true
    },
    production: {
        user: process.env.USER_DB,
        password: process.env.PASS_DB,
        port: process.env.PORT,
        mongodb: process.env.MONGO || 'mongodb://localhost:27017',
        status: false
    },
    seed: process.env.SEED,
    accountSid: process.env.ACCOUNTSID,
    authToken: process.env.AUTHTOKEN,
    sendGridKey: process.env.SENDGRID_API_KEY
};
