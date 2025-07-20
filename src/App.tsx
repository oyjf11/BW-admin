import { RouterProvider } from "react-router-dom";
import router from "@/router";
import { ConfigProvider, App as AntdApp } from "antd";
import AntdGlobal from "./utils/AntdGlobal";
import zhCN from "antd/locale/zh_CN";

export default function App() {
	return (
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
			<AntdApp>
				<AntdGlobal />
				<RouterProvider router={router} />
			</AntdApp>
		</ConfigProvider>
	);
}
