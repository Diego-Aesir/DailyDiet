const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/autentication");
const foodValidator = require("../validators/foodValidation");
const { handleValidationErrors } = require("../validators/fieldsValidation");
const foodController = require('../controllers/food');

router.get('/food', authenticateUser, foodController.getFood);
router.post('/food', authenticateUser, foodValidator(), handleValidationErrors, foodController.postFood);
router.put('/food', authenticateUser, foodValidator(), handleValidationErrors, foodController.putFood);
router.delete('/food', authenticateUser, foodValidator(), handleValidationErrors, foodController.deleteFood);

module.exports = router;
