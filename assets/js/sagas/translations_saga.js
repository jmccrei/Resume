/**
 * Copyright (c) 2020
 * Author: Josh McCreight<josh@joshmccreight.ca>
 */
import {put, takeLatest} from 'redux-saga/effects'
import {FETCH_TRANSLATIONS, FETCH_TRANSLATIONS_SUCCESS} from "../actions";
import {call} from "@redux-saga/core/effects";

// noinspection JSValidateJSDoc
/**
 * Fetch translations saga
 *
 * @returns {Generator<SimpleEffect<"PUT", PutEffectDescriptor<{payload: *, type: string}>>|SimpleEffect<"CALL", CallEffectDescriptor<SagaReturnType<function(): Promise<{}>>>>, void, *>}
 */
function* fetchTranslationsSaga() {
    function fetchTranslations() {
        return fetch(Routing.generate('site_translations'))
            .then(response => response.json())
            .then(data => {
                const translations = {};
                if (data.hasOwnProperty('translations')) {
                    for (let locale in data.translations) {
                        const dataSet = data.translations[locale];
                        if (dataSet.hasOwnProperty('messages')) {
                            translations[locale] = dataSet?.messages;
                        }
                    }
                }
                return translations;
            });
    }

    const translations = yield call(fetchTranslations);

    yield put({type: FETCH_TRANSLATIONS_SUCCESS, payload: translations});
}

export default function* fetchTranslationsWatcherSaga() {
    yield takeLatest(FETCH_TRANSLATIONS, fetchTranslationsSaga);
}
