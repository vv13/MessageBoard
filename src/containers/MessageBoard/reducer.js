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
    case at.DISCUSS_ADD: {
      const id = action.commentId;
      const discuss = action.discuss;
      const tmpComments = state.get('comments').toJS();
      for (let i = 0; i < tmpComments.length; i++) {
        if (tmpComments[i].id === id) {
          tmpComments[i].discuss.push({
            email: 'zwhvv13@foxmail.com',
            headUrl: '/img/default_head.png',
            date: '16:40, 6/31/2016',
            comment: discuss,
          });
        }
      }
      return state.update('comments', () => immutable.fromJS(tmpComments));
    }

    default:
      return state;
  }
}
