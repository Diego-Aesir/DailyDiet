const { body } = require("express-validator");

const foodValidation = () => [
  body("meals_id")
    .optional()
    .trim()
    .isNumeric()
    .withMessage("meals_id must be a number"),

  body("food_id")
    .optional()
    .trim()
    .isNumeric()
    .withMessage("food_id must be a number"),

  body("name")
    .optional()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters long."),

  body("amount")
    .optional()
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage("Amount must be between 1g and 1000g"),

  body("protein")
    .optional()
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage("Amount must be between 1 and 1000"),

  body("carbs")
    .optional()
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage("Amount must be between 1 and 1000"),

  body("fat")
    .optional()
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage("Amount must be between 1 and 1000"),
];

module.exports = foodValidation;
