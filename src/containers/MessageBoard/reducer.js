import * as at from 'constants/actionTypes';
import immutable from 'immutable';

const initialState = immutable.fromJS({
  comments: [],
});

export default function messageBoard(state = initialState, action) {
  let tmpList;
  switch (action.type) {
    case at.COMMENT_INIT:
      return state.update('comments', () => immutable.fromJS(action.comments));
    case at.COMMENT_ADD:
      tmpList = state.get('comments').toJS();
      tmpList.push(action.comment);
      return state.update('comments', () =>
      immutable.fromJS(tmpList));
    case at.DISCUSS_ADD:
      return state;
    default:
      return state;
  }
}
