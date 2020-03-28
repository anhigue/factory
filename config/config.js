module.exports = {
    develop: {
        user: process.env.USER_DB || 'root',
        password: process.env.PASS_DB || '',
        port: process.env.PORT || 4000,
        mongodb: 'mongodb://localhost:27017',
        status: true
    },
    production: {
        user: process.env.USER_DB || '',
        password: process.env.PASS_DB || '',
        port: process.env.PORT || 4001,
        mongodb: 'mongodb://localhost:27017',
        status: false
    }
};
