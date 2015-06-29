var React = require('react');
var Reactable = require('reactable');
var Fluxxor = require('fluxxor');

var Table = Reactable.Table,
    Tr = Reactable.Tr,
    Td = Reactable.Td;

var FluxMixin = Fluxxor.FluxMixin(React),
  StoreWatchMixin = Fluxxor.StoreWatchMixin;

var constants = {
  CHECKEBOX_ON: "CHECKEBOX_ON",
  CHECKEBOX_OFF: "CHECKEBOX_OFF"
};

// CheckBoxFluxGroup.
// View
var CheckBox = React.createClass({
  mixins: [
    FluxMixin, StoreWatchMixin("CheckBoxesStore")
  ],
  getStateFromFlux: function() {
    return this.getFlux().store("CheckBoxesStore").getState();
  },
  handleChange: function(event) {
    var name = this.props.name;
    if (event.target.checked) {
        return this.getFlux().actions.checkedOn(name);
    } else {
        return this.getFlux().actions.checkedOff(name);
    }
  },
  render: function() {
    return <input type="checkbox" defaultChecked={this.state.complete} onChange={this.handleChange} />
  }
});

// Actions
var checkboxActions = {
    checkedOn: function(name) {
      this.dispatch(constants.CHECKEBOX_ON, {
        value: name
      });
    },
    checkedOff: function(name) {
      this.dispatch(constants.CHECKEBOX_OFF, {
        value: name
      });
    }
  }

// ButtonFluxGroup.
var CheckBoxStateGetterButton = React.createClass({
  mixins: [
    FluxMixin, StoreWatchMixin("CheckBoxesStore")
  ],
  getStateFromFlux: function() {
    return this.getFlux().store("CheckBoxesStore").getState();
  },
  onClickHandler: function() {
    console.log(this.getStateFromFlux().state);
    alert(this.getStateFromFlux().state);
  },
  render: function() {
    return <button onClick={this.onClickHandler}>Find Checked CheckboxName</button>
  }
});


// Store
var CheckBoxesStore = Fluxxor.createStore({
  initialize: function() {
    this.checkboxOnStates = new Set();
    this.bindActions(
      constants.CHECKEBOX_ON, this.checkboxOn,
      constants.CHECKEBOX_OFF, this.checkboxOff
    );
  },
  checkboxOn: function(payload) {
    this.checkboxOnStates.add(payload.value);
    console.log(this.checkboxOnStates);
  },
  checkboxOff: function(payload) {
    this.checkboxOnStates.delete(payload.value);
    console.log(this.checkboxOnStates);
  },
  getState: function() {
    return {
      state: this.checkboxOnStates
    };
  }
});

var stores = { CheckBoxesStore: new CheckBoxesStore() };
var checkboxFlux = new Fluxxor.Flux(stores , checkboxActions)

// Render - Table
React.render(
  <Table className="table" id="table">
      <Tr>
          <Td column="checkBox">
            <CheckBox flux={checkboxFlux} name="checkbox1" />
          </Td>
          <Td column="Name">
              <a href="http://github.com">
                octacat
              </a>
          </Td>
          <Td column="Age">18</Td>
      </Tr>
      <Tr>
          <Td column="checkBox">
            <CheckBox flux={checkboxFlux} name="checkbox2" />
          </Td>
          <Td column="Name">Lee Salminen</Td>
          <Td column="Age">23</Td>
      </Tr>
      <Tr>
          <Td column="checkBox">
            <CheckBox flux={checkboxFlux} name="checkbox3" />
          </Td>
          <Td column="Position">Developer</Td>
          <Td column="Age">29</Td>
      </Tr>
  </Table>,
    document.getElementById('table')
);

var buttonFlux = new Fluxxor.Flux(stores)
React.render(
  <CheckBoxStateGetterButton  flux={buttonFlux} />,
  document.getElementById('checkbox_state_button')
);
