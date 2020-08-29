/**
 * Copyright (c) 2020
 * Author: Josh McCreight<josh@joshmccreight.ca>
 */
import React from "react";
import {FormattedMessage, useIntl} from "react-intl";

/**
 * useTrans hook
 *
 * @returns {{formatMessage: (function(*=, *=): (*)), intl: IntlShape, formatMessageList: (function(*, *=): *)}}
 */
export function useTrans() {
    const t = {
        intl: useIntl(),
        formatMessage: (text, key) => {
            if (typeof text === 'object') {
                if (key) {
                    text['key'] = key;
                }

                return <FormattedMessage {...text} />;
            }

            return text;
        },
        formatMessageList: (list, delimiter = ', ') => {
            const items = list.map(item => typeof item === 'object' ? t.intl.formatMessage(item) : item);
            return items.join(delimiter);
        }
    };

    return t;
}