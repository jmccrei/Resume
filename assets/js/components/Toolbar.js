/**
 * Copyright (c) 2020
 * Author: Josh McCreight<josh@joshmccreight.ca>
 */
import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import {connect} from "react-redux";
import {setLocale, setStack} from "../actions";
import * as classnames from "classnames";
import {useTrans} from "../hooks";

/**
 * Toolbar Component
 *
 * @constructor
 */
const Toolbar = ({config, setLocale, setStack}) => {
    const t = useTrans();

    return <Navbar expand="lg" className="toolbar">
        <Nav className="mr-auto d-inline-block">
            <Nav.Item className="stack-select d-none">
                <Nav.Link className={classnames({
                    "stack-item d-inline pl-1 pr-1": true,
                    'active': config.stack === 'full'
                })} onClick={() => setStack('full')}>
                    {t.formatMessage({id: 'words.full_stack', defaultMessage: 'Full-stack'})}
                </Nav.Link>
                <Nav.Link className={classnames({
                    "stack-item d-inline pl-1 pr-1": true,
                    'active': config.stack === 'back'
                })} onClick={() => setStack('back')}>
                    {t.formatMessage({id: 'words.back_end', defaultMessage: 'Back-End'})}
                </Nav.Link>
                <Nav.Link className={classnames({
                    "stack-item d-inline pl-1 pr-1": true,
                    'active': config.stack === 'front'
                })} onClick={() => setStack('front')}>
                    {t.formatMessage({id: 'words.front_end', defaultMessage: 'Front-End'})}
                </Nav.Link>
            </Nav.Item>
        </Nav>
        <Nav className="ml-auto d-inline-block text-center text-md-right">
            <Nav.Item className="lang-select">
                <Nav.Link className={classnames({
                    "lang-item d-inline pl-1 pr-1": true,
                    'active': config.locale === 'en'
                })} onClick={() => setLocale('en')}>En</Nav.Link>
                <Nav.Link className={classnames({
                    "lang-item d-inline pl-1 pr-1": true,
                    'active': config.locale === 'fr'
                })} onClick={() => setLocale('fr')}>Fr</Nav.Link>
                <Nav.Link className={classnames({
                    "lang-item d-inline pl-1 pr-1": true,
                    'active': config.locale === 'es'
                })} onClick={() => setLocale('es')}>Es</Nav.Link>
            </Nav.Item>
        </Nav>
    </Navbar>;
}

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
 * @type {{setStack: (function(*=): {payload: (*|string), type: string}), setLocale: (function(*=): {payload: *, type: string})}}
 */
const mapDispatchToProps = {
    setLocale,
    setStack
};

/**
 * Export <Toolbar />
 */
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Toolbar);