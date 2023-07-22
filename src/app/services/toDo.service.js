const pool = require("../../db");
const ApiError = require("../../errors/ApiError");

// module scaffolding
const toDoService = {};

toDoService.createToDoInDB = async (user, payload) => {
  const { id } = user;
  const { title, description } = payload;

  const query =
    "INSERT INTO todos (title, description, is_done, created_at, updated_at, user_id) VALUES ($1, $2, false, current_timestamp, current_timestamp, $3) RETURNING *";
  const values = [title, description, id];

  const result = (await pool.query(query, values)).rows[0];
  return result;
};

toDoService.getAllToDoFromDB = async (user) => {
  const { id } = user;
  const query = "SELECT * FROM todos WHERE user_id = $1";
  const values = [id];
  const result = (await pool.query(query, values)).rows;

  return result;
};

toDoService.updateToDoInDB = async (id, payload, user) => {
  const { title, description, is_done } = payload;
  const values = [];
  const updateFields = [];

  const selectQuery = "SELECT * FROM todos WHERE id = $1";
  const selectValues = [id];

  const todo = (await pool.query(selectQuery, selectValues)).rows[0];

  if (!todo) {
    throw new ApiError(404, "ToDo item not found.");
  }

  if (todo.user_id !== user.id) {
    throw new ApiError(401, "You are not authorized to access this ToDo.");
  }

  if (title) {
    updateFields.push(`title = $${values.length + 1}`);
    values.push(title);
  }

  if (description) {
    updateFields.push(`description = $${values.length + 1}`);
    values.push(description);
  }

  if (is_done !== undefined) {
    updateFields.push(`is_done = $${values.length + 1}`);
    values.push(is_done);
  }

  if (updateFields.length === 0) {
    throw new ApiError(400, "No fields to update.");
  }

  const updateQuery = `UPDATE todos SET ${updateFields.join(
    ", "
  )}, updated_at = current_timestamp WHERE id = $${
    values.length + 1
  } RETURNING *`;
  values.push(id);

  const updatedToDo = (await pool.query(updateQuery, values)).rows[0];

  return updatedToDo;
};

toDoService.deleteToDoFromDB = async (id, user) => {
  const selectQuery = "SELECT * FROM todos WHERE id = $1";
  const selectValues = [id];

  const todo = (await pool.query(selectQuery, selectValues)).rows[0];

  if (!todo) {
    throw new ApiError(404, "ToDo item not found.");
  }

  if (todo.user_id !== user.id) {
    throw new ApiError(401, "You are not authorized to access this ToDo.");
  }

  const deleteQuery = "DELETE FROM todos WHERE id = $1";
  const deleteValues = [id];

  await pool.query(deleteQuery, deleteValues);

  return todo;
};

module.exports = toDoService;
