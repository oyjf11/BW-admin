import request from "@/utils/request";
import type { LoginParams } from "@/types/api/login";
export default {
	// 登录
	login(params: LoginParams) {
		return request.post<string>("/users/login", params, {
			showLoading: false,
			showError: true,
		});
	},
};
