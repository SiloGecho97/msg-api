const sequelize = require("../database/connection");

const Message = sequelize.import("./messages.js");

module.exports = {
  Message,
};
