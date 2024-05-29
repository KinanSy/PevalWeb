import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Steps, Form, Button, Card, Input, Select,Row,Col} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import ObjectiveForm from './ObjectiveForm';
import CriteriaForm from './CriteriaForm'; 
import "./createEvaluation.css";
import { useNavigate } from "react-router-dom";


const { Step } = Steps;
const { TextArea } = Input;
const CreateEvaluation = () => {
    const navigate = useNavigate();

    const [current, setCurrent] = useState(0);
    const [form] = Form.useForm();
    const [evaluation,setEvaluation] = useState({
        moduleId: '',
        evaLocation: '',
        evaTitle: '',
        evaDescription: '',
    });
    const [objectives,setObjectives] = useState([]);
    const [criterias,setCriterias] = useState([]);
    const [modules, setModules] = useState([]);
    const next = () => {
        setCurrent(current + 1);
        console.log(evaluation)
        console.log(objectives)
        console.log(criterias)
    };

    const updateEvaluationData = (field, value) => {
        const updatedEvaluation = { ...evaluation, [field]: value };
        setEvaluation(updatedEvaluation);
    };
    const prev = () => {
        setCurrent(current - 1);
    };

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_HOST + "/modules/")
        .then(res => {
            const modulesResponse = res.data;
            const modulesOptions = modulesResponse.map(m => ({
                value: m.id_module,
                label: <span>{m.modNumber} - {m.modTitle}</span>
            }));
            setModules(modulesOptions);
        })
    }, []);

    const onFinish = async (values) => {
        // Create evaluation
        const response = 
        await axios.post(process.env.REACT_APP_API_HOST + "/evaluations", {
            evaTitle: evaluation.evaTitle,
            evaDescription: evaluation.evaDescription,
            evaLocation: evaluation.evaLocation,
            evaModuleId: evaluation.moduleid,
        })
        .catch(function (error){
            console.log(error)
        })
        const createdEvaluationId = response.data.id_evaluation
        
        const objectivesIds = [];
        const addedObjectiveIds = [];

        // Create objectives
        await Promise.all(
            
            objectives.map(async (objective) => {
                console.log("e :" + createdEvaluationId)
                const response = 
                await axios.post(process.env.REACT_APP_API_HOST + "/objectives", {
                    objTitle:objective.title,
                    objWeight:objective.weight,
                    objComment:objective.comment,
                    objEvaluationId:createdEvaluationId
                })
                .catch(error => {
                    console.log(error)
                })
                return response;
            })    
        ).then(async data => {

            const addedObjectivesArray = data;
            addedObjectivesArray.map((objective,index) => {
                addedObjectiveIds.push({"addedObjective":objective.data.id_objective,"objectiveFormKey": objectives[index].id})
            })
            await Promise.all(
                criterias.map(async (criteria) => {
                    const criteriaIdInDB = addedObjectiveIds.find((e) => e["objectiveFormKey"] === criteria.objectiveId)["addedObjective"]
                    const response = 
                    await axios.post(process.env.REACT_APP_API_HOST + "/criterions", {
                        criTitle : criteria.title,
                        criConditionsDescription : criteria.conditionsDescription,
                        criExpectationDescription : criteria.expectationDescription,
                        criWeight : criteria.weight,
                        criLevel0Description : criteria.level0Description,
                        criLevel1Description : criteria.level1Description,
                        criLevel2Description : criteria.level2Description,
                        criLevel3Description : criteria.level3Description,
                        criObjectiveId : criteriaIdInDB
                    })
                    .then(data => {
                        console.log(data.data)
                    })
                    .catch(error => {
                        console.log(error)
                    })
                })
            ).then(() => {
                navigate("/Evaluation/" + createdEvaluationId)
            })
        })         
    };
    

    return (
    <Card title="Créer une évaluation" className='createEvaluationFormContainer'>
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
                            <Form.Item name="moduleid" rules={[{ required: true }]}>
                                <Select placeholder="Module" options={modules} onChange={(value) => updateEvaluationData('moduleId', value)} 
                                />
                            </Form.Item>
                            <Form.Item name="evaLocation" rules={[{ required: true }]}>
                                <Input placeholder="Salle de l'évaluation" onChange={(e) => updateEvaluationData('evaLocation', e.target.value)} 
                                />
                            </Form.Item>
                            <Form.Item name="evaTitle" rules={[{ required: true }]}>
                                <Input placeholder="Titre de l'évaluation" onChange={(e) => updateEvaluationData('evaTitle', e.target.value)} 
                                />
                            </Form.Item>
                            <Form.Item name="evaDescription" rules={[{ required: true }]}>
                                <TextArea rows={4}  placeholder="Description de l'évaluation" onChange={(e) => updateEvaluationData('evaDescription', e.target.value)} 
                                />
                            </Form.Item>

                        </div>
                    )}
                    {current === 1 && (
                        
                        <ObjectiveForm objectives={objectives} setObjectives={setObjectives}></ObjectiveForm>
                    )}
                    {current === 2 && (
                        <CriteriaForm objectives={objectives} criterias={criterias} setCriterias={setCriterias}></CriteriaForm>
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
                    Créer l'évaluation
                </Button>
                )}
            </div>
        </Form>
    </Card>
    );
};

export default CreateEvaluation;
