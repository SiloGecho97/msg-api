
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userService = require("../services/user.service");
const CONSTANTS = require("../../constants");

function login(req, res, next) {
    authenticationHandler(req.body)
        .then((user) => res.status(200).send({ user }))
        .catch((err) => res.status(403).send({ message: err }));
}

async function authenticationHandler({ username, password }) {
    // const us= await userService.createUser({username,password,fullName:"User Name"})
    const user = await userService.getUserByUserName(username);
    if (!user) {
        throw "username or password incorrect";
    }
    if (user.status != 1  ) {
        throw "Your account is suspended!";
    }
    const pass = bcryptjs.compareSync(password, user.password);

    if (!pass) {
        throw "username or password incorrect";
    }

    const token = jwt.sign(
        { sub: user.id, role: user.role },
        CONSTANTS.JWTSECRET,
        { expiresIn: "24hr" }
    );

    return {
        id: user.id,
        name: user.fullName,
        username: user.username,
        expiresIn: 86400,
        token: token,
    };
}
module.exports = {
    login
}