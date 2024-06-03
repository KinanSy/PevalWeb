import { Form, Button, Card, Input, Row, Col } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import "./createEvaluation.css";

function CriteriaForm({ objectives, criterias, setCriterias }) {
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
        const newCriterions = criterias.map(criterion => {
            if (criterion.id === id) {
                return { ...criterion, [field]: value };
            }
            return criterion;
        });
        setCriterias(newCriterions);
    };

    // Supprimer un critère
    const removeCriterion = id => {
        setCriterias(criterias.filter(criterion => criterion.id !== id));
    };

    // Obtenir les critères par objectif
    const getCriterionsByObjective = objectiveId => {
        return criterias.filter(criterion => criterion.objectiveId === objectiveId);
    };

    return (
        <div className='objectivesFormContainer'>
            <div className='objectivesCardsContainer'>
                {objectives.map((objective) => (
                    <Card key={objective.id} title={objective.title}>
                        <div className='criteriasButtonsContainer'>
                            <Button type="dashed" onClick={() => addCriterion(objective.id)}>Ajouter un critère</Button>
                        </div>
                        <div className='criteriasCardsContainer'>
                            {getCriterionsByObjective(objective.id).map((criterion) => (
                                <Card key={criterion.id}>
                                    <Row gutter={16}>
                                        <Col span={18}>
                                            <Form.Item name={`criTitle-${criterion.id}`} rules={[{ required: true }]}>
                                                <Input
                                                    placeholder="Titre du critère"
                                                    value={criterion.title}
                                                    onChange={e => updateCriterions(criterion.id, 'title', e.target.value)}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={5}>
                                            <Form.Item name={`criWeight-${criterion.id}`} rules={[{ required: true }]}>
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
                                    <Form.Item name={`criConditions-${criterion.id}`} rules={[{ required: true }]}>
                                        <Input
                                            placeholder="Conditions pour démontrer les comportements"
                                            value={criterion.conditionsDescription}
                                            onChange={e => updateCriterions(criterion.id, 'conditionsDescription', e.target.value)}
                                        />
                                    </Form.Item>
                                    <Form.Item name={`criExpectations-${criterion.id}`} rules={[{ required: true }]}>
                                        <Input
                                            placeholder="Résultats attendus"
                                            value={criterion.expectationDescription}
                                            onChange={e => updateCriterions(criterion.id, 'expectationDescription', e.target.value)}
                                        />
                                    </Form.Item>
                                    <Form.Item name={`criLevel3Description-${criterion.id}`} rules={[{ required: true }]}>
                                        <Input
                                            placeholder="Description de 3pts (si les résultats attendus sont plutôt très bien respectés)"
                                            value={criterion.level3Description}
                                            onChange={e => updateCriterions(criterion.id, 'level3Description', e.target.value)}
                                        />
                                    </Form.Item>
                                    <Form.Item name={`criLevel2Description-${criterion.id}`} rules={[{ required: true }]}>
                                        <Input
                                            placeholder="Description de 2pts (si les résultats attendus sont à peu près respectés)"
                                            value={criterion.level2Description}
                                            onChange={e => updateCriterions(criterion.id, 'level2Description', e.target.value)}
                                        />
                                    </Form.Item>
                                    <Form.Item name={`criLevel1Description-${criterion.id}`} rules={[{ required: true }]}>
                                        <Input
                                            placeholder="Description de 1pts (si les résultats attendus sont insuffisamment respectés)"
                                            value={criterion.level1Description}
                                            onChange={e => updateCriterions(criterion.id, 'level1Description', e.target.value)}
                                        />
                                    </Form.Item>
                                    <Form.Item name={`criLevel0Description-${criterion.id}`} rules={[{ required: true }]}>
                                        <Input
                                            placeholder="Description de 0pts (si les résultats attendus ne sont pas du tout respectés)"
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
