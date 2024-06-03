import React, { useContext } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { ConfigProvider, Spin } from "antd";
import { AuthProvider, AuthContext } from "./components/common/AuthContext";
import MainLayout from "./components/common/MainLayout";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import CreateEvaluation from "./components/createEvaluation/CreateEvaluation";
import Evaluation from "./components/evaluation/Evaluation";
import StudentEvaluation from "./components/studentEvaluation/StudentEvaluation";
import StudentEvaluationResult from "./components/studentEvaluationResult/StudentEvaluationResult";
import EditEvaluation from "./components/editEvaluation/EditEvaluation";
import StudentResult from "./components/studentResult/StudentResult";
import { ErrorNotFound } from "./components/common/ErrorPages";

// Composant pour les routes privées, nécessitant une authentification
const PrivateRoute = ({ children }) => {
  const { auth, loading } = useContext(AuthContext);

  // Affichage d'un spinner pendant le chargement
  if (loading) {
    return <Spin spinning fullscreen></Spin>;
  }

  // Redirection vers la page de login si l'utilisateur n'est pas authentifié
  if (!auth.teacherId) {
    return <Navigate to="/login" />;
  }

  // Affichage des enfants si l'utilisateur est authentifié
  return children;
};


// Définition des routes de l'application
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/evaluation/:id",
        element: <Evaluation />
      },
      {
        path: "/evaluation/:id/edit",
        element: <EditEvaluation />
      },
      {
        path: "/evaluation/:evalId/EvaluateStudent/:studentId",
        element: <StudentEvaluation />
      },
      {
        path: "/result/:evalId/:studentId",
        element: <StudentEvaluationResult />
      },
      {
        path: "/create",
        element: <CreateEvaluation />
      },
    ],
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/studentresult/:evalId/:stuToken",
    element: <StudentResult /> 
  },
  {
    path: "*",
    element: <ErrorNotFound />
  },
]);


// Composant principal de l'application
export default function App() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            bodyBg: "#E9ECEF",
            footerBg: "#E9ECEF",
            headerBg: "#E9ECEF",
            headerPadding: "0 0",
            headerHeight: "2.3vh",
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
