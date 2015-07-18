var React = require("react/addons");
var ReactToastr = require("react-toastr");
var {ToastContainer} = ReactToastr; // This is a React Element.
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

var HelloWorld = React.createClass({
  addAlert () {
    this.refs.container.success("hi! Now" + new Date(), "///title\\\\\\", {
      closeButton: true
    });
  },
  close() {
     this.refs.container.clear();
  },
  render () {
    return (
      <div>
        <ToastContainer toastMessageFactory={ToastMessageFactory} ref="container" className="toast-top-right" />
        <button onClick={this.addAlert}>GGininder</button>
        <button onClick={this.close}>close</button>
      </div>
    );
  }
});

React.render(
    <HelloWorld />,
    document.getElementById('alert')
);
