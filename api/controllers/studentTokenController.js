const db = require('../models');
const Student = db.Student;

// Valider un token d'étudiant
exports.validateToken = async (req, res) => {
  const { token } = req.body;
  try {
    const student = await Student.findOne({
      where: {
        stuToken: token,
      }
    });
    if (student) {
      // Répondre avec l'ID de l'étudiant si le token est valide
      res.json({ id: student.id_student });
    } else {
      // Envoyer une erreur 404 si le token n'est pas valide
      res.status(404).json({ error: 'Token invalide' });
    }
  } catch (error) {
    // Gérer les erreurs serveur
    res.status(500).json({ error: 'Erreur serveur interne' });
  }
};
