const fs = require('fs');
const bcrypt = require('bcrypt')
const config = require('../config/config')
const jwt = require('jsonwebtoken');

/**
 * @description encode file to base 64
 * @param file type string | path file
 * @returns string base64
 */
function base64_encode(file) {
    // read binary data
    var body = fs.readFileSync(file, {
        encoding: 'base64'
    });
    return body
    /* var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64'); */
}

/**
 * @description decode file in base 64 and write file
 * @param (base64str: base64 file string, file: path file)
 * @returns
 */
function base64_decode(base64str, file) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer(base64str, 'base64');
    // write buffer to file
    fs.writeFileSync(file, bitmap);
}

/**
 * @description add days from a date
 * @params date number
 * @returns date
 */
function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

/**
 * @description validate password
 * @params string hash
 * @returns boolean
 */
function validatePassword(password, hash) {
    return bcrypt.compareSync(password, hash)
}

/**
 * @description validate new order
 * @params order send, client, status
 * @returns orderCollection
 */
function transformDataToOrder(id, productRequest, date, client, status) {

    return {
        id: id,
        client: client,
        factory: null,
        parts: productRequest,
        total: 0,
        timeDelivery: date,
        timeCreate: date,
        timeFullDelivery: addDays(
            date,
            client.timeDelivery
        ),
        status: status
    }

}

module.exports = {
    base64_encode,
    base64_decode,
    addDays,
    validatePassword,
    transformDataToOrder
}