const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(process.cwd(), ".env") });

module.exports = {
  env: process.env.NODE_ENV,

  port: process.env.PORT,

  db: {
    host: process.env.HOST,
    database_port: process.env.DATABASE_PORT,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expires_in: process.env.JWT_EXPIRES_IN,
  },
};
