var redux = require('redux');

console.log('starting redux 2 example');

var defaultState = {
  searchText: '',
  showCompleted: false,
  todos: []
};

var reducer = (state = defaultState , action) => {
  return state;
};

var store = redux.createStore(reducer);

var currentState = store.getState();

console.log('currentState', currentState);