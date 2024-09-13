import { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import IPost from '../models/IPost';

import { Avatar, Button, Card, List, Popover } from 'antd';
import { EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined } from '@ant-design/icons';

import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import FollowButton from './FollowButton';
import { LIKE_POST_REQUEST, UNLIKE_POST_REQUEST, REMOVE_POST_REQUEST, RETWEET_REQUEST } from '../reducers/post';
import Link from 'next/link';

import moment from 'moment';
import { RootState } from '../store/configureStore';
moment.locale('ko');

const PostCard = ({ post }: { post: IPost }) => {
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const id = useSelector((state: RootState) => state?.user.me?.id);
    const liked = post.Likers?.find((v) => v.id === id);
    const { removePostLoading } = useSelector((state: RootState) => state.post);
    const dispatch = useDispatch();

    const onLike = useCallback(() => {
        if (!id) {
            return alert('로그인하세요');
        }
        dispatch({
            type: LIKE_POST_REQUEST,
            data: post.id,
        });
    }, []);
    const onUnlike = useCallback(() => {
        if (!id) {
            return alert('로그인하세요');
        }
        dispatch({
            type: UNLIKE_POST_REQUEST,
            data: post.id,
        });
    }, []);
    const onToggleCommentFormOpened = useCallback(() => setCommentFormOpened((prev) => !prev), []);
    const onRemovePost = useCallback(() => {
        if (!id) {
            return alert('로그인하세요');
        }
        dispatch({
            type: REMOVE_POST_REQUEST,
            data: post.id,
        });
    }, []);
    const onRetweet = useCallback(() => {
        if (!id) {
            return alert('로그인하세요');
        }
        dispatch({
            type: RETWEET_REQUEST,
            data: post.id,
        });
    }, [id]);
    return (
        <div style={{ marginBottom: 20 }}>
            <Card
                cover={post.Images[0] && <PostImages images={post.Images} />}
                actions={[
                    <RetweetOutlined key="retweet" onClick={onRetweet} />,
                    liked ? (
                        <HeartTwoTone key="heart" twoToneColor="#eb2f96" onClick={onUnlike} />
                    ) : (
                        <HeartOutlined key="heart" onClick={onLike} />
                    ),
                    <MessageOutlined key="comment" onClick={onToggleCommentFormOpened} />,
                    <Popover
                        key="more"
                        content={
                            <Button.Group>
                                {id && post.User.id === id ? (
                                    <>
                                        <Button>수정</Button>
                                        <Button type="dashed" onClick={onRemovePost} loading={removePostLoading}>
                                            삭제
                                        </Button>
                                    </>
                                ) : (
                                    <Button>신고</Button>
                                )}
                            </Button.Group>
                        }
                    >
                        <EllipsisOutlined />
                    </Popover>,
                ]}
                title={post.RetweetId ? `${post.User.nickname} retweeted this ↓` : null}
                extra={id && <FollowButton post={post} />}
            >
                {post.RetweetId && post.Retweet ? (
                    <Card
                        cover={
                            post.Retweet.Images && post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />
                        }
                    >
                        <span style={{ float: 'right' }}>{moment(post.createdAt).format('YYYY.MM.DD.')}</span>
                        <Card.Meta
                            avatar={
                                <Link href={`/user/${post.Retweet.User.id}`}>
                                    <Avatar>{post.Retweet.User.nickname[0]}</Avatar>
                                </Link>
                            }
                            title={post.Retweet.User.nickname}
                            description={<PostCardContent postData={post.Retweet.content} />}
                        />
                    </Card>
                ) : (
                    <>
                        <span style={{ float: 'right' }}>{moment(post.createdAt).format('YYYY.MM.DD.')}</span>
                        <Card.Meta
                            avatar={
                                <Link href={`/user/${post.User.id}`}>
                                    <Avatar>{post.User.nickname[0]}</Avatar>
                                </Link>
                            }
                            title={post.User.nickname}
                            description={<PostCardContent postData={post.content} />}
                        />
                    </>
                )}
            </Card>
            {commentFormOpened && (
                <div>
                    <CommentForm post={post} />
                    <List
                        header={`${post.Comments.length}개의 댓글`}
                        itemLayout="horizontal"
                        dataSource={post.Comments}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={item.User.nickname}
                                    avatar={
                                        <Link href={`/user/${item.User.id}`}>
                                            <Avatar>{item.User.nickname[0]}</Avatar>
                                        </Link>
                                    }
                                    description={item.content}
                                />
                            </List.Item>
                        )}
                    />
                </div>
            )}
        </div>
    );
};

export default PostCard;
