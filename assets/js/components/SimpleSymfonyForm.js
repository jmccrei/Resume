/**
 * Copyright (c) 2020
 * Author: Josh McCreight<josh@joshmccreight.ca>
 */
import React, {useState} from "react";
import {Col, Form} from "react-bootstrap";
import {useTrans} from "../hooks";
import * as classnames from "classnames";

/**
 * Super simple Symfony form display using form json from Symfony REST
 * BASIC example - only includes text, email and textarea
 *
 * @param formData
 * @param onUpdate
 * @returns {JSX.Element|null}
 * @constructor
 */
const SimpleSymfonyForm = ({formData, onUpdate}) => {
    const initialState = {
        title: {
            value: null,
            valid: false,
            validMessage: null
        },
        fromEmail: {
            value: null,
            valid: false,
            validMessage: null
        },
        body: {
            value: null,
            valid: false,
            validMessage: null
        },
        valid: false
    };

    const [state, setState] = useState(initialState);

    // no formData? no render!
    if (typeof formData !== 'object' || formData === null) {
        return null;
    }

    /**
     * Is this form valid?
     *
     * @param check
     * @param update
     * @returns {boolean}
     */
    const isFormValid = (check = false, update = false) => {
        if (!check) {
            return !!state.valid;
        }

        // check is true, so we are going to loop through the fields and manually check
        let valid = true;
        ['title', 'fromEmail', 'body'].forEach(which => {
            if (state.hasOwnProperty(which)) {
                if (!state[which].valid) {
                    valid = false;
                    return false;
                }
            }
        });

        // What if we find a difference here?
        if (update) {
            // lets check the base value
            if (state.valid !== valid) {
                setState({
                    ...state,
                    valid: valid
                });
            }
        }

        return valid;
    }

    /**
     * Update a form fields value settings
     *
     * @param key
     * @param data
     */
    const updateFormValue = (key, data) => {
        const newState = {
            ...state,
            [key]: data,
            valid: isFormValid(true, false)
        };

        onUpdate(newState);
        setState(newState);
    };

    // output the template
    return <Form onSubmit={e => e.preventDefault()}>
        <SimpleSymfonyFormControl type="text" formData={formData?.title}
                                  onUpdate={data => updateFormValue('title', data)}/>
        <SimpleSymfonyFormControl type="email" formData={formData["fromEmail"]}
                                  onUpdate={data => updateFormValue('fromEmail', data)}/>
        <SimpleSymfonyFormControl type="textarea" formData={formData?.body}
                                  onUpdate={data => updateFormValue('body', data)}/>
    </Form>;
};

/**
 * Render a single Form Group Row
 *
 * @param formData
 * @param onUpdate
 * @param type
 * @returns {JSX.Element}
 * @constructor
 */
export const SimpleSymfonyFormControl = ({formData, onUpdate, type = 'text'}) => {
    const initialState = {value: null, valid: false, validMessage: null, validated: false};
    const [state, setState] = useState(initialState);
    const t = useTrans();

    /**
     * Handle each input on the field
     * Report the new Value and the validity
     * @param e
     */
    const handleOnInput = e => {
        const target = e.currentTarget;
        const value = target.value || null;
        const updateData = {
            ...state,
            value: value,
            valid: target.checkValidity() || false,
            validMessage: target.validity
        };
        onUpdate(updateData);
        setState({
            ...updateData,
            validated: true
        });
    };

    const placeholder = t.intl.formatMessage({
        id: formData["vars"].attr?.placeholder || '',
        defaultMessage: formData["vars"].attr?.placeholder || ''
    });

    // noinspection JSValidateJSDoc
    /**
     * <Help help="TEXT" />
     *
     * @param help
     * @returns {JSX.Element|null}
     * @constructor
     */
    const Help = ({help = ''}) => {
        if (typeof help !== 'string' || `${help || ''}`.length === 0) {
            return null;
        }

        return <Form.Text className="text-muted">
            {t.intl.formatMessage({id: help, defaultMessage: null})}
        </Form.Text>;
    }

    // setup a attr object to place onto the control
    const attr = {};
    for (let key in formData['vars']['attr'] || {}) {
        if (key !== 'placeholder') {
            if (formData['vars']['attr'].hasOwnProperty(key)) {
                attr[key] = formData['vars']['attr'][key];
            }
        }
    }

    /**
     * <CharacterCount current={x} min={x} />
     *
     * @param current
     * @param min
     * @returns {JSX.Element|null}
     * @constructor
     */
    const CharacterCount = ({current, min}) => {
        if (current >= min || parseInt(min) <= 0) {
            return null;
        }

        return <small className={"char-count text-muted"}>
            {current}
            <span className={"pl-1 pr-1"}>{t.formatMessage({id: 'words.of'})}</span>
            {min}
        </small>;
    }

    // get our controlProps as a const because we could be rendering
    // an input or a textarea, and we will use the same props object for both
    const controlProps = {
        [type === 'textarea' ? 'as' : 'type']: type,
        required: !!formData['vars']['required'],
        id: formData["vars"].id,
        onInput: handleOnInput,
        defaultValue: state.value,
        placeholder: placeholder,
        name: formData["vars"]["full_name"],
        ...attr
    };

    // output the template
    return <Form.Row className={classnames({"form-group": true, "was-validated": !!state.validated})}>
        <Col xs={12}>
            <Form.Label>{t.formatMessage({
                id: formData["vars"].label,
                defaultMessage: formData["vars"].label
            })}</Form.Label>
        </Col>
        <Col xs={12}>
            <CharacterCount current={`${state.value || ''}`.length}
                            min={formData["vars"]["attr"]["minLength"] || 0}/>
            <Form.Control {...controlProps}/>
            <Help help={formData["vars"]["help"]}/>
        </Col>
    </Form.Row>;
}

// export <SimpleSymfonyForm {...props} />
export default SimpleSymfonyForm;