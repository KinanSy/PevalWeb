const express = require('express');
const router = express.Router();
const criterionStudentResultController = require('../controllers/criterionStudentResultController');

router.get('/', criterionStudentResultController.getAllResults);
router.post('/', criterionStudentResultController.createResult);
router.get('/:id_criteria/:id_teacher/:id_student', criterionStudentResultController.getResult);
router.put('/:id_criteria/:id_teacher/:id_student', criterionStudentResultController.updateResult);
router.delete('/:id_criteria/:id_teacher/:id_student', criterionStudentResultController.deleteResult);

module.exports = router;
