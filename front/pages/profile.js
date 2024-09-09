import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';

import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';

import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { useRouter } from 'next/navigation';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';
import axios from 'axios';

const fetcher = (url) => axios.get(url, { withCredentials: true }).then((result) => result.data);

const Profile = () => {
    const dispatch = useDispatch();
    const [followersLimit, setFollowersLimit] = useState(3);
    const [followingsLimit, setFollowingsLimit] = useState(3);
    const { me } = useSelector((state) => state.user);
    const { data: followers, error: followerError } = useSWR(
        `http://localhost3065/user/followers?limit=${followersLimit}`,
        fetcher
    );
    const { data: followings, error: followingError } = useSWR(
        `http://localhost3065/user/followings?limit=${followingsLimit}`,
        fetcher
    );
    const router = useRouter();

    useEffect(() => {
        if (!(me && me.id)) {
            router.push('/');
        }
    }, [me && me.id]);

    const loadMoreFollowings = useCallback(() => {
        setFollowingsLimit((prev) => prev + 3);
    }, []);
    const loadMoreFollowers = useCallback(() => {
        setFollowersLimit((prev) => prev + 3);
    }, []);

    if (!me) {
        return '내 정보 로딩 중...';
    }
    if (followerError || followingError) {
        console.error(followerError || followingError);
        return <div>팔로잉/팔로워 로딩 중 에러가 발생합니다</div>;
    }

    return (
        <>
            <Head>
                <title>내 프로필 | NodeBird</title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <FollowList
                    header="팔로잉"
                    data={followings}
                    onClickMore={loadMoreFollowings}
                    loading={!followings && !followingError}
                />
                <FollowList
                    header="팔로워"
                    data={followers}
                    onClickMore={loadMoreFollowers}
                    loading={!followers && !followerError}
                />
            </AppLayout>
        </>
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

export default Profile;
