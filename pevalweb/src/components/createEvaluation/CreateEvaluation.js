import { useState, useEffect } from 'react';
import axios from 'axios';
import { Steps, Form, Button, Card, Input, Select } from 'antd';
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
    const [evaluation, setEvaluation] = useState({
        evaModuleId: '',
        evaLocation: '',
        evaTitle: '',
        evaDescription: '',
    });
    const [objectives, setObjectives] = useState([]);
    const [criterias, setCriterias] = useState([]);
    const [modules, setModules] = useState([]);

    // Passer à l'étape suivante
    const next = () => {
        setCurrent(current + 1);
    };

    // Mettre à jour les données de l'évaluation
    const updateEvaluationData = (field, value) => {
        const updatedEvaluation = { ...evaluation, [field]: value };
        setEvaluation(updatedEvaluation);
    };

    // Revenir à l'étape précédente
    const prev = () => {
        setCurrent(current - 1);
    };

    // Récupérer les modules lors du chargement du composant
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

    // Filtrer les options du sélecteur des modules
    const filterOption = (input, option) => {
        const label = option.label.props.children;
        const labelText = Array.isArray(label) ? label.join('') : label;
        return labelText.toLowerCase().includes(input.toLowerCase());
    };

    // Soumettre le formulaire et créer l'évaluation
    const onFinish = async (values) => {
        try {
            // Créer l'évaluation
            const response = await axios.post(process.env.REACT_APP_API_HOST + "/evaluations", {
                evaTitle: evaluation.evaTitle,
                evaDescription: evaluation.evaDescription,
                evaLocation: evaluation.evaLocation,
                evaModuleId: evaluation.evaModuleId,
            });

            const createdEvaluationId = response.data.id_evaluation;
            const addedObjectiveIds = [];

            // Créer les objectifs
            const addedObjectivesArray = await Promise.all(
                objectives.map(async (objective) => {
                    const response = await axios.post(process.env.REACT_APP_API_HOST + "/objectives", {
                        objTitle: objective.title,
                        objWeight: objective.weight,
                        objComment: objective.comment,
                        objEvaluationId: createdEvaluationId
                    });
                    return response;
                })
            );

            addedObjectivesArray.forEach((objective, index) => {
                addedObjectiveIds.push({ "addedObjective": objective.data.id_objective, "objectiveFormKey": objectives[index].id });
            });

            // Créer les critères
            await Promise.all(
                criterias.map(async (criteria) => {
                    const criteriaIdInDB = addedObjectiveIds.find((e) => e["objectiveFormKey"] === criteria.objectiveId)["addedObjective"];
                    await axios.post(process.env.REACT_APP_API_HOST + "/criterions", {
                        criTitle: criteria.title,
                        criConditionsDescription: criteria.conditionsDescription,
                        criExpectationDescription: criteria.expectationDescription,
                        criWeight: criteria.weight,
                        criLevel0Description: criteria.level0Description,
                        criLevel1Description: criteria.level1Description,
                        criLevel2Description: criteria.level2Description,
                        criLevel3Description: criteria.level3Description,
                        criObjectiveId: criteriaIdInDB
                    });
                })
            );

            navigate("/evaluation/" + createdEvaluationId);
        } catch (error) {
            console.error(error);
        }
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
                                    <Select 
                                        placeholder="Module" 
                                        options={modules} 
                                        onChange={(value) => updateEvaluationData('evaModuleId', value)} 
                                        showSearch
                                        filterOption={filterOption}
                                    />
                                </Form.Item>
                                <Form.Item name="evaLocation" rules={[{ required: true }]}>
                                    <Input 
                                        placeholder="Salle de l'évaluation" 
                                        onChange={(e) => updateEvaluationData('evaLocation', e.target.value)} 
                                    />
                                </Form.Item>
                                <Form.Item name="evaTitle" rules={[{ required: true }]}>
                                    <Input 
                                        placeholder="Titre de l'évaluation" 
                                        onChange={(e) => updateEvaluationData('evaTitle', e.target.value)} 
                                    />
                                </Form.Item>
                                <Form.Item name="evaDescription" rules={[{ required: true }]}>
                                    <TextArea 
                                        rows={4}  
                                        placeholder="Description de l'évaluation" 
                                        onChange={(e) => updateEvaluationData('evaDescription', e.target.value)} 
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
                        <Button style={{ margin: '0 8px' }} onClick={prev}>
                            Précédent
                        </Button>
                    )}
                    {current < 2 && (
                        <Button type="primary" onClick={next}>
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
