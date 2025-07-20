import "axios";

declare module "axios" {
	interface InternalAxiosRequestConfig {
		showLoading?: boolean;
		showError?: boolean;
	}
}
