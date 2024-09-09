import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../hooks/useInput';
import AppLayout from '../components/AppLayout';

import styled from 'styled-components';
import { Button, Checkbox, Form } from 'antd';
import { SIGN_UP_REQUEST } from '../reducers/user';

const ErrorMessage = styled.div`
    color: 'red';
`;

const Signup = () => {
    const [email, onChangeEmail] = useInput('');
    const [nickname, onChangeNickname] = useInput('');
    const [password, onChangePassword] = useInput('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [term, setTerm] = useState('');
    const [termError, setTermError] = useState(false);
    const dispatch = useDispatch();
    const { signUpLoading, signUpDone, signUpError, me } = useSelector((state) => state.user);

    useEffect(() => {
        if (me) {
            Router.replace('/');
        }
    }, [me]);
    useEffect(() => {
        if (signUpDone) Router.replace('/');
    }, [signUpDone]);
    useEffect(() => {
        if (signUpError) alert(signUpError);
    }, [signUpError]);

    const onChangePasswordCheck = useCallback(
        (event) => {
            setPasswordCheck(event.target.value);
            setPasswordError(event.target.value !== password);
        },
        [password]
    );
    const onChangeTerm = useCallback(
        (event) => {
            setTerm(event.target.checked);
            setTermError(false);
        },
        [term]
    );
    const onSubmit = useCallback(() => {
        if (password !== passwordCheck) {
            return setPasswordError(true);
        }
        if (!term) {
            return setTermError(true);
        }
        console.log(email, nickname, password);

        dispatch({
            type: SIGN_UP_REQUEST,
            data: { email, password, nickname },
        });
    }, [password, passwordCheck, term]);

    return (
        <AppLayout>
            <Head>
                <title>회원가입 | NodeBird</title>
            </Head>
            <Form onFinish={onSubmit}>
                <div>
                    <label htmlFor="user-email">아이디</label>
                    <br />
                    <input name="user-email" required value={email} onChange={onChangeEmail} />
                </div>
                <div>
                    <label htmlFor="user-nickname">닉네임</label>
                    <br />
                    <input name="user-nickname" required value={nickname} onChange={onChangeNickname} />
                </div>
                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <br />
                    <input type="password" name="user-password" required value={password} onChange={onChangePassword} />
                </div>
                <div>
                    <label htmlFor="user-password-check">비밀번호 체크</label>
                    <br />
                    <input
                        type="password"
                        name="user-password-check"
                        required
                        value={passwordCheck}
                        onChange={onChangePasswordCheck}
                    />
                    {passwordError && <ErrorMessage>비밀번호 불일치</ErrorMessage>}
                </div>
                <div>
                    <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
                        동의합니다.
                    </Checkbox>
                    {termError && <ErrorMessage>동의하세요!</ErrorMessage>}
                </div>
                <div style={{ marginTop: 10 }}>
                    <Button type="primary" htmlType="submit" loading={signUpLoading}>
                        가입하기
                    </Button>
                </div>
            </Form>
        </AppLayout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    console.log('context', context);
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({ type: LOAD_MY_INFO_REQUEST });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});

export default Signup;
