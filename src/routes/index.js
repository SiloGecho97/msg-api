const app = (module.exports = require("express")());
const controller = require("../controllers/message.controller")

app.get("/api/sms",controller.checkOrigin,controller.incomingSms)
app.get("/api/messages",controller.getAllMessage);
