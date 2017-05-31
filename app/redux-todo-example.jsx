var redux = require('redux');

console.log('starting redux 2 example');

var defaultState = {
  searchText: '',
  showCompleted: false,
  todos: []
};

var nextTodoId = 1;

var reducer = (state = defaultState , action) => {
  switch(action.type){
    case 'CHANGE_SEARCH_TEXT':
      return {
        ...state,
        searchText: action.searchText
      };
    case 'ADD_TODO':
      // add a todo to state
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: nextTodoId++,
            text: action.text
          }
        ]
      }
    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id)
      }
    default:
      return state;
  }
};

var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

// Subscribe to changes to store

var unsubscribe = store.subscribe( () => {
  var state = store.getState();
  console.log('state changed', state);
  document.getElementById('app').innerHTML = state.searchText;
});
// unsubscribe();

var currentState = store.getState();

var action = {
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'New search text'
};

store.dispatch(action);

store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'New new search text'
});

store.dispatch({
  type: 'ADD_TODO',
  text: 'A very new todo'
});

store.dispatch({
  type: 'ADD_TODO',
  text: 'A super new todo'
});

store.dispatch({
  type: 'ADD_TODO',
  text: 'A third new todo'
});

store.dispatch({
  type: 'REMOVE_TODO',
  id: 1
});
