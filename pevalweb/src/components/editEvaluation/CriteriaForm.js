import { useEffect } from 'react';
import { Form, Button, Card, Input, Row, Col } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import "./editEvaluation.css";

function CriteriaForm({ objectives, criterias, setCriterias, form }) {
    useEffect(() => {
        // Définir les valeurs initiales pour les critères
        criterias.forEach(criteria => {
            form.setFieldsValue({
                [`criTitle-${criteria.id}`]: criteria.title,
                [`criConditionsDescription-${criteria.id}`]: criteria.conditionsDescription,
                [`criExpectationDescription-${criteria.id}`]: criteria.expectationDescription,
                [`criLevel0Description-${criteria.id}`]: criteria.level0Description,
                [`criLevel1Description-${criteria.id}`]: criteria.level1Description,
                [`criLevel2Description-${criteria.id}`]: criteria.level2Description,
                [`criLevel3Description-${criteria.id}`]: criteria.level3Description,
                [`criWeight-${criteria.id}`]: criteria.weight,
            });
        });
    }, [criterias, form]);

    // Ajouter un critère
    const addCriterion = (objectiveId) => {
        const newCriterion = {
            id: criterias.length + 1,
            objectiveId: objectiveId,
            title: '',
            conditionsDescription: '',
            expectationDescription: '',
            level0Description: '',
            level1Description: '',
            level2Description: '',
            level3Description: '',
            weight: '',
            comment: ''
        };
        setCriterias([...criterias, newCriterion]);
    };

    // Mettre à jour les critères
    const updateCriterions = (id, field, value) => {
        const newCriterions = criterias.map(obj => {
            if (obj.id === id) {
                return { ...obj, [field]: value };
            }
            return obj;
        });
        setCriterias(newCriterions);
    };

    // Supprimer un critère
    const removeCriterion = id => {
        setCriterias(criterias.filter(cri => cri.id !== id));
    };

    // Obtenir les critères par objectif
    const getCriterionsByObjective = objId => {
        return criterias.filter(cri => cri.objectiveId === objId);
    };

    return (
        <div className='objectivesFormContainer'>
            <div className='objectivesCardsContainer'>
                {objectives.map((objective) => (
                    <Card
                        key={objective.id}
                        title={objective.title}
                    >
                        <div className='criteriasButtonsContainer'>
                            <Button type="dashed" onClick={() => addCriterion(objective.id)}>Ajouter un critère</Button>
                        </div>
                        <div className='criteriasCardsContainer'>
                            {getCriterionsByObjective(objective.id).map((criterion) => (
                                <Card key={criterion.id}>
                                    <Row gutter={16}>
                                        <Col span={18}>
                                            <Form.Item 
                                                name={`criTitle-${criterion.id}`} 
                                                initialValue={criterion.title} 
                                                rules={[{ required: true, message: 'Veuillez entrer le titre du critère' }]}
                                            >
                                                <Input
                                                    placeholder="Titre du critère"
                                                    value={criterion.title}
                                                    onChange={e => updateCriterions(criterion.id, 'title', e.target.value)}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={5}>
                                            <Form.Item 
                                                name={`criWeight-${criterion.id}`} 
                                                initialValue={criterion.weight} 
                                                rules={[{ required: true, message: 'Veuillez entrer le poids du critère' }]}
                                            >
                                                <Input
                                                    placeholder="Poids"
                                                    value={criterion.weight}
                                                    onChange={e => updateCriterions(criterion.id, 'weight', e.target.value)}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={1}>
                                            <Button type="link" icon={<DeleteOutlined />} onClick={() => removeCriterion(criterion.id)} />
                                        </Col>
                                    </Row>
                                    <Form.Item 
                                        name={`criConditionsDescription-${criterion.id}`} 
                                        initialValue={criterion.conditionsDescription} 
                                        rules={[{ required: true, message: 'Veuillez entrer les conditions pour démontrer les comportements' }]}
                                    >
                                        <Input
                                            placeholder="Conditions pour démontrer les comportements"
                                            value={criterion.conditionsDescription}
                                            onChange={e => updateCriterions(criterion.id, 'conditionsDescription', e.target.value)}
                                        />
                                    </Form.Item>
                                    <Form.Item 
                                        name={`criExpectationDescription-${criterion.id}`} 
                                        initialValue={criterion.expectationDescription} 
                                        rules={[{ required: true, message: 'Veuillez entrer les résultats attendus' }]}
                                    >
                                        <Input
                                            placeholder="Résultats attendus"
                                            value={criterion.expectationDescription}
                                            onChange={e => updateCriterions(criterion.id, 'expectationDescription', e.target.value)}
                                        />
                                    </Form.Item>
                                    <Form.Item 
                                        name={`criLevel3Description-${criterion.id}`} 
                                        initialValue={criterion.level3Description} 
                                        rules={[{ required: true, message: 'Veuillez entrer la description de niveau 3' }]}
                                    >
                                        <Input
                                            placeholder="Description de 3pts (si les résultats attendus sont très bien respectés)"
                                            value={criterion.level3Description}
                                            onChange={e => updateCriterions(criterion.id, 'level3Description', e.target.value)}
                                        />
                                    </Form.Item>
                                    <Form.Item 
                                        name={`criLevel2Description-${criterion.id}`} 
                                        initialValue={criterion.level2Description} 
                                        rules={[{ required: true, message: 'Veuillez entrer la description de niveau 2' }]}
                                    >
                                        <Input
                                            placeholder="Description de 2pts (si les résultats attendus sont à peu près respectés)"
                                            value={criterion.level2Description}
                                            onChange={e => updateCriterions(criterion.id, 'level2Description', e.target.value)}
                                        />
                                    </Form.Item>
                                    <Form.Item 
                                        name={`criLevel1Description-${criterion.id}`} 
                                        initialValue={criterion.level1Description} 
                                        rules={[{ required: true, message: 'Veuillez entrer la description de niveau 1' }]}
                                    >
                                        <Input
                                            placeholder="Description de 1pts (si les résultats attendus sont insuffisamment respectés)"
                                            value={criterion.level1Description}
                                            onChange={e => updateCriterions(criterion.id, 'level1Description', e.target.value)}
                                        />
                                    </Form.Item>
                                    <Form.Item 
                                        name={`criLevel0Description-${criterion.id}`} 
                                        initialValue={criterion.level0Description} 
                                        rules={[{ required: true, message: 'Veuillez entrer la description de niveau 0' }]}
                                    >
                                        <Input
                                            placeholder="Description de 0pts (si les résultats attendus ne sont pas respectés)"
                                            value={criterion.level0Description}
                                            onChange={e => updateCriterions(criterion.id, 'level0Description', e.target.value)}
                                        />
                                    </Form.Item>
                                </Card>
                            ))}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default CriteriaForm;
