// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Result<T = any> {
	code: number;
	data: T;
	msg: string;
}
