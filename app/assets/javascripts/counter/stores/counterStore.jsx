import alt from '../alt.jsx'
import CounterActions from '../actions/counterActions.jsx'

class CounterStore {

  constructor() {
      this.counter = 0;
      this.bindListeners({
          handlePlusCounter: CounterActions.plusCounter,
          handleMinusCounter: CounterActions.minusCounter,
          handleCulcCounter: CounterActions.calcCounter
      });
  }

  handlePlusCounter() {
      this.counter += 1;
  }
  handleMinusCounter() {
      this.counter -= 1;
  }

  handleCulcCounter(payLoad) {
    this.counter += payLoad;
  }

}

export default alt.createStore(CounterStore, 'CounterStore');
