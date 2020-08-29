/**
 * Copyright (c) 2020
 * Author: Josh McCreight<josh@joshmccreight.ca>
 */
import React from "react";
import ReactDom from 'react-dom';
import App from "./components/App";
import {Provider} from "react-redux";
import store from "./store";

// get our styling
require('../scss/style.scss');

// Lets go! Render this now with the provided store, IntlProvider and target element
ReactDom.render(<Provider store={store}><App store={store}/></Provider>,
    document.getElementById('root'));
