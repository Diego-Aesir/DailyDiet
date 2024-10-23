const express = require('express');
const router = express.Router();
const userPageController = require('../controllers/userPage');
const authenticateUser = require('../middleware/autentication');
const {handleValidationErrors} = require('../validators/fieldsValidation');
const userNewInfoValidation = require('../validators/userNewInfoValidation');

router.get('/:id', authenticateUser, userPageController.getUserInfo);
router.put('/:id/username', authenticateUser, userNewInfoValidation(), handleValidationErrors, userPageController.changeUserName);
router.put('/:id/password', authenticateUser, userNewInfoValidation(), handleValidationErrors, userPageController.changeUserPassword);
router.put('/:id/weight', authenticateUser, userNewInfoValidation(), handleValidationErrors, userPageController.changeUserWeight);
router.put('/:id/height', authenticateUser, userNewInfoValidation(), handleValidationErrors, userPageController.changeUserHeight);
router.put('/:id/age', authenticateUser, userNewInfoValidation(), handleValidationErrors, userPageController.changeUserAge);
router.delete('/:id/delete', authenticateUser, userPageController.deleteUser);

module.exports = router;
