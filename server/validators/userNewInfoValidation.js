const { body } = require("express-validator");

const userNewInfoValidation = () => [
  body("newUsername")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters long.")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage(
      "New username can only contain letters, numbers, and underscores."
    ),

  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long.")
    .matches(/\d/)
    .withMessage("Password must contain at least one number.")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain at least one special character."),

  body("newWeight")
    .trim()
    .isNumeric()
    .withMessage("Weight must be a number.")
    .custom((value) => {
      const weight = parseFloat(value);
      if (weight <= 1 || weight > 300) {
        throw new Error("Weight must be between 1 and 300 kg.");
      }
      return true;
    }),

    body("newHeight")
    .custom((value) => {
      const height = parseFloat(value);
      if (isNaN(height) || height < 0.3 || height > 3.0) {
        throw new Error("Height must be a number between 0.30 and 3.00 meters.");
      }
      return true;
    }).withMessage("Height must be a valid number."),

  body("newAge")
    .trim()
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

module.exports = userNewInfoValidation;