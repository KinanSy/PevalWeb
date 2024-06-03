const express = require('express');
const router = express.Router();
const criterionController = require('../controllers/criterionController');

// Route pour obtenir tous les critères
router.get('/', criterionController.getAllCriteria);

// Route pour créer un nouveau critère
router.post('/', criterionController.createCriterion);

// Route pour obtenir un critère par ID
router.get('/:id', criterionController.getCriterionById);

// Route pour mettre à jour un critère par ID
router.put('/:id', criterionController.updateCriterion);

// Route pour supprimer un critère par ID
router.delete('/:id', criterionController.deleteCriterion);

module.exports = router;
