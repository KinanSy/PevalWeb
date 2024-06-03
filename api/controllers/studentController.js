const db = require('../models');
const Student = db.Student;

// Obtenir tous les étudiants
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    // Envoyer les étudiants en réponse au format JSON
    res.json(students);
  } catch (error) {
    // Gérer les erreurs serveur
    res.status(500).json({ error: 'Erreur serveur interne' });
  }
};

// Créer un nouvel étudiant
exports.createStudent = async (req, res) => {
  const { stuFirstname, stuLastname, stuToken } = req.body;
  try {
    const newStudent = await Student.create({
      stuFirstname,
      stuLastname,
      stuToken,
    });
    // Répondre avec le nouvel étudiant au format JSON
    res.status(201).json({ message: 'Étudiant créé avec succès', data: newStudent });
  } catch (error) {
    // Gérer les erreurs serveur
    res.status(500).json({ error: 'Erreur serveur interne' });
  }
};

// Obtenir un étudiant par ID
exports.getStudentById = async (req, res) => {
  const id = req.params.id;
  try {
    const student = await Student.findByPk(id);
    if (student) {
      // Répondre avec l'étudiant au format JSON
      res.json(student);
    } else {
      // Envoyer une erreur 404 si l'étudiant n'est pas trouvé
      res.status(404).json({ error: 'Étudiant non trouvé' });
    }
  } catch (error) {
    // Gérer les erreurs serveur
    res.status(500).json({ error: 'Erreur serveur interne' });
  }
};

// Mettre à jour un étudiant par ID
exports.updateStudent = async (req, res) => {
  const id = req.params.id;
  const { stuFirstname, stuLastname, stuToken } = req.body;
  try {
    const student = await Student.findByPk(id);
    if (student) {
      student.stuFirstname = stuFirstname;
      student.stuLastname = stuLastname;
      student.stuToken = stuToken;
      // Sauvegarder les modifications
      await student.save();
      // Répondre avec l'étudiant mis à jour au format JSON
      res.json({ message: 'Étudiant mis à jour avec succès', data: student });
    } else {
      // Envoyer une erreur 404 si l'étudiant n'est pas trouvé
      res.status(404).json({ error: 'Étudiant non trouvé' });
    }
  } catch (error) {
    // Gérer les erreurs serveur
    res.status(500).json({ error: 'Erreur serveur interne' });
  }
};

// Supprimer un étudiant par ID
exports.deleteStudent = async (req, res) => {
  const id = req.params.id;
  try {
    const student = await Student.findByPk(id);
    if (student) {
      await student.destroy();
      // Répondre avec un message de succès
      res.json({ message: 'Étudiant supprimé avec succès' });
    } else {
      // Envoyer une erreur 404 si l'étudiant n'est pas trouvé
      res.status(404).json({ error: 'Étudiant non trouvé' });
    }
  } catch (error) {
    // Gérer les erreurs serveur
    res.status(500).json({ error: 'Erreur serveur interne' });
  }
};
