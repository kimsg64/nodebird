import { FormEventHandler, useCallback, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import { loginRequestAction } from '../reducers/user';
import useInput from '../hooks/useInput';

import { Button, Form, Input } from 'antd';
import styled from 'styled-components';
import { RootState } from '../store/configureStore';

const FormWrapper = styled(Form)`
    padding: 10px;
`;

const LoginForm = () => {
    const dispatch = useDispatch();
    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');
    const { logInLoading, logInError } = useSelector((state: RootState) => state.user);

    const buttonWrapperStyle = useMemo(() => ({ marginTop: 10 }), []);

    useEffect(() => {
        if (logInError) {
            console.log('error', logInError);
            alert(logInError);
        }
    }, [logInError]);

    const onSubmitForm: FormEventHandler = useCallback(() => {
        dispatch(loginRequestAction({ email, password }));
    }, [email, password]);

    return (
        <FormWrapper onFinish={onSubmitForm}>
            <div>
                <label htmlFor="user-email">이메일</label>
                <br />
                <Input name="user-email" value={email} onChange={onChangeEmail} required />
            </div>
            <div>
                <label htmlFor="user-password">비밀번호</label>
                <br />
                <Input name="user-password" type="password" value={password} onChange={onChangePassword} required />
            </div>
            <div style={buttonWrapperStyle}>
                <Button type="primary" htmlType="submit" loading={logInLoading}>
                    로그인
                </Button>
                <Link href={'/signup'}>회원가입</Link>
            </div>
        </FormWrapper>
    );
};

export default LoginForm;
