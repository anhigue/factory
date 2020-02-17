class User {
    constructor(user, name, password, factoryID) {
        this.user = user
        this.name = name
        this.password = password
        this.factoryID = factoryID
    }

    /**
     * @description retrieve all the user on MongoDb
     * @returns user[]
     * @ApiFactory
     */
    getUser(factory) {
        return [{name: 'hugo'},{name: 'hugo'}]
    }

    /**
     * @description update a specific collection
     * @params user
     * @returns boolean
     * @ApiFactory
     */
    update(userSend) {
        return true
    }

    /**
     * @description delete a specific collection
     * @params user
     * @returns boolean
     * @ApiFactory
     */
    deleteUser(userSend){

    }

    /**
     * @description create a new user collection
     * @params User
     * @returns boolean
     * @ApiFactory
     */
    createUser(userSend, factory){

    }
}

module.exports = User;