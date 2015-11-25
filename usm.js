// a simple global ui state machine(USM) for react
// without the need to learn all the new jagons from flux

class USM {
  constructor(){
    // TODO: make sure state are object (will passing by reference)
    // action_string => state
    this.states = {};

    // a transducers links in FSM := action_name => [state_name , callback(state, ...)]
    this.links = {};

    // state change watches := state_name => callback
    this.watchers = {};
  }

  register(action, state_name, callback){
    this.links[action] = {state_name, callback};
  }

  trigger(action, ...data){
    const {state_name, callback} = this.links[action];
    if(data.length > 0)
        callback(this.states[state_name], ...data);
    else
        callback(this.states[state_name]);

    // TODO: the state may not change...
    // may need to introduce the ImmutableJS
    if(this.watchers.hasOwnProperty(state_name))
      this.watchers[state_name].forEach((func) => func(this.states[state_name]));

    // call the listener want to watch every state changes
    if(this.watchers.hasOwnProperty('*'))
      this.watchers['*'].forEach((func) => func(this.states[state_name]));

  }

  addWatcher(state_name, callback){
    if(this.watchers.hasOwnProperty(state_name))
        this.watchers[state_name].push(callback);
    else
        this.watchers[state_name] = [callback];
  }
};

export default USM;

