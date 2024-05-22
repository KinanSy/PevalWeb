import React from 'react';
import { Form, Card, Row, Col, Divider,Flex,Input, Select,Collapse } from 'antd';
import { DeleteOutlined,SendOutlined} from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import "./studentEvaluation.css"
const { Option } = Select;
const { Panel } = Collapse;
const { TextArea } = Input;
// Example data
const sourceData = [
    {
        key: '1',
        objTitle: "Objective 1",
        criterias: [
            {
                key: '1',
                criTitle: "criteria 1",
                criConditionsDescription: "criConditionsDescription 1",
                criExpectationDescription: "criExpectationDescriptioncriExpectationDescriptioncriExpectationDescriptioncriExpectationDescriptioncriExpectationDescriptioncriExpectationDescriptioncriExpectationDescriptioncriExpectationDescription 1",
                criWeight: "0.5",
                criLevel0Description: "Level 0",
                criLevel1Description: "Level 1",
                criLevel2Description: "Level 2",
                criLevel3Description: "Level 3",
            },
            {
                key: '2',
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
        key: '2',
        objTitle: "Objective 2",
        criterias: [
            {
                key: '1',
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


const renderCriteria = (criteria) => (
    <div key={criteria.key} style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>
            <Row gutter={16} style={{ overflowWrap: 'break-word'}}>
                <Col span={11}>
                    <div><strong>Critère</strong></div>
                    <div>{criteria.criTitle}</div>
                    <div><strong>Conditions pour démontrer les comportements</strong></div>
                    <div>{criteria.criConditionsDescription}</div>
                    <div><strong>Résultats attendus</strong></div>
                    <div>{criteria.criExpectationDescription}</div>
                </Col>
                <Col span={3}>
                    <Flex align="center" style={{width:"100%", height:"100%"}} vertical>
                        <Flex align="center" style={{width:"100%", height:"20%"}}>
                            <div style={{width:"50%"}}><strong>Poids</strong></div>
                            <div style={{width:"50%",textAlign:"center"}}>{criteria.criWeight}</div>
                        </Flex>
                        <Flex justify="center" style={{width:"100%", height:"80%"}} vertical>
                            <Form.Item>
                                <Select defaultValue="-1" style={{ width: '100%' }}>
                                    <Option value="-1" disabled={true}>Points (0-3)</Option>
                                    <Option value="0">0</Option>
                                    <Option value="1">1</Option>
                                    <Option value="2">2</Option>
                                    <Option value="3">3</Option>
                                </Select>
                            </Form.Item>
                        </Flex>
                    </Flex>
                </Col>
                <Col span={5}>
                    <div>
                        Remarque generique
                    </div>
                </Col>
                <Col span={5}>
                    <Form.Item style={{ marginBottom: 0 }}>
                        <TextArea placeholder="Remarque personnelle"  rows={5} />
                    </Form.Item>
                </Col>
            </Row>
        </div>
);

function StudentEvaluation (){
    const { evalId,studentId } = useParams();
    return (
        <div className="homeContainer">
        <div className="homeToolbar">
            <div className="toolbarItemsContainer">
                <Card className="createEvaluationButton" hoverable="true" styles={{ body:{padding:"0.5rem"} }}>
                    <SendOutlined className="icon" />
                </Card>
                <Card className="createEvaluationButton" hoverable="true" styles={{ body:{padding:"0.5rem"} }}>
                    <DeleteOutlined className="icon" />
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
                    <Col span={10}  className='moduleDescriptionsTitleValue'>
                        4.5
                    </Col>
                    <Col span={2} className='moduleDescriptionsTitle'>
                        Date
                    </Col>
                    <Col span={6}  className='moduleDescriptionsTitleValue date'>
                        Mercredi 11.05.2024
                    </Col>
                </Row>
                <Divider></Divider>
                <Collapse defaultActiveKey={['1','2']}>
                    {sourceData.map(obj => (
                        <Panel header={obj.objTitle} key={obj.key}>
                            {obj.criterias.map(criteria => renderCriteria(criteria))}
                        </Panel>
                    ))}
                </Collapse>
        </Card>
        </div>
    </div>
  );
};

export default StudentEvaluation;
