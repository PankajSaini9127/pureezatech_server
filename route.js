const Router = require("express").Router();

const { signup,signin } = require("./controller/auth-controller");
const { passwordHash } = require("./middleware/auth-middleware");


Router.post("/sign-up",passwordHash,signup);

Router.post("/sign-in",signin);

module.exports = Router;