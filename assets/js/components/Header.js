/**
 * Copyright (c) 2020
 * Author: Josh McCreight<josh@joshmccreight.ca>
 */
import React from "react";
import {Col, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {faEnvelope, faPhoneAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Toolbar from "./Toolbar";
import {useTrans} from "../hooks";
import Contact from "./Contact";

// noinspection JSValidateJSDoc
/**
 * Header component
 *
 * @param general
 * @returns {JSX.Element}
 * @constructor
 */
const Header = ({general}) => {
    const {name} = general;
    const t = useTrans();

    // noinspection JSValidateJSDoc
    /**
     * Render the icon iff applicable
     *
     * @param fa
     * @returns {JSX.Element|null}
     */
    const renderIcon = fa => {
        switch (fa) {
            case 'fa-phone':
            case 'fa_phone':
                return <FontAwesomeIcon className="ml-2" icon={faPhoneAlt}/>;
            case 'fa-email':
            case 'fa_email':
                return <FontAwesomeIcon className="ml-2" icon={faEnvelope}/>;
            default:
                return null;
        }
    };

    // noinspection JSValidateJSDoc,JSUnusedLocalSymbols
    /**
     * Render the icon row - Unused since adding <Contact />
     * This method will render a row for Phone or Email
     *
     * @param type
     * @param text
     * @param value
     * @returns {JSX.Element|null}
     */
    const renderIconRow = (type, text, value) => {
        if (value) {
            return <Row className={`${type.toLowerCase()}-row`}>
                <Col xs={6} sm={5} md={5} lg={4} className="var pr-2 text-right">
                    <span className="text">{t.formatMessage(text)}</span>
                    {renderIcon(general[`${type.toLowerCase()}_icon`] || null)}
                </Col>
                <Col xs={6} sm={7} md={7} lg={8} className="val pl-2">
                    {type.toLowerCase() === 'email' ?
                        <a href={`mailto:${value}`}>{value}</a> : (type.toLowerCase() === 'phone' ?
                            <a href={`tel:${value}`}>{value}</a> : value)}
                </Col>
            </Row>;
        }

        return null;
    };

    // noinspection JSValidateJSDoc
    /**
     * Display a translation message for non English locales
     *
     * @returns {JSX.Element|null}
     * @constructor
     */
    const TranslationWarning = ({}) => {
        if (t.intl.locale === 'en') {
            return null;
        }

        return <Col xs={12} className={"text-center translation-warning"}>
            {t.formatMessage({
                id: 'phrases.translations_by_google',
                defaultMessage: 'All non English translations provided by google translate'
            })}
        </Col>;
    };

    // return the result
    return (
        <Row as="header" className="site-header">
            <Col xs={12} sm={12} md={7} lg={8} className="text-center left">
                <h1>{t.formatMessage(name)}</h1>
            </Col>
            <Col xs={12} sm={12} md={5} lg={4} className="right">
                <Contact/>
            </Col>
            <Col xs={12} className="p-0 toolbar-container">
                <Toolbar/>
            </Col>
            <TranslationWarning/>
        </Row>
    );
};

/**
 * Map state to props
 *
 * @param state
 * @returns {{general: {}}}
 */
const mapStateToProps = (state) => {
    return {
        general: {...(state.root.general || {})},
    }
}

// connect and export <Header />
export default connect(
    mapStateToProps
)(Header);