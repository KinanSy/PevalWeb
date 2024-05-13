const db = require('../models');
const Objective = db.Objective;
// Get all objectives
exports.getAllObjectives = async (req, res) => {
  try {
    const objectives = await Objective.findAll();
    res.json(objectives);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new objective
exports.createObjective = async (req, res) => {
  const { objTitle, objWeight, objComment, id_evaluation } = req.body;
  try {
    const newObjective = await Objective.create({
      objTitle,
      objWeight,
      objComment,
      id_evaluation
    });
    res.status(201).json(newObjective);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get an objective by ID
exports.getObjectiveById = async (req, res) => {
  const id = req.params.id;
  try {
    const objective = await Objective.findByPk(id);
    if (objective) {
      res.json(objective);
    } else {
      res.status(404).json({ error: 'Objective not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update an objective by ID
exports.updateObjective = async (req, res) => {
  const id = req.params.id;
  const { objTitle, objWeight, objComment, id_evaluation } = req.body;
  try {
    const objective = await Objective.findByPk(id);
    if (objective) {
      objective.objTitle = objTitle;
      objective.objWeight = objWeight;
      objective.objComment = objComment;
      objective.id_evaluation = id_evaluation;
      await objective.save();
      res.json(objective);
    } else {
      res.status(404).json({ error: 'Objective not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete an objective by ID
exports.deleteObjective = async (req, res) => {
  const id = req.params.id;
  try {
    const objective = await Objective.findByPk(id);
    if (objective) {
      await objective.destroy();
      res.json(objective);
    } else {
      res.status(404).json({ error: 'Objective not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
