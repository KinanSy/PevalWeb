const Teacher = require('../models/teacher'); 

// Get all teachers
exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.findAll();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new teacher
exports.createTeacher = async (req, res) => {
  const { teaFirstname, teaLastname, teaUsername, teaPassword } = req.body;
  try {
    const newTeacher = await Teacher.create({
      teaFirstname,
      teaLastname,
      teaUsername,
      teaPassword,
    });
    res.status(201).json(newTeacher);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a teacher by ID
exports.getTeacherById = async (req, res) => {
  const id = req.params.id;
  try {
    const teacher = await Teacher.findByPk(id);
    if (teacher) {
      res.json(teacher);
    } else {
      res.status(404).json({ error: 'Teacher not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a teacher by ID
exports.updateTeacher = async (req, res) => {
  const id = req.params.id;
  const { teaFirstname, teaLastname, teaUsername, teaPassword } = req.body;
  try {
    const teacher = await Teacher.findByPk(id);
    if (teacher) {
      teacher.teaFirstname = teaFirstname;
      teacher.teaLastname = teaLastname;
      teacher.teaUsername = teaUsername;
      teacher.teaPassword = teaPassword;
      await teacher.save();
      res.json(teacher);
    } else {
      res.status(404).json({ error: 'Teacher not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a teacher by ID
exports.deleteTeacher = async (req, res) => {
  const id = req.params.id;
  try {
    const teacher = await Teacher.findByPk(id);
    if (teacher) {
      await teacher.destroy();
      res.json(teacher);
    } else {
      res.status(404).json({ error: 'Teacher not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
