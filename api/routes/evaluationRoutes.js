const express = require('express');
const router = express.Router();
const evaluationController = require('../controllers/evaluationController');

// Route pour obtenir toutes les évaluations
router.get('/', evaluationController.getAllEvaluations);

// Route pour créer une nouvelle évaluation
router.post('/', evaluationController.createEvaluation);

// Route pour obtenir une évaluation par ID
router.get('/:id', evaluationController.getEvaluationById);

// Route pour mettre à jour une évaluation par ID
router.put('/:id', evaluationController.updateEvaluation);

// Route pour supprimer une évaluation par ID
router.delete('/:id', evaluationController.deleteEvaluation);

module.exports = router;
