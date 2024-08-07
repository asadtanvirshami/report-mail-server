require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  verifyToken: async (req, res, next) => {
    var Authorization = req.headers["authorization"];
    if (!Authorization) {
      return res.status(401).json({
        code: 401,
        status: false,
        message: "Please provide a Authorization",
      });
    }
    const token = Authorization.split(" ");
    try {
      jwt.verify(token[1], process.env.JWT_SECRET_KEY, function (err, decoded) {
        if (err) {
          return res.status(401).json({
            message: "Failed to authenticate",
          });
        }
        console.log("verifed");
        next();
      });
    } catch (error) {
      console.error("Error validating DID token:", error.code);
      if (error.code == "ERROR_DIDT_EXPIRED") {
        return res.status(500).json({
          code: 401,
          status: false,
          message: "DID token has expired",
          data: error.message,
        });
      }
      return res.status(500).json({
        code: 401,
        status: false,
        message: "Failed to authenticate",
        data: error.message,
      });
    }
  },
};
