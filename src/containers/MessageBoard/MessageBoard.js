import style from './style.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import Nav from 'components/Nav';
import Nav from 'components/Nav';
import CommentsView from './components/CommentsView';
import * as actions from './actions';

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
    discussAddFunc: bindActionCreators(actions.discussAdd, dispatch),
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
    // 初始化留言板
    this.props.commentInitFunc();
  }

  render() {
    const { comments } = this.props.messageBoard.toJS();
    return (
      <div>
        <Nav />
        <div className={style.centerWrapper}>
          <div className={style.commentWrap}>
            <CommentsView
              comments={comments} commentAdd={this.props.commentAddFunc}
              discussAdd={this.props.discussAddFunc}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MessageBoard;
