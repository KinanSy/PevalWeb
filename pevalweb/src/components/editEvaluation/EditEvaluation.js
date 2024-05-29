import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Steps, Form, Button, Card, Input, Select, Row, Col } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import ObjectiveForm from './ObjectiveForm';
import CriteriaForm from './CriteriaForm';
import "./editEvaluation.css";
import { useNavigate, useParams } from "react-router-dom";

const { Step } = Steps;
const { TextArea } = Input;

const EditEvaluation = () => {
    const { id } = useParams(); // Get evaluation ID from route params
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    const [form] = Form.useForm();
    const [evaluation, setEvaluation] = useState({
        moduleId: '',
        evaLocation: '',
        evaTitle: '',
        evaDescription: '',
    });
    const [objectives, setObjectives] = useState([]);
    const [criterias, setCriterias] = useState([]);
    const [modules, setModules] = useState([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_HOST + "/modules/")
            .then(res => {
                const modulesResponse = res.data;
                const modulesOptions = modulesResponse.map(m => ({
                    value: m.id_module,
                    label: <span>{m.modNumber} - {m.modTitle}</span>
                }));
                setModules(modulesOptions);
            });

        axios.get(process.env.REACT_APP_API_HOST + "/evaluations/" + id)
            .then(res => {
                const evalData = res.data;
                setEvaluation({
                    moduleId: evalData.evaModuleId,
                    evaLocation: evalData.evaLocation,
                    evaTitle: evalData.evaTitle,
                    evaDescription: evalData.evaDescription,
                });
                setObjectives(evalData.objectives.map((obj, index) => ({
                    id: obj.id_objective,
                    title: obj.objTitle,
                    weight: obj.objWeight,
                    comment: obj.objComment
                })));
                const criteriaList = [];
                evalData.objectives.forEach((objective, objIndex) => {
                    objective.criterions.forEach((criteria, criIndex) => {
                        criteriaList.push({
                            id: criteria.id_criterion,
                            objectiveId: objective.id_objective,
                            title: criteria.criTitle,
                            conditionsDescription: criteria.criConditionsDescription,
                            expectationDescription: criteria.criExpectationDescription,
                            level0Description: criteria.criLevel0Description,
                            level1Description: criteria.criLevel1Description,
                            level2Description: criteria.criLevel2Description,
                            level3Description: criteria.criLevel3Description,
                            weight: criteria.criWeight,
                            comment: criteria.criComment
                        });
                    });
                });
                setCriterias(criteriaList);

                // Set form values
                form.setFieldsValue({
                    moduleId: evalData.evaModuleId,
                    evaLocation: evalData.evaLocation,
                    evaTitle: evalData.evaTitle,
                    evaDescription: evalData.evaDescription,
                });
            });
    }, [id]);

    const next = () => {
        setCurrent(current + 1);
        console.log(evaluation);
        console.log(objectives);
        console.log(criterias);
    };

    const updateEvaluationData = (field, value) => {
        const updatedEvaluation = { ...evaluation, [field]: value };
        setEvaluation(updatedEvaluation);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const onFinish = async (values) => {
        // Update evaluation
        await axios.put(process.env.REACT_APP_API_HOST + "/evaluations/" + id, {
            evaTitle: evaluation.evaTitle,
            evaDescription: evaluation.evaDescription,
            evaLocation: evaluation.evaLocation,
            evaModuleId: evaluation.moduleId,
        }).catch(error => {
            console.log(error);
        });

        // Update objectives and criteria
        await Promise.all(
            objectives.map(async (objective, objIndex) => {
                await axios.put(process.env.REACT_APP_API_HOST + "/objectives/" + objective.id, {
                    objTitle: objective.title,
                    objWeight: objective.weight,
                    objComment: objective.comment,
                    objEvaluationId: id
                }).catch(error => {
                    console.log(error);
                });

                const relatedCriterias = criterias.filter(cri => cri.objectiveId === objective.id);
                await Promise.all(
                    relatedCriterias.map(async (criteria, criIndex) => {
                        await axios.put(process.env.REACT_APP_API_HOST + "/criterions/" + criteria.id, {
                            criTitle: criteria.title,
                            criConditionsDescription: criteria.conditionsDescription,
                            criExpectationDescription: criteria.expectationDescription,
                            criWeight: criteria.weight,
                            criLevel0Description: criteria.level0Description,
                            criLevel1Description: criteria.level1Description,
                            criLevel2Description: criteria.level2Description,
                            criLevel3Description: criteria.level3Description,
                            criObjectiveId: objective.id
                        }).catch(error => {
                            console.log(error);
                        });
                    })
                );
            })
        ).then(() => {
            navigate("/Evaluation/" + id);
        });
    };

    return (
        <Card title="Modifier une évaluation" className='createEvaluationFormContainer'>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Steps current={current}>
                    <Step title="Détails de l'Évaluation" />
                    <Step title="Objectifs" />
                    <Step title="Critères" />
                </Steps>

                <div className="stepsContentContainer">
                    <div className="stepsContent">
                        {current === 0 && (
                            <div>
                                <Form.Item name="moduleId" initialValue={evaluation.moduleId} rules={[{ required: true }]}>
                                    <Select placeholder="Module" options={modules} onChange={(value) => updateEvaluationData('moduleId', value)} />
                                </Form.Item>
                                <Form.Item name="evaLocation" initialValue={evaluation.evaLocation} rules={[{ required: true }]}>
                                    <Input placeholder="Salle de l'évaluation" onChange={(e) => updateEvaluationData('evaLocation', e.target.value)} />
                                </Form.Item>
                                <Form.Item name="evaTitle" initialValue={evaluation.evaTitle} rules={[{ required: true }]}>
                                    <Input placeholder="Titre de l'évaluation" onChange={(e) => updateEvaluationData('evaTitle', e.target.value)} />
                                </Form.Item>
                                <Form.Item name="evaDescription" initialValue={evaluation.evaDescription} rules={[{ required: true }]}>
                                    <TextArea rows={4} placeholder="Description de l'évaluation" onChange={(e) => updateEvaluationData('evaDescription', e.target.value)} />
                                </Form.Item>
                            </div>
                        )}
                        {current === 1 && (
                            <ObjectiveForm objectives={objectives} setObjectives={setObjectives} form={form}></ObjectiveForm>
                        )}
                        {current === 2 && (
                            <CriteriaForm objectives={objectives} criterias={criterias} setCriterias={setCriterias} form={form}></CriteriaForm>
                        )}
                    </div>
                </div>

                <div className="stepsActions">
                    {current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                            Précédent
                        </Button>
                    )}
                    {current < 2 && (
                        <Button type="primary" onClick={() => next()}>
                            Suivant
                        </Button>
                    )}
                    {current === 2 && (
                        <Button type="primary" onClick={form.submit}>
                            Modifier l'évaluation
                        </Button>
                    )}
                </div>
            </Form>
        </Card>
    );
};

export default EditEvaluation;
