import axios from "axios";
import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import {
	FOLLOW_FAILURE,
	FOLLOW_REQUEST,
	FOLLOW_SUCCESS,
	LOAD_USER_FAILURE,
	LOAD_USER_REQUEST,
	LOAD_USER_SUCCESS,
	LOG_IN_FAILURE,
	LOG_IN_REQUEST,
	LOG_IN_SUCCESS,
	LOG_OUT_FAILURE,
	LOG_OUT_REQUEST,
	LOG_OUT_SUCCESS,
	SIGN_UP_FAILURE,
	SIGN_UP_REQUEST,
	SIGN_UP_SUCCESS,
	UNFOLLOW_FAILURE,
	UNFOLLOW_REQUEST,
	UNFOLLOW_SUCCESS,
} from "../reducers/user";

function loadUserAPI() {
	return axios.get("/user");
}
function* loadUser() {
	try {
		const result = yield call(loadUserAPI);
		yield put({
			type: LOAD_USER_SUCCESS,
			data: result.data,
		});
	} catch (error) {
		console.log("error", error);
		yield put({
			type: LOAD_USER_FAILURE,
			error: error.response.data,
		});
	}
}

function logInAPI(data) {
	return axios.post("/user/login", data);
}
function* logIn(action) {
	try {
		yield delay(1000);
		const result = yield call(logInAPI, action.data);
		yield put({
			type: LOG_IN_SUCCESS,
			data: result.data,
		});
	} catch (error) {
		console.log("error", error);
		yield put({
			type: LOG_IN_FAILURE,
			error: error.response.data,
		});
	}
}

function logOutAPI() {
	return axios.post("/user/logout");
}
function* logOut() {
	try {
		yield call(logOutAPI);
		yield put({
			type: LOG_OUT_SUCCESS,
			// data: result.data,
		});
	} catch (error) {
		yield put({
			type: LOG_OUT_FAILURE,
			error: error.response.data,
		});
	}
}

function signUpAPI(data) {
	return axios.post("/user", data);
}
function* signUp(action) {
	try {
		const result = yield call(signUpAPI, action.data);
		console.log("signup result", result);
		yield put({
			type: SIGN_UP_SUCCESS,
		});
	} catch (error) {
		yield put({
			type: SIGN_UP_FAILURE,
			error: error.response.data,
		});
	}
}
function* follow(action) {
	try {
		yield delay(1000);
		yield put({
			type: FOLLOW_SUCCESS,
			data: action.data,
		});
	} catch (error) {
		yield put({
			type: FOLLOW_FAILURE,
			error: error.response.data,
		});
	}
}
function* unfollow(action) {
	try {
		yield delay(1000);
		yield put({
			type: UNFOLLOW_SUCCESS,
			data: action.data,
		});
	} catch (error) {
		yield put({
			type: UNFOLLOW_FAILURE,
			error: error.response.data,
		});
	}
}

function* watchLoadUser() {
	yield takeLatest(LOAD_USER_REQUEST, loadUser);
}
function* watchLogIn() {
	yield takeLatest(LOG_IN_REQUEST, logIn);
}
function* watchLogOut() {
	yield takeLatest(LOG_OUT_REQUEST, logOut);
}
function* watchSignUp() {
	yield takeLatest(SIGN_UP_REQUEST, signUp);
}
function* watchFollow() {
	yield takeLatest(FOLLOW_REQUEST, follow);
}
function* watchUnfollow() {
	yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

export default function* userSaga() {
	yield all([fork(watchLoadUser), fork(watchSignUp), fork(watchLogIn), fork(watchLogOut), fork(watchFollow), fork(watchUnfollow)]);
}
