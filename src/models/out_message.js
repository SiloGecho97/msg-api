/* jshint indent: 2 */
const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  let outMessage = sequelize.define(
    "outgoing_messages",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      shortCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull:false
      },
      message: {
        type: DataTypes.STRING,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.ENUM("PENDING", "DELIVERED", "FAILED", "UNKNOWN"),
        allowNull: false,
        defaultValue: "PENDING",
      },
    },
    {
      tableName: "outgoing_messages",
    }
  );

  return outMessage;
};
