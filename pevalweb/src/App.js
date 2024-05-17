import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/common/Layout";
import Home from "./components/home/Home";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />;
}