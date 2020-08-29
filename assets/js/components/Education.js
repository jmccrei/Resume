/**
 * Copyright (c) 2020
 * Author: Josh McCreight<josh@joshmccreight.ca>
 */
import React from "react";
import {connect} from "react-redux";
import {useTrans} from "../hooks";

/**
 * Education component
 * Display an education item from provided json
 *
 * @param item
 * @returns {JSX.Element}
 * @constructor
 */
const Education = ({item}) => {
    // get the translator
    const t = useTrans();
    // translate the description now, we add a check on it soon
    const description = t.formatMessage(item.description);

    // output template
    return <div className="education">
        <span className={"dates pr-1"}>
            <small>{item.from}-{item.to}</small>
        </span>
        <h6 className={"title d-inline pl-1"}>{t.formatMessage(item.title)}</h6>
        <div className={"school"}><i><u>{t.formatMessage(item['school'])}</u></i></div>
        {description ? <div className={"description"}>{description}</div> : null}
    </div>;
}

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

// export <Education {...props} />
export default connect(
    mapStateToProps
)(Education);