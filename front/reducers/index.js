import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";

import user from "./user";
import post from "./post";

const rootReducer = combineReducers({
	index: (state = {}, action) => {
		switch (action.type) {
			case HYDRATE:
				return { ...state, ...action.payload };
			default:
				return state;
		}
	}, // index reducer for HYDRATE case
	user, // user reducer
	post, // post reducer
});

export default rootReducer;
