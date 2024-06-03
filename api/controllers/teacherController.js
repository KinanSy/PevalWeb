const db = require('../models');
const Teacher = db.Teacher;

// Obtenir tous les enseignants
exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.findAll();
    // Envoyer les enseignants en réponse au format JSON
    res.json(teachers);
  } catch (error) {
    // Gérer les erreurs serveur
    res.status(500).json({ error: 'Erreur serveur interne' });
  }
};

// Créer un nouvel enseignant
exports.createTeacher = async (req, res) => {
  const { teaFirstname, teaLastname, teaUsername, teaPassword } = req.body;
  try {
    const newTeacher = await Teacher.create({
      teaFirstname,
      teaLastname,
      teaUsername,
      teaPassword,
    });
    // Répondre avec le nouvel enseignant au format JSON
    res.status(201).json({ message: 'Enseignant créé avec succès', data: newTeacher });
  } catch (error) {
    // Gérer les erreurs serveur
    res.status(500).json({ error: 'Erreur serveur interne' });
  }
};

// Obtenir un enseignant par ID
exports.getTeacherById = async (req, res) => {
  const id = req.params.id;
  try {
    const teacher = await Teacher.findByPk(id);
    if (teacher) {
      // Répondre avec l'enseignant au format JSON
      res.json(teacher);
    } else {
      // Envoyer une erreur 404 si l'enseignant n'est pas trouvé
      res.status(404).json({ error: 'Enseignant non trouvé' });
    }
  } catch (error) {
    // Gérer les erreurs serveur
    res.status(500).json({ error: 'Erreur serveur interne' });
  }
};

// Mettre à jour un enseignant par ID
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
      // Sauvegarder les modifications
      await teacher.save();
      // Répondre avec l'enseignant mis à jour au format JSON
      res.json({ message: 'Enseignant mis à jour avec succès', data: teacher });
    } else {
      // Envoyer une erreur 404 si l'enseignant n'est pas trouvé
      res.status(404).json({ error: 'Enseignant non trouvé' });
    }
  } catch (error) {
    // Gérer les erreurs serveur
    res.status(500).json({ error: 'Erreur serveur interne' });
  }
};

// Supprimer un enseignant par ID
exports.deleteTeacher = async (req, res) => {
  const id = req.params.id;
  try {
    const teacher = await Teacher.findByPk(id);
    if (teacher) {
      await teacher.destroy();
      // Répondre avec un message de succès
      res.json({ message: 'Enseignant supprimé avec succès' });
    } else {
      // Envoyer une erreur 404 si l'enseignant n'est pas trouvé
      res.status(404).json({ error: 'Enseignant non trouvé' });
    }
  } catch (error) {
    // Gérer les erreurs serveur
    res.status({error: 'Erreur serveur interne' });
  }
};
