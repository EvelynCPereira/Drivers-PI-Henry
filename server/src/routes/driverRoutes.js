const { Router } = require("express");
const {
  getDriversHandler,
  getDetailHandler,
  postDriversHandler,
} = require("../handlers/driverHandlers");
const driverRouters = Router();

driverRouters.get("/", getDriversHandler);
driverRouters.get("/:id", getDetailHandler);
driverRouters.post("/", postDriversHandler);
module.exports = driverRouters;
