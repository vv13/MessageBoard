import { expect } from 'chai';
import messageboard from 'containers/MessageBoard/reducer';
import * as at from 'constants/actionTypes';
import immutable from 'immutable';

describe('reducers', () => {
  describe('messageboard', () => {
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
    it('should provide the initial state', () => {
      expect(messageboard(undefined, {})).to.be.eql(initialState);
    });
    it('should handle COMMENT_INIT action', () => {
      const comments = [1, 2, 3];
      const result = messageboard(immutable.fromJS({}), {
        type: at.COMMENT_INIT,
        comments,
      });
      expect(result.get('comments')).to.be.eql(immutable.fromJS([1, 2, 3]));
    });

    it('should handle COMMENT_ADD action', () => {
      const comment = 'haha';
      const result = messageboard(immutable.fromJS({
        comments: [],
      }), {
        type: at.COMMENT_ADD,
        comment,
      });
      expect(result.get('comments')).to.be.eql(immutable.fromJS(['haha']));
    });

    it('should handle DISCUSS_ADD correctly', () => {
      const comments = [
        {
          _id: 1,
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
          _id: 1,
          discuss: ['test'],
        },
      ]);
    });

    it('should handle EMAIL_DELETE correctly', () => {
      const result = messageboard(immutable.fromJS({
        userEmail: 'test',
      }), {
        type: at.EMAIL_DELETE,
      });
      expect(result.get('userEmail')).to.be.equal(null);
    });

    it('should handle EMAIL_UPDATE correctly', () => {
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
});
