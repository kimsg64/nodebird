import { Form, Input } from "antd";
import React, { useMemo } from "react";

const NicknameEditForm = () => {
	const formStyle = useMemo(() => ({ marginBottom: 20, border: "1px solid #d9d9d9", padding: 20 }), []);
	return (
		<Form style={formStyle}>
			<Input.Search addonBefore="닉네임" enterButton="수정" />
		</Form>
	);
};

export default NicknameEditForm;
