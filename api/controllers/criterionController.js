const db = require('../models'); // Importer les modèles de la base de données
const Criterion = db.Criterion; // Récupérer le modèle Criterion

// Obtenir tous les critères
exports.getAllCriteria = async (req, res) => {
  try {
    const criteria = await Criterion.findAll(); // Récupérer tous les critères de la base de données
    res.json(criteria); // Envoyer les critères en réponse au format JSON
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' }); // Gérer les erreurs serveur
  }
};

// Créer un nouveau critère
exports.createCriterion = async (req, res) => {
  const { 
    criTitle, 
    criConditionsDescription, 
    criExpectationDescription, 
    criWeight, 
    criLevel0Description, 
    criLevel1Description, 
    criLevel2Description, 
    criLevel3Description, 
    criObjectiveId 
  } = req.body; 

  try {
    const newCriterion = await Criterion.create({
      criTitle,
      criConditionsDescription,
      criExpectationDescription,
      criWeight,
      criLevel0Description,
      criLevel1Description,
      criLevel2Description,
      criLevel3Description,
      criObjectiveId
    }); // Créer un nouveau critère avec les données fournies
    res.status(201).json(newCriterion); // Répondre avec le critère créé au format JSON
  } catch (error) {
    console.log(error)
    res.status(500).json({error: 'Internal Server Error'});
  }
};

// Obtenir un critère par ID
exports.getCriterionById = async (req, res) => {
  const id = req.params.id; // Récupérer l'ID du critère à partir des paramètres de la requête
  try {
    const criterion = await Criterion.findByPk(id); // Chercher le critère par ID
    if (criterion) {
      res.json(criterion); // Si trouvé, répondre avec le critère au format JSON
    } else {
      res.status(404).json({ error: 'Criterion not found' }); // Si non trouvé, envoyer une erreur 404
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Mettre à jour un critère par ID
exports.updateCriterion = async (req, res) => {
  const id = req.params.id; // Récupérer l'ID du critère à partir des paramètres de la requête
  const { 
    criTitle, 
    criConditionsDescription, 
    criExpectationDescription, 
    criWeight, 
    criLevel0Description, 
    criLevel1Description, 
    criLevel2Description, 
    criLevel3Description, 
    criObjectiveId 
  } = req.body;

  try {
    const criterion = await Criterion.findByPk(id); // Chercher le critère par ID
    if (criterion) {
      // Mettre à jour les propriétés du critère
      criterion.criTitle = criTitle;
      criterion.criConditionsDescription = criConditionsDescription;
      criterion.criExpectationDescription = criExpectationDescription;
      criterion.criWeight = criWeight;
      criterion.criLevel0Description = criLevel0Description;
      criterion.criLevel1Description = criLevel1Description;
      criterion.criLevel2Description = criLevel2Description;
      criterion.criLevel3Description = criLevel3Description;
      criterion.criObjectiveId = criObjectiveId;
      await criterion.save(); // Sauvegarder les modifications
      res.json(criterion); // Répondre avec le critère mis à jour au format JSON
    } else {
      res.status(404).json({ error: 'Criterion not found' }); // Si non trouvé, envoyer une erreur 404
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Supprimer un critère par ID
exports.deleteCriterion = async (req, res) => {
  const id = req.params.id; // Récupérer l'ID du critère à partir des paramètres de la requête
  try {
    const criterion = await Criterion.findByPk(id); // Chercher le critère par ID
    if (criterion) {
      await criterion.destroy(); // Supprimer le critère
      res.json(criterion); // Répondre avec le critère supprimé au format JSON
    } else {
      res.status(404).json({ error: 'Criterion not found' }); // Si non trouvé, envoyer une erreur 404
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
