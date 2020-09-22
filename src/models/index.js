const sequelize = require("../database/connection");

const Message = sequelize.import("./messages.js");
const User = sequelize.import("./users.js");
const Value = sequelize.import("./values.js");
const Out_Message = sequelize.import("./out_message.js");

module.exports = {
  Message,
  User,
  Value,
  Out_Message
};
