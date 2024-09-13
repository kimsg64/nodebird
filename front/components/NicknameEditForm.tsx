import { Form, Input } from 'antd';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';
import { RootState } from '../store/configureStore';

const NicknameEditForm = () => {
    const formStyle = useMemo(() => ({ marginBottom: 20, border: '1px solid #d9d9d9', padding: 20 }), []);
    const me = useSelector((state: RootState) => state.user);
    const [nickname, onChangeNickname] = useInput(me?.nickname || '');
    const dispatch = useDispatch();

    const onSubmit = useCallback(() => {
        dispatch({
            type: CHANGE_NICKNAME_REQUEST,
            data: nickname,
        });
    }, [nickname]);

    return (
        <Form style={formStyle} onFinish={onSubmit}>
            <Input.Search value={nickname} onChange={onChangeNickname} addonBefore="닉네임" enterButton="수정" />
        </Form>
    );
};

export default NicknameEditForm;
