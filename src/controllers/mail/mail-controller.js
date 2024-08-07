const mailValidation = require("../../validations/contact/contact-validation");
const mailService = require("../../services/mail/mail-service");
const errorLogger = require("../../functions/custom-logger");

const create = async (req, res) => {
  try {
    const validatedMail = await mailValidation.validate(req.body);
    const response = await mailService.create(validatedMail);
    return res.status(response.code).json({
      code: response.code,
      success: response.success,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      errorLogger("POST", 400, error, "MAIL", "1", "error");
      return res.status(400).json({
        code: 400,
        success: false,
        message: "error",
        errors: error.errors,
      });
    }
    errorLogger("POST", 400, error, "500", "1", "error");
    return res.status(error.code || 500).json({
      code: error.code || 500,
      success: error.success || false,
      message: error.message || "Internal Server Error",
      error: error.error || error,
    });
  }
};

const get = async (req, res) => {
  try {
    const response = await mailService.get(req.query);
    return res.status(response.code).json({
      code: response.code,
      success: response.success,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    errorLogger("POST", 400, error, "500", "1", "error");
    return res.status(error.code || 500).json({
      code: error.code || 500,
      success: error.success || false,
      message: error.message || "Internal Server Error",
      error: error.error || error,
    });
  }
};

module.exports = { create, get };
