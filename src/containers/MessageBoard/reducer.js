import * as at from 'constants/actionTypes';
import immutable from 'immutable';
const getEmail = () => {
  try {
    if (localStorage) {
      return localStorage.getItem('userEmail');
    }
    return '';
  } catch (e) {
    return '';
  }
};

const initialState = immutable.fromJS({
  comments: [],
  userEmail: getEmail(),
});

// tmpList = state.get('terminalInfoList').toJS();
// tmpList.push(action.info);
// return state.update('terminalInfoList', () => immutable.fromJS(tmpList));

export default function messageBoard(state = initialState, action) {
  switch (action.type) {
    case at.COMMENT_INIT:
      return state.update('comments', () => immutable.fromJS(action.comments));
    case at.COMMENT_ADD: {
      const comments = state.get('comments').toJS();
      comments.unshift(action.comment);
      return state.update('comments', () => immutable.fromJS(comments));
    }
    case at.COMMENT_REMOVE: {
      let index;
      const comments = state.get('comments').toJS();
      comments.forEach((e, i) => {
        if (e._id === action.commentId) {
          index = i;
        }
      });
      comments.splice(index, 1);
      return state.update('comments', () => immutable.fromJS(comments));
    }
    case at.COMMENT_LIKE: {
      const { commentId, userEmail, isLiked } = action;
      const comments = state.get('comments').toJS();
      console.log(comments);
      const comment = comments.filter(e => e._id === commentId)[0];
      const index = comment.liked.indexOf(userEmail);
      if (isLiked) {
        comment.liked.splice(index, 1);
      } else {
        comment.liked.push(userEmail);
      }
      return state.update('comments', () => immutable.fromJS(comments));
    }
    case at.DISCUSS_ADD: {
      const id = action.commentId;
      const discuss = action.discuss;
      const tmpComments = state.get('comments').toJS();
      for (let i = 0; i < tmpComments.length; i++) {
        if (tmpComments[i]._id === id) {
          tmpComments[i].discuss.push(discuss);
        }
      }
      return state.update('comments', () => immutable.fromJS(tmpComments));
    }
    case at.EMAIL_DELETE:
      return state.update('userEmail', () => null);
    case at.EMAIL_UPDATE:
      return state.update('userEmail', () => action.userEmail);
    default:
      return state;
  }
}
