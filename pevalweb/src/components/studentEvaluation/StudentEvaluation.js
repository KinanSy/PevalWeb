import { useState, useEffect } from 'react';
import { Form, Card, Row, Col, Divider, Input, Select, Collapse, Tooltip, message } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./studentEvaluation.css";


const { Option } = Select;
const { Panel } = Collapse;
const { TextArea } = Input;

function renderCriteria(criteria, objectiveId, onScoreSelectChange, genericRemarks, studentId) {
    const result = criteria.criterionResults.find(r => r.csrStudentId == studentId) || {};
    const criteriaId = criteria.id_criterion;

    const scoreKey = `${objectiveId}-${criteriaId}-${studentId}`;
    const genericRemark = genericRemarks[scoreKey] || '';

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
                            <Form.Item name={`score-${objectiveId}-${criteriaId}-${studentId}`} initialValue={result.csrScore}>
                                <Select key={`score-${scoreKey}`} style={{ width: '100%' }} onChange={(value) => { onScoreSelectChange(value, criteria, objectiveId, studentId) }}>
                                    <Option value="-1" disabled={true}>Points (0-3)</Option>
                                    <Option value="0">0</Option>
                                    <Option value="1">1</Option>
                                    <Option value="2">2</Option>
                                    <Option value="3">3</Option>
                                </Select>
                            </Form.Item>
                        </div>
                    </div>
                </Col>
                <Col span={5}>
                    <div>
                        {genericRemark || 'Remarque generique'}
                    </div>
                </Col>
                <Col span={5}>
                    <Form.Item name={`personalRemark-${objectiveId}-${criteriaId}-${studentId}`} initialValue={result.csrComment}>
                        <TextArea placeholder="Remarque personnelle" rows={5} />
                    </Form.Item>
                </Col>
            </Row>
        </div>
    );
}

function StudentEvaluation() {
    const { evalId, studentId } = useParams();
    const [objectivesData, setObjectivesData] = useState([]);
    const [form] = Form.useForm();
    const [genericRemarks, setGenericRemarks] = useState({});
    const [note, setNote] = useState(1);
    const [roundedNote, setRoundedNote] = useState(1);
    const [studentData, setStudentData] = useState({});
    const [evaluationData, setEvaluationData] = useState({});

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_HOST}/evaluations/${evalId}`)
        .then(res => {
            setObjectivesData(res.data["objectives"] || []);
            calculateNoteFromData(res.data["objectives"]);
            setEvaluationData(res.data);
        }).catch(err => {
            console.error('Error fetching evaluation data:', err);
            setObjectivesData([]);
        });
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [evalId]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_HOST}/students/${studentId}`)
        .then(res => {
            setStudentData(res.data);
        }).catch(err => {
            console.error('Error fetching student data:', err);
        });
    }, [studentId]);
    
    const calculateNote = (values) => {
        let totalScore = 0;
        let totalWeight = 0;
    
        objectivesData.forEach(objective => {
            const objectiveWeight = parseFloat(objective.objWeight);
            if (Array.isArray(objective.criterions)) {
                objective.criterions.forEach(criteria => {
                    const criteriaWeight = parseFloat(criteria.criWeight);
                    const scoreKey = `score-${objective.id_objective}-${criteria.id_criterion}-${studentId}`;
                    const score = values[scoreKey] || 0;
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
        if (note >= 1 && note < 3.5) {
            return 'noteMediocre';
        } else if (note >= 3.5 && note < 5) {
            return 'noteAverage';
        } else if (note >= 5 && note <= 6) {
            return 'noteGood';
        }
        return '';
    };
    
    
    function onSaveClick() {
        form.submit();
    }

    function handleFinish(values) {
        calculateNote(values);

        const updates = [];
        for (const key in values) {
            if (key.startsWith('score-')) {
                // eslint-disable-next-line no-unused-vars
                const [_, objectiveId, criteriaId, studentId] = key.split('-');
                const score = values[key];
                const commentKey = `personalRemark-${objectiveId}-${criteriaId}-${studentId}`;
                const comment = values[commentKey] || '';

                const objective = objectivesData.find(obj => obj.id_objective.toString() === objectiveId);
                const criterion = objective.criterions.find(cri => cri.id_criterion.toString() === criteriaId);
                const result = criterion.criterionResults.find(res => res.csrStudentId.toString() === studentId);

                updates.push({
                    id_criterionStudentResult: result.id_criterionStudentResult,
                    csrScore: score,
                    csrComment: comment
                });
            }
        }

        Promise.all(updates.map(update =>
            axios.put(`${process.env.REACT_APP_API_HOST}/results/${update.id_criterionStudentResult}`, update)
        )).then(responses => {
            message.success('Les données ont été mises à jour');
        }).catch(error => {
            message.error('Les données n\'ont pas été mises à jour');
        });
    }

    function onScoreSelectChange(value, criteria, objectiveId, studentId) {
        const scoreKey = `${objectiveId}-${criteria.id_criterion}-${studentId}`;
        const remark = criteria[`criLevel${value}Description`];
    
        setGenericRemarks(prevRemarks => ({
            ...prevRemarks,
            [scoreKey]: remark
        }));

        form.validateFields().then(values => {
            calculateNote(values);
        });
    }

    return (
        <div className="homeContainer">
            <div className="homeToolbar">
                <div className="toolbarItemsContainer">
                    <Card className="createEvaluationButton" hoverable styles={{ body: { padding: "0.5rem" } }}>
                        <Tooltip title="Sauvegarder">
                            <SaveOutlined className="icon" onClick={(e) => { onSaveClick() }} />
                        </Tooltip>
                    </Card>
                </div>
            </div>
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
                    <Form form={form} onFinish={handleFinish} initialValues={form.getFieldsValue()}>
                        <Collapse activeKey={Array.isArray(objectivesData) ? objectivesData.map(objective => objective.id_objective.toString()) : []}>
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
                                        renderCriteria(criteria, obj.id_objective, onScoreSelectChange, genericRemarks, studentId)
                                    )}
                                </Panel>
                            ))}
                        </Collapse>
                    </Form>
                </Card>
            </div>
        </div>
    );
}

export default StudentEvaluation;
