var redux = require('redux');

console.log('starting redux 2 example');

var defaultState = {
  searchText: '',
  showCompleted: false,
  todos: []
};

var reducer = (state = defaultState , action) => {
  switch(action.type){
    case 'CHANGE_SEARCH_TEXT':
      return {
        ...state,
        searchText: action.searchText
      };
    default:
      return state;
  }
};

var store = redux.createStore(reducer);

var currentState = store.getState();

console.log('currentState', currentState);

var action = {
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'New search text'
};

store.dispatch(action);

console.log('should have new search text', store.getState());
