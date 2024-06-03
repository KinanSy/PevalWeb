const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

// Route pour obtenir tous les enseignants
router.get('/', teacherController.getAllTeachers);

// Route pour créer un nouvel enseignant
router.post('/', teacherController.createTeacher);

// Route pour obtenir un enseignant par ID
router.get('/:id', teacherController.getTeacherById);

// Route pour mettre à jour un enseignant par ID
router.put('/:id', teacherController.updateTeacher);

// Route pour supprimer un enseignant par ID
router.delete('/:id', teacherController.deleteTeacher);

module.exports = router;
