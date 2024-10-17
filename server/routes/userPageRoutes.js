const express = require('express');
const router = express.Router();
const userPageController = require('../controllers/userPage');
const authenticateUser = require('../middleware/autentication');
const {fieldsValidation, handleValidationErrors} = require('../validators/fieldsValidation');

router.get('/:id', authenticateUser, userPageController.getUserInfo);
router.put('/:id/username', authenticateUser, fieldsValidation, handleValidationErrors, userPageController.changeUserName);
router.put('/:id/password', authenticateUser, fieldsValidation, handleValidationErrors, userPageController.changeUserPassword);
router.put('/:id/weight', authenticateUser, fieldsValidation, handleValidationErrors, userPageController.changeUserWeight);
router.put('/:id/height', authenticateUser, fieldsValidation, handleValidationErrors, userPageController.changeUserHeight);
router.put('/:id/age', authenticateUser, fieldsValidation, handleValidationErrors, userPageController.changeUserAge);
router.delete('/:id', authenticateUser, userPageController.deleteUser);

module.exports = router;
