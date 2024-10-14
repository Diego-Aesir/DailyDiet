const { body } = require("express-validator");

const fieldsValidation = () => [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required.")
    .isLength({ min: 3, max: 10 })
    .withMessage("User name must be between 3 and 10 characters long.")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage(
      "User name can only contain letters, numbers, and underscores."
    ),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long.")
    .matches(/\d/)
    .withMessage("Password must contain at least one number.")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain at least one special character."),

  body("weight")
    .trim()
    .notEmpty()
    .withMessage("Weight is required.")
    .isNumeric()
    .withMessage("Weight must be a number.")
    .custom((value) => {
      const weight = parseFloat(value);
      if (weight <= 1 || weight > 300) {
        throw new Error("Weight must be between 1 and 300 kg.");
      }
      return true;
    }),

  body("height")
    .trim()
    .notEmpty()
    .withMessage("Height is required.")
    .matches(/^\d+(\,\d{1,2})?$/)
    .withMessage("Height must be a number with up to two decimal places.")
    .custom((value) => {
      const height = parseFloat(value.replace(',', '.'));
      if (height < 0.3 || height > 3.0) {
        throw new Error("Height must be between 0.30 and 3.00 meters.");
      }
      return true;
    }),

  body("age")
    .trim()
    .notEmpty()
    .withMessage("Age is required.")
    .isNumeric()
    .withMessage("Age must be a number.")
    .custom((value) => {
      const age = parseInt(value, 10);
      if (age < 0 || age > 120) {
        throw new Error("Age must be between 0 and 120 years.");
      }
      return true;
    }),
];

module.exports = fieldsValidation;
