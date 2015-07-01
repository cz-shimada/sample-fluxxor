var React = require('react');
var Fluxxor = require('fluxxor');
var Button = require('react-bootstrap/lib/Button');
var Input = require('react-bootstrap/lib/Input');
var Panel = require('react-bootstrap/lib/Panel');

var constants = {
  UPDATE_COUNTER: "UPDATE_COUNTER"
};

var CounterStore = Fluxxor.createStore({
  initialize: function() {
    this.counter = 0;
    this.bindActions(constants.UPDATE_COUNTER, this.onUpdateCounter);
  },
  onUpdateCounter: function(payload) {
    this.counter = this.counter + payload.value;
    console.log(this.counter);
    this.emit('change');
  },
  getState: function() {
    return {
      counter: this.counter
    };
  }
});

var actions = {
  plusCounter: function() {
    this.dispatch(constants.UPDATE_COUNTER, {
      value: 1
    });
  },
  calcCounter: function(v){
    this.dispatch(constants.UPDATE_COUNTER, {
      value: v
    });
  },
  minusCounter: function() {
    this.dispatch(constants.UPDATE_COUNTER, {
      value: -1
    });
  }
};

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

// View
var CounterApp = React.createClass({
  mixins: [
    FluxMixin, StoreWatchMixin("CounterStore")
  ],
  getStateFromFlux: function() {
    return this.getFlux().store("CounterStore").getState();
  },
  render: function() {
    return <Counter value={this.state.counter} />
  }
});

var Counter = React.createClass({
  mixins: [FluxMixin],
  propTypes: {
    value: React.PropTypes.number.isRequired
  },
  onClickPlus: function() {
    return this.getFlux().actions.plusCounter();
  },
  onClickMinus: function() {
    return this.getFlux().actions.minusCounter();
  },
  render: function() {
    return <div>
      <Panel>
        {this.props.value}
      </Panel>
      <Button onClick={this.onClickPlus}>+1</Button>
      <Button onClick={this.onClickMinus}>-1</Button>
    </div>
  }
});


var CounterOneHundredApp = React.createClass({
  mixins:[
    FluxMixin, StoreWatchMixin("CounterStore")
  ],
  getStateFromFlux: function(){
    return this.getFlux().store("CounterStore").getState();
  },
  render: function(){
    return(
        <div>
          <CounterOneHundred />
          <br />
          <CounterInput />
        </div>
    );
  }
});

var CounterOneHundred = React.createClass({
  mixins: [ FluxMixin ],

  onClickPlusOneHundred: function(){
    return this.getFlux().actions.calcCounter(100);
  },

  render: function(){
    return (
        <div>
          <Button onClick={this.onClickPlusOneHundred}>+100</Button>
        </div>
    );
  }
});

var CounterInput = React.createClass({
  mixins: [ FluxMixin ],
  onClickPlusInputValue: function(){
    var value = parseInt(document.getElementById("plus_value_input").value);
    if(isNaN(value)){
      alert("Input Number.");
      return;
    }
    return this.getFlux().actions.calcCounter(value);
  },

  render: function(){
    return (
      <div className='input-group width-200'>
        <span className="input-group-btn">
          <Button onClick={this.onClickPlusInputValue} className='btn btn-default' >plus</Button>
        </span>
        <Input type='text' id='plus_value_input' className='form-control' />
      </div>
    )
  }

});

var stores = { CounterStore: new CounterStore() };
var flux = new Fluxxor.Flux(stores , actions);

React.render(
    <CounterApp flux={flux}/>,
    document.getElementById('counter')
);

React.render(
    <CounterOneHundredApp flux={flux}/>,
    document.getElementById('counter_other_component')
);
