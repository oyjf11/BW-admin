import { useState } from "react";
import { Button, Form, Input, message } from "antd";
// import api from '@/api'
// import api from '@/api'
import type { LoginParams } from "@/types/api/login";
// import storage from '@/utils/storage'
// import { useStore } from '@/store'
export default function LoginFC() {
	const [loading, setLoading] = useState(false);
	// const updateToken = useStore(state => state.updateToken)
	const onFinish = async (values: LoginParams) => {
		//   try {
		setLoading(true);
		console.log("%c[values]", "color: #42b883; font-weight: bold;", values);
		//     const data = await api.login(values)
		//     setLoading(false)
		//     storage.set('token', data)
		//     updateToken(data)
		message.success("登录成功");
		//     const params = new URLSearchParams(location.search)
		//     setTimeout(() => {
		//       location.href = params.get('callback') || '/welcome'
		//     })
		//   } catch (error) {
		//     setLoading(false)
		//   }
	};
	return (
		<div
			className="flex items-center justify-center w-screen h-screen min-h-screen bg-gray-100 bg-right bg-no-repeat bg-cover"
			style={{ backgroundImage: "url('/image/bg.png')" }}
		>
			<div className="w-[600px] absolute top-1/3 right-[10%] max-w-md p-8 flex flex-col">
				<div className="mb-8 text-2xl font-bold text-center text-orange-200">
					系统登录
				</div>
				<Form
					name="basic"
					initialValues={{ remember: true }}
					onFinish={onFinish}
					autoComplete="off"
					className="space-y-4"
				>
					<Form.Item
						name="userName"
						rules={[{ required: true, message: "Please input your username!" }]}
					>
						<Input className="w-full px-3 mb-4 border rounded" />
					</Form.Item>

					<Form.Item
						name="userPwd"
						rules={[{ required: true, message: "Please input your password!" }]}
					>
						<Input.Password className="w-full px-3 mb-4 border rounded" />
					</Form.Item>

					<Form.Item>
						<Button
							type="primary"
							block
							htmlType="submit"
							loading={loading}
							className="w-full"
						>
							登录
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
}
