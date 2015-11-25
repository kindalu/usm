import USM from './usm.js'

console.log("start counter example");

let usm = new USM();
//a simple counter example
const COUNTER_STATE = "COUNTER_STATE";
const INCREMENT_COUNTER = "INCREMENT_COUNTER";
const DECREMENT_COUNTER = "DECREMENT_COUNTER";

//set initial value for counter state
usm.states[COUNTER_STATE] = {val:0};
usm.register(INCREMENT_COUNTER, COUNTER_STATE, (counter) => counter.val++);
usm.register(DECREMENT_COUNTER, COUNTER_STATE, (counter) => counter.val--);
usm.addWatcher(COUNTER_STATE, (counter) => {
                console.log("  counter changed to " + counter.val);
              });

usm.trigger(INCREMENT_COUNTER);
usm.trigger(INCREMENT_COUNTER);
usm.trigger(INCREMENT_COUNTER);
usm.trigger(INCREMENT_COUNTER);
usm.trigger(INCREMENT_COUNTER);
usm.trigger(DECREMENT_COUNTER);
