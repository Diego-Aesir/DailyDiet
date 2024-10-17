const express = require('express');
const router = express.Router();
const dietController = require('../controllers/diets');
const authenticateUser = require('../middleware/autentication');
const dietsValidator = require('../validators/dietValidation');
const {handleValidationErrors} = require('../validators/fieldsValidation');
const mealsRouter = require('./mealsRoutes');

router.get('/:id', authenticateUser, dietController.getAllDiets);
router.post('/:id', dietsValidator, handleValidationErrors, authenticateUser, dietController.postDiet);
router.put('/:id/:diet', dietsValidator, handleValidationErrors, authenticateUser, dietController.putDiet);
router.delete('/:id/:diet', authenticateUser, dietController.deleteDiet);
router.use('/:id/:diet', mealsRouter);

module.exports = router;