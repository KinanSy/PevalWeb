import { Card } from "antd"
import { FileAddOutlined } from "@ant-design/icons";
import EvaluationTable from "./EvaluationsTable";
import "./home.css"
function Home() {
    return (
        <div className="homeContainer">
            <div className="homeToolbar">
                <div className="toolbarItemsContainer">
                    <Card className="createEvaluationButton" hoverable="true" styles={{ body:{padding:"0.5rem"} }}>
                        <FileAddOutlined className="icon"/>
                    </Card>
                </div>
            </div>
            <div className="homeContentContainer">
                <Card className="homeContent">
                    <h2>Liste des évaluation</h2>
                    <EvaluationTable></EvaluationTable>
                </Card>
            </div>
        </div>
    )
}
export default Home;