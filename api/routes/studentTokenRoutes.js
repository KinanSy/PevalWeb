const express = require('express');
const router = express.Router();
const studentTokenController = require('../controllers/studentTokenController');

// Route pour valider le token d'un étudiant
router.post('/validateToken', studentTokenController.validateToken);

module.exports = router;
