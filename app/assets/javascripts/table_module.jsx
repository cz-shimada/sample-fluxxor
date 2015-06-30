var React = require('react');
var Fluxxor = require('fluxxor');
var FixedDataTable = require('fixed-data-table');

require('../stylesheets/fixed-data-table.css');

var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;

var FluxMixin = Fluxxor.FluxMixin(React),
  StoreWatchMixin = Fluxxor.StoreWatchMixin;

var constants = {
  CHECKEBOX_ON: "CHECKEBOX_ON",
  CHECKEBOX_OFF: "CHECKEBOX_OFF"
};

// CheckBoxFluxGroup.
// View
var CheckBoxFlux = React.createClass({
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
  };


var rows = [
  ['1', 'b1', 'c1'],
  ['2', 'b2', 'c2'],
  ['3', 'b3', 'c3']
];

function rowGetter(rowIndex) {
  return rows[rowIndex];
}

function checkBox(data){
  console.log(this.rowData[0]);
  return <CheckBoxFlux flux={checkboxFlux} name={this.rowData[0]} />
}

var TableLayout = React.createClass({
  render: function() {
    return <Table
      rowHeight={50}
      rowGetter={rowGetter}
      rowsCount={rows.length}
      width={600}
      height={500}
      headerHeight={50}>
    <Column
      label="CheckBox"
      width={300}
      dataKey={0}
      cellRenderer={checkBox}
      align="center"
    />
    <Column
      label="Col 1"
      width={300}
      dataKey={1}
    />
    <Column
      label="Col 2"
      width={200}
      dataKey={2}
    />
  </Table>
  }
});

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
  },
  render: function() {
    return <button onClick={this.onClickHandler}>log checkbox names</button>
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

// Render
React.render(
  <TableLayout />,
    document.getElementById('table')
);

var buttonFlux = new Fluxxor.Flux(stores)
React.render(
  <CheckBoxStateGetterButton flux={buttonFlux} />,
  document.getElementById('checkbox_state_button')
);
