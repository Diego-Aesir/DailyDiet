const express = require('express');
const router = express.Router();
const userPageController = require('../controllers/userPage');
const authenticateUser = require('../middleware/autentication');
const {fieldsValidation, handleValidationErrors} = require('../validators/fieldsValidation');

router.get('/', authenticateUser, userPageController.getUserInfo);
router.put('/username', authenticateUser, fieldsValidation, handleValidationErrors, userPageController.changeUserName);
router.put('/password', authenticateUser, fieldsValidation, handleValidationErrors, userPageController.changeUserPassword);
router.put('/weight', authenticateUser, fieldsValidation, handleValidationErrors, userPageController.changeUserWeight);
router.put('/height', authenticateUser, fieldsValidation, handleValidationErrors, userPageController.changeUserHeight);
router.put('/age', authenticateUser, fieldsValidation, handleValidationErrors, userPageController.changeUserAge);
router.delete('/delete', authenticateUser, userPageController.deleteUser);

module.exports = router;
