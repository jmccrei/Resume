/**
 * Copyright (c) 2020
 * Author: Josh McCreight<josh@joshmccreight.ca>
 */
import {IntlProvider} from "react-intl";
import {connect, Provider} from "react-redux";
import Header from "./Header";
import {Col, Row} from "react-bootstrap";
import Content from "./Content";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import React from "react";
import {fetchTranslations} from "../actions";

// noinspection JSValidateJSDoc
/**
 * The main application
 *
 * @returns {JSX.Element}
 * @constructor
 */
const App = ({
                 store,
                 fetchTranslations,
                 translations = {},
                 locale = 'en',
                 defaultLocale = 'en'
             }) => {

    // if by chance we do not have any translations,
    // let's get them
    if (typeof translations !== 'object' || Object.keys(translations).length === 0) {
        fetchTranslations();
    }

    // if by change we do not have our loaded translation locale
    // just display some dots
    // @todo update this to be best for FMP <First Meaningful Paint>
    if (translations[locale] === undefined) {
        return <div className={"text-center"}>...</div>;
    }

    // return our app wrapped in IntlProvider
    return <IntlProvider locale={locale} messages={translations[locale] || {}} defaultLocale={defaultLocale}>
        <Provider store={store}>
            <div className="site-container">
                <Header/>
                <Row as={"section"} className="site-body">
                    <Col xs={12} sm={12} md={7} lg={8} className="content-column">
                        <Content/>
                    </Col>
                    <Col xs={12} sm={12} md={5} lg={4} className="sidebar-column">
                        <Sidebar/>
                    </Col>
                </Row>
                <Footer/>
            </div>
        </Provider>
    </IntlProvider>;
};

/**
 * Map state to props
 *
 * @param state
 * @returns {{translations: {}}}
 */
const mapStateToProps = (state) => {
    return {
        translations: {...(state.root.translations || {})},
        locale: state.root.config?.locale || 'en'
    }
}

/**
 * Map dispatch to props
 *
 * @type {{fetchTranslations: (function(): {type: string})}}
 */
const mapDispatchToProps = {
    fetchTranslations
}

// export <App {...props}/>
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
