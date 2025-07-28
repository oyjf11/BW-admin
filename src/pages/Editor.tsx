import React, { useState, useEffect } from "react";
import { Button, Input, Form } from "antd";
import Editor from "@monaco-editor/react";

// 全局变量 Babel 来自 <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

// -------------------- 类型定义 --------------------
type SchemaPropValue = string | number | boolean | undefined;

interface SchemaNode {
	type: string;
	props: Record<string, SchemaPropValue>;
	text?: string;
}

// -------------------- 组件映射 --------------------
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const componentMap: Record<string, React.FC<any>> = {
	div: (props) => <div {...props}></div>,
	Input: (props) => <Input {...props} />,
	Button: (props) => <Button {...props}>{props.children}</Button>,
	Form: (props) => <Form {...props}>{props.children}</Form>,
};

// -------------------- 手动 AST 遍历 JSX → schema --------------------
function jsxToSchema(code: string): SchemaNode[] {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const babel = (window as any).Babel;
	const result = babel.transform(code, {
		ast: true,
		code: false,
		plugins: ["syntax-jsx"],
	});

	const schema: SchemaNode[] = [];
	const body = result.ast?.program?.body || [];

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function walk(node: any) {
		if (!node) return;

		if (node.type === "ExpressionStatement") {
			walk(node.expression);
		} else if (node.type === "JSXElement") {
			const element = node;
			const name = element.openingElement.name.name;

			const props: Record<string, SchemaPropValue> = {};
			for (const attr of element.openingElement.attributes) {
				if (attr.type === "JSXAttribute") {
					const key = attr.name.name;
					const val = attr.value;
					if (val?.type === "StringLiteral") {
						props[key] = val.value;
					}
				}
			}

			const childrenText = element.children
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				.filter((c: any) => c.type === "JSXText")
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				.map((c: any) => c.value.trim())
				.filter(Boolean)
				.join(" ");

			schema.push({ type: name, props, text: childrenText });

			for (const child of element.children) {
				if (child.type === "JSXElement") {
					walk(child);
				}
			}
		}
	}

	for (const node of body) walk(node);

	return schema;
}

// -------------------- schema → React --------------------
function renderFromSchema(schema: SchemaNode[]) {
	return schema.map((node, index) => {
		const Comp = componentMap[node.type];
		if (!Comp) return null;

		const isVoidElement = ["Input", "img", "br", "hr"].includes(node.type); // 可扩展
		return isVoidElement ? (
			<Comp key={index} {...node.props} />
		) : (
			<Comp key={index} {...node.props}>
				{node.text}
			</Comp>
		);
	});
}

// -------------------- 主组件 --------------------
export default function Demo() {
	const [code, setCode] = useState<string>(
		`<Form>
  <Input placeholder="请输入姓名" />
  <Button type="primary">提交</Button>
</Form>`,
	);

	const [schema, setSchema] = useState<SchemaNode[]>([]);

	const handleEditorChange = (value: string | undefined) => {
		if (!value) return;
		setCode(value);
		try {
			const parsed = jsxToSchema(value);
			setSchema(parsed);
		} catch (err) {
			console.error("解析失败", err);
		}
	};

	useEffect(() => {
		try {
			const parsed = jsxToSchema(code);
			setSchema(parsed);
		} catch (err) {
			console.error("初始解析失败", err);
		}
	}, []);

	return (
		<div style={{ display: "flex", gap: 32 }}>
			<div style={{ width: "100%", height: 300, border: "1px solid #ccc" }}>
				<Editor
					height="100%"
					defaultLanguage="jsx"
					defaultValue={code}
					onChange={handleEditorChange}
					options={{
						minimap: { enabled: false },
						fontSize: 14,
						scrollBeyondLastLine: false,
						automaticLayout: true,
					}}
				/>
			</div>
			<div style={{ border: "1px solid #ccc", padding: 16, width: "50%" }}>
				{renderFromSchema(schema)}
				<div
					style={{
						marginTop: 20,
						borderTop: "1px dashed #ccc",
						paddingTop: 10,
					}}
				>
					<h4>Schema 结构:</h4>
					<pre style={{ fontSize: 12 }}>{JSON.stringify(schema, null, 2)}</pre>
				</div>
			</div>
		</div>
	);
}
