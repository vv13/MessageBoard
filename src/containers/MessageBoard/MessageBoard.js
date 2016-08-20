import style from './style.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import Nav from 'components/Nav';
import Nav from 'components/Nav';
import CommentsView from './components/CommentsView';
import * as messageBoardActions from './actions';

function mapStateToProps(state) {
  const { messageBoard } = state;
  return {
    messageBoard,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    messageBoardActions: bindActionCreators(messageBoardActions, dispatch),
    // commentInitFunc: bindActionCreators(actions.commentInitFunc, dispatch),
    // commentAddFunc: bindActionCreators(actions.commentAdd, dispatch),
    // commentRemove: bindActionCreators(actions.commentRemove, dispatch),
    // emailDelete: bindActionCreators(actions.emailDelete, dispatch),
    // emailUpdate: bindActionCreators(actions.emailUpdate, dispatch),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class ConnMessageBoard extends Component {
  static propTypes = {
    messageBoard: PropTypes.object.isRequired,
    messageBoardActions: PropTypes.object.isRequired,
    // commentInitFunc: PropTypes.func,
    // commentAddFunc: PropTypes.func,
    // commentRemove: PropTypes.func,
    // discussAddFunc: PropTypes.func,
    // emailDelete: PropTypes.func,
    // emailUpdate: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.rerenderUI = this.rerenderUI.bind(this);
  }

  componentWillMount() {
    this.rerenderUI();
  }

  rerenderUI() {
    this.props.messageBoardActions.commentInitFunc();
  }

  render() {
    const { comments, userEmail } = this.props.messageBoard.toJS();
    const actions = this.props.messageBoardActions;
    return (
      <div>
        <Nav userEmail={userEmail} actions={actions} />
        <div className={style.centerWrapper}>
          <div className={style.commentWrap}>
            <CommentsView
              actions={actions}
              comments={comments}
              userEmail={userEmail}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ConnMessageBoard;
