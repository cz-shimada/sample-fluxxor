import React from 'react';
import { Flux } from './alt.js'
import AltContainer from 'alt/altContainer';

import CounterAppView from './components/counter.jsx';

const flux = new Flux();

React.render(
    <AltContainer flux={this.props.flux} >
        <CounterAppView />
    </AltContainer>
    ,
    document.getElementById('alt-component')
);
