import Link from 'next/link';
import { useSelector } from 'react-redux';

import styled from 'styled-components';
import { Input, Menu, Row, Col } from 'antd';

import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import useInput from '../hooks/useInput';
import { useCallback } from 'react';
import { useRouter } from 'next/router';

type Props = { children: React.ReactNode };

const SearchInput = styled(Input.Search)`
    vertical-align: middle;
`;

const AppLayout = ({ children }: Props) => {
    const [searchInput, onChangeSearchInput] = useInput('');
    const router = useRouter();
    const me = useSelector((state) => state?.user?.me);

    const onSearch = useCallback(() => {
        router.push(`/hashtag/${searchInput}`);
    }, [searchInput]);
    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item>
                    <Link href="/">노드버드</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/profile">프로필</Link>
                </Menu.Item>
                <Menu.Item>
                    <SearchInput enterButton value={searchInput} onChange={onChangeSearchInput} onSearch={onSearch} />
                </Menu.Item>
                <Menu.Item>
                    <Link href="/signup">회원가입</Link>
                </Menu.Item>
            </Menu>
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {me ? <UserProfile /> : <LoginForm />}
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    <a href="#" target="_blank" rel="noreferrer noopener">
                        Made By KimSG
                    </a>
                </Col>
            </Row>
        </div>
    );
};

export default AppLayout;
