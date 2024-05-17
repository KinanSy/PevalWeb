import React from 'react';
import { Table, Button } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const dataSource = [
  {
    key: '1',
    module: 'i104',
    titre: 'Implémenter un modèle de données',
  },
  {
    key: '2',
    module: 'i104',
    titre: 'Implémenter un modèle de données',
  },
  {
    key: '3',
    module: 'i104',
    titre: 'Implémenter un modèle de données',
  },
  {
    key: '4',
    module: 'i104',
    titre: 'Implémenter un modèle de données',
  },
  {
    key: '5',
    module: 'i104',
    titre: 'Implémenter un modèle de données',
  },
  {
    key: '6',
    module: 'i104',
    titre: 'Implémenter un modèle de données',
  },
];

const columns = [
  {
    title: 'Module',
    dataIndex: 'module',
    key: 'module',
    align:"center"
  },
  {
    title: 'Titre',
    dataIndex: 'titre',
    key: 'titre',
    align:"center"
  },
  {
    title: 'Actions',
    key: 'actions',
    align:"center",
    render: () => (
      <span>
        <Button type="link" icon={<EyeOutlined />} />
        <Button type="link" icon={<EditOutlined />} />
        <Button type="link" icon={<DeleteOutlined />} />
      </span>
    ),
  },
];

function EvaluationTable (){
  return (
    <Table dataSource={dataSource} columns={columns} />
  );
};

export default EvaluationTable;
