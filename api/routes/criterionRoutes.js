const express = require('express');
const router = express.Router();
const criterionController = require('../controllers/criterionController');

// Route to get all criteria
router.get('/', criterionController.getAllCriteria);

// Route to create a new criterion
router.post('/', criterionController.createCriterion);

// Route to get a criterion by ID
router.get('/:id', criterionController.getCriterionById);

// Route to update a criterion by ID
router.put('/:id', criterionController.updateCriterion);

// Route to delete a criterion by ID
router.delete('/:id', criterionController.deleteCriterion);

module.exports = router;