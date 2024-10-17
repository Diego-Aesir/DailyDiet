const { body, validationResult } = require("express-validator");

const fieldsValidation = () => [
  body("username")
    .optional()
    .trim()
    .isLength({ min: 3, max: 10 })
    .withMessage("User name must be between 3 and 10 characters long.")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage(
      "User name can only contain letters, numbers, and underscores."
    ),

  body("password")
    .optional()
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long.")
    .matches(/\d/)
    .withMessage("Password must contain at least one number.")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain at least one special character."),

  body("weight")
    .optional()
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

  body("height")
    .optional()
    .trim()
    .matches(/^\d+(\,\d{1,2})?$/)
    .withMessage("Height must be a number with up to two decimal places.")
    .custom((value) => {
      const height = parseFloat(value.replace(",", "."));
      if (height < 0.3 || height > 3.0) {
        throw new Error("Height must be between 0.30 and 3.00 meters.");
      }
      return true;
    }),

  body("age")
    .optional()
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

  body("newUsername")
    .optional()
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters long.")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage(
      "New username can only contain letters, numbers, and underscores."
    ),

  body("newPassword")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long.")
    .matches(/\d/)
    .withMessage("Password must contain at least one number.")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain at least one special character."),

  body("newWeight")
    .optional()
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
    .optional()
    .trim()
    .matches(/^\d+(\,\d{1,2})?$/)
    .withMessage("Height must be a number with up to two decimal places.")
    .custom((value) => {
      const height = parseFloat(value.replace(",", "."));
      if (height < 0.3 || height > 3.0) {
        throw new Error("Height must be between 0.30 and 3.00 meters.");
      }
      return true;
    }),

  body("newAge")
    .optional()
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

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: true, message: errors.array() });
  }
  next();
};

module.exports = { fieldsValidation, handleValidationErrors };
