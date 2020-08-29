/**
 * Copyright (c) 2020
 * Author: Josh McCreight<josh@joshmccreight.ca>
 */
import React from "react";
import {Col, Row} from "react-bootstrap";
import List from "./List";
import {useTrans} from "../hooks";

// noinspection JSValidateJSDoc
/**
 * Experience component
 *
 * @param experience
 * @returns {JSX.Element}
 * @constructor
 */
const Experience = ({experience}) => {
    // get the translator
    const t = useTrans();

    // return the result
    return <div className="experience" key={experience.key}>
        <div className="experience-header">
            <Row>
                <Col xs={12} className={"experience-title-row"}>
                    <div className={"float-right"}>
                        <small className="experience-from">{t.formatMessage(experience.from)}</small>
                        <small className="experience-from-to-to mr-1 ml-1">
                            {t.formatMessage({id: 'words.to', defaultMessage: 'to'})}
                        </small>
                        <small className="experience-to">{t.formatMessage(experience.to)}</small>
                    </div>
                    <h6 className="experience-title pb-0 mb-0">{t.formatMessage(experience.title)}</h6>
                </Col>
                <Col xs={12} className="experience-company">
                    <small className="experience-company-name">{t.formatMessage(experience['company'])}</small>,
                    <small className="experience-company-location">{t.formatMessage(experience.location)}</small>
                </Col>
            </Row>
        </div>
        {experience.description ?
            <p className="experience-description">{t.formatMessage(experience.description)}</p> : null}
        {experience.list && experience.list.length > 0 ? <List items={experience.list}/> : null}
        {experience['keywords'] && experience['keywords'].length > 0 ?
            <small className="experience-keywords mb-2 mt-2">
                <b>{t.formatMessage({id: 'words.keywords', defaultMessage: 'Keywords'})}: </b>
                {t.formatMessageList(experience['keywords'])}
            </small> : null}
        {experience['apis'] && experience['apis'].length > 0 ?
            <small className="experience-apis d-block mt-2">
                <b>{t.formatMessage({id: 'words.apis', defaultMessage: 'Apis'})}: </b>
                {t.formatMessageList(experience['apis'])}
            </small> : null}
        {experience.children && experience.children.length > 0 ? experience.children.map((childExperience, idx) =>
            <Experience key={idx} experience={childExperience}/>) : null}
    </div>;
}

// export <Experience {...props} />
export default Experience;
