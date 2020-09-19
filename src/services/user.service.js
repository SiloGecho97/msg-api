const { User } = require("../models");


/**
 * 
 * @param {*} username 
 */
function getUserByUserName(username) {
    return User.findOne({ where: { username } }).catch((err) => console.log(err));
}

function createUser(user) {
    return User.create(user).catch((err) => console.log(err));
}

module.exports = {
    getUserByUserName,
    createUser
}