import Immutable from 'immutable';
import USM from './usm.js'

console.log("start counter example");

let usm = new USM();
//a simple counter example
const COUNTER_STATE = "COUNTER_STATE";
const INCREMENT_COUNTER = "INCREMENT_COUNTER";
const DECREMENT_COUNTER = "DECREMENT_COUNTER";

//set initial value for counter state
usm.set(COUNTER_STATE, Immutable.Map({counter:0}));

usm.register(INCREMENT_COUNTER, COUNTER_STATE, (m) => m.set('counter', m.get('counter')+1));
usm.register(DECREMENT_COUNTER, COUNTER_STATE, (m) => m.set('counter', m.get('counter')-1));
usm.addObserver(
  COUNTER_STATE,
  (m) => {
    console.log("  counter changed to " + m.get('counter'));
  }
);

usm.trigger(INCREMENT_COUNTER);
usm.trigger(INCREMENT_COUNTER);
usm.trigger(INCREMENT_COUNTER);
usm.trigger(INCREMENT_COUNTER);
usm.trigger(INCREMENT_COUNTER);
usm.trigger(DECREMENT_COUNTER);
