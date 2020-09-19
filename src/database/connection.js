const Sequelize = require("sequelize");

const sequelize = new Sequelize("msgdb", "root", "password", {
  host: "192.168.0.10",
  dialect: "mysql",
  logging: false,
  timezone: '+03:00',
  pool: {
    max: 500,
    min: 30,
    acquire: 30000,
    idle: 10000
  }
});
// const sequelize = new Sequelize("smsdb", "root", "fa&123!na", {
//   host: "localhost",
//   dialect: "mysql",
//   logging: false,
//   pool: {
//     max: 500,
//     min: 30,
//     acquire: 30000,
//     idle: 10000
//   }
// });

module.exports = sequelize;

