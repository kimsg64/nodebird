import { produce } from 'immer';

export const initialState = {
    loadUserLoading: false,
    loadUserError: null,
    loadUserDone: false,
    logInLoading: false,
    logInError: null,
    logInDone: false,
    logOutLoading: false,
    logOutError: null,
    logOutDone: false,
    signUpLoading: false,
    signUpError: null,
    signUpDone: false,
    changeNicknameLoading: false,
    changeNicknameError: null,
    changeNicknameDone: false,
    followLoading: false,
    followError: null,
    followDone: false,
    unfollowLoading: false,
    unfollowError: null,
    unfollowDone: false,
    removeFollowerLoading: false,
    removeFollowerError: null,
    removeFollowerDone: false,
    loadFollowersLoading: false,
    loadFollowersError: null,
    loadFollowersDone: false,
    loadFollowingsLoading: false,
    loadFollowingsError: null,
    loadFollowingsDone: false,

    me: null,
    singUpData: {},
    loginData: {},
};

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE';

export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST';
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_REQUEST';

export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST';
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS';
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

// action creater
export const loginRequestAction = (data) => {
    return { type: LOG_IN_REQUEST, data };
};
export const logoutRequestAction = { type: LOG_OUT_REQUEST };
export const signUpRequestAction = (data) => {
    return { type: SIGN_UP_REQUEST, data };
};
export const changeNicknameRequestAction = (data) => {
    return { type: CHANGE_NICKNAME_REQUEST, data };
};

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case LOAD_USER_REQUEST:
                draft.loadUserLoading = true;
                draft.loadUserError = null;
                draft.loadUserDone = false;
                break;
            case LOAD_USER_SUCCESS:
                draft.loadUserLoading = false;
                draft.loadUserDone = true;
                draft.me = action.data;
                break;
            case LOAD_USER_FAILURE:
                draft.loadUserLoading = false;
                draft.loadUserError = action.error;
                break;
            case LOG_IN_REQUEST:
                draft.logInLoading = true;
                draft.logInError = null;
                draft.logInDone = false;
                break;
            // return {
            // 	...state,
            // 	logInLoading: true,
            // 	logInError: null,
            // 	logInDone: false,
            // };
            case LOG_IN_SUCCESS:
                draft.logInLoading = false;
                draft.logInDone = true;
                draft.me = action.data;
                break;
            // return {
            // 	...state,
            // 	logInLoading: false,
            // 	logInDone: true,
            // 	me: dummyUser(action.data),
            // };
            case LOG_IN_FAILURE:
                draft.logInLoading = false;
                draft.logInError = action.error;
                break;
            // return {
            // 	...state,
            // 	logInLoading: false,
            // 	logInError: action.error,
            // };

            case LOG_OUT_REQUEST:
                draft.logOutLoading = true;
                draft.logOutDone = false;
                draft.logOutError = null;
                break;
            // return {
            // 	...state,
            // 	logOutLoading: true,
            // 	logOutDone: false,
            // 	logOutError: null,
            // };
            case LOG_OUT_SUCCESS:
                draft.logOutLoading = false;
                draft.logOutDone = true;
                draft.me = null;
                break;
            // return {
            // 	...state,
            // 	logOutLoading: false,
            // 	logOutDone: true,
            // 	me: null,
            // };
            case LOG_OUT_FAILURE:
                draft.logOutLoading = false;
                draft.logOutError = action.error;
                break;
            // return {
            // 	...state,
            // 	logOutLoading: false,
            // 	logOutError: action.error,
            // };

            case SIGN_UP_REQUEST:
                draft.signUpLoading = true;
                draft.signUpError = null;
                draft.signUpDone = false;
                break;
            // return {
            // 	...state,
            // 	signUpLoading: true,
            // 	signUpError: null,
            // 	signUpDone: false,
            // };
            case SIGN_UP_SUCCESS:
                draft.signUpLoading = false;
                draft.signUpDone = true;
                break;
            // return {
            // 	...state,
            // 	signUpLoading: false,
            // 	signUpDone: true,
            // 	me: dummyUser(action.data),
            // };
            case SIGN_UP_FAILURE:
                draft.signUpLoading = false;
                draft.signUpError = action.error;
                break;
            // return {
            // 	...state,
            // 	signUpLoading: false,
            // 	signUpError: action.error,
            // };

            case CHANGE_NICKNAME_REQUEST:
                draft.changeNicknameLoading = true;
                draft.changeNicknameError = null;
                draft.changeNicknameDone = false;
                break;
            // return {
            // 	...state,
            // 	changeNicknameLoading: true,
            // 	changeNicknameError: null,
            // 	changeNicknameDone: false,
            // };
            case CHANGE_NICKNAME_SUCCESS:
                draft.me.nickname = action.data.nickname;
                draft.changeNicknameLoading = false;
                draft.changeNicknameDone = true;
                break;
            // return {
            // 	...state,
            // 	changeNicknameLoading: false,
            // 	changeNicknameDone: true,
            // };
            case CHANGE_NICKNAME_FAILURE:
                draft.changeNicknameLoading = false;
                draft.changeNicknameError = action.error;
                break;
            // return {
            // 	...state,
            // 	changeNicknameLoading: false,
            // 	changeNicknameError: action.error,
            // };
            // };

            case FOLLOW_REQUEST:
                draft.followLoading = true;
                draft.followError = null;
                draft.followDone = false;
                break;
            case FOLLOW_SUCCESS:
                draft.followLoading = false;
                draft.followDone = true;
                draft.me.Followings.push({ id: action.data.UserId });
                break;
            case FOLLOW_FAILURE:
                draft.followLoading = false;
                draft.followError = action.error;
                break;
            case UNFOLLOW_REQUEST:
                draft.unfollowLoading = true;
                draft.unfollowError = null;
                draft.unfollowDone = false;
                break;
            case UNFOLLOW_SUCCESS:
                draft.unfollowLoading = false;
                draft.unfollowDone = true;
                draft.me.Followings = draft.me.Followings.filter((v) => v.id !== action.data.UserId);
                break;
            case UNFOLLOW_FAILURE:
                draft.unfollowLoading = false;
                draft.unfollowError = action.error;
                break;
            case REMOVE_FOLLOWER_REQUEST:
                draft.removeFollowerLoading = true;
                draft.removeFollowerError = null;
                draft.removeFollowerDone = false;
                break;
            case REMOVE_FOLLOWER_SUCCESS:
                draft.removeFollowerLoading = false;
                draft.removeFollowerDone = true;
                draft.me.Followers = draft.me.Followers.filter((v) => v.id !== action.data.UserId);
                break;
            case REMOVE_FOLLOWER_FAILURE:
                draft.removeFollowerLoading = false;
                draft.removeFollowerError = action.error;
                break;

            case LOAD_FOLLOWERS_REQUEST:
                draft.loadFollowersLoading = true;
                draft.loadFollowersError = null;
                draft.loadFollowersDone = false;
                break;
            case LOAD_FOLLOWERS_SUCCESS:
                draft.loadFollowersLoading = false;
                draft.loadFollowersDone = true;
                draft.me.Followers = action.data;
                break;
            case LOAD_FOLLOWERS_FAILURE:
                draft.loadFollowersLoading = false;
                draft.loadFollowersError = action.error;
                break;

            case LOAD_FOLLOWINGS_REQUEST:
                draft.loadFollowingsLoading = true;
                draft.loadFollowingsError = null;
                draft.loadFollowingsDone = false;
                break;
            case LOAD_FOLLOWINGS_SUCCESS:
                draft.loadFollowingsLoading = false;
                draft.loadFollowingsDone = true;
                draft.me.Followings = action.data;
                break;
            case LOAD_FOLLOWINGS_FAILURE:
                draft.loadFollowingsLoading = false;
                draft.loadFollowingsError = action.error;
                break;

            case ADD_POST_TO_ME:
                draft.me.Posts.unshift({ id: action.data });
                break;
            // return {
            // 	...state,
            // 	me: {
            // 		...state.me,
            // 		Posts: [{ id: action.data }, ...state.me.Posts],
            // 	},
            // };
            case REMOVE_POST_OF_ME:
                draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data);
                break;
            // return {
            // 	...state,
            // 	me: {
            // 		...state.me,
            // 		Posts: state.me.Posts.filter((v) => v.id !== action.data),
            // 	},
            // };

            default:
                break;
            // default:
            // 	return state;
        }
    });
};

export default reducer;
