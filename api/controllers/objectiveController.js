const db = require('../models');
const Objective = db.Objective;

// Obtenir tous les objectifs
exports.getAllObjectives = async (req, res) => {
  try {
    const objectives = await Objective.findAll();
    // Envoyer les objectifs en réponse au format JSON
    res.json(objectives);
  } catch (error) {
    // Gérer les erreurs serveur
    res.status(500).json({ error: 'Erreur serveur interne' });
  }
};

// Créer un nouvel objectif
exports.createObjective = async (req, res) => {
  const { objTitle, objWeight, objComment, objEvaluationId } = req.body;
  try {
    const newObjective = await Objective.create({
      objTitle,
      objWeight,
      objComment,
      objEvaluationId
    });
    // Répondre avec le nouvel objectif au format JSON
    res.status(201).json(newObjective);
  } catch (error) {
    // Gérer les erreurs serveur
    res.status(500).json({ error: 'Erreur serveur interne' });
  }
};

// Obtenir un objectif par ID
exports.getObjectiveById = async (req, res) => {
  const id = req.params.id;
  try {
    const objective = await Objective.findByPk(id);
    if (objective) {
      // Répondre avec l'objectif au format JSON
      res.json(objective);
    } else {
      // Envoyer une erreur 404 si l'objectif n'est pas trouvé
      res.status(404).json({ error: 'Objectif non trouvé' });
    }
  } catch (error) {
    // Gérer les erreurs serveur
    res.status(500).json({ error: 'Erreur serveur interne' });
  }
};

// Mettre à jour un objectif par ID
exports.updateObjective = async (req, res) => {
  const id = req.params.id;
  const { objTitle, objWeight, objComment, objEvaluationId } = req.body;
  try {
    const objective = await Objective.findByPk(id);
    if (objective) {
      objective.objTitle = objTitle;
      objective.objWeight = objWeight;
      objective.objComment = objComment;
      objective.objEvaluationId = objEvaluationId;
      // Sauvegarder les modifications
      await objective.save();
      // Répondre avec l'objectif mis à jour au format JSON
      res.json(objective);
    } else {
      // Envoyer une erreur 404 si l'objectif n'est pas trouvé
      res.status(404).json({ error: 'Objectif non trouvé' });
    }
  } catch (error) {
    // Gérer les erreurs serveur
    res.status(500).json({ error: 'Erreur serveur interne' });
  }
};

// Supprimer un objectif par ID
exports.deleteObjective = async (req, res) => {
  const id = req.params.id;
  try {
    const objective = await Objective.findByPk(id);
    if (objective) {
      await objective.destroy();
      // Répondre avec un message de succès
      res.json({ message: 'Objectif supprimé avec succès' });
    } else {
      // Envoyer une erreur 404 si l'objectif n'est pas trouvé
      res.status(404).json({ error: 'Objectif non trouvé' });
    }
  } catch (error) {
    // Gérer les erreurs serveur
    res.status(500).json({ error: 'Erreur serveur interne' });
  }
};
