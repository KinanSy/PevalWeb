const db = require('../models'); // Importer les modèles de la base de données
const Teacher = db.Teacher; // Extraire le modèle Teacher
const crypto = require('crypto'); // Importer le module crypto pour le hachage des mots de passe

// Fonction de login pour les enseignants
exports.login = async (req, res) => {
  const { username, password } = req.body; // Extraire le nom d'utilisateur et le mot de passe de la requête
  try {
    // Hacher le mot de passe en utilisant l'algorithme SHA-256
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    
    // Rechercher l'enseignant dans la base de données avec le nom d'utilisateur et le mot de passe haché
    const teacher = await Teacher.findOne({
      where: {
        teaUsername: username,
        teaPassword: hashedPassword
      }
    });
    
    // Si l'enseignant est trouvé, renvoyer l'ID et le prénom
    if (teacher) {
      res.json({ id: teacher.id_teacher, name: teacher.teaFirstname });
    } else {
      // Si l'enseignant n'est pas trouvé, renvoyer une erreur 401
      res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect' });
    }
  } catch (error) {
    // En cas d'erreur interne du serveur, renvoyer une erreur 500
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};
