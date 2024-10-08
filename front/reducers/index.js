import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import user from './user';
import post from './post';

// const rootReducer = combineReducers({
// 	index: (state = {}, action) => {
// 		switch (action.type) {
// 			case HYDRATE:
// 				return { ...state, ...action.payload };
// 			default:
// 				return state;
// 		}
// 	}, // index reducer for HYDRATE case
// 	user, // user reducer
// 	post, // post reducer
// });

const rootReducer = (state, action) => {
    switch (action.type) {
        case HYDRATE:
            console.log('HYDRATE', action);
            return action.payload;
        default: {
            const combinedReducer = combineReducers({
                user,
                post,
            });
            return combinedReducer(state, action);
        }
    }
};

export default rootReducer;
