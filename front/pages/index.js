import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { LOAD_USER_REQUEST } from "../reducers/user";

const Home = () => {
	const dispatch = useDispatch();
	const { me } = useSelector((state) => state.user);
	const { mainPosts, hasMorePost, loadPostsLoading } = useSelector((state) => state.post);

	useEffect(() => {
		dispatch({ type: LOAD_USER_REQUEST });
		dispatch({ type: LOAD_POSTS_REQUEST });
	}, []);

	useEffect(() => {
		function onScroll() {
			// console.log("스크롤된 길이:", window.scrollY);
			// console.log("문서의 최상단부터 최하단까지의 길이:", document.documentElement.clientHeight);
			// console.log("문서의 최상단부터 최하단까지의 길이(스크롤 포함):", document.documentElement.scrollHeight);
			if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
				if (hasMorePost && !loadPostsLoading) {
					dispatch({ type: LOAD_POSTS_REQUEST });
				}
			}
		}
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, [hasMorePost, loadPostsLoading]);
	return (
		<AppLayout>
			{me && <PostForm />}
			{mainPosts.map((post) => (
				<PostCard key={post.id} post={post} />
			))}
		</AppLayout>
	);
};

export default Home;
