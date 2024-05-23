import { useCallback } from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from "../reducers/user";

const FollowButton = ({ post }) => {
	const dispatch = useDispatch();
	const { me, followLoading, unfollowLoading } = useSelector((state) => state.user);
	const isFollowing = me?.Followings?.find((v) => v.id === post.User.id);
	const onClickButton = useCallback(() => {
		console.log("me", me);
		console.log("postid", post.id);
		console.log("is following?", isFollowing);
		console.log("post", post);
		if (isFollowing) {
			dispatch({ type: UNFOLLOW_REQUEST, data: post.User.id });
		} else {
			dispatch({ type: FOLLOW_REQUEST, data: post.User.id });
		}
	}, [isFollowing]);

	return (
		<Button loading={followLoading || unfollowLoading} onClick={onClickButton}>
			{isFollowing ? "언팔로우" : "팔로우"}
		</Button>
	);
};

export default FollowButton;
