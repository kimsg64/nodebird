import axios from "axios";
import shortId from "shortid";
import { all, delay, fork, put, takeLatest, throttle } from "redux-saga/effects";
import {
	ADD_COMMENT_FAILURE,
	ADD_COMMENT_REQUEST,
	ADD_COMMENT_SUCCESS,
	ADD_POST_FAILURE,
	ADD_POST_REQUEST,
	ADD_POST_SUCCESS,
	LOAD_POSTS_FAILURE,
	LOAD_POSTS_REQUEST,
	LOAD_POSTS_SUCCESS,
	REMOVE_POST_REQUEST,
	generateDummyPost,
} from "../reducers/post";
import { ADD_POST_TO_ME } from "../reducers/user";

function loadPostsAPI() {
	return axios.get("/api/loadposts");
}
function addPostAPI() {
	return axios.post("/api/addpost");
}
function addCommentAPI() {
	return axios.post("/api/addcomment");
}

function* loadPosts(action) {
	try {
		yield delay(1000);
		yield put({
			type: LOAD_POSTS_SUCCESS,
			data: generateDummyPost(10),
		});
	} catch (error) {
		yield put({
			type: LOAD_POSTS_FAILURE,
			data: error.reponse.data,
		});
	}
}
function* addPost(action) {
	try {
		yield delay(1000);
		// const result = yield call(addPostAPI);

		const id = shortId.generate();
		yield put({
			type: ADD_POST_SUCCESS,
			data: {
				id,
				content: action.data,
			},
		});
		yield put({
			type: ADD_POST_TO_ME,
			data: id,
		});
	} catch (error) {
		yield put({
			type: ADD_POST_FAILURE,
			data: error.reponse.data,
		});
	}
}
function* removePost(action) {
	try {
		yield delay(1000);
		// const result = yield call(removePostAPI);

		yield put({
			type: REMOVE_POST_SUCCESS,
			data: action.data,
		});
		yield put({
			type: REMOVE_POST_TO_ME,
			data: action.data,
		});
	} catch (error) {
		yield put({
			type: REMOVE_POST_FAILURE,
			data: error.reponse.data,
		});
	}
}
function* addComment(action) {
	try {
		yield delay(1000);
		// const result = yield call(addCommentAPI);
		yield put({
			type: ADD_COMMENT_SUCCESS,
			data: action.data,
		});
	} catch (error) {
		yield put({
			type: ADD_COMMENT_FAILURE,
			data: error.reponse.data,
		});
	}
}

function* watchLoadPosts() {
	yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}
function* watchAddPost() {
	yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchRemovePost() {
	yield takeLatest(REMOVE_POST_REQUEST, removePost);
}
function* watchAddComment() {
	yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
	yield all([fork(watchLoadPosts), fork(watchAddPost), fork(watchRemovePost), fork(watchAddComment)]);
}
