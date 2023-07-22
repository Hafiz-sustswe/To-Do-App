var jwt = require("jsonwebtoken");
const ApiError = require("../../errors/ApiError");
const config = require("../../config");
const pool = require("../../db");

// module scaffolding
const authService = {};

authService.createUserInDB = async (payload) => {
  const { name, gender, designation, phoneNumber, password } = payload;

  const query =
    "INSERT INTO users (name, gender, designation, phoneNumber, password, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, current_timestamp, current_timestamp) RETURNING id, name, gender, designation, phoneNumber, created_at, updated_at";
  const values = [name, gender, designation, phoneNumber, password];

  const createdUser = (await pool.query(query, values)).rows[0];
  return createdUser;
};

authService.loginUser = async (payload) => {
  const { phoneNumber, password } = payload;
  const query = "SELECT * FROM users WHERE phoneNumber = $1";
  const values = [phoneNumber];

  const result = await pool.query(query, values);
  const user = result.rows[0];

  if (user) {
    if (user.password === password) {
      const { id, name, phonenumber } = user;

      const accessToken = jwt.sign(
        {
          id,
          name,
          phonenumber,
        },
        config.jwt.secret,
        { expiresIn: config.jwt.expires_in }
      );

      return {
        accessToken,
      };
    } else {
      throw new ApiError(401, "Invalid password");
    }
  } else {
    throw new ApiError(404, "User does not exist");
  }
};

module.exports = authService;
