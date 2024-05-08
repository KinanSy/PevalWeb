const Evaluation = require('../models/evaluation');

// Get all evaluations
exports.getAllEvaluations = async (req, res) => {
  try {
    const evaluations = await Evaluation.findAll();
    res.json(evaluations);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new evaluation
exports.createEvaluation = async (req, res) => {
  const { evaTitle, evaDescription, evaWeight, evaDate, evaLocation } = req.body;
  try {
    const newEvaluation = await Evaluation.create({
      evaTitle,
      evaDescription,
      evaWeight,
      evaDate,
      evaLocation,
    });
    res.status(201).json(newEvaluation);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get an evaluation by ID
exports.getEvaluationById = async (req, res) => {
  const id = req.params.id;
  try {
    const evaluation = await Evaluation.findByPk(id);
    if (evaluation) {
      res.json(evaluation);
    } else {
      res.status(404).json({ error: 'Evaluation not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update an evaluation by ID
exports.updateEvaluation = async (req, res) => {
  const id = req.params.id;
  const { evaTitle, evaDescription, evaWeight, evaDate, evaLocation } = req.body;
  try {
    const evaluation = await Evaluation.findByPk(id);
    if (evaluation) {
      evaluation.evaTitle = evaTitle;
      evaluation.evaDescription = evaDescription;
      evaluation.evaWeight = evaWeight;
      evaluation.evaDate = evaDate;
      evaluation.evaLocation = evaLocation;
      await evaluation.save();
      res.json(evaluation);
    } else {
      res.status(404).json({ error: 'Evaluation not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete an evaluation by ID
exports.deleteEvaluation = async (req, res) => {
  const id = req.params.id;
  try {
    const evaluation = await Evaluation.findByPk(id);
    if (evaluation) {
      await evaluation.destroy();
      res.json(evaluation);
    } else {
      res.status(404).json({ error: 'Evaluation not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
