/**
 * Copyright (c) 2020
 * Author: Josh McCreight<josh@joshmccreight.ca>
 */
import React from "react";
import Section from "./Section";
import {connect} from "react-redux";
import PropTypes from "prop-types";

// noinspection JSValidateJSDoc
/**
 * Content Component
 *
 * @param config
 * @returns {JSX.Element}
 * @constructor
 */
const Content = ({config}) => {

    /**
     * Get a sorted list of sections to render
     *
     * @returns {[]}
     */
    const getSections = () => {
        // create our holder for the sections data
        const sections = [];

        // loop through the keys and build our sections array
        Object.keys(config).forEach(key => {
            const item = config[key];
            if (item !== undefined && item !== null && typeof item === 'object') {
                if (item['location'] === 'content') {
                    sections.push({...item, sectionKey: key});
                }
            }
        });

        // lets sort the sections, using the ordering from configuration for the current stack
        sections.sort((a, b) => {
            const aOrder = a.order[config.config.stack || 'full'] || 0;
            const bOrder = b.order[config.config.stack || 'full'] || 0;
            return aOrder < bOrder ? -1 : (aOrder > bOrder ? 1 : 0);
        });

        // and finally, send back the filtered and sorted sections
        return sections;
    };

    // return the result
    return <main className="content-container">
        {getSections().map((section, idx) => <Section key={idx} {...section} />)}
    </main>;
};

// One way to set proptypes iff ever one needs them
Content.propTypes = {
    config: PropTypes.object.isRequired
};

/**
 * Map state to props
 *
 * @param state
 * @returns {{config: {}}}
 */
const mapStateToProps = (state) => {
    return {
        config: {...(state.root || {})}
    }
}

// export <Content {...props} />
export default connect(
    mapStateToProps
)(Content);