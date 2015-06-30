var React = require('react');
var Fluxxor = require('fluxxor');

var constants = {
  UPDATE_COUNTER: "UPDATE_COUNTER"
};

var CounterStore = Fluxxor.createStore({
  initialize: function() {
    this.counter = 1;
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
      <span>
        count: {this.props.value}
      </span>
      <div>
        <button onClick={this.onClickPlus}>+1</button>
        <button onClick={this.onClickMinus}>-1</button>
      </div>
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
          <h4>+100</h4>
          <CounterOneHundred />
          <h4>足したい数字を入力</h4>
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
          <button onClick={this.onClickPlusOneHundred}>+100</button>
        </div>
    );
  }
});

var CounterInput = React.createClass({
  mixins: [ FluxMixin ],
  onClickPlusInputValue: function(){
    var value = parseInt(document.getElementById("plus_value_input").value);

    if(isNaN(value)){
      alert("数字を入力してください");
      return;
    }

    return this.getFlux().actions.calcCounter(value);
  },

  render: function(){
    return (
        <div>
          <input type="text" id="plus_value_input"/>
          <button onClick={this.onClickPlusInputValue}>plus</button>
        </div>
    );
  }

});

var stores = { CounterStore: new CounterStore() };
var flux = new Fluxxor.Flux(stores , actions);

React.render(
    <CounterApp flux={flux}/>,
    document.getElementById('app-container')
);

React.render(
    <CounterOneHundredApp flux={flux}/>,
    document.getElementById('counter_other_component')
);
