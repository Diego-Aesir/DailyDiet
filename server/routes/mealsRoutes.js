const express = require('express');
const router = express.Router();
const mealController = require('../controllers/meals');
const authenticateUser = require('../middleware/autentication');
const mealsValidator = require('../validators/mealsValidation');
const {handleValidationErrors} = require('../validators/fieldsValidation');
const foodRouter = require('./foodRoutes');

router.get('/meals', authenticateUser, mealController.getMeals);
router.post('/meals', authenticateUser, mealsValidator, handleValidationErrors, mealController.postMeals);
router.put('/meals', authenticateUser, mealsValidator, handleValidationErrors, mealController.putMeals);
router.delete('/meals', authenticateUser, mealController.deleteMeals);
router.use('/meals', foodRouter);

module.exports = router;
