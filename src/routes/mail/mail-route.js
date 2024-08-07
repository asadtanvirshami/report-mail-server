const express = require("express");
const router = express.Router();
const mailController = require("../../controllers/mail/mail-controller");

router.post("/get", mailController.get);

router.post("/create", mailController.create);

module.exports = router;
