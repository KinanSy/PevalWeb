import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, message, Popconfirm } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const EvaluationTable = () => {
    const [dataSource, setDataSource] = useState([]);
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        const fetchEvaluationsAndModules = async () => {
            try {
                const [evaluationsRes, modulesRes] = await Promise.all([
                    axios.get(process.env.REACT_APP_API_HOST + "/evaluations/"),
                    axios.get(process.env.REACT_APP_API_HOST + "/modules/")
                ]);

                const evaluations = evaluationsRes.data;
                const modules = modulesRes.data;

                const evaluationsWithModules = evaluations.map(evaluation => {
                    const module = modules.find(m => m.id_module === evaluation.evaModuleId);
                    return {
                        key: evaluation.id_evaluation,
                        module: module ? `${module.modNumber} - ${module.modTitle}` : 'Module non défini',
                        titre: evaluation.evaTitle,
                    };
                });

                setDataSource(evaluationsWithModules);
            } catch (error) {
                console.error('Error fetching evaluations and modules:', error);
            }
        };

        fetchEvaluationsAndModules();
    }, []);

    const handleDelete = (id) => {
        axios.delete(`${process.env.REACT_APP_API_HOST}/evaluations/${id}`)
            .then(res => {
                setDataSource(prevData => prevData.filter(item => item.key !== id));
                messageApi.success('Évaluation supprimée avec succès');
            })
            .catch(error => {
                console.error('Error deleting evaluation:', error);
                messageApi.error('Erreur lors de la suppression de l\'évaluation');
            });
    };

    const handleView = (id) => {
        navigate(`/Evaluation/${id}`);
    };

    const handleEdit = (id) => {
        navigate(`/Evaluation/${id}/Edit`);
    };

    const columns = [
        {
            title: 'Module',
            dataIndex: 'module',
            key: 'module',
            align: "center"
        },
        {
            title: 'Titre',
            dataIndex: 'titre',
            key: 'titre',
            align: "center"
        },
        {
            title: 'Actions',
            key: 'actions',
            align: "center",
            render: (_, record) => (
                <span>
                    <Button type="link" icon={<EyeOutlined />} onClick={() => handleView(record.key)} />
                    <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record.key)} />
                    <Popconfirm
                        title="Supprimer l'évaluation"
                        description="Êtes-vous sûr de supprimer cette évaluation?"
                        onConfirm={() => handleDelete(record.key)}
                        okText="Oui"
                        cancelText="Non"
                    >
                        <Button type="link" icon={<DeleteOutlined />} />
                    </Popconfirm>
                </span>
            ),
        },
    ];

    return (
        <>
            {contextHolder}
            <Table dataSource={dataSource} columns={columns} />
        </>
    );
};

export default EvaluationTable;
