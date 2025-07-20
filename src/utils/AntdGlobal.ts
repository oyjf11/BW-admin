import { App } from "antd";
import { useEffect } from "react";
import { setAntdGlobalProxy } from "./antdGlobalProxy";

export default function AntdGlobal() {
	const { message, notification, modal } = App.useApp();

	useEffect(() => {
		setAntdGlobalProxy({ message, notification, modal });
	}, [message, notification, modal]);

	// 不需要渲染内容
	return null;
}
