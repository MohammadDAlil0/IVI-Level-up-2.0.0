const express = require('express');

const problemController = require('../controllers/problemController');
const authController = require('../controllers/authControlller');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/getUserProblems/:userId', problemController.getUserProblems)

router.route('/me')
.post(authController.protect, problemController.editProblemInput, problemController.createProblem)
.get(authController.protect, problemController.getMyProblems);

router.route('/:id')
.patch(authController.protect, problemController.updateProblem)
.delete(authController.protect, problemController.deleteProblem);

router.put('/saveMemento', authController.protect, userController.idToBody, problemController.saveMemento);
router.get('/getMyMementos', authController.protect, problemController.getMyMementos);

router.put('/voteForProblem', authController.protect, problemController.voteForProblem);

router.get('/problemset', authController.isLoggedIn, problemController.getProblemSet);


module.exports = router;