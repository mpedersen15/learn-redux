var redux = require('redux');

console.log('starting redux 2 example');

/*var defaultState = {
  searchText: '',
  showCompleted: false,
  todos: []
};*/




// searchText handlers
// ------------------------------
var searchTextReducer = (state = '', action) => {
  switch(action.type){
    case 'CHANGE_SEARCH_TEXT':
      return action.searchText;
    default:
      return state;
  }
}

var changeSearchText = (searchText) => {
  return {
    type: 'CHANGE_SEARCH_TEXT',
    searchText
  };
}

// showCompleted handlers
// ------------------------------
var showCompletedReducer = (state = false, action) => {
  switch(action.type){
    case 'CHANGE_SHOW_COMPLETED':
      return action.showCompleted;
    default:
      return state;
  }
}

var changeShowCompleted = (showCompleted) => {
  return {
    type: 'CHANGE_SHOW_COMPLETED',
    showCompleted
  };
}

// todos handlers
// ------------------------------
var nextTodoId = 1;
var todosReducer = (state = [], action) => {
  switch(action.type){
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: nextTodoId++,
          text: action.text
        }
      ];
    case 'REMOVE_TODO':
      return state.filter((todo) => todo.id !== action.id)
    default:
      return state;
  }
}

var addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    text
  };
}

var removeTodo = (id) => {
  return {
    type: 'REMOVE_TODO',
    id
  };
}

var reducer = redux.combineReducers({
  searchText: searchTextReducer,
  showCompleted: showCompletedReducer,
  todos: todosReducer
});

/*var reducer = (state = defaultState , action) => {
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
};*/

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

store.dispatch(changeSearchText('New new search text'));

store.dispatch(changeSearchText('Super new search text'));

store.dispatch(addTodo('A very new todo'));
store.dispatch(addTodo('A super new todo'));
store.dispatch(addTodo('A third new todo'));

store.dispatch(removeTodo(1));

store.dispatch(changeShowCompleted(true));
