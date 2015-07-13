import React from 'react';
import { Flux } from './alt.js'

import CounterAppView from './components/counter.jsx';

const flux = new Flux();

React.render(
    <CounterAppView flux={flux} />,
    document.getElementById('alt-component')
);
