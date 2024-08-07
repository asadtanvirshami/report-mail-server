const { DataTypes } = require("sequelize");
const { db } = require("../../config/dbConnect");

const Mail = db.define(
  "Mails",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    archived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    labels: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    tableName: "Mails",
  }
);

module.exports = Mail;
