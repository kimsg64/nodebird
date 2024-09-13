import { useCallback } from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';
import { RootState } from '../store/configureStore';

const FollowButton = ({ post }) => {
    const dispatch = useDispatch();
    const { me, followLoading, unfollowLoading } = useSelector((state: RootState) => state.user);
    const isFollowing = me?.Followings?.find((v) => v.id === post.User.id);
    const onClickButton = useCallback(() => {
        // console.log('me', me);
        // console.log('postid', post.id);
        // console.log('is following?', isFollowing);
        // console.log('post', post);
        if (isFollowing) {
            dispatch({ type: UNFOLLOW_REQUEST, data: post.User.id });
        } else {
            dispatch({ type: FOLLOW_REQUEST, data: post.User.id });
        }
    }, [isFollowing]);

    if (post.User.id === me.id) {
        return null;
    }

    return (
        <Button loading={followLoading || unfollowLoading} onClick={onClickButton}>
            {isFollowing ? '언팔로우' : '팔로우'}
        </Button>
    );
};

export default FollowButton;
