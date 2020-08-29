/**
 * Copyright (c) 2020
 * Author: Josh McCreight<josh@joshmccreight.ca>
 */
import {takeLatest} from 'redux-saga/effects'
import {SEND_CONTACT_EMAIL} from "../actions";
import axios from "axios";

/**
 * Super simple saga, no hooks, no callback, no additional dispatches
 * Just send the email request and leave it at that
 *
 * @param action
 * @returns {Generator<*, void, *>}
 */
function* sendContactSaga(action) {
    // using axios because fetch doesn't post easily
    axios.post(Routing.generate('contact_send'), action.payload)
        .then(() => {
        });
}

export default function* sendContactWatcherSaga() {
    yield takeLatest(SEND_CONTACT_EMAIL, sendContactSaga);
}
