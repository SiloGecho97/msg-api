"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("messages", "valueName", {
      type: Sequelize.STRING(2),
      references: {
        model: "values",
        key: "name",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
      constraints: false,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("messages", "valueName");
  },
};
