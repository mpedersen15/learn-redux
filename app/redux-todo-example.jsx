var redux = require('redux');

console.log('starting redux todo example');

var reducer = (state = {searchText: '', showCompleted: false, todos: []}, action) => {
  return state;
};

var store = redux.createStore(reducer);

var currentState = store.getState();

console.log('currentState', currentState);
