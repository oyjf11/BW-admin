// src/router/index.ts
import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import AdminLayout from "@/layout/AdminLayout";

// 路由表
const router = createBrowserRouter([
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/welcome",
		element: (
			<AdminLayout>
				<Dashboard />
			</AdminLayout>
		),
	},
	{
		path: "*",
		element: <Navigate to="/login" replace />,
	},
]);

export default router;
