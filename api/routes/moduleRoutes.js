const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController');

// Route pour obtenir tous les modules
router.get('/', moduleController.getAllModules);

// Route pour créer un nouveau module
router.post('/', moduleController.createModule);

// Route pour obtenir un module par ID
router.get('/:id', moduleController.getModuleById);

// Route pour mettre à jour un module par ID
router.put('/:id', moduleController.updateModule);

// Route pour supprimer un module par ID
router.delete('/:id', moduleController.deleteModule);

module.exports = router;
