/**
 * Copyright (c) 2020
 * Author: Josh McCreight<josh@joshmccreight.ca>
 */
import React from "react";
import Experience from "./Experience";
import List from "./List";
import Education from "./Education";
import * as classnames from "classnames";
import {connect} from "react-redux";
import {useIntl} from "react-intl";

// noinspection JSValidateJSDoc
/**
 * Section Component
 *
 * @param sectionKey
 * @param text
 * @param items
 * @param type
 * @param className
 * @returns {JSX.Element}
 * @constructor
 */
const Section = ({sectionKey, text, items, type, className = ''}) => {

    const intl = useIntl();
    const sectionTitle = intl.formatMessage({
        "id": `section.${sectionKey.toLowerCase().trim()}.title`,
        "defaultMessage": text,
        "description": `${sectionKey} section title`
    });

    // noinspection JSValidateJSDoc
    /**
     * Render the experience content
     *
     * @param listItems
     * @returns {JSX.Element}
     */
    const renderExperienceContent = (listItems) => {
        return <div className="experience-container">
            {listItems.map((experience, idx) => <Experience key={idx} experience={experience}/>)}
        </div>;
    }

    // noinspection JSValidateJSDoc
    /**
     * Render the education content
     *
     * @param listItems
     * @returns {JSX.Element}
     */
    const renderEducationContent = (listItems) => {
        return <div className="education-container">
            {listItems.map((item, idx) => <Education key={idx} item={item}/>)}
        </div>;
    }

    // return the result
    return <section className={classnames({"section-container": true, [className]: true})}
                    rel={sectionTitle}>
        <div className="section-header">
            <h2 className="section-title">{sectionTitle}</h2>
        </div>
        <div className="section-content">
            {type === 'list' ? <List items={items}/> : null}
            {type === 'experience' ? renderExperienceContent(items) : null}
            {type === 'education' ? renderEducationContent(items) : null}
        </div>
    </section>;
};

/**
 * Map state to props
 *
 * @param state
 * @returns {{translations: {}}}
 */
const mapStateToProps = (state) => {
    return {
        translations: {...(state.root.translations || {})}
    }
}

// export <Section {...props} />
export default connect(
    mapStateToProps
)(Section);