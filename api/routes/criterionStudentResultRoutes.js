const express = require('express');
const router = express.Router();
const criterionStudentResultController = require('../controllers/criterionStudentResultController');

router.get('/', criterionStudentResultController.getAllResults);
router.post('/', criterionStudentResultController.createResult);
router.get('/:csrCriterionId/:csrTeacherId/:csrStudentId', criterionStudentResultController.getResult);
router.put('/:csrCriterionId/:csrTeacherId/:csrStudentId', criterionStudentResultController.updateResult);
router.delete('/:csrCriterionId/:csrTeacherId/:csrStudentId', criterionStudentResultController.deleteResult);

module.exports = router;
