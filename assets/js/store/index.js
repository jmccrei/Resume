/**
 * Copyright (c) 2020
 * Author: Josh McCreight<josh@joshmccreight.ca>
 */
import reducer from "../reducers";
import {applyMiddleware, createStore} from "redux";
import createSagaMiddleware from 'redux-saga';
import {logger} from "redux-logger";
import rootSaga from "../sagas";

// get our middleware
const sagaMiddleware = createSagaMiddleware();

// create a store with our main reducer
const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);

export default store;