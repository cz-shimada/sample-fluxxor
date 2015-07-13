import Alt from 'alt';

import { CounterActions } from './actions/counterActions.js';
import { CounterStore } from './stores/counterStore.js';

export class Flux extends Alt {
    constructor() {
        super();
        this.addActions('CounterActions', CounterActions);
        this.addStore('CounterStore', CounterStore);
    }
}
