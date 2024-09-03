import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useInput";

import { Button, Form, Input } from "antd";
import { addPost } from "../reducers/post";

const PostForm = () => {
	const [text, onChangeText, setText] = useInput("");
	const { imagePaths } = useSelector((state) => state.post);
	const imageInput = useRef<HTMLInputElement>();
	const dispatch = useDispatch();
	const { addPostDone } = useSelector((state) => state.post);

	useEffect(() => {
		if (addPostDone) setText("");
	}, [addPostDone]);

	const onClickImageUpload = useCallback(() => {
		imageInput.current.click();
	}, [imageInput.current]);
	const onSubmit = useCallback(() => {
		dispatch(addPost(text));
	}, [text]);

	return (
		<>
			<input type="file" multiple hidden ref={imageInput} />
			<Form style={{ margin: "10px 0 20px" }} encType="multipart/form-data" onFinish={onSubmit}>
				<Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder="어떤 신기한 일이 있었나요?" />
				<div>
					<Button onClick={onClickImageUpload}>이미지 업로드</Button>
					<Button type="primary" style={{ float: "right" }} htmlType="submit">
						짹짹
					</Button>
				</div>
				<div>
					{imagePaths.map((path) => (
						<div key={path} style={{ display: "inline-block" }}>
							<img src={path} style={{ width: 200 }} alt={path} />
							<div>
								<Button>제거</Button>
							</div>
						</div>
					))}
				</div>
			</Form>
		</>
	);
};

export default PostForm;
