var redux = require('redux');

var actions = require('./actions/index');
var store = require('./store/configureStore').configure();


console.log('starting redux 2 example');

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

store.dispatch(actions.fetchLocation());

store.dispatch(actions.changeSearchText('New search text'));
store.dispatch(actions.changeSearchText('New new search text'));
store.dispatch(actions.changeSearchText('Super new search text'));

store.dispatch(actions.addTodo('A very new todo'));
store.dispatch(actions.addTodo('A super new todo'));
store.dispatch(actions.addTodo('A third new todo'));
store.dispatch(actions.removeTodo(1));

store.dispatch(actions.changeShowCompleted(true));
