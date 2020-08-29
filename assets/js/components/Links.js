/**
 * Copyright (c) 2020
 * Author: Josh McCreight<josh@joshmccreight.ca>
 *
 * Multiple 'like' components from a single file with a default
 */
import React from "react";
import {ListGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithubSquare, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import {useTrans} from "../hooks";

// noinspection JSValidateJSDoc
/**
 * Links component
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Links = ({links, className = ""}) => {
    const t = useTrans();

    // output template
    return <div className={`links-container ${className}`}>
        <h5>{t.formatMessage(links.title)}</h5>
        <ListGroup>
            {links.items.map((data, idx) => {
                return <Link key={idx} {...data} />;
            })}
        </ListGroup>
    </div>
};

// noinspection JSValidateJSDoc,JSUnusedLocalSymbols
/**
 * Link Component
 *
 * @param text
 * @param target
 * @param title
 * @param href
 * @param attr
 * @param img
 * @param icon
 * @param description
 * @returns {JSX.Element}
 * @constructor
 */
export const Link = ({text, target = '_blank', title, href, attr = {}, img, icon, description}) => {
    const t = useTrans();

    // @todo handle an image used as a link (when and if the need arises)
    return <ListGroup.Item>
        <a href={href} target={target} title={t.formatMessage(title)} {...attr}>
            <Icon icon={icon} size={"2x"}/>
            {t.formatMessage(text)}
        </a>
        {description ? <small className={'text-muted'}>{t.formatMessage(description)}</small> : null}
    </ListGroup.Item>;
};

// noinspection JSValidateJSDoc
/**
 * Icon Component
 *
 * @param icon
 * @param size
 * @returns {JSX.Element|null}
 * @constructor
 */
export const Icon = ({icon, size = 1}) => {
    if (icon === undefined || icon === null || icon === '') {
        return null;
    }

    // noinspection JSValidateJSDoc
    /**
     * Get the icon component, or null
     *
     * @param icon
     * @returns {IconDefinition|null}
     */
    const getIcon = icon => {
        // more than 2 comparisons, use switch instead of if/else for proficiency
        switch (icon.toLowerCase()) {
            case 'github':
                return faGithubSquare;
            case 'linkedin':
                return faLinkedin;
            default:
                return null;
        }
    };

    return <FontAwesomeIcon size={size} className={"mr-2"} icon={getIcon(icon)}/>
}

// by default, export the Links Component <Links {...props} />
export default Links;