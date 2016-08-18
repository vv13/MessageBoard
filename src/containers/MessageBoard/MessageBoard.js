import style from './style.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import Nav from 'components/Nav';
import Nav from 'components/Nav';
import CommentsView from './components/CommentsView';
import * as actions from './actions';
import PouchDB from 'pouchdb';

function mapStateToProps(state) {
  const { messageBoard } = state;
  return {
    messageBoard,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    commentInitFunc: bindActionCreators(actions.commentInitFunc, dispatch),
    commentAddFunc: bindActionCreators(actions.commentAdd, dispatch),
    emailDelete: bindActionCreators(actions.emailDelete, dispatch),
    emailUpdate: bindActionCreators(actions.emailUpdate, dispatch),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class MessageBoard extends Component {
  static propTypes = {
    messageBoard: PropTypes.object.isRequired,
    commentInitFunc: PropTypes.func,
    commentAddFunc: PropTypes.func,
    discussAddFunc: PropTypes.func,
    emailDelete: PropTypes.func,
    emailUpdate: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {};
    const that = this;
    // 初始化数据连接
    this.db = null;
    new PouchDB('http://localhost:5984/listening')
      .then(newdb => {
        that.db = newdb;
        that.db.changes({
          since: 'now',
          live: true,
        }).on('change', that.rerenderUI.bind(that));
        return null;
      })
      .then(() => {
        that.rerenderUI = that.rerenderUI.bind(that);
        that.rerenderUI();
      });
  }

  rerenderUI() {
    this.props.commentInitFunc(this.db);
  }

  render() {
    const { comments, userEmail } = this.props.messageBoard.toJS();
    return (
      <div>
        <Nav userEmail={userEmail} emailDelete={this.props.emailDelete} emailUpdate={this.props.emailUpdate} />
        <div className={style.centerWrapper}>
          <div className={style.commentWrap}>
            <CommentsView
              comments={comments}
              commentAdd={this.props.commentAddFunc}
              db={this.db}
              emailUpdate={this.props.emailUpdate}
              userEmail={userEmail}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MessageBoard;
