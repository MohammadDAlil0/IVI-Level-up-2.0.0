const express = require('express');

const userController = require('../controllers/userController');
const authController = require('../controllers/authControlller');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.get('/', userController.getAllUsers);
router.get('/codeforces/:handle', userController.getUser)

router.use(authController.protect);

router.route('/me')
.get(userController.idToParams, userController.getMe)
.patch(userController.idToParams, userController.validateUpdateUserInput, userController.updateUser)
.delete(userController.idToParams, userController.deleteUser);

router.post('/folder', userController.addFolder);
router.patch('/folder/:folderId', userController.editFolder);

router.put('/addFriend/:friendId', userController.addFriend);
router.delete('/deleteFriend/:friendId', userController.deleteFriend);


module.exports = router;