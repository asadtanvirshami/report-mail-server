const authServices = require("../../services/auth/auth-service");

const userValidation = require("../../validations/auth/auth-validation");
const errorLogger = require("../../functions/custom-logger");

// Auth Controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        code: 401,
        success: false,
        message: "Email or Password is missing: email or password",
        data: {},
      });
    }

    const response = await authServices.login(req.body);
    if (response.code != 200) {
      return res.status(response.code).json({
        code: response.code,
        success: response.success,
        message: response.message,
        data: response.data,
      });
    }

    const option = {
      expiresIn: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    const token = response.data.token;

    return res.status(response.code).cookie("token", token, option).json({
      code: response.code,
      success: response.success,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    let statusCode = 500;
    let errorMessage = "Error logging in user";

    // Handle specific errors and set appropriate status code/message
    errorLogger("POST", statusCode, error, "USER", "1", errorMessage);

    return res.status(statusCode).json({
      code: statusCode,
      success: false,
      message: errorMessage,
      data: {},
    });
  }
};

const signUp = async (req, res) => {
  try {
    let { email } = req.body;

    const validatedUser = await userValidation.validate(req.body);
    const existingUser = await authServices.checkUser(email);

    if (existingUser) {
      return res.status(existingUser?.code).json({
        code: existingUser?.code,
        success: existingUser?.success,
        message: existingUser?.message,
        data: existingUser?.data,
      });
    }

    const response = await authServices.signUp(validatedUser);

    return res.status(201).json({
      code: response?.code,
      success: response?.success,
      message: response?.message,
      data: response?.data,
    });
  } catch (error) {
    let statusCode = 500;
    let errorMessage = "Error creating user";
    console.log("error ===> ", error);
    // Handle specific errors and set appropriate status code/message
    errorLogger("POST", statusCode, error, "USER", "1", errorMessage);

    return res.status(statusCode).json({
      code: statusCode,
      success: false,
      message: errorMessage,
    });
  }
};

module.exports = { login, signUp };
