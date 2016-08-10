import style from './style.css';
import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import Nav from 'components/Nav';
import Nav from 'components/Nav';
import CommentsView from './components/CommentsView';

// import * as actions from './actions';

// function mapStateToProps(state) {
//   return {
//     state: state.messageboard,
//   };
// }
//
// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(actions, dispatch),
//   };
// }

// @connect(mapStateToProps, mapDispatchToProps)
class MessageBoard extends Component {
  static propTypes = {
    // state: PropTypes.object.isRequired,
    // actions: PropTypes.object.isRequired,
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Nav />
        <div className={style.centerWrapper}>
          <div className={style.commentWrap}>
            <CommentsView />
          </div>
        </div>
      </div>
    );
  }
}

export default MessageBoard;
