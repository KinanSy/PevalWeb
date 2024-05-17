import * as React from "react";
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Layouta from "./components/common/Layout";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import CreateEvaluation from "./components/createEvaluation/CreateEvaluation";
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