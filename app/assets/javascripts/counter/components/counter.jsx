import React from 'react';
import AltContainer from 'alt/altContainer';
import Button from 'react-bootstrap/lib/Button';
import Input from 'react-bootstrap/lib/Input';
import Panel from 'react-bootstrap/lib/Panel';

import { CounterActions } from '../actions/counterActions.js';
import CounterStore from '../stores/counterStore.js';
import connectToStores from 'alt/utils/connectToStores';

class CounterView extends React.Component {

    static actions(props) {
      console.log(props.flux.actions.CounterActions.plusCounter)
      return props.flux.actions.CounterActions;
    }

    componentWillMount() {
      console.log("before mount");
    }

    componentDidMount() {
      console.log("mounted");
    }

    render() {
        console.log("renderd");
        return (
            <div>
              <Panel>
                {this.props.flux.getStore("CounterStore").getState().counter}
              </Panel>
              <div>
                  <Button onClick={CounterView.actions(this.props).plusCounter}>+1</Button>
                  <Button onClick={CounterView.actions(this.props).minusCounter}>-1</Button>
              </div>
            </div>
        );
    }
}


class CounterAppView extends React.Component {
    render() {
        return (
            <div>
                <AltContainer flux={this.props.flux} store={CounterStore}>
                    <CounterView />
                </AltContainer>
            </div>
        );
    }
}

 export default CounterAppView;
