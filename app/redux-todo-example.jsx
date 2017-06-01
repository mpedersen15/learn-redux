var redux = require('redux');
var axios = require('axios');

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

// map handlers
// ------------------------------
var mapReducer = (state = {isFetching: false, url: undefined}, action) => {
  switch(action.type){
    case 'START_LOCATION_FETCH':
      return {
        isFetching: true,
        url: undefined
      };
    case 'COMPLETE_LOCATION_FETCH':
      return {
        isFetching: false,
        url: action.url
      };
    default:
      return state;
  }
};

var startLocationFetch = () => {
  return {
    type: 'START_LOCATION_FETCH',
  };
};

var completeLocationFetch = (url) => {
  return {
    type: 'COMPLETE_LOCATION_FETCH',
    url
  };
};

var fetchLocation = () => {
  store.dispatch(startLocationFetch());

  axios.get('http://ipinfo.io').then(function(res){
    var loc = res.data.loc;

    var baseUrl = 'http://maps.google.com?q=';

    store.dispatch(completeLocationFetch(baseUrl + loc));
  });
};

var reducer = redux.combineReducers({
  searchText: searchTextReducer,
  showCompleted: showCompletedReducer,
  todos: todosReducer,
  map: mapReducer
});

var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

// Subscribe to changes to store

var unsubscribe = store.subscribe( () => {
  var state = store.getState();
  console.log('state changed', state);
  if (state.map.isFetching){
    document.getElementById('app').innerHTML = 'Loading...';
  }else if(state.map.url){
    document.getElementById('app').innerHTML =`<a target="_blank" href="${state.map.url}">Go to your location</a>`;
  }
});

// unsubscribe();

fetchLocation();

store.dispatch(changeSearchText('New search text'));
store.dispatch(changeSearchText('New new search text'));
store.dispatch(changeSearchText('Super new search text'));

store.dispatch(addTodo('A very new todo'));
store.dispatch(addTodo('A super new todo'));
store.dispatch(addTodo('A third new todo'));
store.dispatch(removeTodo(1));

store.dispatch(changeShowCompleted(true));
