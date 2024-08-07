const Mail = require("../../models/mail/mail.model");

const create = async (reqData) => {
  try {
    const mail = await Mail.create({ ...reqData });
    if (mail) {
      return {
        code: 201,
        success: true,
        message: "Mail Created Successfully",
        data: mail,
      };
    }
  } catch (error) {
    return {
      code: error.code || 500,
      success: error.success || false,
      message: error.message || "something went wrong",
      error: error.error || error,
    };
  }
};

const get = async (reqData) => {
  try {
    if (reqData.id) {
      const mail = await Mail.findOne({
        where: {
          id: reqData.id,
        },
      });
      if (!mail) {
        return {
          code: 404,
          success: false,
          message: "Mail Not Found",
          data: {},
        };
      } else {
        return {
          code: 200,
          success: true,
          message: "Mail Retrieved Successfully",
          data: business,
        };
      }
    } else {
      const page = reqData.page ? parseInt(reqData.page) : null;
      const pageSize = reqData.pageSize ? parseInt(reqData.pageSize) : null;

      let mails, count;

      if (page && pageSize) {
        const offset = (page - 1) * pageSize;
        const limit = pageSize;

        const result = await Mail.findAndCountAll({
          offset,
          limit,
        });

        mails = result.rows;
        count = result.count;
      } else {
        mails = await Mail.findAll();
        count = mails.length;
      }

      return {
        code: 200,
        success: true,
        message: "Mails Retrieved Successfully",
        data: {
          mails,
          pagination:
            page && pageSize
              ? {
                  total: count,
                  page,
                  pageSize,
                  totalPages: Math.ceil(count / pageSize),
                }
              : null,
        },
      };
    }
  } catch (error) {
    return {
      code: 500,
      success: false,
      message: "Internal Server Error",
      error: error.message,
    };
  }
};

module.exports = { create, get };
