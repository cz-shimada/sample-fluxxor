export class CounterStore {

  constructor() {
    this.counter = 0;
    let counterActions = this.alt.getActions('CounterActions');
    this.bindListeners({
        handlePlusCounter: counterActions.plusCounter,
        handleMinusCounter: counterActions.minusCounter,
        handleCulcCounter: counterActions.calcCounter
    });
  }

  handlePlusCounter() {
    console.log('store');
    this.counter += 1;
  }
  
  handleMinusCounter() {
    console.log('store');
    this.counter -= 1;
  }

  handleCulcCounter(payLoad) {
    console.log('store');
    this.counter += payLoad;
  }

}
