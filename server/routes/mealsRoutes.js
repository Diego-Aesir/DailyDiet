const express = require('express');
const router = express.Router();
const mealController = require('../controllers/meals');
const authenticateUser = require('../middleware/autentication');
const mealsValidator = require('../validators/mealsValidation');
const {handleValidationErrors} = require('../validators/fieldsValidation');
const foodRouter = require('./foodRoutes');

router.get('/:id/:diet/meals', authenticateUser, mealController.getMeals);
router.get('/:id/:diet/meals/TACO', mealController.downloadTaco);
router.post('/:id/:diet/meals', authenticateUser, mealsValidator(), handleValidationErrors, mealController.postMeals);
router.put('/:id/:diet/meals', authenticateUser, mealsValidator(), handleValidationErrors, mealController.putMeals);
router.delete('/:id/:diet/meals', authenticateUser, mealController.deleteMeals);
router.use('/:id/:diet', foodRouter);

module.exports = router;
