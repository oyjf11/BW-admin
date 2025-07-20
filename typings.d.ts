import "axios";

declare module "axios" {
	interface AxiosRequestConfig {
		showLoading?: boolean;
		showError?: boolean;
	}
	interface InternalAxiosRequestConfig {
		showLoading?: boolean;
		showError?: boolean;
	}
}
