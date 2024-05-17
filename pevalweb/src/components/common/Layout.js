import { Outlet } from "react-router-dom"
import { Breadcrumb } from "antd"
import "./layout.css"
import { Layout } from 'antd';
const { Header, Footer, Content } = Layout;
export default function Layouta() {
    return (
        <Layout>
            <Header className="header">
                <div className="headerContainer">
                    <Breadcrumb items={[{ title: 'Page d\'accueil', path: "/" }]} />
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