import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import messageBoard from 'containers/MessageBoard/reducer';


export default function createReducer(asyncReducers) {
  return combineReducers({
    messageBoard,
    routing: routerReducer,
    ...asyncReducers,
  });
}
