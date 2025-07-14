// main.tsx
import "@/index.css";
import "antd/dist/reset.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ConfigProvider
			locale={zhCN}
			componentSize="large"
			theme={{
				token: {
					colorPrimary: "#fa8c16", // 橙色
				},
				components: {
					Form: {
						itemMarginBottom: 36,
					},
				},
			}}
		>
			<App />
		</ConfigProvider>
	</React.StrictMode>,
);
