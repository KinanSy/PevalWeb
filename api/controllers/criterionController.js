const db = require('../models');
const Criterion = db.Criterion;
// Get all criteria
exports.getAllCriteria = async (req, res) => {
  try {
    const criteria = await Criterion.findAll();
    res.json(criteria);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new criterion
exports.createCriterion = async (req, res) => {
  const { criTitle, criConditionsDescription, criExpectationDescription, criWeight, criLevel0Description, criLevel1Description, criLevel2Description, criLevel3Description, id_objective } = req.body;
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
      id_objective
    });
    res.status(201).json(newCriterion);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a criterion by ID
exports.getCriterionById = async (req, res) => {
  const id = req.params.id;
  try {
    const criterion = await Criterion.findByPk(id);
    if (criterion) {
      res.json(criterion);
    } else {
      res.status(404).json({ error: 'Criterion not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a criterion by ID
exports.updateCriterion = async (req, res) => {
  const id = req.params.id;
  const { criTitle, criConditionsDescription, criExpectationDescription, criWeight, criLevel0Description, criLevel1Description, criLevel2Description, criLevel3Description, id_objective } = req.body;
  try {
    const criterion = await Criterion.findByPk(id);
    if (criterion) {
      criterion.criTitle = criTitle;
      criterion.criConditionsDescription = criConditionsDescription;
      criterion.criExpectationDescription = criExpectationDescription;
      criterion.criWeight = criWeight;
      criterion.criLevel0Description = criLevel0Description;
      criterion.criLevel1Description = criLevel1Description;
      criterion.criLevel2Description = criLevel2Description;
      criterion.criLevel3Description = criLevel3Description;
      criterion.id_objective = id_objective;
      await criterion.save();
      res.json(criterion);
    } else {
      res.status(404).json({ error: 'Criterion not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a criterion by ID
exports.deleteCriterion = async (req, res) => {
  const id = req.params.id;
  try {
    const criterion = await Criterion.findByPk(id);
    if (criterion) {
      await criterion.destroy();
      res.json(criterion);
    } else {
      res.status(404).json({ error: 'Criterion not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
