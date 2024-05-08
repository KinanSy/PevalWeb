const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

// Route to get all teachers
router.get('/', teacherController.getAllTeachers);

// Route to create a new teacher
router.post('/', teacherController.createTeacher);

// Route to get a teacher by ID
router.get('/:id', teacherController.getTeacherById);

// Route to update a teacher by ID
router.put('/:id', teacherController.updateTeacher);

// Route to delete a teacher by ID
router.delete('/:id', teacherController.deleteTeacher);

module.exports = router;
