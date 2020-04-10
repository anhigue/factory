const jwt = require('jsonwebtoken')
const config = require('../config/config')
const verifyToken = (req, res, next) => {

    const token = req.get('Authorization');
    jwt.verify(token, config.seed, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        /* req.body = decoded.data; */
        next();

    });

};

module.exports = {
    verifyToken
}