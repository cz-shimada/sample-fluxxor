import React from 'react';
import AltContainer from 'alt/altContainer';
import Button from 'react-bootstrap/lib/Button';
import Input from 'react-bootstrap/lib/Input';
import Panel from 'react-bootstrap/lib/Panel';

import CounterActions from '../actions/counterActions.jsx';
import CounterStore from '../stores/counterStore.jsx';

class CounterView extends React.Component {

    onClickCalcCunter() {
      CounterActions.calcCounter(100);
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
                {this.props.counter}
              </Panel>
              <div>
                  <Button onClick={CounterActions.plusCounter}>+1</Button>
                  <Button onClick={CounterActions.minusCounter}>-1</Button>
                  <Button onClick={this.onClickCalcCunter}>+100</Button>
              </div>
            </div>
        );
    }
}


class CounterAppView extends React.Component {
    render() {
        return (
            <div>
                <AltContainer store={CounterStore}>
                    <CounterView />
                </AltContainer>
            </div>
        );
    }
}

 export default CounterAppView;
