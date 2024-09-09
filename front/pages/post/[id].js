import { useRouter } from 'next/router';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_POST_REQUEST } from '../../reducers/post';
import { END } from 'redux-saga';
import axios from 'axios';
import wrapper from '../../store/configureStore';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';
import { useSelector } from 'react-redux';
import Head from 'next/head';

const Post = () => {
    const router = useRouter();
    const { id } = router.query;
    const singlePost = useSelector((state) => state.post);

    return (
        <AppLayout>
            <Head>
                <title>{singlePost.User?.nickname}님의 글</title>
                <meta name="description" content={singlePost.content} />

                {/* 이하 og들은 카카오톡, 페이스북 등으로 공유했을 때 표시되는 데이터 */}
                <meta name="og:title" content={`${singlePost.User?.nickname}님의 게시글`} />
                <meta name="og:description" content={singlePost.content} />
                <meta
                    name="og:image"
                    content={singlePost.Images[0] ? singlePost.Images[0].src : 'https://nodebird.com/favicon.ico'}
                />
                <meta name="og:url" content={`https://nodebird.com/post/${id}`} />
            </Head>
            <PostCard post={singlePost} />;
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
    context.store.dispatch({ type: LOAD_POST_REQUEST, data: context.params.id });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});

export default Post;
