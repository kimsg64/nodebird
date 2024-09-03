import axios from "axios";
import shortId from "shortid";
import { all, call, delay, fork, put, takeLatest, throttle } from "redux-saga/effects";
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
} from "../reducers/post";
import { ADD_POST_TO_ME } from "../reducers/user";

function loadPostsAPI(data) {
	return axios.get("/posts", data);
}

function* loadPosts(action) {
	try {
		const result = yield call(loadPostsAPI, action.data);
		yield put({
			type: LOAD_POSTS_SUCCESS,
			data: result.data,
		});
	} catch (error) {
		yield put({
			type: LOAD_POSTS_FAILURE,
			data: error.reponse.data,
		});
	}
}

function addPostAPI(data) {
	return axios.post("/post", { content: data });
}
function* addPost(action) {
	try {
		const result = yield call(addPostAPI, action.data);

		const id = shortId.generate();
		yield put({
			type: ADD_POST_SUCCESS,
			data: result.data,
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

function addCommentAPI(data) {
	return axios.post(`/post/${data.postId}/comment`, data);
}
function* addComment(action) {
	try {
		const result = yield call(addCommentAPI, action.data);
		yield put({
			type: ADD_COMMENT_SUCCESS,
			data: result.data,
		});
	} catch (error) {
		console.error(error);
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
