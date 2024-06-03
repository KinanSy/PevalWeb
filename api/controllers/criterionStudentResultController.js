// Importer les modèles de la base de données
const db = require('../models'); 
const CriterionStudentResult = db.CriterionStudentResult; // Récupérer le modèle CriterionStudentResult
const Criterion = db.Criterion; // Récupérer le modèle Criterion

// Obtenir tous les résultats
exports.getAllResults = async (req, res) => {
  try {
    const results = await CriterionStudentResult.findAll({
      // Inclure les critères associés
      include: [{ model: Criterion, as: 'criterion' }]
    });
    // Envoyer les résultats en réponse au format JSON
    res.json(results);
  } catch (error) {
    // Gérer les erreurs serveur
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Créer un nouveau résultat
exports.createResult = async (req, res) => {
  const { csrCriterionId, csrTeacherId, csrStudentId, csrScore, csrComment } = req.body; 
  try {
    const newResult = await CriterionStudentResult.create({
      csrCriterionId,
      csrTeacherId,
      csrStudentId,
      csrScore,
      csrComment
    });
    // Répondre avec le résultat créé au format JSON
    res.status(201).json(newResult);
  } catch (error) {
    // Gérer les erreurs serveur
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Obtenir un résultat par ID
exports.getResult = async (req, res) => {
  const id = req.params.id; 
  try {
    const result = await CriterionStudentResult.findByPk(id, {
      // Inclure les critères associés
      include: [{ model: Criterion, as: 'criterion' }]
    });
    if (result) {
      // Si trouvé, répondre avec le résultat au format JSON
      res.json(result);
    } else {
      // Si non trouvé, envoyer une erreur 404
      res.status(404).json({ error: 'Result not found' });
    }
  } catch (error) {
    // Gérer les erreurs serveur
    res.status(500).json({ error: 'Internal Server Error' }); 
  }
};

// Mettre à jour un résultat par ID
exports.updateResult = async (req, res) => {
  const id = req.params.id; 
  const { csrScore, csrComment } = req.body;
  try {
    const result = await CriterionStudentResult.findByPk(id); // Chercher le résultat par ID
    if (result) {
      result.csrScore = csrScore; 
      result.csrComment = csrComment;
      // Sauvegarder les modifications
      await result.save();
      // Répondre avec le résultat mis à jour au format JSON
      res.json(result);
    } else {
      // Si non trouvé, envoyer une erreur 404
      res.status(404).json({ error: 'Result not found' });
    }
  } catch (error) {
    // Gérer les erreurs serveur
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Supprimer un résultat par ID
exports.deleteResult = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await CriterionStudentResult.findByPk(id); // Chercher le résultat par ID
    if (result) {
      await result.destroy();
      // Répondre avec un message de succès
      res.json({ message: 'Result deleted successfully' });
    } else {
      // Si non trouvé, envoyer une erreur 404
      res.status(404).json({ error: 'Result not found' });
    }
  } catch (error) {
    // Gérer les erreurs serveur
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
