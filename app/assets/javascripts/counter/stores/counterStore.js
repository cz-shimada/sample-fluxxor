export class CounterStore {

  constructor(flux) {
    this.counter = 0;
    let counterActions = this.alt.getActions('CounterActions');
    this.bindListeners({
        handlePlusCounter: counterActions.plusCounter,
        handleMinusCounter: counterActions.minusCounter,
        handleCalcCounter: counterActions.calcCounter
    });
  }

  handlePlusCounter() {
    this.counter += 1;
    console.log(this.counter);
    this.setState({counter:this.counter});
  }

  handleMinusCounter() {
    this.counter -= 1;
    console.log(this.counter);
    this.setState({counter:this.counter});
  }

  handleCalcCounter(payLoad) {
    console.log('store');
    this.counter += payLoad;
  }

}
