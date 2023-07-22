const config = require("../../config");
const ApiError = require("../../errors/ApiError");

const globalErrorHandler = (error, req, res, next) => {
  console.log(
    `===============================>>>>>>>>>>>>>>>>> globalErrorHandler ~~`,
    error
  );

  let statusCode = 500;
  let message = "Something went wrong!";
  let errorMessages = [];

  if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env === "development" && error?.stack,
  });
};

module.exports = globalErrorHandler;
