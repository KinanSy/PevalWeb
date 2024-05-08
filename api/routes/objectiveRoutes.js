const express = require('express');
const router = express.Router();
const objectiveController = require('../controllers/objectiveController');

// Route to get all objectives
router.get('/', objectiveController.getAllObjectives);

// Route to create a new objective
router.post('/', objectiveController.createObjective);

// Route to get an objective by ID
router.get('/:id', objectiveController.getObjectiveById);

// Route to update an objective by ID
router.put('/:id', objectiveController.updateObjective);

// Route to delete an objective by ID
router.delete('/:id', objectiveController.deleteObjective);

module.exports = router;
