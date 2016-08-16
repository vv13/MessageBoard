import * as at from 'constants/actionTypes';

export function commentAdd(comment) {
  return {
    type: at.COMMENT_ADD,
    comment,
  };
}

export function discussAdd(commentId, discuss) {
  return {
    type: at.DISCUSS_ADD,
    discuss,
    commentId,
  };
}

function commentInit(comments) {
  return {
    type: at.COMMENT_INIT,
    comments,
  };
}

export function commentInitFunc(db) {
  // 获取到留言，更新数据
  return dispatch => {
    db.allDocs({ include_docs: true, descending: true })
      .then(result => {
        dispatch(commentInit(result.rows));
      });
  };
}

// 删除邮箱
export function emailDelete() {
  localStorage.removeItem('userEmail');
  return {
    type: at.EMAIL_DELETE,
  };
}

// 更新邮箱
export function emailUpdate(userEmail) {
  localStorage.setItem('userEmail', userEmail);
  return {
    type: at.EMAIL_UPDATE,
    userEmail,
  };
}
