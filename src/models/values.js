/* jshint indent: 2 */
const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  let values = sequelize.define(
    "values",
    {
      name: {
        primaryKey: true,
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      values: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
    },
    {
      tableName: "values",
    }
  );
  return values;
};
