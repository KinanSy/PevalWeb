import { Card,Tooltip } from "antd";
import { FileAddOutlined } from "@ant-design/icons";
import EvaluationTable from "./EvaluationsTable";
import { Link } from "react-router-dom";
import "./home.css";

function Home() {

    return (
        <div className="homeContainer">
            <div className="homeToolbar">
                <div className="toolbarItemsContainer">
                    <Link to={"/create"}>
                        <Card className="createEvaluationButton" hoverable styles={{ body:{padding:"0.5rem"} }}>
                            <Tooltip title="Créer une évaluation">
                                <FileAddOutlined className="icon"/>
                            </Tooltip>
                        </Card>
                    </Link>
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