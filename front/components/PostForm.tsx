import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';

import { Button, Form, Input } from 'antd';
import { UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE, ADD_POST_REQUEST } from '../reducers/post';
import { RootState } from '../store/configureStore';

const PostForm = () => {
    const [text, onChangeText, setText] = useInput('');
    const { imagePaths } = useSelector((state: RootState) => state.post);
    const imageInput = useRef<HTMLInputElement>();
    const dispatch = useDispatch();
    const { addPostDone } = useSelector((state: RootState) => state.post);

    useEffect(() => {
        if (addPostDone) setText('');
    }, [addPostDone]);

    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);
    const onSubmit = useCallback(() => {
        if (!text || !text.trim()) {
            return alert('게시글 작성하세요');
        }
        const formData = new FormData();
        imagePaths.forEach((p) => {
            formData.append('image', p);
        });
        formData.append('content', text);
        return dispatch({
            type: ADD_POST_REQUEST,
            data: formData,
        });
    }, [text, imagePaths]);
    const onChangeImages = useCallback((e) => {
        console.log('images', e.target.files);
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append('image', f);
        });
        dispatch({
            type: UPLOAD_IMAGES_REQUEST,
            data: imageFormData,
        });
    }, []);
    const onRemoveImage = useCallback(
        (index) => () => {
            dispatch({
                type: REMOVE_IMAGE,
                data: index,
            });
        },
        []
    );

    return (
        <>
            <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
                <Input.TextArea
                    value={text}
                    onChange={onChangeText}
                    maxLength={140}
                    placeholder="어떤 신기한 일이 있었나요?"
                />
                <div>
                    <input
                        style={{ opacity: 0 }}
                        type="file"
                        name="image"
                        multiple
                        ref={imageInput}
                        onChange={onChangeImages}
                    />
                    <Button onClick={onClickImageUpload}>Upload Images</Button>
                    <Button type="primary" style={{ float: 'right' }} htmlType="submit">
                        짹짹
                    </Button>
                </div>
                <div>
                    {imagePaths.map((path, idx) => (
                        <div key={path} style={{ display: 'inline-block' }}>
                            <img src={`http://localhost:3065/${path}`} style={{ width: 200 }} alt={path} />
                            <div>
                                <Button onClick={onRemoveImage(idx)}>제거</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Form>
        </>
    );
};

export default PostForm;
