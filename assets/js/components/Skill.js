/**
 * Copyright (c) 2020
 * Author: Josh McCreight<josh@joshmccreight.ca>
 */
import React, {useRef, useState} from "react";
import {Overlay, ProgressBar, Tooltip} from "react-bootstrap";
import {FormattedMessage} from "react-intl";

// noinspection JSValidateJSDoc
/**
 * Skill Component <Skill {...props} />
 *
 * @param width
 * @param text
 * @param years
 * @param placement
 * @param showLabel
 * @param showTooltip
 * @returns {JSX.Element}
 * @constructor
 */
export const Skill = ({
                          width, text, years,
                          placement = 'top',
                          showLabel = false, showTooltip = true
                      }) => {
    // Parameters for Tooltips
    const [show, setShow] = useState(false);
    const target = useRef(null);
    const variant = width < 50 ? 'danger' : (width < 75 ? 'warning' : 'success');
    const labelAttr = {};

    // if we are not showing the tooltip, add a title
    if (!showTooltip) {
        labelAttr['title'] = `${years} yrs`;
    }

    const rand = Math.round(Math.random() * 10000);

    // return the result
    return (<>
        <div ref={target}
             className={"skill-container bg-muted p-1"}
             onMouseOver={() => setShow(true)}
             onMouseEnter={() => setShow(true)}
             onMouseLeave={() => setShow(false)}>
            <label className="mb-0" {...labelAttr}>
                <FormattedMessage
                    id={`words.${text.replace(' ', '').replace(/[^a-zA-Z]+/g, '').toLocaleLowerCase().trim()}`}
                    defaultMessage={text}
                    description="Skill word"/>
            </label>
            <ProgressBar className="skill-progress"
                         now={width}
                         label={showLabel ? `${years} yrs` : null}
                         variant={variant}/>
        </div>
        {showTooltip ? <Overlay target={target.current}
                                show={show}
                                placement={placement}>
            <Tooltip id={`${rand}-tooltip`}>
                <span className="pr-1">{text}</span>
                <small>({years} years)</small>
            </Tooltip>
        </Overlay> : null}
    </>);
};
