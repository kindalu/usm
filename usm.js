// a simple global ui state machine(USM) for react
// without the need to learn all the new jagons from flux
import Immutable from 'immutable';

class USM {
  constructor(){
    // action_string => state
    this.states = Immutable.Map({});

    // a transducers links in FSM := action_name => [state_name , callback(state, ...)]
    this.links = {};

    // state change watches := state_name => callback
    this.observers = {};
  }

  register(action, state_name, callback){
    this.links[action] = {state_name, callback};
  }

  trigger(action, ...data){
    const {state_name, callback} = this.links[action];

    let stateBefore = this.states.get(state_name);

    this.states = this.states.set(
      state_name,
      callback(stateBefore, ...data)
    );

    if(stateBefore !== this.states.get(state_name)){
      if(this.observers.hasOwnProperty(state_name))
        this.observers[state_name].forEach((func) => func(this.states.get(state_name)));

      // call the listener want to watch every state changes
      if(this.observers.hasOwnProperty('*'))
        this.observers['*'].forEach((func) => func(this.states.get(state_name)));
    }
  }

  addObserver(state_name, callback){
    if(this.observers.hasOwnProperty(state_name))
      this.observers[state_name].push(callback);
    else
      this.observers[state_name] = [callback];
  }
};

export default USM;
