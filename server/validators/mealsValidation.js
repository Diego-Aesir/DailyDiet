const { body } = require("express-validator");

const mealValidation = () => [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Name must be between 3 and 50 characters long."),

  body("meals_id")
    .optional()
    .isNumeric()
    .withMessage("Meals id must be a number."),
];

module.exports = mealValidation;
