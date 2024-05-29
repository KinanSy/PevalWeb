import React, {useContext} from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Layouta from "./components/common/Layout";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import CreateEvaluation from "./components/createEvaluation/CreateEvaluation";
import Evaluation from "./components/evaluation/Evaluation";
import StudentEvaluation from "./components/studentEvaluation/StudentEvaluation";
import StudentEvaluationResult from "./components/studentEvaluationResult/StudentEvaluationResult";
import EditEvaluation from "./components/editEvaluation/EditEvaluation";
import { ConfigProvider } from "antd";
import { AuthProvider, AuthContext } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  if (!auth.teacherId) {
    return <Navigate to="/Login" />;
  }

  return children;
};


const router = createBrowserRouter([
  {
    path: "/",
    element: 
      <PrivateRoute>
        <Layouta />
      </PrivateRoute>
    ,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/Evaluation/:id",
        element: <Evaluation />
      },
      {
        path: "/Evaluation/:id/Edit",
        element: <EditEvaluation />
      },
      {
        path: "/Evaluation/:evalId/EvaluateStudent/:studentId",
        element: <StudentEvaluation />
      },
      {
        path: "/Result/:evalId/:studentId",
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
]);

export default function App() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            bodyBg: "#E9ECEF",
            footerBg: "#E9ECEF",
            headerBg: "#E9ECEF",
            headerPadding:"0 0",
            headerHeight:"2.3vh",
          },
        },
      }}
    >
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ConfigProvider>
  );
}
