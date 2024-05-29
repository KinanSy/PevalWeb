import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Divider, Collapse, Tooltip } from 'antd';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./studentEvaluationResult.css";

const { Panel } = Collapse;

function renderCriteriaView(criteria, objectiveId, studentId) {
    const result = criteria.criterionResults.find(r => r.csrStudentId == studentId) || {};
    const criteriaId = criteria.id_criterion;
    const scoreKey = `${objectiveId}-${criteriaId}-${studentId}`;
    const genericRemark = criteria[`criLevel${result.csrScore}Description`] || 'Remarque generique';

    const getScoreClassName = (score) => {
        if (score >= 0 && score <= 1) {
            return 'noteMediocre';
        } else if (score === 2) {
            return 'noteAverage';
        } else if (score === 3) {
            return 'noteGood';
        }
        return '';
    };

    return (
        <div key={criteriaId} style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>
            <Row gutter={16} style={{ overflowWrap: 'break-word' }}>
                <Col span={11}>
                    <div><strong>Critère</strong></div>
                    <div>{criteria.criTitle}</div>
                    <div><strong>Conditions pour démontrer les comportements</strong></div>
                    <div>{criteria.criConditionsDescription}</div>
                    <div><strong>Résultats attendus</strong></div>
                    <div>{criteria.criExpectationDescription}</div>
                </Col>
                <Col span={3}>
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                            <div><strong>Poids</strong></div>
                            <div>{criteria.criWeight}</div>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div className={`scoreValue ${getScoreClassName(result.csrScore)}`}>{result.csrScore} / 3</div>
                        </div>
                    </div>
                </Col>
                <Col span={5}>
                    <div>
                        {genericRemark}
                    </div>
                </Col>
                <Col span={5}>
                    <div>
                        <strong>Remarque personnelle</strong>
                        <div>{result.csrComment}</div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

function StudentEvaluationResult() {
    const { evalId, studentId } = useParams();
    const [objectivesData, setObjectivesData] = useState([]);
    const [evaluationData, setEvaluationData] = useState({});
    const [studentData, setStudentData] = useState({});
    const [note, setNote] = useState(1);
    const [roundedNote, setRoundedNote] = useState(1);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_HOST}/evaluations/${evalId}`)
        .then(res => {
            const evaluation = res.data;
            console.log(evaluation["objectives"]);
            setObjectivesData(evaluation["objectives"] || []);
            setEvaluationData(evaluation); // Store entire evaluation data
            calculateNoteFromData(evaluation["objectives"]); // Calculate note from fetched data
        }).catch(err => {
            console.error('Error fetching evaluation data:', err);
            setObjectivesData([]);
        });
    }, [evalId]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_HOST}/students/${studentId}`)
        .then(res => {
            setStudentData(res.data);
        }).catch(err => {
            console.error('Error fetching student data:', err);
        });
    }, [studentId]);

    const calculateNoteFromData = (data) => {
        let totalScore = 0;
        let totalWeight = 0;

        data.forEach(objective => {
            const objectiveWeight = parseFloat(objective.objWeight);
            if (Array.isArray(objective.criterions)) {
                objective.criterions.forEach(criteria => {
                    const criteriaWeight = parseFloat(criteria.criWeight);
                    const result = criteria.criterionResults.find(r => r.csrStudentId == studentId) || {};
                    const score = result.csrScore || 0;
                    totalScore += (score / 3) * criteriaWeight * objectiveWeight;
                    totalWeight += criteriaWeight * objectiveWeight;
                });
            }
        });

        const percentage = totalScore / totalWeight;
        const calculatedNote = (percentage * 5) + 1;
        const calculatedRoundedNote = Math.round(calculatedNote * 2) / 2;

        setNote(calculatedNote.toFixed(1));
        setRoundedNote(calculatedRoundedNote.toFixed(1));
    };

    const getNoteClassName = (note) => {
        if (note >= 1 && note < 4) {
            return 'noteMediocre';
        } else if (note >= 4 && note < 5) {
            return 'noteAverage';
        } else if (note >= 5 && note <= 6) {
            return 'noteGood';
        }
        return '';
    };

    return (
        <div className="homeContainer">
            <div className="homeContentContainer">
                <Card className="homeContent">
                    <Row>
                        <Col span={18} push={6} className='moduleDescriptionsTitleValue'>
                            {studentData.stuLastname || "Nom"}
                        </Col>
                        <Col span={6} pull={18} className='moduleDescriptionsTitle'>
                            Nom
                        </Col>
                    </Row>
                    <Row>
                        <Col span={18} push={6} className='moduleDescriptionsTitleValue'>
                            {studentData.stuFirstname || "Prenom"}
                        </Col>
                        <Col span={6} pull={18} className='moduleDescriptionsTitle'>
                            Prenom
                        </Col>
                    </Row>
                    <Row>
                        <Col span={18} push={6} className='moduleDescriptionsTitleValue'>
                            {evaluationData.evaLocation || "Salle"}
                        </Col>
                        <Col span={6} pull={18} className='moduleDescriptionsTitle'>
                            Salle
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6} className='moduleDescriptionsTitle'>
                            Note
                        </Col>
                        <Col span={10} className={`moduleDescriptionsTitleValue ${getNoteClassName(roundedNote)}`}>
                            {note} ({roundedNote})
                        </Col>
                        <Col span={2} className='moduleDescriptionsTitle'>
                            Date
                        </Col>
                        <Col span={6} className='moduleDescriptionsTitleValue date'>
                            Mercredi 11.05.2024
                        </Col>
                    </Row>
                    <Divider></Divider>
                    <Collapse defaultActiveKey={Array.isArray(objectivesData) ? objectivesData.map(objective => objective.id_objective.toString()) : []}>
                        {Array.isArray(objectivesData) && objectivesData.map(obj => (
                            <Panel 
                            header={
                                <Row>
                                    <Col span={20}>
                                        {obj.objTitle}
                                    </Col>
                                    <Col span={3} className='textRight'>
                                        Poids
                                    </Col>
                                    <Col span={1} className='textRight'>
                                        {obj.objWeight}
                                    </Col>
                                </Row>
                            } 
                            key={obj.id_objective}
                            >
                                {Array.isArray(obj.criterions) && obj.criterions.map(criteria => 
                                    renderCriteriaView(criteria, obj.id_objective, studentId)
                                )}
                            </Panel>
                        ))}
                    </Collapse>
                </Card>
            </div>
        </div>
    );
}

export default StudentEvaluationResult;
