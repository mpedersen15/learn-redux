var redux = require('redux');

var defaultState = {
  name: 'Anonymous',
};

var reducer = (state = defaultState , action) => {

  console.log('new action', action);

  switch(action.type){
    case 'CHANGE_NAME':
      console.log('action type is CHANGE_NAME', action.name);
      return {
        ...state,
        name: action.name
      };
    default:
    return state;
  }
};

var store = redux.createStore(reducer);

console.log('name should be Anonymous', store.getState());

store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Matt'
});

console.log('name should be Matt', store.getState());
