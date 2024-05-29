import shortId from "shortid";
import { produce } from "immer";
import { faker } from "@faker-js/faker";

export const initialState = {
	mainPosts: [],
	imagePaths: [],
	hasMorePosts: true,
	loadPostsLoading: false,
	loadPostsDone: false,
	loadPostsError: null,
	addPostLoading: false,
	addPostDone: false,
	addPostError: null,
	removePostLoading: false,
	removePostDone: false,
	removePostError: null,
	addCommentLoading: false,
	addCommentDone: false,
	addCommentError: null,
};

// export const generateDummyPost = (number) =>
// 	new Array(number).fill().map((v, i) => ({
// 		id: shortId.generate(),
// 		User: {
// 			id: shortId.generate(),
// 			nickname: faker.person.firstName(),
// 		},
// 		content: faker.lorem.paragraphs(),
// 		Images: [{ src: faker.image.url() }],
// 		Comments: [
// 			{
// 				User: {
// 					id: shortId.generate(),
// 					nickname: faker.person.firstName(),
// 				},
// 				content: faker.lorem.sentence(),
// 			},
// 		],
// 	}));

// initialState.mainPosts = initialState.mainPosts.concat(generateDummyPost(10));

const dummyPost = (data) => ({
	id: data.id,
	content: data.content,
	User: {
		id: 1,
		nickname: "zero",
	},
	Images: [],
	Comments: [],
});
const dummyComments = (nickname, content) => ({
	id: shortId.generate(),
	User: { id: shortId.generate(), nickname },
	content,
});

export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST";
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const loadPosts = (data) => ({
	type: LOAD_POSTS_REQUEST,
	data,
});
export const addPost = (data) => ({
	type: ADD_POST_REQUEST,
	data,
});
export const removePost = (data) => ({
	type: REMOVE_POST_REQUEST,
	data,
});
export const addComment = (data) => ({
	type: ADD_COMMENT_REQUEST,
	data,
});

const reducer = (state = initialState, action) => {
	return produce(state, (draft) => {
		switch (action.type) {
			case LOAD_POSTS_REQUEST:
				draft.loadPostsLoading = true;
				draft.loadPostsDone = false;
				draft.loadPostsError = null;
				break;
			case LOAD_POSTS_SUCCESS:
				draft.mainPosts = action.data.concat(draft.mainPosts);
				draft.loadPostsDone = true;
				draft.loadPostsLoading = false;
				draft.hasMorePosts = draft.mainPosts.length < 50;
				break;
			case LOAD_POSTS_FAILURE:
				draft.loadPostsLoading = false;
				draft.loadPostsError = action.error;
				break;

			// return {
			// 	...state,
			// 	addPostLoading: true,
			// 	addPostDone: false,
			// 	addPostError: null,
			// };
			case ADD_POST_REQUEST:
				draft.addPostLoading = true;
				draft.addPostDone = false;
				draft.addPostError = null;
				break;
			case ADD_POST_SUCCESS:
				draft.mainPosts.unshift(action.data);
				draft.addPostDone = true;
				draft.addPostLoading = false;
				break;
			// return {
			// 	...state,
			// 	mainPosts: [dummyPost(action.data), ...state.mainPosts],
			// 	addPostDone: true,
			// 	addPostLoading: false,
			// };
			case ADD_POST_FAILURE:
				draft.addPostLoading = false;
				draft.addPostError = action.error;
				break;
			// return {
			// 	...state,
			// 	addPostLoading: false,
			// 	addPostError: action.error,
			// };

			case REMOVE_POST_REQUEST:
				draft.removePostLoading = true;
				draft.removePostDone = false;
				draft.removePostError = null;
				break;
			// return {
			// 	...state,
			// 	removePostLoading: true,
			// 	removePostDone: false,
			// 	removePostError: null,
			// };
			case REMOVE_POST_SUCCESS:
				draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
				draft.removePostDone = true;
				draft.removePostLoading = false;
				break;
			// return {
			// 	...state,
			// 	mainPosts: state.mainPosts.filter((v) => v.id !== action.data),
			// 	removePostDone: true,
			// 	removePostLoading: false,
			// };
			case REMOVE_POST_FAILURE:
				draft.removePostLoading = false;
				draft.removePostError = action.error;
				break;
			// return {
			// 	...state,
			// 	removePostLoading: false,
			// 	removePostError: action.error,
			// };

			case ADD_COMMENT_REQUEST:
				draft.addCommentLoading = true;
				draft.addCommentDone = false;
				draft.addCommentError = null;
				break;
			// return {
			// 	...state,
			// 	addCommentLoading: true,
			// 	addCommentDone: false,
			// 	addCommentError: null,
			// };
			case ADD_COMMENT_SUCCESS:
				const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
				// post.Comments.unshift(dummyComments(post.User.nickname, action.data.content));
				post.Comments.unshift(action.data);
				draft.addCommentDone = true;
				draft.addCommentLoading = false;
				break;

			// const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
			// const post = { ...state.mainPosts[postIndex] };
			// post.Comments = [dummyComments(post.User.nickname, action.data.content), ...post.Comments];
			// const mainPosts = [...state.mainPosts];
			// mainPosts[postIndex] = post;
			// return {
			// 	...state,
			// 	mainPosts,
			// 	addCommentDone: true,
			// 	addCommentLoading: false,
			// };
			case ADD_COMMENT_FAILURE:
				draft.addCommentLoading = false;
				draft.addCommentError = action.error;
				break;
			// return {
			// 	...state,
			// 	addCommentLoading: false,
			// 	addCommentError: action.error,
			// };
			default:
				break;
		}
	});
};

export default reducer;
