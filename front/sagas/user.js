import axios from 'axios';
import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import {
    CHANGE_NICKNAME_FAILURE,
    CHANGE_NICKNAME_REQUEST,
    CHANGE_NICKNAME_SUCCESS,
    FOLLOW_FAILURE,
    FOLLOW_REQUEST,
    FOLLOW_SUCCESS,
    LOAD_FOLLOWERS_FAILURE,
    LOAD_FOLLOWERS_REQUEST,
    LOAD_FOLLOWERS_SUCCESS,
    LOAD_FOLLOWINGS_FAILURE,
    LOAD_FOLLOWINGS_REQUEST,
    LOAD_FOLLOWINGS_SUCCESS,
    LOAD_MY_INFO_FAILURE,
    LOAD_MY_INFO_REQUEST,
    LOAD_MY_INFO_SUCCESS,
    LOAD_USER_INFO_FAILURE,
    LOAD_USER_INFO_REQUEST,
    LOAD_USER_INFO_SUCCESS,
    LOG_IN_FAILURE,
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_OUT_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    REMOVE_FOLLOWER_FAILURE,
    REMOVE_FOLLOWER_REQUEST,
    REMOVE_FOLLOWER_SUCCESS,
    SIGN_UP_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    UNFOLLOW_FAILURE,
    UNFOLLOW_REQUEST,
    UNFOLLOW_SUCCESS,
} from '../reducers/user';

function loadMyInfoAPI() {
    return axios.get('/user');
}
function* loadMyInfo() {
    try {
        const result = yield call(loadMyInfoAPI);
        console.log('this is loaded user', result);
        yield put({
            type: LOAD_MY_INFO_SUCCESS,
            data: result.data,
        });
    } catch (error) {
        console.log('error', error);
        yield put({
            type: LOAD_MY_INFO_FAILURE,
            error: error.response.data,
        });
    }
}
function loadUserInfoAPI() {
    return axios.get('/user');
}
function* loadUserInfo() {
    try {
        const result = yield call(loadUserInfoAPI);
        console.log('this is loaded user', result);
        yield put({
            type: LOAD_USER_INFO_SUCCESS,
            data: result.data,
        });
    } catch (error) {
        console.log('error', error);
        yield put({
            type: LOAD_USER_INFO_FAILURE,
            error: error.response.data,
        });
    }
}

function logInAPI(data) {
    return axios.post('/user/login', data);
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
        console.log('error', error);
        yield put({
            type: LOG_IN_FAILURE,
            error: error.response.data,
        });
    }
}

function logOutAPI() {
    return axios.post('/user/logout');
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
    return axios.post('/user', data);
}
function* signUp(action) {
    try {
        const result = yield call(signUpAPI, action.data);
        console.log('signup result', result);
        yield put({
            type: SIGN_UP_SUCCESS,
        });
    } catch (error) {
        console.log('signup ERROR', error);
        yield put({
            type: SIGN_UP_FAILURE,
            error: error.response.data,
        });
    }
}

function followAPI(data) {
    return axios.patch(`/user/${data}/follow`);
}
function* follow(action) {
    try {
        const result = yield call(followAPI, action.data);
        yield put({
            type: FOLLOW_SUCCESS,
            data: result.data,
        });
    } catch (error) {
        yield put({
            type: FOLLOW_FAILURE,
            error: error.response.data,
        });
    }
}
function unfollowAPI(data) {
    return axios.delete(`/user/${data}/follow`);
}
function* unfollow(action) {
    try {
        const result = yield call(unfollowAPI, action.data);
        yield put({
            type: UNFOLLOW_SUCCESS,
            data: result.data,
        });
    } catch (error) {
        yield put({
            type: UNFOLLOW_FAILURE,
            error: error.response.data,
        });
    }
}
function removeFollowerAPI(data) {
    return axios.delete(`/user/follower/${data}`);
}
function* removeFollower(action) {
    try {
        const result = yield call(removeFollowerAPI, action.data);
        yield put({
            type: REMOVE_FOLLOWER_SUCCESS,
            data: result.data,
        });
    } catch (error) {
        yield put({
            type: REMOVE_FOLLOWER_FAILURE,
            error: error.response.data,
        });
    }
}

function changeNicknameAPI(data) {
    return axios.patch('/user/nickname', { nickname: data });
}
function* changeNickname(action) {
    try {
        const result = yield call(changeNicknameAPI, action.data);
        yield put({
            type: CHANGE_NICKNAME_SUCCESS,
            data: result.data,
        });
    } catch (error) {
        yield put({
            type: CHANGE_NICKNAME_FAILURE,
            error: error.response.data,
        });
    }
}

function loadFollowersAPI(data) {
    return axios.get('/user/followers');
}
function* loadFollowers(action) {
    try {
        const result = yield call(loadFollowersAPI, action.data);
        yield put({
            type: LOAD_FOLLOWERS_SUCCESS,
            data: result.data,
        });
    } catch (error) {
        yield put({
            type: LOAD_FOLLOWERS_FAILURE,
            error: error.response.data,
        });
    }
}
function loadFollowingsAPI(data) {
    return axios.get('/user/followings');
}
function* loadFollowings(action) {
    try {
        const result = yield call(loadFollowingsAPI, action.data);
        yield put({
            type: LOAD_FOLLOWINGS_SUCCESS,
            data: result.data,
        });
    } catch (error) {
        yield put({
            type: LOAD_FOLLOWINGS_FAILURE,
            error: error.response.data,
        });
    }
}

function* watchLoadMyInfo() {
    yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}
function* watchLoadUserInfo() {
    yield takeLatest(LOAD_USER_INFO_REQUEST, loadUserInfo);
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
function* watchRemoveFollower() {
    yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}
function* watchChangeNickname() {
    yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}
function* watchLoadFollowers() {
    yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}
function* watchLoadFollowings() {
    yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

export default function* userSaga() {
    yield all([
        fork(watchLoadMyInfo),
        fork(watchLoadUserInfo),
        fork(watchSignUp),
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchFollow),
        fork(watchUnfollow),
        fork(watchRemoveFollower),
        fork(watchChangeNickname),
        fork(watchLoadFollowers),
        fork(watchLoadFollowings),
    ]);
}
