const { Sequelize } = require("sequelize");

const db = new Sequelize("defaultdb", "asvd", "LfatmHVp1dz9riAJqw6YDA", {
  host: "silly-dryad-2320.7s5.aws-ap-south-1.cockroachlabs.cloud",
  dialect: "postgres",
  port: 26257,
  dialectOptions: {
    ssl: {},
  },
  logging: false,
});

module.exports = { db };