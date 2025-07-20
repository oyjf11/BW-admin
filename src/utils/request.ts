import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { showLoading, hideLoading } from "./loading";
import storage from "./storage";
import env from "@/config";
import type { Result } from "@/types/api/common";
import { message } from "@/utils/antdGlobalProxy";

console.log("%c[message]", "color: #42b883; font-weight: bold;", message);

interface IConfig extends AxiosRequestConfig {
	showLoading?: boolean;
	showError?: boolean;
}

// 创建实例
const instance = axios.create({
	timeout: 8000,
	timeoutErrorMessage: "请求超时，请稍后再试",
	withCredentials: true, // 让浏览器的请求带上 Cookie
	headers: {
		icode: "",
	},
});

// 请求拦截器
instance.interceptors.request.use(
	(config) => {
		if (config.showLoading) showLoading();
		const token = storage.get("token");
		if (token) {
			config.headers.Authorization = "Bearer " + token;
		}
		config.headers.icode = "9A7F7BBB07D0F257";
		if (env.mock) {
			config.baseURL = env.mockApi;
		} else {
			config.baseURL = env.baseApi;
		}

		console.log("%c[config]", "color: #42b883; font-weight: bold;", config);
		return {
			...config,
		};
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	},
);

// 响应拦截器
instance.interceptors.response.use(
	(response) => {
		const data: Result = response.data;
		hideLoading();
		console.log(
			"%c[response.config]",
			"color: #42b883; font-weight: bold;",
			response.config,
		);
		if (response.config.responseType === "blob") return response;
		if (data.code === 500001) {
			message.error(data.msg);
			storage.remove("token");
			location.href = "/login?callback=" + encodeURIComponent(location.href);
		} else if (data.code != 0) {
			if (response.config.showError === false) {
				return Promise.resolve(data);
			} else {
				console.log(
					"%c[data.msg]",
					"color: #42b883; font-weight: bold;",
					data.msg,
					message.error,
				);
				message.error(data.msg);
				return Promise.reject(data);
			}
		}
		return data.data;
	},
	(error) => {
		console.log("%c[error]", "color: #42b883; font-weight: bold;", error);
		hideLoading();
		message.error(error.message);
		return Promise.reject(error.message);
	},
);

export default {
	get<T>(
		url: string,
		params?: object,
		options: IConfig = { showLoading: true, showError: true },
	): Promise<T> {
		return instance.get(url, { params, ...options });
	},
	post<T>(
		url: string,
		params?: object,
		options: IConfig = { showLoading: true, showError: true },
	): Promise<T> {
		return instance.post(url, params, options);
	},
};
