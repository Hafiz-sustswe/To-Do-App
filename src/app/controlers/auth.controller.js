const catchAsync = require("../../helpers/catchAsync");
const sendResponse = require("../../helpers/sendResponse");
const authService = require("../services/auth.service");

// module scaffolding
const authController = {};

authController.createUser = catchAsync(async (req, res) => {
  const user = req.body;

  const result = await authService.createUserInDB(user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

authController.loginUser = catchAsync(async (req, res) => {
  const loginDAta = req.body;
  const result = await authService.loginUser(loginDAta);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Login successful",
    data: result,
  });
});

module.exports = authController;
