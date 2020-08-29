/**
 * Copyright (c) 2020
 * Author: Josh McCreight<josh@joshmccreight.ca>
 */
/*
    Using sagas to perform communications between the ui and the backend
    By placing ALL these calls within a saga, they are protected from faults
    and we can make calls back through dispatch to relay the status of the
    remote request. All without pausing the main application
 */

import {all} from "redux-saga/effects";
import fetchTranslationsWatcherSaga from "./translations_saga";
import sendContactWatcherSaga from "./send_contact_saga";

// noinspection JSValidateJSDoc
/**
 * Export the rootSaga
 *
 * @returns {Generator<CombinatorEffect<"ALL", Generator<SimpleEffect<"FORK", ForkEffectDescriptor<never>>, void, *>>, void, *>}
 */
export default function* rootSaga() {
    yield all([fetchTranslationsWatcherSaga(), sendContactWatcherSaga()])
}