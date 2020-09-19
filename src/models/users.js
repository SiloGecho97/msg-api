/* jshint indent: 2 */
const bcryptjs = require("bcryptjs");
const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  let user = sequelize.define(
    "users",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fullName: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "USER",
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
     
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      
    },
    {
      tableName: "users",
    }
  );
  user.beforeCreate((u, options) => {
    u.password = bcryptjs.hashSync(u.password, 10);
    return user;
  });

  return user;
};
