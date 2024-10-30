const express = require('express');
const router = express.Router();
const userPageController = require('../controllers/userPage');
const authenticateUser = require('../middleware/autentication');
const {handleValidationErrors} = require('../validators/fieldsValidation');
const {userNewUsername, userNewPassword, userNewWeight, userNewHeight, userNewAge,} = require('../validators/userNewInfoValidation');

router.get('/:id', authenticateUser, userPageController.getUserInfo);
router.put('/:id/username', authenticateUser, userNewUsername(), handleValidationErrors, userPageController.changeUserName);
router.put('/:id/password', authenticateUser, userNewPassword(), handleValidationErrors, userPageController.changeUserPassword);
router.put('/:id/weight', authenticateUser, userNewWeight(), handleValidationErrors, userPageController.changeUserWeight);
router.put('/:id/height', authenticateUser, userNewHeight(), handleValidationErrors, userPageController.changeUserHeight);
router.put('/:id/age', authenticateUser, userNewAge(), handleValidationErrors, userPageController.changeUserAge);
router.delete('/:id/delete', authenticateUser, userPageController.deleteUser);

module.exports = router;
