const { body } = require("express-validator");

const dietValidation = () => [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters long."),

  body("description")
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage("Description must be between 1 and 200 characters long."),

  body("user_id")
    .optional()
    .isNumeric()
    .withMessage("User id must be a number."),

  body("diet_id")
    .optional()
    .isNumeric()
    .withMessage("Diet id must be a number."),
];

module.exports = dietValidation;
