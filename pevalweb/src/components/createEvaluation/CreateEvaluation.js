import React, { useState } from 'react';
import { Steps, Form, Button, Card, Input, Select,Row,Col} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import ObjectiveForm from './ObjectiveForm';
import CriteriaForm from './CriteriaForm'; 
import "./createEvaluation.css";

const { Step } = Steps;
const { TextArea } = Input;
const CreateEvaluation = () => {
    const [current, setCurrent] = useState(0);
    const [form] = Form.useForm();
    const [objectives,setObjectives] = useState([]);
    const [criterias,setCriterias] = useState([]);

    const next = () => {
        setCurrent(current + 1);
        console.log(objectives)
        console.log(criterias)

    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const onFinish = (values) => {
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
                            <Form.Item  name="module" rules={[{ required: true}]}>
                                <Select placeholder="Module" options={[{ value: '1', label: <span>114 - SQL</span> }]} />
                            </Form.Item>
                            <Form.Item  name="evaLocation" rules={[{ required: true}]}>
                                <Input placeholder="Salle de l'évaluation" />
                            </Form.Item>
                            <Form.Item  name="evaTitle" rules={[{ required: true}]}>
                                <Input placeholder="Titre de l'évaluation" />
                            </Form.Item>
                            <Form.Item  name="evaDescription" rules={[{ required: true}]}>
                                <TextArea rows={4} placeholder="Description de l'évaluation" />
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
