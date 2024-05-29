import * as React from "react";
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Layouta from "./components/common/Layout";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import CreateEvaluation from "./components/createEvaluation/CreateEvaluation";
import Evaluation from "./components/evaluation/Evaluation";
import StudentEvaluation from "./components/studentEvaluation/StudentEvaluation";
import StudentEvaluationResult from "./components/studentEvaluationResult/StudentEvaluationResult";
import EditEvaluation from "./components/editEvaluation/EditEvaluation";
import { ConfigProvider } from "antd";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layouta />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path:"/Evaluation/:id",
        element: <Evaluation />
      },
      {
        path:"/Evaluation/:id/Edit",
        element: <EditEvaluation />
      },
      {
        path:"/Evaluation/:evalId/EvaluateStudent/:studentId",
        element: <StudentEvaluation />
      },
      {
        path:"/Result/:evalId/:studentId",
        element: <StudentEvaluationResult />
      },
      {
        path: "/Create",
        element: <CreateEvaluation />
      },
    ],
  },
  {
    path: "/Login",
    element: <Login />
  },
])

export default function App() {
  return (
  <ConfigProvider
    theme={{
      components:{
        Layout:{
          bodyBg:"#E9ECEF",
          footerBg:"#E9ECEF",
          headerBg:"#E9ECEF",
        }
      }
    }}
  >
    <RouterProvider router={router} />
  </ConfigProvider>
  );
}