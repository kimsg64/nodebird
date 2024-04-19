import { applyMiddleware, compose, createStore } from "redux";
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import reducer from "../reducers";
import rootSaga from "../sagas";

// const loggerMiddlerware =
// 	({ dispatch, getState }) =>
// 	(next) =>
// 	(action) => {
// 		console.log(action);
// 		return next(action);
// 	};

const configureStore = () => {
	const sagaMiddleware = createSagaMiddleware();
	const middlewares = [sagaMiddleware];
	const enchancer = process.env.NODE_ENV === "production" ? compose(applyMiddleware(...middlewares)) : composeWithDevTools(applyMiddleware(...middlewares));
	const store = createStore(reducer, enchancer);
	store.sagaTask = sagaMiddleware.run(rootSaga);
	return store;
};

const wrapper = createWrapper(configureStore, {
	debug: process.env.NODE_ENV === "development",
});

export type RootState = ReturnType<typeof configureStore>;
export type AppDispatch = ReturnType<typeof configureStore>;

export default wrapper;
