import axios from 'axios';
import shortId from 'shortid';
import { all, call, delay, fork, put, takeLatest, throttle } from 'redux-saga/effects';
import {
    ADD_COMMENT_FAILURE,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_POST_FAILURE,
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    LIKE_POST_FAILURE,
    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS,
    LOAD_HASHTAG_POSTS_FAILURE,
    LOAD_HASHTAG_POSTS_REQUEST,
    LOAD_HASHTAG_POSTS_SUCCESS,
    LOAD_POST_FAILURE,
    LOAD_POST_REQUEST,
    LOAD_POST_SUCCESS,
    LOAD_POSTS_FAILURE,
    LOAD_POSTS_REQUEST,
    LOAD_POSTS_SUCCESS,
    LOAD_USER_POSTS_FAILURE,
    LOAD_USER_POSTS_REQUEST,
    LOAD_USER_POSTS_SUCCESS,
    REMOVE_POST_FAILURE,
    REMOVE_POST_REQUEST,
    REMOVE_POST_SUCCESS,
    RETWEET_FAILURE,
    RETWEET_REQUEST,
    RETWEET_SUCCESS,
    UNLIKE_POST_FAILURE,
    UNLIKE_POST_REQUEST,
    UNLIKE_POST_SUCCESS,
    UPDATE_POST_FAILURE,
    UPDATE_POST_REQUEST,
    UPDATE_POST_SUCCESS,
    UPLOAD_IMAGES_FAILURE,
    UPLOAD_IMAGES_REQUEST,
    UPLOAD_IMAGES_SUCCESS,
} from '../reducers/post';
import { ADD_POST_TO_ME } from '../reducers/user';

function loadPostsAPI(lastId) {
    return axios.get(`/posts?lastId=${lastId || 0}`);
}
function* loadPosts(action) {
    try {
        const result = yield call(loadPostsAPI, action.lastId);
        yield put({
            type: LOAD_POSTS_SUCCESS,
            data: result.data,
        });
    } catch (error) {
        yield put({
            type: LOAD_POSTS_FAILURE,
            error: error.reponse.data,
        });
    }
}
function loadUserPostsAPI(data, lastId) {
    return axios.get(`/user/${data}?lastId=${lastId || 0}`);
}
function* loadUserPosts(action) {
    try {
        const result = yield call(loadUserPostsAPI, action.data, action.lastId);
        yield put({
            type: LOAD_USER_POSTS_SUCCESS,
            data: result.data,
        });
    } catch (error) {
        yield put({
            type: LOAD_USER_POSTS_FAILURE,
            error: error.reponse.data,
        });
    }
}
function loadHashtagPostsAPI(data, lastId) {
    // get 요청으로 한글이나 특수문자를 보낼 때는 encode가 필요하다
    return axios.get(`/hashtag/${encodeURIComponent(data)}?lastId=${lastId || 0}`);
}
function* loadHashtagPosts(action) {
    try {
        const result = yield call(loadHashtagPostsAPI, action.data, action.lastId);
        yield put({
            type: LOAD_HASHTAG_POSTS_SUCCESS,
            data: result.data,
        });
    } catch (error) {
        yield put({
            type: LOAD_HASHTAG_POSTS_FAILURE,
            error: error.reponse.data,
        });
    }
}

function loadPostAPI(data) {
    return axios.get(`/post/${data}`);
}
function* loadPost(action) {
    try {
        const result = yield call(loadPostAPI, action.data);
        console.log('result', result);
        yield put({
            type: LOAD_POST_SUCCESS,
            data: result.data,
        });
    } catch (error) {
        yield put({
            type: LOAD_POST_FAILURE,
            error: error.reponse.data,
        });
    }
}

function addPostAPI(data) {
    return axios.post('/post', data);
}
function* addPost(action) {
    try {
        const result = yield call(addPostAPI, action.data);

        // const id = shortId.generate();
        yield put({
            type: ADD_POST_SUCCESS,
            data: result.data,
        });
        yield put({
            type: ADD_POST_TO_ME,
            data: result.data.id,
        });
    } catch (error) {
        yield put({
            type: ADD_POST_FAILURE,
            error: error.reponse.data,
        });
    }
}
function updatePostAPI(data) {
    return axios.patch(`/post/${data.PostId}`, data);
}
function* updatePost(action) {
    try {
        const result = yield call(updatePostAPI, action.data);

        yield put({
            type: UPDATE_POST_SUCCESS,
            data: result.data,
        });
    } catch (error) {
        yield put({
            type: UPDATE_POST_FAILURE,
            error: error.reponse.data,
        });
    }
}
function removePostAPI(data) {
    return axios.delete(`/post/${data}`);
}
function* removePost(action) {
    try {
        const result = yield call(removePostAPI, action.data);

        yield put({
            type: REMOVE_POST_SUCCESS,
            data: result.data,
        });
    } catch (error) {
        yield put({
            type: REMOVE_POST_FAILURE,
            error: error.reponse.data,
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
            error: error.reponse.data,
        });
    }
}

function likePostAPI(data) {
    return axios.patch(`/post/${data}/like`);
}
function* likePost(action) {
    try {
        const result = yield call(likePostAPI, action.data);
        yield put({
            type: LIKE_POST_SUCCESS,
            data: result.data,
        });
    } catch (error) {
        console.error(error);
        yield put({
            type: LIKE_POST_FAILURE,
            error: error.reponse.data,
        });
    }
}

function unlikePostAPI(data) {
    return axios.delete(`/post/${data}/like`);
}
function* unlikePost(action) {
    try {
        const result = yield call(unlikePostAPI, action.data);
        yield put({
            type: UNLIKE_POST_SUCCESS,
            data: result.data,
        });
    } catch (error) {
        console.error(error);
        yield put({
            type: UNLIKE_POST_FAILURE,
            error: error.reponse.data,
        });
    }
}

function uploadImagesAPI(data) {
    return axios.post(`/post/images`, data);
}
function* uploadImages(action) {
    try {
        const result = yield call(uploadImagesAPI, action.data);
        yield put({
            type: UPLOAD_IMAGES_SUCCESS,
            data: result.data,
        });
    } catch (error) {
        console.error(error);
        yield put({
            type: UPLOAD_IMAGES_FAILURE,
            error: error.reponse.data,
        });
    }
}

function retweetAPI(data) {
    return axios.post(`/post/${data}/retweet`);
}
function* retweet(action) {
    try {
        const result = yield call(retweetAPI, action.data);
        yield put({
            type: RETWEET_SUCCESS,
            data: result.data,
        });
    } catch (error) {
        console.error(error);
        yield put({
            type: RETWEET_FAILURE,
            error: error.reponse.data,
        });
    }
}

function* watchLoadPosts() {
    // yield throttle(10000, LOAD_POSTS_REQUEST, loadPosts);
    yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}
function* watchLoadUserPosts() {
    yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts);
}
function* watchLoadHashtagPosts() {
    yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}
function* watchLoadPost() {
    yield takeLatest(LOAD_POST_REQUEST, loadPost);
}
function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchUpdatePost() {
    yield takeLatest(UPDATE_POST_REQUEST, updatePost);
}
function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}
function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
function* watchLikePost() {
    yield takeLatest(LIKE_POST_REQUEST, likePost);
}
function* watchUnlikePost() {
    yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}
function* watchUploadImages() {
    yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}
function* watchRetweet() {
    yield takeLatest(RETWEET_REQUEST, retweet);
}
export default function* postSaga() {
    yield all([
        fork(watchLoadPosts),
        fork(watchLoadUserPosts),
        fork(watchLoadHashtagPosts),
        fork(watchLoadPost),
        fork(watchAddPost),
        fork(watchUpdatePost),
        fork(watchRemovePost),
        fork(watchAddComment),
        fork(watchLikePost),
        fork(watchUnlikePost),
        fork(watchUploadImages),
        fork(watchRetweet),
    ]);
}
