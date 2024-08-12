const { body, validationResult } = require("express-validator")
const validateSignUp = [
    [
        body("name", "Name should be exist").exists(),
        body("username", "Username should exist").exists(),
        body("password", "Password must be of minimum length 8").isLength({ min: 8 })
    ],
    (req, res, next) => {
        const error = validationResult(req);
        if (!error.isEmpty())
            return res.status(422).json({ "Error": error.array() });
        next();
    }
]

const validateLogin = [
    [
        body("username", "Username should exist").exists(),
        body("password", "Password must be of minimum length 8").isLength({ min: 8 })
    ],
    (req, res, next) => {
        const error = validationResult(req);
        if (!error.isEmpty())
            return res.status(422).json({ "Error": error.array() });
        next();
    }
]


module.exports.validateSignUp = validateSignUp;
module.exports.validateLogin = validateLogin;