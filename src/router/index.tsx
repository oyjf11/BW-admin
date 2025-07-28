// src/router/index.ts
import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "@/pages/Login";
// import Dashboard from "@/pages/Dashboard";
import Layout from "@/layout";
import Editor from "@/pages/editor";

// 路由表
const router = createBrowserRouter([
	{
		path: "/",
		element: <Navigate to="/welcome" />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/welcome",
		element: <Layout />,
	},
	{
		path: "/editor",
		element: <Editor />,
	},
	{
		path: "*",
		element: <Navigate to="/login" replace />,
	},
]);

export default router;
