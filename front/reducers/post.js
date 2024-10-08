// import shortId from 'shortid';
import { produce } from '../util/produce';
// import { faker, fakerFA } from '@faker-js/faker';

export const initialState = {
    mainPosts: [],
    singlePost: null,
    imagePaths: [],
    hasMorePosts: true,
    loadPostsLoading: false,
    loadPostsDone: false,
    loadPostsError: null,
    loadPostLoading: false,
    loadPostDone: false,
    loadPostError: null,
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,
    updatePostLoading: false,
    updatePostDone: false,
    updatePostError: null,
    removePostLoading: false,
    removePostDone: false,
    removePostError: null,
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,
    likePostLoading: false,
    likePostDone: false,
    likePostError: null,
    unlikePostLoading: false,
    unlikePostDone: false,
    unlikePostError: null,
    uploadImagesLoading: false,
    uploadImagesDone: false,
    uploadImagesError: null,
    retweetLoading: false,
    retweetDone: false,
    retweetError: null,
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

// const dummyPost = (data) => ({
//     id: data.id,
//     content: data.content,
//     User: {
//         id: 1,
//         nickname: 'zero',
//     },
//     Images: [],
//     Comments: [],
// });
// const dummyComments = (nickname, content) => ({
//     id: shortId.generate(),
//     User: { id: shortId.generate(), nickname },
//     content,
// });

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

// export const loadPosts = (data) => ({
//     type: LOAD_POSTS_REQUEST,
//     data,
// });
// export const addPost = (data) => ({
//     type: ADD_POST_REQUEST,
//     data,
// });
// export const removePost = (data) => ({
//     type: REMOVE_POST_REQUEST,
//     data,
// });
// export const addComment = (data) => ({
//     type: ADD_COMMENT_REQUEST,
//     data,
// });
// export const likePost = (data) => ({});

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case LOAD_POSTS_REQUEST:
            case LOAD_USER_POSTS_REQUEST:
            case LOAD_HASHTAG_POSTS_REQUEST:
                draft.loadPostsLoading = true;
                draft.loadPostsDone = false;
                draft.loadPostsError = null;
                break;
            case LOAD_POSTS_SUCCESS:
            case LOAD_USER_POSTS_SUCCESS:
            case LOAD_HASHTAG_POSTS_SUCCESS:
                draft.mainPosts = draft.mainPosts.concat(action.data);
                draft.loadPostsDone = true;
                draft.loadPostsLoading = false;
                draft.hasMorePosts = action.data.length === 10;
                break;
            case LOAD_POSTS_FAILURE:
            case LOAD_USER_POSTS_FAILURE:
            case LOAD_HASHTAG_POSTS_FAILURE:
                draft.loadPostsLoading = false;
                draft.loadPostsError = action.error;
                break;

            case LOAD_POST_REQUEST:
                draft.loadPostLoading = true;
                draft.loadPostDone = false;
                draft.loadPostError = null;
                break;
            case LOAD_POST_SUCCESS:
                draft.loadPostDone = true;
                draft.loadPostLoading = false;
                draft.singlePost = action.data;
                break;
            case LOAD_POST_FAILURE:
                draft.loadPostLoading = false;
                draft.loadPostError = action.error;
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
                draft.addPostLoading = false;
                draft.addPostDone = true;
                draft.mainPosts.unshift(action.data);
                draft.imagePaths = [];
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

            case UPDATE_POST_REQUEST:
                draft.updatePostLoading = true;
                draft.updatePostDone = false;
                draft.updatePostError = null;
                break;
            case UPDATE_POST_SUCCESS:
                draft.mainPosts.find((v) => v.id === action.data.PostId).content = action.data.content;
                draft.updatePostDone = true;
                draft.updatePostLoading = false;
                break;
            case UPDATE_POST_FAILURE:
                draft.updatePostLoading = false;
                draft.updatePostError = action.error;
                break;

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
                draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data.PostId);
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
            case LIKE_POST_REQUEST:
                draft.likePostLoading = true;
                draft.likePostDone = false;
                draft.likePostError = null;
                break;
            case LIKE_POST_SUCCESS: {
                const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
                post.Likers.push({ id: action.data.UserId });
                draft.likePostDone = true;
                draft.likePostLoading = false;
                break;
            }
            case LIKE_POST_FAILURE:
                draft.likePostLoading = false;
                draft.likePostError = action.error;
                break;

            case UNLIKE_POST_REQUEST:
                draft.unlikePostLoading = true;
                draft.unlikePostDone = false;
                draft.unlikePostError = null;
                break;
            case UNLIKE_POST_SUCCESS: {
                const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
                post.Likers = post.Likers.filter((v) => v.id !== action.data.UserId);
                draft.unlikePostDone = true;
                draft.unlikePostLoading = false;
                break;
            }
            case UNLIKE_POST_FAILURE:
                draft.unlikePostLoading = false;
                draft.unlikePostError = action.error;
                break;

            case UPLOAD_IMAGES_REQUEST:
                draft.uploadImagesLoading = true;
                draft.uploadImagesDone = false;
                draft.uploadImagesError = null;
                break;
            case UPLOAD_IMAGES_SUCCESS: {
                draft.imagePaths = draft.imagePaths.concat(action.data);
                draft.uploadImagesDone = true;
                draft.uploadImagesLoading = false;
                break;
            }
            case UPLOAD_IMAGES_FAILURE:
                draft.uploadImagesLoading = false;
                draft.uploadImagesError = action.error;
                break;
            case RETWEET_REQUEST:
                draft.retweetLoading = true;
                draft.retweetDone = false;
                draft.retweetError = null;
                break;
            case RETWEET_SUCCESS: {
                draft.mainPosts.unshift(action.data);
                draft.retweetDone = true;
                draft.retweetLoading = false;
                break;
            }
            case RETWEET_FAILURE:
                draft.retweetLoading = false;
                draft.retweetError = action.error;
                break;

            case REMOVE_IMAGE:
                draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
                break;
            default:
                break;
        }
    });
};

export default reducer;
