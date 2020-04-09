require('dotenv').config();
module.exports = {
    develop: {
        user: process.env.USER_DB || 'root',
        password: process.env.PASS_DB || '',
        port: process.env.PORT || 4000,
        mongodb: process.env.MONGO || 'mongodb://localhost:27017',
        seed: process.env.SEED_DEV,
        status: true
    },
    production: {
        user: process.env.USER_DB,
        password: process.env.PASS_DB,
        port: process.env.PORT,
        mongodb: process.env.MONGO || 'mongodb://localhost:27017',
        seed: process.env.SEED_PROD,
        status: false
    }
};
