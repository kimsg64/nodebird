import axios from "axios";
import { all, delay, fork, put, takeLatest } from "redux-saga/effects";
import { LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS } from "../reducers/user";

function logInAPI(data) {
	return axios.post("/api/login", data);
}
function logOutAPI() {
	return axios.post("/api/logout");
}
function signUpAPI(data) {
	return axios.post("/api/signup", data);
}

function* logIn(action) {
	try {
		yield delay(1000);
		// const result = yield call(logInAPI, action.data);
		console.log("data!!!", action.data);
		yield put({
			type: LOG_IN_SUCCESS,
			// data: result.data,
			data: action.data,
		});
	} catch (error) {
		console.log("error!!!", error);
		yield put({
			type: LOG_IN_FAILURE,
			error: error.reponse.data,
		});
	}
}
function* logOut() {
	try {
		yield delay(1000);
		// const result = yield call(logOutAPI);
		yield put({
			type: LOG_OUT_SUCCESS,
			// data: result.data,
		});
	} catch (error) {
		yield put({
			type: LOG_OUT_FAILURE,
			error: error.reponse.data,
		});
	}
}
function* signUp(action) {
	try {
		yield delay(1000);
		// const result = yield call(logInAPI, action.data);
		yield put({
			type: SIGN_UP_SUCCESS,
			// data: result.data,
			data: action.data,
		});
	} catch (error) {
		yield put({
			type: SIGN_UP_FAILURE,
			error: error.reponse.data,
		});
	}
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

export default function* userSaga() {
	yield all([fork(watchSignUp), fork(watchLogIn), fork(watchLogOut)]);
}
