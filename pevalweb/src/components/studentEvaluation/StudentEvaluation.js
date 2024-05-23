import React, { useState } from 'react';
import { Form, Card, Row, Col, Divider, Input, Select, Collapse, Tooltip } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import "./studentEvaluation.css";

const { Option } = Select;
const { Panel } = Collapse;
const { TextArea } = Input;

// Example data
const sourceData = [
    {
        id: '1',
        objTitle: "Objective 1",
        criterias: [
            {
                id: '1',
                criTitle: "criteria 1",
                criConditionsDescription: "criConditionsDescription 1",
                criExpectationDescription: "criExpectationDescription 1",
                criWeight: "0.5",
                criLevel0Description: "Level 0",
                criLevel1Description: "Level 1",
                criLevel2Description: "Level 2",
                criLevel3Description: "Level 3",
            },
            {
                id: '2',
                criTitle: "criteria 2",
                criConditionsDescription: "criConditionsDescription 2",
                criExpectationDescription: "criExpectationDescription 2",
                criWeight: "1",
                criLevel0Description: "Level 0",
                criLevel1Description: "Level 1",
                criLevel2Description: "Level 2",
                criLevel3Description: "Level 3",
            },
        ]
    },
    {
        id: '2',
        objTitle: "Objective 2",
        criterias: [
            {
                id: '1',
                criTitle: "criteria 1",
                criConditionsDescription: "criConditionsDescription 1",
                criExpectationDescription: "criExpectationDescription 1",
                criWeight: "0.5",
                criLevel0Description: "Level 0",
                criLevel1Description: "Level 1",
                criLevel2Description: "Level 2",
                criLevel3Description: "Level 3",
            },
        ]
    }
];

function renderCriteria(criteria, objectiveId, onScoreSelectChange, genericRemarks) {
    const scoreKey = `${objectiveId}-${criteria.id}`;
    const genericRemark = genericRemarks[scoreKey] || '';

    return (
        <div key={criteria.id} style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>
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
                            <Form.Item name={`score-${objectiveId}-${criteria.id}`}>
                                <Select defaultValue="-1" style={{ width: '100%' }} onChange={(e) => { onScoreSelectChange(e, criteria, objectiveId) }}>
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
                    <Form.Item name={`personalRemark-${objectiveId}-${criteria.id}`}>
                        <TextArea placeholder="Remarque personnelle" rows={5} />
                    </Form.Item>
                </Col>
            </Row>
        </div>
    );
}

function StudentEvaluation() {
    const { evalId, studentId } = useParams();
    const [form] = Form.useForm();
    const [genericRemarks, setGenericRemarks] = useState({});

    function onSaveClick() {
        form.submit();
    }

    function handleFinish(values) {
        console.log(values);
    }

    function onScoreSelectChange(value, criteria, objectiveId) {
        const scoreKey = `${objectiveId}-${criteria.id}`;
        const remark = criteria[`criLevel${value}Description`];
        setGenericRemarks(prevRemarks => ({
            ...prevRemarks,
            [scoreKey]: remark
        }));
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
                            Jano
                        </Col>
                        <Col span={6} pull={18} className='moduleDescriptionsTitle'>
                            Nom
                        </Col>
                    </Row>
                    <Row>
                        <Col span={18} push={6} className='moduleDescriptionsTitleValue'>
                            Kinan
                        </Col>
                        <Col span={6} pull={18} className='moduleDescriptionsTitle'>
                            Prenom
                        </Col>
                    </Row>
                    <Row>
                        <Col span={18} push={6} className='moduleDescriptionsTitleValue'>
                            S304
                        </Col>
                        <Col span={6} pull={18} className='moduleDescriptionsTitle'>
                            Salle
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6} className='moduleDescriptionsTitle'>
                            Note
                        </Col>
                        <Col span={10} className='moduleDescriptionsTitleValue'>
                            4.5
                        </Col>
                        <Col span={2} className='moduleDescriptionsTitle'>
                            Date
                        </Col>
                        <Col span={6} className='moduleDescriptionsTitleValue date'>
                            Mercredi 11.05.2024
                        </Col>
                    </Row>
                    <Divider></Divider>
                    <Form form={form} onFinish={handleFinish}>
                        <Collapse defaultActiveKey={['1', '2']}>
                            {sourceData.map(obj => (
                                <Panel header={obj.objTitle} key={obj.id}>
                                    {obj.criterias.map(criteria => renderCriteria(criteria, obj.id, onScoreSelectChange, genericRemarks))}
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
