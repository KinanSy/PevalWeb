const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController');

// Route to get all modules
router.get('/', moduleController.getAllModules);

// Route to create a new module
router.post('/', moduleController.createModule);

// Route to get a module by ID
router.get('/:id', moduleController.getModuleById);

// Route to update a module by ID
router.put('/:id', moduleController.updateModule);

// Route to delete a module by ID
router.delete('/:id', moduleController.deleteModule);

module.exports = router;
