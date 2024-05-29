import React, { useEffect, useState, useRef } from 'react';
import { Table, Button, Card, Row, Col, Divider, Select, message, Popconfirm } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined, SendOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./evaluation.css";

const { Option } = Select;

function Evaluation() {
    const { id } = useParams();
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

    const [evalData, setEvalData] = useState({
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
    const [studentsTable, setStudentsTable] = useState([]);
    const [studentList, setStudentList] = useState([]);
    const [reload, setReload] = useState(false);
    const selectedStudentId = useRef('');
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

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
    }, [reload]);

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
                    setStudentsTable(newDataSource);
                } catch (error) {
                    console.error('Error fetching student details:', error);
                }
            };
            fetchStudents();
            console.log(evalData);
        }
    }, [studentIds, reload]);

    const calculateNoteForStudent = (studentId) => {
        let totalScore = 0;
        let totalWeight = 0;

        evalData.objectives.forEach(objective => {
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

    // https://ant.design/components/select
    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const onStudentSelect = (value) => {
        selectedStudentId.current = value;
    }

    const onViewButtonClick = (value) => {
        const studentId = students[value].id_student;
        const evalId = evalData.id_evaluation;
        navigate(`/Result/${evalId}/${studentId}`);
        console.log(studentId);
    }

    const onEvaluateButtonClick = (value) => {
        const studentId = students[value].id_student;
        const evalId = evalData.id_evaluation;
        navigate(`/Evaluation/${evalId}/EvaluateStudent/${studentId}`);
        console.log(studentId);
    }

    const createStudentResult = (e) => {
        if (selectedStudentId.current !== '') {
            const studentId = selectedStudentId.current;
            const results = [];

            evalData.objectives.forEach(objective => {
                objective.criterions.forEach(criterion => {
                    const result = {
                        csrCriterionId: criterion.id_criterion,
                        csrTeacherId: evalData.evaTeacherId || null,
                        csrStudentId: studentId,
                        csrScore: 0,
                        csrComment: '',
                    };
                    results.push(result);
                    console.log("results : ", results)
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

    const onConfirmStudentDelete = (studentColumn) => {
        const student = students[studentColumn];
        if (student) {
            const studentId = student.id_student;
            const resultIdsToDelete = [];

            evalData.objectives.forEach(objective => {
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

    console.log(students);
    return (
        <>
            {contextHolder}
            <div className="homeContainer">
                <div className="homeToolbar">
                    <div className="toolbarItemsContainer">
                        <Card className="createEvaluationButton" hoverable="true" styles={{ body: { padding: "0.5rem" } }}>
                            <SendOutlined className="icon" />
                        </Card>
                        <Card className="createEvaluationButton" hoverable="true" styles={{ body: { padding: "0.5rem" } }}>
                            <DeleteOutlined className="icon" />
                        </Card>
                    </div>
                </div>
                <div className="homeContentContainer">
                    <Card className="homeContent">
                        <Row>
                            <Col span={18} push={6} className='moduleDescriptionsTitleValue'>
                            </Col>
                            <Col span={6} pull={18} className='moduleDescriptionsTitle'>
                                Module
                            </Col>
                        </Row>
                        <Row>
                            <Col span={18} push={6} className='moduleDescriptionsTitleValue'>
                                {evalData["evaTitle"]}
                            </Col>
                            <Col span={6} pull={18} className='moduleDescriptionsTitle'>
                                Titre
                            </Col>
                        </Row>
                        <Row>
                            <Col span={18} push={6} className='moduleDescriptionsTitleValue'>
                                {evalData["evaDescription"]}
                            </Col>
                            <Col span={6} pull={18} className='moduleDescriptionsTitle'>
                                Description
                            </Col>
                        </Row>
                        <Row>
                            <Col span={18} push={6} className='moduleDescriptionsTitleValue'>
                                {evalData["evaLocation"]}
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
                        <Table dataSource={studentsTable} columns={columns} pagination={false} />
                    </Card>
                </div>
            </div>
        </>
    );
};

export default Evaluation;
