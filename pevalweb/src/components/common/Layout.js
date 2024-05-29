import { Outlet, Link } from "react-router-dom"
import { useContext } from "react";
import { Breadcrumb, Row, Col, Layout} from "antd"
import { UserOutlined } from '@ant-design/icons';
import "./layout.css"
import { AuthContext } from "../../AuthContext";
const { Header, Footer, Content } = Layout;
export default function Layouta() {
    const { auth, logout } = useContext(AuthContext);
    return (
        <Layout>
            <Header className="header">
                <div className="headerContainer">
                    <Row className="headerContentContainer">
                        <Col span={20} className="headerContentCol">
                            <Breadcrumb items={[{ title: 'Page d\'accueil', path: "/" }]} />
                        </Col>
                        <Col span={2} className="headerContentCol">
                            <div className="userInfo">
                                <div><UserOutlined /></div>
                                <div className="userInfo">{auth["teacherName"]}</div>
                            </div>
                        </Col>
                        <Col span={2} className="headerContentCol">
                            <div className="userButtons">
                                <Link to={"/Login"} onClick={logout}>Se déconnecter</Link>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Header>
            <Content className="content">
                <div id="contentContainer"><Outlet></Outlet></div>
            </Content>
            <Footer className="footer">
                ETML 2024 - Realisé par Kinan Jano
            </Footer>
        </Layout>
    )
}