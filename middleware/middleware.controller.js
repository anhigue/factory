const jwt = require('jsonwebtoken')
const config = require('../config/config')
/** 
 * @description verify if the token is correct
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns {callback} next
 */
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
        next();

    });

};

module.exports = {
    verifyToken
}