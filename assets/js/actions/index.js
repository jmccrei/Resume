/**
 * Copyright (c) 2020
 * Author: Josh McCreight<josh@joshmccreight.ca>
 */
export const SET_STACK = "SET_STACK";
export const SET_LOCALE = "SET_LOCALE";
export const TOGGLE_SKILLS_LABEL = "TOGGLE_SKILLS_LABEL";
export const TOGGLE_SKILLS_TOOLTIPS = "TOGGLE_SKILLS_TOOLTIPS";
export const FETCH_TRANSLATIONS = "FETCH_TRANSLATIONS";
export const FETCH_TRANSLATIONS_SUCCESS = "FETCH_TRANSLATIONS_SUCCESS";
export const FETCH_TRANSLATIONS_FAILURE = "FETCH_TRANSLATIONS_FAILURE";
export const OPEN_CONTACT_FORM = "OPEN_CONTACT_FORM";
export const SEND_CONTACT_EMAIL = "SEND_CONTACT_EMAIL";

/**
 * @param type (full|back|front)(default=full)
 * @returns {{payload: (*|string), type: string}}
 */
export const setStack = type => {
    return {type: SET_STACK, payload: type || 'full'};
};

/**
 * Passing INTL because the reducer does not have this data
 * @param locale (en|fr|sp)
 * @returns {{payload: *, type: string}}
 */
export const setLocale = locale => {
    return {type: SET_LOCALE, payload: locale};
};

/**
 * @returns {{type: string}}
 */
export const toggleSkillsLabel = () => {
    return {type: TOGGLE_SKILLS_LABEL};
};

/**
 * @returns {{type: string}}
 */
export const toggleSkillsTooltips = () => {
    return {type: TOGGLE_SKILLS_TOOLTIPS};
};

/**
 * @returns {{type: string}}
 */
export const fetchTranslations = () => {
    return {type: FETCH_TRANSLATIONS};
};

/**
 * @returns {{type: string}}
 */
export const openContactForm = () => {
    return {type: OPEN_CONTACT_FORM};
};

/**
 * @param formData
 * @returns {{payload: *, type: string}}
 */
export const sendContactEmail = formData => {
    return {type: SEND_CONTACT_EMAIL, payload: formData};
};