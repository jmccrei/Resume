/**
 * Copyright (c) 2020
 * Author: Josh McCreight<josh@joshmccreight.ca>
 */
import React, {useState} from 'react';
import {Badge, Col, Row} from "react-bootstrap";
import {Skill} from "./Skill";
import {connect} from "react-redux";
import {toggleSkillsLabel, toggleSkillsTooltips} from "../actions";
import {faCheck, faCog, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as classnames from "classnames";
import {useTrans} from "../hooks";

/**
 * Skills Component
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Skills = ({stack, skills, showLabels, showTooltips, toggleSkillsLabel, toggleSkillsTooltips}) => {
    const {items} = skills;
    const t = useTrans();
    const title = t.formatMessage({
        id: 'section.skills.title',
        defaultMessage: 'Skills',
        description: 'Skills section title'
    })

    /**
     * Get a sorted list of items based off the selected stack
     *
     * @returns {[]}
     */
    const getSortedItems = () => {
        const sortedItems = [];

        // First, we are going to loop through the items
        // and place they key into the individual objects before we sort
        Object.keys(items || {}).forEach(key => {
            sortedItems.push({...(items[key] || {}), key: key});
        });

        // Sort the items based on the stack orders
        sortedItems.sort((a, b) => {
            const aOrder = a.order[stack || 'full'] || 0;
            const bOrder = b.order[stack || 'full'] || 0;
            return aOrder < bOrder ? -1 : (aOrder > bOrder ? 1 : 0);
        });

        // and send back the sorted items to be consumed
        return sortedItems;
    };

    /**
     * Render out the skills
     *
     * @returns {[]}
     */
    const renderSkills = () => {
        const rendered = [];

        // loop through our sorted list and call the render method
        getSortedItems().forEach((section, idx) => {
            rendered.push(renderSkillsSection(section, idx));
        });

        // and out goes our array of sections
        return rendered;
    };

    // noinspection JSValidateJSDoc
    /**
     * Render the skills section
     *
     * @param section
     * @param idx
     * @returns {JSX.Element}
     */
    const renderSkillsSection = (section, idx) => {
        // set up some parameters
        const rendered = [];
        const {items, progress, key} = section;
        const first = idx === 0;
        const title = t.formatMessage({
            id: `section.skills.titles.${key.replace(' ', '_').toLowerCase()}`,
            defaultMessage: key,
            description: 'Skill title'
        });

        // if progress, then we will show a progress bar style display
        // otherwise we will assume that its a list
        if (progress !== true) {
            // Building a list

            // set up our array
            const itemsList = [];

            // loop through the items and add the 'text' to the itemsList
            for (let idx in items) {
                if (items.hasOwnProperty(idx)) {
                    const item = items[idx];
                    if (item) {
                        let addText = null;

                        if (item.hasOwnProperty('id')) {
                            addText = t.formatMessage({
                                id: item.id,
                                defaultMessage: item.defaultMessage || item.text || null
                            });
                        } else if (item.hasOwnProperty('defaultMessage')) {
                            const {defaultMessage} = item;
                            addText = defaultMessage;
                        } else if (item.hasOwnProperty('text')) {
                            const {text} = item;
                            addText = text;
                        }

                        if (addText !== null && addText !== undefined) {
                            itemsList.push(addText);
                        }
                    }
                }
            }


            // add our joined list back to the rendered section array
            rendered.push(<Col key={key} className={"list"} xs={12}>
                {itemsList.map((item, idx) => {
                    return <Badge key={idx} variant={"light"} className={"mr-1"}>
                        {item}
                    </Badge>;
                })}
            </Col>);
        } else {
            // we are building a progress bar display
            // loop through the items
            for (let i in items) {
                if (items.hasOwnProperty(i)) {
                    // get only what data we need
                    const {text, years, percent} = items[i];
                    // add the Skill to the rendered array
                    rendered.push(<Col key={`${key}${i}`} xs={6}>
                        <Skill showLabel={showLabels}
                               showTooltip={showTooltips}
                               placement="bottom"
                               width={percent}
                               text={text}
                               years={years}/></Col>);
                }
            }
        }

        // finally, output the section
        return (<Row className={"section" + (first ? ' mt-0' : ' mt-4')} key={key}>
            <Col xs={12}>
                <h5 className={"mt-2"}>{title}</h5>
            </Col>
            {rendered}
        </Row>);
    }

    // return our render for the component
    // example inline styling (not a good habit to set styling in this way)
    return (
        <div className={"skills-container"}>
            <SkillsConfig
                showLabels={showLabels}
                showTooltips={showTooltips}
                onToggleLabels={toggleSkillsLabel}
                onToggleTooltips={toggleSkillsTooltips}
            />
            <div className="pl-0 pr-0 mb-0 pb-0">
                <h2>{title}</h2>
            </div>
            {renderSkills()}
        </div>
    );
};

/**
 * Skills Configuration
 *
 * @param showLabels
 * @param showTooltips
 * @param onToggleLabels
 * @param onToggleTooltips
 * @returns {JSX.Element}
 * @constructor
 */
const SkillsConfig = ({showLabels = false, showTooltips = true, onToggleLabels, onToggleTooltips}) => {
    const [show, setShow] = useState(false);

    // we are going to set a few things using style
    // but not the normal way, let css handle the heavy lifting (haha)
    // this way we can essentially leave all our styling in scss where it should be
    // these style attributes work in native CSS and SCSS is not required
    const style = {
        "--skills-config-width": `${show ? 8 : 2}rem`,
        "--skills-config-height": show ? 'auto' : '2rem'
    };

    /**
     * Render the config body
     *
     * -- Demonstration that any method|function provided it returns null|JSX
     * -- can be used like a component, and still maintain access to the parents parameters
     *
     * @returns {JSX.Element|null}
     */
    const ConfigBody = () => {
        if (!show) {
            return null;
        }

        /**
         * Localized scope component for IconRow
         *
         * @param show
         * @param text
         * @param onClick
         * @returns {JSX.Element}
         * @constructor
         */
        const IconRow = ({show = false, text = '', onClick}) => {
            return <Row onClick={onClick} className="icon-row">
                <Col className="pr-0 text-center">
                    <FontAwesomeIcon
                        className={classnames({"text-success": show, "text-danger": !show})}
                        icon={show ? faCheck : faTimes}/>
                </Col>
                <Col className={"pl-0 grow2"}>
                    {text}
                </Col>
            </Row>
        };

        // return the result
        return <div className="skill-config-body">
            <IconRow show={showLabels} text="Labels" onClick={onToggleLabels}/>
            <IconRow show={showTooltips} text="Tooltips" onClick={onToggleTooltips}/>
        </div>;
    }

    // render()
    return <div style={style}
                className={classnames({"skills-config": true, "open": show})}
                onClick={() => setShow( !show)}
                onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
        <div className={"toggler text-right"}>
            <FontAwesomeIcon
                style={{"--skills-config-toggler-float": show ? 'right' : 'none'}}
                icon={faCog}/>
        </div>
        <ConfigBody/>
    </div>;
};

/**
 * Map state to props
 *
 * @param state
 * @returns {{skills: {}, stack: (*|string), showLabels: boolean, showTooltips: boolean}}
 */
const mapStateToProps = (state) => {
    return {
        stack: state.root?.config?.stack || 'full',
        skills: {...(state.root?.skills || {})},
        showLabels: !!(state.root?.config['show_skills_labels'] || false),
        showTooltips: !!(state.root?.config['skills_tooltips'] || false)
    }
}

/**
 * Map dispatch to props (pull in our redux actions)
 *
 * @type {{toggleSkillsLabel: (function(): {type: string}), toggleSkillsTooltips: (function(): {type: string})}}
 */
const mapDispatchToProps = {
    toggleSkillsLabel,
    toggleSkillsTooltips
}

// export <Skills {...props} />
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Skills);