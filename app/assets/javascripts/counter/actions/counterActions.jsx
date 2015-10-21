import alt from '../alt.jsx';

class CounterActions {

  constructor() {
      this.generateActions(
          'plusCounter',
          'minusCounter'
      );
  }

  calcCounter(data) {
    return data;
  }
}

export default alt.createActions(CounterActions);
