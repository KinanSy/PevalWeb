const express = require('express');
const router = express.Router();
const criterionStudentResultController = require('../controllers/criterionStudentResultController');

router.get('/', criterionStudentResultController.getAllResults);
router.post('/', criterionStudentResultController.createResult);
router.get('/:id', criterionStudentResultController.getResult);
router.put('/:id', criterionStudentResultController.updateResult);
router.delete('/:id', criterionStudentResultController.deleteResult);

module.exports = router;
