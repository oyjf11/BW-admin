import React, { useState } from "react";
import {
	DesktopOutlined,
	FileOutlined,
	PieChartOutlined,
	TeamOutlined,
	UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[],
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
	} as MenuItem;
}

const items: MenuItem[] = [
	getItem("Option 1", "1", <PieChartOutlined />),
	getItem("Option 2", "2", <DesktopOutlined />),
	getItem("User", "sub1", <UserOutlined />, [
		getItem("Tom", "3"),
		getItem("Bill", "4"),
		getItem("Alex", "5"),
	]),
	getItem("Team", "sub2", <TeamOutlined />, [
		getItem("Team 1", "6"),
		getItem("Team 2", "8"),
	]),
	getItem("Files", "9", <FileOutlined />),
];

const App: React.FC = () => {
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();
	return (
		<Layout style={{ minHeight: "100vh", width: "100vw" }}>
			<Sider
				collapsible
				collapsed={collapsed}
				onCollapse={(value) => setCollapsed(value)}
			>
				<div className="demo-logo-vertical" />
				<Menu
					theme="dark"
					defaultSelectedKeys={["1"]}
					mode="inline"
					items={items}
				/>
			</Sider>
			<Layout className="bg-[#eee]">
				<Header style={{ background: "#fff" }}>header</Header>
				<Content className="m-10 bg-white">content</Content>
				<Footer style={{ background: "#ddd" }}>footer</Footer>
			</Layout>
		</Layout>
	);
};

export default App;
