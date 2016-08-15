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
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class MessageBoard extends Component {
  static propTypes = {
    messageBoard: PropTypes.object.isRequired,
    commentInitFunc: PropTypes.func,
    commentAddFunc: PropTypes.func,
    discussAddFunc: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {};
    const that = this;
    // 初始化数据连接
    this.db = new PouchDB('http://localhost:5984/listening');
    // 初始化界面
    this.rerenderUI();
    // db发生改变则刷新界面
    this.db.changes({
      since: 'now',
      live: true,
    }).on('change', that.rerenderUI.bind(that));
    this.rerenderUI = this.rerenderUI.bind(this);
  }
  rerenderUI() {
    this.props.commentInitFunc(this.db);
  }

  render() {
    const { comments } = this.props.messageBoard.toJS();
    return (
      <div>
        <Nav />
        <div className={style.centerWrapper}>
          <div className={style.commentWrap}>
            <CommentsView
              comments={comments}
              commentAdd={this.props.commentAddFunc}
              db={this.db}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MessageBoard;
