var React = require('react');
var Fluxxor = require('fluxxor');
var FixedDataTable = require('fixed-data-table');
var ObjectAssign = require('object-assign');
var Input = require('react-bootstrap/lib/Input');
require('../stylesheets/fixed-data-table.css');
require('../stylesheets/fixed-data-table-enhance.css');

var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;

var FluxMixin = Fluxxor.FluxMixin(React),
  StoreWatchMixin = Fluxxor.StoreWatchMixin;

var constants = {
  CHECKEBOX_ON: "CHECKEBOX_ON",
  CHECKEBOX_OFF: "CHECKEBOX_OFF",
  LOAD_TABLE: "LOAD_TABLE"
};

// CheckBoxFluxGroup.
// View
var CheckBoxLayout = React.createClass({
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
    if (this.state.state.has(this.props.name)) {
      return <input type="checkbox" onChange={this.handleChange} checked />
    } else {
      return <input type="checkbox" onChange={this.handleChange} />
    }
  }
});

// Actions
var checkboxActions = {
    creator: function() {
      console.log("create");
    },
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

  // Actions
var tableActions = {
    initData: function() {
      var requestData = [
        ['1A', 'b1', 'c1' , 'd1'],
        ['2B', 'b2', 'c2' , 'd2'],
        ['3C', 'b3', 'c3' , 'd3']
      ];
      this.dispatch(constants.LOAD_TABLE, {
        value: requestData
      })
    }
  };

function checkBoxLayout(str, key, data, index) {
  return <CheckBoxLayout flux={checkboxFlux} name={data[0]} />
}

function inputLayout(str, key, data, index) {
  return <Input type='text' labelClassName='col-xs-2' wrapperClassName='col-xs-10' />
}

// TableLayout.
var TableLayout = React.createClass({
  mixins: [
    FluxMixin, StoreWatchMixin("TableLayoutStore" , "CheckBoxesStore")
  ],
  getStateFromFlux: function() {
    var flux = this.getFlux();
    return {
      tableLayoutStore: flux.store("TableLayoutStore").getState(),
      checkBoxStore: flux.store("CheckBoxesStore").getState(),
    };
  },
  rowGetter: function(rowIndex) {
    var aaa = this.props;
    var rows = this.getStateFromFlux().tableLayoutStore.data;
    return rows[rowIndex];
  },
  rowClassNameGetter: function(rowIndex) {
    var rowData = this.rowGetter(rowIndex);
    if (this.hasCheckBoxOn(rowData)) {
      return "crimson";
    }
    return "";
  },
  onRowClick: function(event, index, data) {
    // ignore input.
    if (event.target.tagName != 'INPUT') {
      var name = data[0]
      if (this.hasCheckBoxOn(data)) {
        return this.getFlux().actions.checkedOff(name);
      } else {
        return this.getFlux().actions.checkedOn(name);
      }
    }
  },
  hasCheckBoxOn: function(rowData) {
    if (Array.isArray(rowData)) {
      var checkBoxName = rowData[0];
      var checkedCheckBox = this.getStateFromFlux().checkBoxStore.state;
      if (checkedCheckBox.has(checkBoxName)) {
        return true;
      }
    }
    return false;
  },
  componentDidMount: function() {
    this.getFlux().actions.initData();
  },
  render: function() {
    return <Table
      rowHeight={50}
      rowGetter={this.rowGetter}
      rowClassNameGetter={this.rowClassNameGetter}
      rowsCount={20}
      onRowClick={this.onRowClick}
      width={600}
      height={400}
      headerHeight={50}>
    <Column
      label="CheckBox"
      width={100}
      height={100}
      dataKey={0}
      fixed={true}
      cellRenderer={checkBoxLayout}
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
    <Column
      label="Col 3"
      width={200}
      dataKey={3}
      align="center"
      cellRenderer={inputLayout}
      cellClassName="vertical-center"
    />
  </Table>
  }
});

// ButtonFluxGroup.
var CheckBoxStateButtonLayout = React.createClass({
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
    this.emit('change');
  },
  checkboxOff: function(payload) {
    this.checkboxOnStates.delete(payload.value);
    this.emit('change');
  },
  getState: function() {
    return {
      state: this.checkboxOnStates
    };
  }
});

var TableLayoutStore = Fluxxor.createStore({
  initialize: function() {
    this.rows = [];
    this.bindActions(
      constants.CHECKEBOX_ON, this.checkboxOn,
      constants.CHECKEBOX_OFF, this.checkboxOff,
      constants.LOAD_TABLE , this.initData
    );
  },
  initData: function(payload) {
    this.rows = payload.value;
    this.emit('change');
  },
  checkboxOn: function(payload) {
    this.emit('change');
  },
  checkboxOff: function(payload) {
    this.emit('change');
  },
  getState: function() {
    return {
      data: this.rows
    };
  }
});

var checkboxStore = { CheckBoxesStore: new CheckBoxesStore() };
var tableLayoutStore = { TableLayoutStore: new TableLayoutStore() };

var tableFlux = new Fluxxor.Flux(ObjectAssign(checkboxStore , tableLayoutStore) , ObjectAssign(checkboxActions , tableActions));
var checkboxFlux = new Fluxxor.Flux(checkboxStore , checkboxActions);

// // Render
// React.render(
//   <TableLayout flux={tableFlux} />,
//     document.getElementById('table')
// );
//
// var buttonFlux = new Fluxxor.Flux(checkboxStore);
// React.render(
//   <CheckBoxStateButtonLayout flux={buttonFlux} />,
//   document.getElementById('checkbox_state_button')
// );
