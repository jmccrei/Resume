/**
 * Copyright (c) 2020
 * Author: Josh McCreight<josh@joshmccreight.ca>
 */
import React from "react";
import {ListGroup} from "react-bootstrap";
import {FormattedMessage} from "react-intl";

/**
 * List Component
 *
 * @param listItems
 * @returns {JSX.Element}
 * @constructor
 */
const List = ({items}) => {
    return <ListGroup as="ul">
        {items.map((item, idx) => <ListGroup.Item as="li" key={idx}>
            {typeof item === 'object' ? <FormattedMessage {...item}/> : item}
        </ListGroup.Item>)}
    </ListGroup>;
}

// export <List items={items||[]} />
export default List;