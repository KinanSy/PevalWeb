const express = require('express');
const router = express.Router();
const objectiveController = require('../controllers/objectiveController');

// Route pour obtenir tous les objectifs
router.get('/', objectiveController.getAllObjectives);

// Route pour créer un nouvel objectif
router.post('/', objectiveController.createObjective);

// Route pour obtenir un objectif par ID
router.get('/:id', objectiveController.getObjectiveById);

// Route pour mettre à jour un objectif par ID
router.put('/:id', objectiveController.updateObjective);

// Route pour supprimer un objectif par ID
router.delete('/:id', objectiveController.deleteObjective);

module.exports = router;
