import React from 'react';
import { Table, Button, Card, Row, Col, Divider } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined,SendOutlined} from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import "./evaluation.css"


const dataSource = [
    {
        key: '1',
        name: 'Kinan Jano',
        note: '4.5',
    },
    {
        key: '2',
        name: 'Alexandre Fernandes',
        note: '6.0',
    },
    {
        key: '3',
        name: 'Lucie Dubois',
        note: '3.5',
    },
    {
        key: '4',
        name: 'Émile Bernard',
        note: '5.0',
    },
    {
        key: '5',
        name: 'Camille Leroy',
        note: '1.5',
    },
    {
        key: '6',
        name: 'Julien Moreau',
        note: '4.0',
    },
    {
        key: '7',
        name: 'Sophie Petit',
        note: '2.5',
    },
    {
        key: '8',
        name: 'Marc Fournier',
        note: '5.5',
    },
    {
        key: '9',
        name: 'Isabelle Lefebvre',
        note: '2.0',
    },
    {
        key: '10',
        name: 'René Girard',
        note: '3.0',
    },
    {
        key: '11',
        name: 'Charlotte Bonnet',
        note: '4.5',
    },
    {
        key: '12',
        name: 'Antoine Robin',
        note: '3.5',
    },
    {
        key: '13',
        name: 'Annette Lemaire',
        note: '6.0',
    },
    {
        key: '14',
        name: 'Thierry Blanc',
        note: '5.5',
    },
];

const columns = [
  {
    title: 'Nom de l\'élève',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Note',
    dataIndex: 'note',
    key: 'note',
    align:"center",
    width:"20%",
    render: (text) => <b>{text}</b>
  },
  {
    title: 'Actions',
    key: 'actions',
    align:"center",
    width:"18%",
    render: () => (
      <span>
        <Button type="link" icon={<EyeOutlined />} />
        <Button type="link" icon={<EditOutlined />} />
        <Button type="link" icon={<DeleteOutlined />} />
      </span>
    ),
  },
];

function Evaluation (){
    const { id } = useParams();
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
                        Module title value
                    </Col>
                    <Col span={6} pull={18} className='moduleDescriptionsTitle'>
                        Module
                    </Col>
                </Row>
                <Row>
                    <Col span={18} push={6} className='moduleDescriptionsTitleValue'>
                        Titre value
                    </Col>
                    <Col span={6} pull={18} className='moduleDescriptionsTitle'>
                        Titre
                    </Col>
                </Row>
                <Row>
                    <Col span={18} push={6} className='moduleDescriptionsTitleValue'>
                        Description value
                    </Col>
                    <Col span={6} pull={18} className='moduleDescriptionsTitle'>
                        Description
                    </Col>
                </Row>
                <Row>
                    <Col span={18} push={6} className='moduleDescriptionsTitleValue'>
                        Salle value
                    </Col>
                    <Col span={6} pull={18} className='moduleDescriptionsTitle'>
                        Salle
                    </Col>
                </Row>
                <Row>
                    <Col span={6} className='moduleDescriptionsTitle'>
                        Moyenne de la classe
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
                <Table dataSource={dataSource} columns={columns} pagination={false} />
            </Card>
        </div>
    </div>
  );
};

export default Evaluation;
