const jwt = require('jsonwebtoken');
const config = require()
const verifyToken = (req, res, next) => {

    const token = req.get('token');

    jwt.verify(token, config.develop.seed, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.body = decoded.data;
        next();

    });

};

module.exports = {
    verifyToken
}