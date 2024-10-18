const express = require('express');
const router = express.Router();
const dietController = require('../controllers/diets');
const authenticateUser = require('../middleware/autentication');
const dietsValidator = require('../validators/dietValidation');
const {handleValidationErrors} = require('../validators/fieldsValidation');
const mealsRouter = require('./mealsRoutes');

router.get('/', authenticateUser, dietController.getAllDiets);
router.post('/', dietsValidator, handleValidationErrors, authenticateUser, dietController.postDiet);
router.put('/:diet', dietsValidator, handleValidationErrors, authenticateUser, dietController.putDiet);
router.delete('/:diet', authenticateUser, dietController.deleteDiet);
router.use('/:diet', mealsRouter);

module.exports = router;