const express = require("express");
const toDoRoutes = require("./toDo.route");
const authRoutes = require("./auth.route");

const routes = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/todos",
    route: toDoRoutes,
  },
];

moduleRoutes.forEach((route) => routes.use(route.path, route.route));

module.exports = routes;
