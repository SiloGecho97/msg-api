const app = (module.exports = require("express")());
const msgController = require("../controllers/message.controller");
const userController = require("../controllers/user.controller");

app.get("/api/sms",msgController.checkOrigin,msgController.incomingSms)
app.get("/api/messages",msgController.getAllMessage);
app.post("/api/auth/login",userController.login);

