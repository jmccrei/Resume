/**
 * Copyright (c) 2020
 * Author: Josh McCreight<josh@joshmccreight.ca>
 */
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {sendContactEmail} from "../actions";
import SimpleSymfonyForm from "./SimpleSymfonyForm";
import {Button, Modal} from "react-bootstrap";
import {useTrans} from "../hooks";

// noinspection JSValidateJSDoc
/**
 * Contact Component
 *
 * @returns {JSX.Element|null}
 * @constructor
 */
const Contact = ({
                     btnText = {id: 'contact.title'},
                     btnVariant = 'light',
                     modalTitle = {id: 'contact.title'},
                     submitText = {id: 'contact.submit'},
                     cancelText = {id: 'contact.cancel'},
                     closeText = {id: 'contact.close'},
                     sendContactEmail
                 }) => {
    // get our translator
    const t = useTrans();

    // we need an initial state
    const initialState = {
        form: null,
        formData: {
            valid: false
        },
        show: false,
        showSubmit: true,
        showCancel: true,
        showClose: false,
        submitted: false
    };

    // initialize the state data with the initial state
    const [state, setState] = useState(initialState);

    // use useEffect to get/set the form
    // we are fetching the form data from Symfony through JsonResponse
    useEffect(() => {
        if (state.form === null) {
            // noinspection JSCheckFunctionSignatures
            fetch(Routing.generate('contact_form'))
                .then(res => res.json())
                .then(res => setState({
                    ...state,
                    form: res
                }));
        }
    });

    // if we do not have the form data yet, do not render anything .. WAIT!
    if (state.form === null) {
        return null;
    }

    /**
     * Toggle showing the modal
     */
    const toggleShow = () => {
        setState({
            ...state,
            show: !state.show
        });
    };

    /**
     * Set showing the modal
     *
     * @param show
     */
    const setShow = show => {
        setState({
            ...state,
            show: !!show
        });
    };

    /**
     * Submit the form, or attempt to
     */
    const handleSubmit = () => {
        // We are not going to actually submit the form
        // Instead we are going to dispatch an action with the data
        // and let a saga handle actually sending the email
        if (state.formData.valid) {
            sendContactEmail({
                contact: {
                    title: state.formData.title.value,
                    fromEmail: state.formData.fromEmail.value,
                    body: state.formData.body.value
                }
            });

            // update our state with some new values
            setState({
                ...state,
                showSubmit: false,
                showCancel: false,
                showClose: true,
                submitted: true
            });

            // crude, but effective. Close the modal after 5 seconds
            setTimeout(handleCancel, 5000);
        } else {
            // @todo make a better display message
            alert('Form is invalid');
        }
    };

    /**
     * Cancel has been called - set everything back to initialState (Except the base form)
     */
    const handleCancel = () => {
        // noinspection JSCheckFunctionSignatures
        setState({
            ...initialState,
            form: {...state.form}
        });
    };

    /**
     * Handle updating the form state
     *
     * @param data
     */
    const handleUpdateFormState = data => {
        setState({
            ...state,
            formData: {
                ...state.formData,
                ...data
            }
        });
    };

    // Return our JSX
    return <>
        <Button className={"contact-btn"} variant={btnVariant} onClick={() => toggleShow()}>
            {t.formatMessage(modalTitle)}
        </Button>

        <Modal show={state.show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{t.formatMessage(btnText)}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {state.submitted ?
                    <div className={"p-4 m-2 text-center"}>{t.formatMessage({id: 'contact.submitted'})}</div> :
                    <SimpleSymfonyForm formData={state.form} onUpdate={handleUpdateFormState}/>}
            </Modal.Body>
            <Modal.Footer>
                {state.showSubmit ? <Button variant={!state.formData.valid ? 'default' : 'success'} size="sm"
                                            disabled={!state.formData.valid}
                                            onClick={handleSubmit}>
                    {t.formatMessage(submitText)}
                </Button> : null}
                {state.showCancel ? <Button variant={"danger"} size="sm"
                                            onClick={handleCancel}>
                    {t.formatMessage(cancelText)}
                </Button> : null}
                {state.showClose ? <Button variant={"secondary"} size="sm"
                                           onClick={handleCancel}>
                    {t.formatMessage(closeText)}
                </Button> : null}
            </Modal.Footer>
        </Modal>
    </>;
};

/**
 * Map state to props
 *
 * @param state
 * @returns {{general: {}, config: {}}}
 */
const mapStateToProps = (state) => {
    return {
        config: {...(state.root.config || {})},
        general: {...(state.root.general || {})},
    }
};

/**
 * Map dispatch to props
 *
 * @type {{sendContactEmail: (function(*=): {payload: *, type: string})}}
 */
const mapDispatchToProps = {
    sendContactEmail
};

// export <Contact {...props} />
export default connect(mapStateToProps,
    mapDispatchToProps)(Contact);