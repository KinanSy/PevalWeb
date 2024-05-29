const db = require('../models');
const CriterionStudentResult = db.CriterionStudentResult;
const Criterion = db.Criterion;

exports.getAllResults = async (req, res) => {
  try {
    const results = await CriterionStudentResult.findAll({
      include: [{ model: Criterion, as: 'criterion' }]
    });
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

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
    res.status(201).json(newResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getResult = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await CriterionStudentResult.findByPk(id, {
      include: [{ model: Criterion, as: 'criterion' }]
    });
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: 'Result not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateResult = async (req, res) => {
  const id = req.params.id;
  const { csrScore, csrComment } = req.body;
  try {
    const result = await CriterionStudentResult.findByPk(id);
    if (result) {
      result.csrScore = csrScore;
      result.csrComment = csrComment;
      await result.save();
      res.json(result);
    } else {
      res.status(404).json({ error: 'Result not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteResult = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await CriterionStudentResult.findByPk(id);
    if (result) {
      await result.destroy();
      res.json({ message: 'Result deleted successfully' });
    } else {
      res.status(404).json({ error: 'Result not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
