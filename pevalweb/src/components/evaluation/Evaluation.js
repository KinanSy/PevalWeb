import { useEffect, useState, useRef } from 'react';
import { Table, Button, Card, Row, Col, Divider, Select, message, Popconfirm, Tooltip, Modal, Typography } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined, SendOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./evaluation.css";

function Evaluation() {
    const { id } = useParams();
    const [evaluation, setEvalData] = useState({
        id_evaluation: 0,
        evaTitle: "",
        evaDescription: "",
        evaWeight: "",
        evaDate: "",
        evaLocation: "",
        evaTeacherId: "",
        evaModuleId: "",
        module: {
            modNumber: 0,
            modTitle: ""
        }
    });
    const [studentIds, setStudentIds] = useState([]);
    const [students, setStudents] = useState([]);
    const [studentTableData, setstudentTableData] = useState([]);
    const [studentList, setStudentList] = useState([]);
    const [reload, setReload] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const selectedStudentId = useRef('');
    const [messageApi, contextHolder] = message.useMessage();
    const { Paragraph } = Typography;
    const navigate = useNavigate();
    
    // Définition des colonnes du tableau des étudiants
    const columns = [
        {
            title: "Nom de l'élève",
            dataIndex: 'name',
        },
        {
            title: 'Note',
            dataIndex: 'note',
            align: "center",
            width: "20%",
            render: (text, record) => (
                <b className={getNoteClassName(record.roundedNote)}>
                    {record.note} ({record.roundedNote})
                </b>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            align: "center",
            width: "18%",
            render: (val, row, index) => (
                <span>
                    <Button type="link" icon={<EyeOutlined />} onClick={(e) => onViewButtonClick(index)} />
                    <Button type="link" icon={<EditOutlined />} onClick={(e) => onEvaluateButtonClick(index)} />
                    <Popconfirm
                        title="Supprimer l'élève"
                        description="Êtes-vous sûr de supprimer l'élève?"
                        onConfirm={(e) => onConfirmStudentDelete(index)}
                        okText="Oui"
                        cancelText="Non"
                    >
                        <Button type="link" icon={<DeleteOutlined />} />
                    </Popconfirm>
                </span>
            ),
        },
    ];

    // Afficher la modal
    const showModal = () => {
        setIsModalOpen(true);
    };

    // Fermer la modal
    const handleModalClose = () => {
        setIsModalOpen(false);
    };
    
    // Récupérer les données de l'évaluation et les IDs des étudiants
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_HOST + "/evaluations/" + id)
            .then(res => {
                setEvalData(res.data);
                var newStudentIds = [];
                if (Array.isArray(res.data.objectives)) {
                    res.data.objectives.forEach(objective => {
                        if (Array.isArray(objective.criterions)) {
                            objective.criterions.forEach(criterion => {
                                if (Array.isArray(criterion.criterionResults)) {
                                    criterion.criterionResults.forEach(result => {
                                        if (!studentIds.includes(result.csrStudentId) && !newStudentIds.includes(result.csrStudentId)) {
                                            newStudentIds.push(result.csrStudentId);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
                setStudentIds([...studentIds, ...newStudentIds]);
            })

        if (reload)
            setReload(false)
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reload]);

    // Récupérer la liste des étudiants
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_HOST + "/students/")
            .then(res => {
                const existingStudentIds = students.map(student => student.id_student);
                const newStudentList = res.data
                    .filter(student => !existingStudentIds.includes(student.id_student))
                    .map(student => ({
                        value: student.id_student.toString(),
                        label: `${student.stuFirstname} ${student.stuLastname}`,
                    }));
                setStudentList(newStudentList);
            })
    }, [students]);

    // Récupérer les données des étudiants
    useEffect(() => {
        if (studentIds.length > 0) {
            const fetchStudents = async () => {
                const studentRequests = studentIds.map(id =>
                    axios.get(`${process.env.REACT_APP_API_HOST}/students/${id}`)
                );
                try {
                    const responses = await Promise.all(studentRequests);
                    const fetchedStudents = responses.map(response => response.data);
                    setStudents(fetchedStudents);

                    const newDataSource = fetchedStudents.map(student => {
                        const { note, roundedNote } = calculateNoteForStudent(student.id_student);
                        return {
                            key: student.id_student.toString(),
                            name: `${student.stuFirstname} ${student.stuLastname}`,
                            note,
                            roundedNote,
                        };
                    });
                    setstudentTableData(newDataSource);
                } catch (error) {
                    console.error('Error fetching student details:', error);
                }
            };
            fetchStudents();
            console.log(evaluation);
        }
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [studentIds, reload]);

    // Calculer la note pour un étudiant
    const calculateNoteForStudent = (studentId) => {
        let totalScore = 0;
        let totalWeight = 0;

        evaluation.objectives.forEach(objective => {
            const objectiveWeight = parseFloat(objective.objWeight);
            if (Array.isArray(objective.criterions)) {
                objective.criterions.forEach(criteria => {
                    const criteriaWeight = parseFloat(criteria.criWeight);
                    const result = criteria.criterionResults.find(r => r.csrStudentId === studentId) || {};
                    const score = result.csrScore || 0;
                    totalScore += (score / 3) * criteriaWeight * objectiveWeight;
                    totalWeight += criteriaWeight * objectiveWeight;
                });
            }
        });

        const percentage = totalScore / totalWeight;
        const calculatedNote = (percentage * 5) + 1;
        const roundedNote = Math.round(calculatedNote * 2) / 2;

        return {
            note: calculatedNote.toFixed(1),
            roundedNote: roundedNote.toFixed(1),
        };
    };

    // Déterminer la classe CSS en fonction de la note
    const getNoteClassName = (note) => {
        if (note >= 1 && note < 4) {
            return 'noteMediocre';
        } else if (note >= 4 && note < 5) {
            return 'noteAverage';
        } else if (note >= 5 && note <= 6) {
            return 'noteGood';
        }
        return '';
    };

    // Filtrer les options du sélecteur
    // Source > https://ant.design/components/select
    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    // Gérer la sélection d'un étudiant
    const onStudentSelect = (value) => {
        selectedStudentId.current = value;
    }

    // Gérer le clic sur le bouton "Voir"
    const onViewButtonClick = (value) => {
        const studentId = students[value].id_student;
        const evalId = evaluation.id_evaluation;
        navigate(`/result/${evalId}/${studentId}`);
        console.log(studentId);
    }

    // Gérer le clic sur le bouton "Évaluer"
    const onEvaluateButtonClick = (value) => {
        const studentId = students[value].id_student;
        const evalId = evaluation.id_evaluation;
        navigate(`/evaluation/${evalId}/evaluatestudent/${studentId}`);
        console.log(studentId);
    }

    // Supprimer une évaluation
    const handleDelete = () => {
        const idToDelete = evaluation.id_evaluation;
        axios.delete(`${process.env.REACT_APP_API_HOST}/evaluations/${idToDelete}`)
            .then(res => {
                navigate("/");
            })
            .catch(error => {
                console.error('Error deleting evaluation:', error);
                messageApi.error('Erreur lors de la suppression de l\'évaluation');
            });
    };

    // Créer les résultats d'un étudiant
    const createStudentResult = (e) => {
        if (selectedStudentId.current !== '') {
            const studentId = selectedStudentId.current;
            const results = [];

            evaluation.objectives.forEach(objective => {
                objective.criterions.forEach(criterion => {
                    const result = {
                        csrCriterionId: criterion.id_criterion,
                        csrTeacherId: evaluation.evaTeacherId || null,
                        csrStudentId: studentId,
                        csrScore: 0,
                        csrComment: '',
                    };
                    results.push(result);
                });
            });

            const requests = results.map(result =>
                axios.post(`${process.env.REACT_APP_API_HOST}/results`, result)
            );

            Promise.all(requests)
                .then(responses => {
                    messageApi.open({
                        type: 'success',
                        content: 'Résultats de l\'élève créés avec succès',
                    });
                    setReload(true);
                })
                .catch(err => {
                    console.error('Error creating student results:', err);
                    messageApi.open({
                        type: 'error',
                        content: 'Erreur lors de la création de l\'élève',
                    });
                });
        } else {
            messageApi.open({
                type: 'error',
                content: 'Veuillez choisir un élève',
            });
        }
    };

    // Confirmer la suppression d'un étudiant
    const onConfirmStudentDelete = (studentColumn) => {
        const student = students[studentColumn];
        if (student) {
            const studentId = student.id_student;
            const resultIdsToDelete = [];

            evaluation.objectives.forEach(objective => {
                objective.criterions.forEach(criterion => {
                    criterion.criterionResults.forEach(result => {
                        if (result.csrStudentId === studentId) {
                            resultIdsToDelete.push(result.id_criterionStudentResult);
                        }
                    });
                });
            });

            if (resultIdsToDelete.length > 0) {
                const requests = resultIdsToDelete.map(id =>
                    axios.delete(`${process.env.REACT_APP_API_HOST}/results/${id}`)
                );

                Promise.all(requests)
                    .then(responses => {
                        setStudentIds(prevStudentIds => prevStudentIds.filter(id => id !== studentId));
                        message.success('Supprimé avec succès');
                    })
                    .catch(error => {
                        console.error('Error deleting student results:', error);
                        message.error('Erreur lors de la suppression des résultats');
                    });
            } else {
                message.error('Résultat pour l\'étudiant non trouvé');
            }
        } else {
            message.error('Étudiant non trouvé');
        }
    };

    console.log(evaluation);
    return (
        <>
            <Modal 
            title="Liens des eleves" 
            open={isModalOpen} 
            closeIcon={null}
            width={"60vw"}
            footer={[
                <Button key="ok" onClick={handleModalClose} type="primary">OK</Button>
            ]}
            >
                {students.map((student, index) => (
                    <>
                        <p><b>{student.stuFirstname} {student.stuLastname}</b></p>
                        <Paragraph copyable>{`${window.location.protocol}//${window.location.host}/studentresult/${evaluation.id_evaluation}/${student.stuToken}`}</Paragraph>
                        <Divider></Divider>
                    </>
                ))}

            </Modal>
            <>
                {contextHolder}
                <div className="homeContainer">
                    <div className="homeToolbar">
                        <div className="toolbarItemsContainer">
                            <Card className="createEvaluationButton" hoverable="true" styles={{ body: { padding: "0.5rem" } }}>
                                <Tooltip title="Voir les liens des eleves">
                                    <SendOutlined className="icon" onClick={e => showModal(true)}/>
                                </Tooltip>
                            </Card>
                            <Card className="createEvaluationButton" hoverable="true" styles={{ body: { padding: "0.5rem" } }}>
                                <Tooltip title="Supprimer l'évaluation">
                                    <Popconfirm
                                    title="Supprimer l'évaluation"
                                    description="Êtes-vous sûr de supprimer cette évaluation?"
                                    onConfirm={() => handleDelete()}
                                    okText="Oui"
                                    cancelText="Non"
                                    >
                                        <DeleteOutlined className="icon"/>
                                    </Popconfirm>
                                </Tooltip>
                            </Card>
                        </div>
                    </div>
                    <div className="homeContentContainer">
                        <Card className="homeContent">
                            <Row>
                                <Col span={18} push={6} className='moduleDescriptionsTitleValue'>
                                    {evaluation.module ? `${evaluation.module.modNumber} - ${evaluation.module.modTitle}` : 'Module non défini'}
                                </Col>
                                <Col span={6} pull={18} className='moduleDescriptionsTitle'>
                                    Module
                                </Col>
                            </Row>
                            <Row>
                                <Col span={18} push={6} className='moduleDescriptionsTitleValue'>
                                    {evaluation["evaTitle"]}
                                </Col>
                                <Col span={6} pull={18} className='moduleDescriptionsTitle'>
                                    Titre
                                </Col>
                            </Row>
                            <Row>
                                <Col span={18} push={6} className='moduleDescriptionsTitleValue'>
                                    {evaluation["evaDescription"]}
                                </Col>
                                <Col span={6} pull={18} className='moduleDescriptionsTitle'>
                                    Description
                                </Col>
                            </Row>
                            <Row>
                                <Col span={18} push={6} className='moduleDescriptionsTitleValue'>
                                    {evaluation["evaLocation"]}
                                </Col>
                                <Col span={6} pull={18} className='moduleDescriptionsTitle'>
                                    Salle
                                </Col>
                            </Row>
                            <Row>
                                <Col span={6} className='moduleDescriptionsTitle'>
                                    Moyenne de la classe
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
                            <Row>
                                <Col span={20}>
                                    <Select
                                        showSearch
                                        placeholder="Choisir un élève"
                                        optionFilterProp="children"
                                        filterOption={filterOption}
                                        onChange={onStudentSelect}
                                        style={{ width: "100%" }}
                                        options={studentList}
                                    />
                                </Col>
                                <Col span={4} className='addStudentButtonContainer'>
                                    <Button type="primary" onClick={createStudentResult}>Ajouter un élève</Button>
                                </Col>
                            </Row>
                            <Divider></Divider>
                            <Table dataSource={studentTableData} columns={columns} pagination={false} />
                        </Card>
                    </div>
                </div>

            </>
        </>
    );
};

export default Evaluation;
