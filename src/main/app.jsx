import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers/reducer';
import {setWorld} from './reducers/action_creators';
import {GameContainer} from './components/Game';
import {List, Map} from 'immutable';

const store = createStore(
    reducer,
    applyMiddleware(
        thunkMiddleware
    ));
store.dispatch(setWorld(
    Map({
        generation: 0,
        grid: List.of(
            List.of(false, false, false, false, false, false),
            List.of(false, false, false, false, false, false),
            List.of(false, false, true, true, true, false),
            List.of(false, true, true, true, false, false),
            List.of(false, false, false, false, false, false),
            List.of(false, false, false, false, false, false),
        ),
    }),
));

if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers/reducer', () => {
      const nextRootReducer = require('./reducers/reducer');
      store.replaceReducer(nextRootReducer);
    });
}

export default class App extends React.Component {
  render() {
    return (
   <Provider store={store}>
        <GameContainer />
    </Provider>
    );
  }
}
