const { body } = require("express-validator");

const loginValidation = () => [
    body("username")
    .trim()
    .isLength({ min: 3, max: 10 })
    .withMessage("User name must be between 3 and 10 characters long.")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage(
      "User name can only contain letters, numbers, and underscores."
    ),

  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long.")
    .matches(/\d/)
    .withMessage("Password must contain at least one number.")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain at least one special character."),
];

module.exports = loginValidation;