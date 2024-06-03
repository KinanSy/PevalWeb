import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, message, Popconfirm, Tooltip } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const EvaluationTable = () => {
    const [dataSource, setDataSource] = useState([]);
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        const fetchEvaluationsAndModules = async () => {
            try {
                // Récupérer les évaluations et les modules
                const [evaluationsRes, modulesRes] = await Promise.all([
                    axios.get(process.env.REACT_APP_API_HOST + "/evaluations/"),
                    axios.get(process.env.REACT_APP_API_HOST + "/modules/")
                ]);

                const evaluations = evaluationsRes.data;
                const modules = modulesRes.data;

                // Associer chaque évaluation avec son module
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
                messageApi.error('Erreur lors de la récupération des données');
            }
        };

        fetchEvaluationsAndModules();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps 
    []);

    // Gérer la suppression d'une évaluation
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

    // Gérer le bouton de visualisation d'une évaluation
    const handleView = (id) => {
        navigate(`/evaluation/${id}`);
    };

    
    // Gérer le bouton de modification d'une évaluation
    const handleEdit = (id) => {
        navigate(`/evaluation/${id}/edit`);
    };

    // Définir les colonnes du tableau
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
                    <Tooltip title="Voir l'évaluation">
                        <Button type="link" icon={<EyeOutlined />} onClick={() => handleView(record.key)} />
                    </Tooltip>
                    <Tooltip title="Modifier l'évaluation">
                        <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record.key)} />
                    </Tooltip>
                    <Tooltip title="Supprimer l'évaluation">
                        <Popconfirm
                        title="Supprimer l'évaluation"
                        description="Êtes-vous sûr de supprimer cette évaluation?"
                        onConfirm={() => handleDelete(record.key)}
                        okText="Oui"
                        cancelText="Non"
                        >
                            <Button type="link" icon={<DeleteOutlined />} />
                        </Popconfirm>
                    </Tooltip>
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
