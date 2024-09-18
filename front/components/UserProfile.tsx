import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';

import { Avatar, Button, Card } from 'antd';
import Link from 'next/link';
import { RootState } from '../store/configureStore';

const UserProfile = () => {
    const dispatch = useDispatch();
    const { me, logOutLoading } = useSelector((state: RootState) => state.user);

    const onLogout = useCallback(() => {
        dispatch(logoutRequestAction);
    }, []);

    return (
        <Card
            actions={[
                <div key="twit">
                    <Link href={`/user/${me.id}`} prefetch={false}>
                        짹짹
                        <br />
                        {me.Posts.length}
                    </Link>
                </div>,
                <div key="followings">
                    팔로잉
                    <br />
                    {me.Followings.length}
                </div>,
                <div key="followers">
                    팔로워
                    <br />
                    {me.Followers.length}
                </div>,
            ]}
        >
            <Card.Meta
                avatar={
                    <Link href={`/user/${me.id}`} prefetch={false}>
                        <Avatar>{me.nickname[0]}</Avatar>
                    </Link>
                }
                title={me.nickname}
            />
            <Button onClick={onLogout} loading={logOutLoading}>
                로그아웃
            </Button>
        </Card>
    );
};

export default UserProfile;
