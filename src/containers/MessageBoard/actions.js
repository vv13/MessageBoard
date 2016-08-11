import * as at from 'constants/actionTypes';
import * as staticApi from 'constants/staticApi';

export function commentAdd(comment) {
  return {
    type: at.COMMENT_ADD,
    comment,
  };
}

export function discussAdd(discuss) {
  return {
    type: at.DISCUSS_ADD,
    discuss,
  };
}

export function commentInit(comments) {
  return {
    type: at.COMMENT_INIT,
    comments,
  };
}

export function commentInitFunc() {
  // 获取到留言，更新数据
  const comments = staticApi.getComments();
  return (dispatch) => (
    dispatch(commentInit(comments))
  );
}
