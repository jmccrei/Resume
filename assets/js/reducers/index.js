/**
 * Copyright (c) 2020
 * Author: Josh McCreight<josh@joshmccreight.ca>
 */
import {combineReducers} from 'redux';
import {all} from '../data';
import {
    FETCH_TRANSLATIONS_SUCCESS,
    SET_LOCALE,
    SET_STACK,
    TOGGLE_SKILLS_LABEL,
    TOGGLE_SKILLS_TOOLTIPS
} from "../actions";

// initial state is set to the contents of data
const initialState = {
    ...(all || {}),
    ajaxLoading: false,
    translations: {}
};

// our localStorage data key
const storeKey = 'jmccrei_resume_data';

/**
 * Get the default state
 *
 * @returns {{translations: {}, ajaxLoading: boolean}|any}
 */
const getDefaultState = () => {
    if (localStorage.hasOwnProperty(storeKey) && !initialState.config.clear) {
        try {
            const data = JSON.parse(localStorage[storeKey]);
            if (typeof data === 'object' && data.hasOwnProperty('config')) {
                // if translations is on the data, we need to remove it
                if (data.hasOwnProperty('translations')) {
                    delete data.translations;
                }
                // We are going to NOT use the sections information
                // Instead, just the config settings will remain
                return {
                    ...initialState,
                    config: {
                        ...initialState.config,
                        ...(data?.config || {})
                    }
                };
            }
        } catch (e) {
            // do nothing
        }
    }

    return {...initialState};
};

/**
 * Initialize
 *
 * @param state
 */
const initialize = (state) => {
    // set the locale and the stack onto the body
    setDocumentLocale(state?.config?.locale || 'en');
    setDocumentStack(state?.config?.stack || 'full');

    // lets add our language translations to the state
    state.translations = {};

    fetch(Routing.generate('bazinga_jstranslation_js', {
        'domain': 'messages',
        '_format': 'json',
        'locales': 'en,fr,es'
    }))
        .then(response => response.json())
        .then(data => {
            if (data.hasOwnProperty('translations')) {
                for (let locale in data.translations) {
                    const dataSet = data.translations[locale];
                    if (dataSet.hasOwnProperty('messages')) {
                        state.translations[locale] = dataSet?.messages;
                    }
                }
            }
        });
};

/**
 * Update settings in the localStorage
 *
 * @param state
 * @returns {*}
 */
const updateLocalStorage = (state) => {
    // we want to write all data BUT the translations
    const writeData = {...state};
    if (writeData.hasOwnProperty('translations')) {
        delete writeData['translations'];
    }
    localStorage[storeKey] = JSON.stringify(writeData);
    return state;
};

/**
 * Set the locale site wide (including on DOM)
 *
 * @param locale
 */
const setDocumentLocale = (locale) => {
    document.querySelector('html').setAttribute('lang', locale);

    history.pushState({
        id: 'homepage'
    }, null, `/${locale}`);
};

/**
 * Set the document stack
 *
 * @param stack
 */
const setDocumentStack = stack => {
    document.querySelector('html').setAttribute('data-stack', stack);
};

// Let's set a few things up (ie: getting the locale onto the body tag)
initialize(getDefaultState());

// Primary reducer
export function root(state = getDefaultState(), action) {
    // make a copy of the state
    const newState = {...state};

    switch (action.type) {
        // A call has been made to set the stack type
        case SET_STACK:
            // set our stack
            newState.config.stack = action.payload;

            // let's update the body tag
            setDocumentStack(action.payload);

            // return our immutable object
            return updateLocalStorage(newState);
        // A call has been made to set/change the locale
        case SET_LOCALE:
            // locale is located on the config key
            // set the locale
            newState.config.locale = action.payload;

            // let's update the body tag
            setDocumentLocale(action.payload);

            // return our immutable object
            return updateLocalStorage(newState);
        // A call has been made to toggle the skills labels
        case TOGGLE_SKILLS_LABEL:
            // toggle the value
            newState.config.show_skills_labels = !newState.config.show_skills_labels;

            // return our immutable object
            return updateLocalStorage(newState);
        // A call has been made to toggle the skills tooltips
        case TOGGLE_SKILLS_TOOLTIPS:
            // toggle the value
            newState.config.skills_tooltips = !newState.config.skills_tooltips;

            // return our immutable object
            return updateLocalStorage(newState);
        case FETCH_TRANSLATIONS_SUCCESS:
            newState.translations = {...action.payload};
            return newState;
        // We don't have a case for what was called, return the state
        default:
            // return the ORIGINAL state
            return updateLocalStorage(state);
    }
}

// use combineReducers, even though we have one for now.
// this will ease the burden iff we decide to add additional reducers later
const reducer = combineReducers({root})

// return our reducer
export default reducer;