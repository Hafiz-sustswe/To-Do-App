const catchAsync = require("../../helpers/catchAsync");
const sendResponse = require("../../helpers/sendResponse");
const toDoService = require("../services/toDo.service");

// module scaffolding
const toDoController = {};

toDoController.createToDo = catchAsync(async (req, res) => {
  const toDo = req.body;

  const user = req.verifiedUser;

  const result = await toDoService.createToDoInDB(user, toDo);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "ToDo created successfully",
    data: result,
  });
});

toDoController.getAllToDo = catchAsync(async (req, res) => {
  const user = req.verifiedUser;

  const result = await toDoService.getAllToDoFromDB(user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `${
      result.length === 0
        ? "No ToDo items found for the user."
        : "ToDo items retrieved successfully."
    }`,
    data: result,
  });
});

toDoController.updateToDo = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedToDo = req.body;
  const user = req.verifiedUser;

  const result = await toDoService.updateToDoInDB(id, updatedToDo, user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "ToDo item updated successfully.",
    data: result,
  });
});

toDoController.deleteToDo = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.verifiedUser;

  const result = await toDoService.deleteToDoFromDB(id, user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "ToDo item Deleted successfully.",
    data: result,
  });
});

module.exports = toDoController;
