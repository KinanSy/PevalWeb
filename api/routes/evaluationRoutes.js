const express = require('express');
const router = express.Router();
const evaluationController = require('../controllers/evaluationController');

// Route to get all evaluations
router.get('/', evaluationController.getAllEvaluations);

// Route to create a new evaluation
router.post('/', evaluationController.createEvaluation);

// Route to get a evaluation by ID
router.get('/:id', evaluationController.getEvaluationById);

// Route to update a evaluation by ID
router.put('/:id', evaluationController.updateEvaluation);

// Route to delete a evaluation by ID
router.delete('/:id', evaluationController.deleteEvaluation);

module.exports = router;
