const db = require('../models');
const Module = db.Module;

// Obtenir tous les modules
exports.getAllModules = async (req, res) => {
  try {
    const modules = await Module.findAll();
    // Envoyer les modules en réponse au format JSON
    res.json(modules);
  } catch (error) {
    // Gérer les erreurs serveur
    res.status(500).json({ error: 'Erreur serveur interne' });
  }
};

// Créer un nouveau module
exports.createModule = async (req, res) => {
  const { modTitle, modNumber } = req.body;
  try {
    const newModule = await Module.create({
      modTitle,
      modNumber
    });
    // Répondre avec le nouveau module au format JSON
    res.status(201).json({ message: 'Module créé avec succès', data: newModule });
  } catch (error) {
    // Gérer les erreurs serveur
    res.status(500).json({ error: 'Erreur serveur interne' });
  }
};

// Obtenir un module par ID
exports.getModuleById = async (req, res) => {
  const id = req.params.id;
  try {
    const module = await Module.findByPk(id);
    if (module) {
      // Répondre avec le module au format JSON
      res.json(module);
    } else {
      // Envoyer une erreur 404 si le module n'est pas trouvé
      res.status(404).json({ error: 'Module non trouvé' });
    }
  } catch (error) {
    // Gérer les erreurs serveur
    res.status(500).json({ error: 'Erreur serveur interne' });
  }
};

// Mettre à jour un module par ID
exports.updateModule = async (req, res) => {
  const id = req.params.id;
  const { modTitle, modNumber } = req.body;
  try {
    const module = await Module.findByPk(id);
    if (module) {
      module.modTitle = modTitle;
      module.modNumber = modNumber;
      // Sauvegarder les modifications
      await module.save();
      // Répondre avec le module mis à jour au format JSON
      res.json({ message: 'Module mis à jour avec succès', data: module });
    } else {
      // Envoyer une erreur 404 si le module n'est pas trouvé
      res.status(404).json({ error: 'Module non trouvé' });
    }
  } catch (error) {
    // Gérer les erreurs serveur
    res.status(500).json({ error: 'Erreur serveur interne' });
  }
};

// Supprimer un module par ID
exports.deleteModule = async (req, res) => {
  const id = req.params.id;
  try {
    const module = await Module.findByPk(id);
    if (module) {
      await module.destroy();
      // Répondre avec un message de succès
      res.json({ message: 'Module supprimé avec succès' });
    } else {
      // Envoyer une erreur 404 si le module n'est pas trouvé
      res.status(404).json({ error: 'Module non trouvé' });
    }
  } catch (error) {
    // Gérer les erreurs serveur
    res.status(500).json({ error: 'Erreur serveur interne' });
  }
};
