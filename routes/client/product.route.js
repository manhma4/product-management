const express = require("express");
const route = express.Router();
const controller = require("../../controllers/client/product.controller");

route.get("/", controller.index);

route.get("/edit", controller.create);

route.get("/delete", controller.delete);

module.exports = route;
