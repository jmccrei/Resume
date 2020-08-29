/**
 * Copyright (c) 2020
 * Author: Josh McCreight<josh@joshmccreight.ca>
 */
import React from "react";
import Skills from "./Skills";
import {connect} from "react-redux";
import Section from "./Section";
import Links from "./Links";

/**
 * Sidebar Component
 *
 * @param education
 * @param links
 * @returns {JSX.Element}
 * @constructor
 */
const Sidebar = ({education, links}) => {
    return <div className="sidebar-container pl-2 pr-1">
        <Skills/>
        <Section text={"Education"}
                 sectionKey={"education"}
                 className={"pt-5"}
                 items={education.items}
                 type={"education"}/>
        <Links links={links} className={"mt-5"}/>
    </div>
};

/**
 * Map state to props
 *
 * @param state
 * @returns {{education: {}}}
 */
const mapStateToProps = (state) => {
    return {
        education: {...(state.root?.education || {})},
        links: {...(state.root?.links || {})},
    }
}

// export <Sidebar {...props} />
export default connect(
    mapStateToProps,
)(Sidebar);
