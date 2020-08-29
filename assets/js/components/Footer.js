/**
 * Copyright (c) 2020
 * Author: Josh McCreight<josh@joshmccreight.ca>
 */
import React from 'react';
import {useTrans} from "../hooks";

// noinspection JSValidateJSDoc
/**
 * Footer
 * Example of a default function component
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function Footer({}) {
    const t = useTrans();

    return <footer className="site-footer text-center">
        <small>{t.formatMessage({id: 'words.copyright', defaultMessage: 'Copyright'})}&copy;2020 Josh McCreight</small>
    </footer>
}
