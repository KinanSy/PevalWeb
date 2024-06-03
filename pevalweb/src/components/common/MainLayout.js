import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";
import { Breadcrumb, Row, Col, Layout } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { AuthContext } from "./AuthContext";
import "./layout.css";

const { Header, Footer, Content } = Layout;

export default function MainLayout() {
    const { auth, logout } = useContext(AuthContext);

    // Définir les éléments de la barre de navigation
    const breadcrumbs = [
        { title: 'Page d\'accueil', path: "/" },
    ];

    return (
        <Layout>
            <Header className="header">
                <div className="headerContainer">
                    <Row className="headerContentContainer">
                        <Col span={20} className="headerContentCol">
                            <Breadcrumb items={breadcrumbs} />
                        </Col>
                        <Col span={2} className="headerContentCol">
                            <div className="userInfo">
                                <div><UserOutlined /></div>
                                <div className="userName">{auth.teacherName}</div>
                            </div>
                        </Col>
                        <Col span={2} className="headerContentCol">
                            <div className="userButtons">
                                <Link to={"/login"} onClick={logout}>Se déconnecter</Link>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Header>
            <Content className="content">
                <div id="contentContainer">
                    <Outlet /> {/* Utilisé pour rendre les composants enfants selon la route */}
                </div>
            </Content>
            <Footer className="footer">
                ETML 2024 - Réalisé par Kinan Jano
            </Footer>
        </Layout>
    );
}
