const db = require('../models');
const CriterionStudentResult = db.CriterionStudentResult;
exports.getAllResults = async (req, res) => {
    try {
        const results = await CriterionStudentResult.findAll();
        res.json(results);
    } catch (error) {
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
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getResult = async (req, res) => {
    const { csrCriterionId, csrTeacherId, csrStudentId } = req.params;
    try {
        const result = await CriterionStudentResult.findOne({
            where: { csrCriterionId, csrTeacherId, csrStudentId }
        });
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'Result not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateResult = async (req, res) => {
    const { csrCriterionId, csrTeacherId, csrStudentId, csrScore, csrComment } = req.body;
    try {
        const result = await CriterionStudentResult.findOne({
            where: { csrCriterionId, csrTeacherId, csrStudentId }
        });
        if (result) {
            result.csrScore = csrScore;
            result.csrComment = csrComment;
            await result.save();
            res.json(result);
        } else {
            res.status(404).json({ error: 'Result not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteResult = async (req, res) => {
    const { csrCriterionId, csrTeacherId, csrStudentId } = req.params;
    try {
        const result = await CriterionStudentResult.findOne({
            where: { csrCriterionId, csrTeacherId, csrStudentId }
        });
        if (result) {
            await result.destroy();
            res.json({ message: 'Result deleted successfully' });
        } else {
            res.status(404).json({ error: 'Result not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
