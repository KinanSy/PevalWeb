import React, { useEffect } from 'react';
import { Form, Button, Card, Input, Row, Col } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import "./editEvaluation.css";

const { TextArea } = Input;

function ObjectiveForm({ objectives, setObjectives, form }) {
    // Charger les valeurs initiales dans le formulaire lors du montage du composant
    useEffect(() => {
        objectives.forEach(objective => {
            form.setFieldsValue({
                [`objTitle-${objective.id}`]: objective.title,
                [`objWeight-${objective.id}`]: objective.weight,
                [`objComment-${objective.id}`]: objective.comment,
            });
        });
    }, [objectives, form]);

    // Ajouter un objectif
    const addObjective = () => {
        const newObjective = {
            id: objectives.length + 1,
            title: '',
            weight: '',
            comment: ''
        };
        setObjectives([...objectives, newObjective]);
    };

    // Mettre à jour un objectif
    const updateObjective = (id, field, value) => {
        const updatedObjectives = objectives.map(obj => {
            if (obj.id === id) {
                return { ...obj, [field]: value };
            }
            return obj;
        });
        setObjectives(updatedObjectives);
    };

    // Supprimer un objectif
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
                                <Form.Item 
                                    name={`objTitle-${objective.id}`} 
                                    initialValue={objective.title} 
                                    rules={[{ required: true, message: 'Veuillez entrer le titre de l\'objectif' }]}
                                >
                                    <Input
                                        placeholder="Titre de l'objectif"
                                        value={objective.title}
                                        onChange={e => updateObjective(objective.id, 'title', e.target.value)}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item 
                                    name={`objWeight-${objective.id}`} 
                                    initialValue={objective.weight} 
                                    rules={[{ required: true, message: 'Veuillez entrer le poids de l\'objectif' }]}
                                >
                                    <Input
                                        placeholder="Poids"
                                        value={objective.weight}
                                        onChange={e => updateObjective(objective.id, 'weight', e.target.value)}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item 
                            name={`objComment-${objective.id}`} 
                            initialValue={objective.comment} 
                            rules={[{ required: true, message: 'Veuillez entrer un commentaire pour l\'objectif' }]}
                        >
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
