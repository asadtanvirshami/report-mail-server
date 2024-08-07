const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../../models/User/user.model");

const signUp = async (reqData) => {
  try {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(reqData.password, salt);
    let newUser = await Users.create({
      ...reqData,
      password: hash,
    });

    return {
      code: 201,
      success: true,
      message: "User created successfully ",
      data: newUser,
    };
  } catch (error) {
    throw {
      code: error?.code || 500,
      success: error?.success || false,
      message: error?.message || "Some thing went wrong",
      data: {},
    };
  }
};

const checkUser = async (email) => {
  try {
    const user = await Users.findOne({
      where: {
        email: email,
      },
    });
    if (user) {
      return {
        code: 400,
        success: false,
        message: "User Already Exist",
        data: {},
      };
    }
    return user;
  } catch (error) {
    throw {
      code: error?.code || 500,
      success: error?.success || false,
      message: error?.message || "Some thing went wrong",
      data: {},
    };
  }
};

const login = async (reqData, res) => {
  const { email, password } = reqData;
  const jwtToken =
    "qwertyuiodoasjrfbheskfhdsxcvboiswueorghbfo3urbn23o9h9hjklzxcvbnm";

  const user = await Users.findOne({
    where: {
      email: email,
    },
  });
  if (!user) {
    return {
      code: 401,
      success: false,
      message: "user does not exist",
      data: {},
    };
  }

  const passwordCheck = await bcrypt.compare(password, user.password);
  if (!passwordCheck) {
    return {
      code: 401,
      success: false,
      message: "password is wrong",
      data: {},
    };
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    jwtToken,
    {
      expiresIn: "2h",
    }
  );

  user.password = undefined;
  user.token = token;

  return {
    code: 200,
    success: true,
    message: "user login successfully",
    data: user,
  };
};

module.exports = {
  signUp,
  checkUser,
  login,
};
