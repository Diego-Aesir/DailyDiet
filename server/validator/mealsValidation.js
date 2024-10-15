const { body } = require("express-validator");

const mealValidation = () => [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters long."),

  body("diet_id")
    .optional()
    .isNumeric()
    .withMessage("Diet id must be a number."),

  body("meals_id")
    .optional()
    .isNumeric()
    .withMessage("Meals id must be a number."),
];

module.exports = mealValidation;
