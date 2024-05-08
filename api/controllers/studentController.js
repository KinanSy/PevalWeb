const Student = require('../models/student');

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new student
exports.createStudent = async (req, res) => {
  const { stuFirstname, stuLastname, stuToken } = req.body;
  try {
    const newStudent = await Student.create({
      stuFirstname,
      stuLastname,
      stuToken,
    });
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a student by ID
exports.getStudentById = async (req, res) => {
  const id = req.params.id;
  try {
    const student = await Student.findByPk(id);
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a student by ID
exports.updateStudent = async (req, res) => {
  const id = req.params.id;
  const { stuFirstname, stuLastname, stuToken } = req.body;
  try {
    const student = await Student.findByPk(id);
    if (student) {
      student.stuFirstname = stuFirstname;
      student.stuLastname = stuLastname;
      student.stuToken = stuToken; // Optional update to token if needed
      await student.save();
      res.json(student);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a student by ID
exports.deleteStudent = async (req, res) => {
  const id = req.params.id;
  try {
    const student = await Student.findByPk(id);
    if (student) {
      await student.destroy();
      res.json(student);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
