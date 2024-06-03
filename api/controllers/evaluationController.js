const db = require('../models');
const Evaluation = db.Evaluation;
const Module = db.Module;
const Objective = db.Objective;
const Criterion = db.Criterion;
const CriterionStudentResult = db.CriterionStudentResult;

// Obtenir toutes les évaluations
exports.getAllEvaluations = async (req, res) => {
  try {
    const evaluations = await Evaluation.findAll();
    // Envoyer les évaluations en réponse au format JSON
    res.json(evaluations);
  } catch (error) {
    // Gérer les erreurs serveur
    res.status(500).json({ error: 'Erreur serveur interne' });
  }
};

// Créer une nouvelle évaluation
exports.createEvaluation = async (req, res) => {
  const { evaTitle, evaDescription, evaWeight, evaDate, evaLocation, evaModuleId } = req.body;
  try {
    const newEvaluation = await Evaluation.create({
      evaTitle,
      evaDescription,
      evaWeight,
      evaDate,
      evaLocation,
      evaModuleId,
    });
    // Répondre avec la nouvelle évaluation au format JSON
    res.status(201).json(newEvaluation);
  } catch (error) {
    // Gérer les erreurs serveur
    res.status(500).json({ error: 'Erreur serveur interne' });
  }
};

// Obtenir une évaluation par ID
exports.getEvaluationById = async (req, res) => {
  const id = req.params.id;
  try {
    const evaluation = await Evaluation.findByPk(id, {
      include: [
        { model: Module, as: 'module' },
        {
          model: Objective,
          as: 'objectives',
          include: [
            {
              model: Criterion,
              as: 'criterions',
              include: [{ model: CriterionStudentResult, as: 'criterionResults' }]
            }
          ]
        }
      ]
    });
    if (evaluation) {
      // Répondre avec l'évaluation au format JSON
      res.json(evaluation);
    } else {
      // Envoyer une erreur 404 si l'évaluation n'est pas trouvée
      res.status(404).json({ error: 'Évaluation non trouvée' });
    }
  } catch (error) {
    // Gérer les erreurs serveur
    res.status(500).json({ error: 'Erreur serveur interne' });
  }
};

// Mettre à jour une évaluation par ID
exports.updateEvaluation = async (req, res) => {
  const id = req.params.id;
  const { evaTitle, evaDescription, evaWeight, evaDate, evaLocation, evaModuleId } = req.body;
  try {
    const evaluation = await Evaluation.findByPk(id);
    if (evaluation) {
      evaluation.evaTitle = evaTitle;
      evaluation.evaDescription = evaDescription;
      evaluation.evaWeight = evaWeight;
      evaluation.evaDate = evaDate;
      evaluation.evaLocation = evaLocation;
      evaluation.evaModuleId = evaModuleId;
      // Sauvegarder les modifications
      await evaluation.save();
      // Répondre avec l'évaluation mise à jour au format JSON
      res.json(evaluation);
    } else {
      // Envoyer une erreur 404 si l'évaluation n'est pas trouvée
      res.status(404).json({ error: 'Évaluation non trouvée' });
    }
  } catch (error) {
    // Gérer les erreurs serveur
    console.log(error);
    res.status(500).json({ error: 'Erreur serveur interne' });
  }
};

// Supprimer une évaluation par ID
exports.deleteEvaluation = async (req, res) => {
  const id = req.params.id;
  try {
    const evaluation = await Evaluation.findByPk(id, {
      include: [
        {
          model: Objective,
          as: 'objectives',
          include: [
            {
              model: Criterion,
              as: 'criterions'
            }
          ]
        }
      ]
    });

    if (evaluation) {
      // Supprimer les critères associés
      for (const objective of evaluation.objectives) {
        for (const criterion of objective.criterions) {
          await criterion.destroy();
        }
        await objective.destroy();
      }
      // Supprimer l'évaluation
      await evaluation.destroy();
      res.json({ message: 'Évaluation supprimée avec succès' });
    } else {
      // Envoyer une erreur 404 si l'évaluation n'est pas trouvée
      res.status(404).json({ error: 'Évaluation non trouvée' });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'évaluation:', error);
    // Gérer les erreurs serveur
    res.status(500).json({ error: 'Erreur serveur interne' });
  }
};
