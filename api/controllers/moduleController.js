const db = require('../models');
const Module = db.Module;
// Get all modules
exports.getAllModules = async (req, res) => {
  try {
    const modules = await Module.findAll();
    res.json(modules);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new module
exports.createModule = async (req, res) => {
  const { modTitle, modNumber } = req.body;
  try {
    const newModule = await Module.create({
      modTitle,
      modNumber
    });
    res.status(201).json(newModule);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a module by ID
exports.getModuleById = async (req, res) => {
  const id = req.params.id;
  try {
    const module = await Module.findByPk(id);
    if (module) {
      res.json(module);
    } else {
      res.status(404).json({ error: 'Module not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a module by ID
exports.updateModule = async (req, res) => {
  const id = req.params.id;
  const { modTitle, modNumber } = req.body;
  try {
    const module = await Module.findByPk(id);
    if (module) {
      module.modTitle = modTitle;
      module.modNumber = modNumber;
      await module.save();
      res.json(module);
    } else {
      res.status(404).json({ error: 'Module not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a module by ID
exports.deleteModule = async (req, res) => {
  const id = req.params.id;
  try {
    const module = await Module.findByPk(id);
    if (module) {
      await module.destroy();
      res.json(module);
    } else {
      res.status(404).json({ error: 'Module not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
