import React, { useState } from 'react';
import { Form, Button, Card, Input, Row, Col } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import "./createEvaluation.css";
const { TextArea } = Input;

function ObjectiveForm({objectives,setObjectives}) {

    const addObjective = () => {
        const newObjective = {
            id: objectives.length + 1,
            title: '',
            weight: '',
            comment: ''
        };
        setObjectives([...objectives, newObjective]);
    };

    const updateObjective = (id, field, value) => {
        const newObjectives = objectives.map(obj => {
            if (obj.id === id) {
                return { ...obj, [field]: value };
            }
            return obj;
        });
        setObjectives(newObjectives);
    };

    const removeObjective = id => {
        setObjectives(objectives.filter(obj => obj.id !== id));
    };

    return (
        <div className='objectivesFormContainer'>
            <div className='objectivesCardsContainer'>
                
                {objectives.map((objective, index) => (
                    <Card
                        key={objective.id}
                        title={`Objectif #${index + 1}`}
                        extra={<Button type="link" icon={<DeleteOutlined />} onClick={() => removeObjective(objective.id)} />}
                    >
                        <Row gutter={16}>
                            <Col span={20}>
                                <Form.Item name={`objTitle-${objective.id}`}  rules={[{ required: true }]}>
                                    <Input
                                        placeholder="Titre de l'objectif"
                                        value={objective.title}
                                        onChange={e => updateObjective(objective.id, 'title', e.target.value)}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item name={`objWeight-${objective.id}`}  rules={[{ required: true }]}>
                                    <Input
                                        placeholder="Poids"
                                        value={objective.weight}
                                        onChange={e => updateObjective(objective.id, 'weight', e.target.value)}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item name={`objComment-${objective.id}`}  rules={[{ required: true }]}>
                            <TextArea
                                rows={4}
                                placeholder="Commentaire / description de l'objectif"
                                value={objective.comment}
                                onChange={e => updateObjective(objective.id, 'comment', e.target.value)}
                            />
                        </Form.Item>
                    </Card>
                ))}
            </div>
            <div className='objectivesButtonsContainer'>
                <Button type="dashed" onClick={addObjective}>Ajouter un objectif</Button>
            </div>
        </div>
    );
}

export default ObjectiveForm;
