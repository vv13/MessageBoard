import { expect } from 'chai';
import messageboard from 'containers/MessageBoard/reducer';
import * as at from 'constants/actionTypes';
import immutable from 'immutable';

describe('messsageboard reducer', () => {
  it('should comment init correctly', () => {
    const comments = [1, 2, 3];
    const result = messageboard(immutable.fromJS({}), {
      type: at.COMMENT_INIT,
      comments,
    });
    expect(result.get('comments')).to.be.eql(immutable.fromJS([1, 2, 3]));
  });

  it('should add comment correctly', () => {
    const comment = 'haha';
    const result = messageboard(immutable.fromJS({
      comments: [],
    }), {
      type: at.COMMENT_ADD,
      comment,
    });
    expect(result.get('comments')).to.be.eql(immutable.fromJS(['haha']));
  });

  it('should add discuss correctly', () => {
    const comments = [
      {
        id: 1,
        discuss: [],
      },
    ];
    const discuss = 'test';
    const result = messageboard(immutable.fromJS({
      comments,
    }), {
      type: at.DISCUSS_ADD,
      commentId: 1,
      discuss,
    });
    expect(result.get('comments').toJS()).to.be.eql([
      {
        id: 1,
        discuss: ['test'],
      },
    ]);
  });

  it('should delete email correctly', () => {
    const result = messageboard(immutable.fromJS({
      userEmail: 'test',
    }), {
      type: at.EMAIL_DELETE,
    });
    expect(result.get('userEmail')).to.be.equal(null);
  });

  it('should change email correctly', () => {
    const userEmail = 'test@qq.com';
    const result = messageboard(immutable.fromJS({
      userEmail: 'test',
    }), {
      type: at.EMAIL_UPDATE,
      userEmail,
    });
    expect(result.get('userEmail')).to.be.equal(userEmail);
  });
});
