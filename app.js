const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const sequelize = require("./src/config/dbConnect");

const authRoutes = require("./src/routes/auth/auth-route");
const mailRoutes = require("./src/routes/mail/mail-route");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 8080;
sequelize.db
  .sync()
  .then(() => console.log("DB Connected Successfully "))
  .catch((err) => console.error("Failed to sync DB:", err));

app.use("/public/api/v1/auth/", authRoutes);
app.use("/public/api/v1/mail/", mailRoutes);

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});