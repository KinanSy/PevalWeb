const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Route pour obtenir tous les étudiants
router.get('/', studentController.getAllStudents);

// Route pour créer un nouvel étudiant
router.post('/', studentController.createStudent);

// Route pour obtenir un étudiant par ID
router.get('/:id', studentController.getStudentById);

// Route pour mettre à jour un étudiant par ID
router.put('/:id', studentController.updateStudent);

// Route pour supprimer un étudiant par ID
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
