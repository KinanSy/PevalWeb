const express = require('express');
const router = express.Router();
const criterionStudentResultController = require('../controllers/criterionStudentResultController');

// Route pour obtenir tous les résultats des critères des étudiants
router.get('/', criterionStudentResultController.getAllResults);

// Route pour créer un nouveau résultat de critère d'étudiant
router.post('/', criterionStudentResultController.createResult);

// Route pour obtenir un résultat de critère d'étudiant par ID
router.get('/:id', criterionStudentResultController.getResult);

// Route pour mettre à jour un résultat de critère d'étudiant par ID
router.put('/:id', criterionStudentResultController.updateResult);

// Route pour supprimer un résultat de critère d'étudiant par ID
router.delete('/:id', criterionStudentResultController.deleteResult);

module.exports = router;
