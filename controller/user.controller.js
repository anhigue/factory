const User = require('../entities/user');

module.exports = (app) => {
    return {
        get: (req, res) => { getUser(req, res) },
        delete: (req, res) => { deleteUser(req, res) },
        create: (req, res) => { createUser(req, res) },
        update: (req, res) => { updateUser(req, res) }
    }
}

function getUser(req, res){
    try {
        const factory = req.params.factory

        if (factory) {
            let user = new User();
            let userFactory = user.getUser(factory)

            res.json(userFactory);

        } else {
            res.json({
                message: 'Factory cant be empty'
            })
        }
    } catch (error) {
        res.json({
            message: 'Something is wrong, error ocurred.',
            error: error
        })
    }
}

function deleteUser(req, res){}

function createUser(req, res){}

function updateUser(req, res){}

