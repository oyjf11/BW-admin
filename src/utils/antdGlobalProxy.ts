import type { MessageInstance, MessageType } from "antd/es/message/interface";
import type { NotificationInstance } from "antd/es/notification/interface";
import type { ModalStaticFunctions } from "antd/es/modal/confirm";

// ---- 1. 类型安全的 fake 占位 ----
const fakeMessageType: MessageType = Object.assign(() => {}, {
	then: <TResult1 = boolean, TResult2 = never>(
		onfulfilled?: ((value: boolean) => TResult1 | PromiseLike<TResult1>) | null,
		onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
	): Promise<TResult1 | TResult2> => {
		if (onfulfilled) {
			try {
				return Promise.resolve(onfulfilled(true));
			} catch (err) {
				if (onrejected) {
					return Promise.resolve(onrejected(err));
				}
				return Promise.reject(err);
			}
		}
		return Promise.resolve(true as TResult1);
	},
	promise: Promise.resolve(),
	close: () => {},
});

function noop(...args: unknown[]): MessageType {
	if (process.env.NODE_ENV === "development") {
		console.warn("[antdGlobalProxy] antd App.Provider 未初始化！", ...args);
	}
	return fakeMessageType;
}

// ---- 2. 初始化全局占位实例 ----
export let message: MessageInstance = {
	open: noop,
	info: noop,
	success: noop,
	error: noop,
	warning: noop,
	loading: noop,
	destroy: () => {},
};

export let notification: NotificationInstance = {
	open: () => {},
	success: () => {},
	info: () => {},
	warning: () => {},
	error: () => {},
	destroy: () => {},
};

// 定义 fake 占位对象
const fakeModalReturn = {
	destroy: () => {},
	update: () => {},
};

export let modal: Omit<ModalStaticFunctions, "warn"> = {
	info: () => fakeModalReturn,
	success: () => fakeModalReturn,
	error: () => fakeModalReturn,
	warning: () => fakeModalReturn,
	confirm: () => fakeModalReturn,
};

// ---- 3. 注入真实实例的函数 ----
export function setAntdGlobalProxy(instances: {
	message: MessageInstance;
	notification: NotificationInstance;
	modal: Omit<ModalStaticFunctions, "warn">;
}) {
	message = instances.message;
	notification = instances.notification;
	modal = instances.modal;
}
