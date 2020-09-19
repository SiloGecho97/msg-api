const sequelize = require("../database/connection");

const Message = sequelize.import("./messages.js");
const User = sequelize.import("./users.js");
const Value = sequelize.import("./values.js");

module.exports = {
  Message,
  User,
  Value
};
