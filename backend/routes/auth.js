const express = require("express")
const routes = express.Router();
const { signup, signin } = require("../controllers/auth.js");
const { validateSignUp, validateLogin } = require("../middleware/auth.js")

routes.post("/signup", validateSignUp, signup);
routes.post("/signin", validateLogin, signin);


module.exports = routes;