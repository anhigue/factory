export class User {
    constructor() {
        user = []
        name = ''
        rol = ''
        access = false
    }

    /**
     * @description retrieve all the user on MongoDb
     * @returns user
     * @ApiFactory
     */
    getUser() {
        return this.user
    }

    /**
     * @description check if the user sended is on the collection
     * @params user
     * @returns boolean
     * @ApiFactory
     */
    isOnCollection(userSend) {
        return false
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
}