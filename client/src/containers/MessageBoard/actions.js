import * as at from 'constants/actionTypes';
import PouchDB from 'pouchdb';

const db = new PouchDB('http://localhost:5984/listening');

export function commentAdd(comment) {
  return (dispatch) => {
    db.put(comment)
      .then(() => {
        dispatch({
          type: at.COMMENT_ADD,
          comment,
        });
      })
      .catch(err => console.error('comment add failed, error: ', err));
  };
}

export function discussAdd(commentId, discuss) {
  return dispatch => {
    db.get(commentId)
      .then(comment => {
        comment.discuss.push(discuss);
        return comment;
      })
      .then(comment => {
        db.put(comment)
          .then(() => {
            dispatch({
              type: at.DISCUSS_ADD,
              discuss,
              commentId,
            });
          })
          .catch(err => console.error('discuss add failed, error:', err));
      })
      .catch(err => console.error('get comment failed, error:', err));
  };
}

export function commentRemove(comment) {
  return dispatch => {
    const commentId = comment._id;
    db.remove(comment)
      .then(() => {
        dispatch({
          type: at.COMMENT_REMOVE,
          commentId,
        });
      })
      .catch(err => {
        console.error('comment remove failed, error:', err);
      });
  };
}

function convertFromPouchdb(data) {
  const rowData = data.rows;
  const convertData = rowData.map(d => d.doc);
  return convertData;
}

export function commentInitFunc() {
  // 获取到留言，更新数据
  return dispatch => {
    db.allDocs({ include_docs: true, descending: true })
      .then(result => {
        dispatch({
          type: at.COMMENT_INIT,
          comments: convertFromPouchdb(result),
        });
        return null;
      })
      .error(err => console.error('init comments failed, error:', err));
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

export function commentLike(commentId, userEmail) {
  return dispatch => {
    let isLiked; // true删除, false添加
    db.get(commentId)
      .then((doc) => {
        const index = doc.liked.indexOf(userEmail);
        if (index !== -1) {
          doc.liked.splice(index, 1);
          isLiked = true;
        } else {
          doc.liked.push(userEmail);
          isLiked = false;
        }
        return db.put(doc)
          .then(() => {
            dispatch({
              type: at.COMMENT_LIKE,
              userEmail,
              commentId,
              isLiked,
            });
          })
          .catch((err) => {
            console.error('like comment failed, error:', err);
          });
      })
      .catch((err) => console.error('get comment failed, error:', err));
  };
}
