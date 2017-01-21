import { connect } from 'react-redux';
import { emailUpdate } from './actions';
import SendDiscussBox from './components/SendDiscussBox';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
  const { messageBoard } = state;
  return {
    messageBoard,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    emailUpdateFunc: bindActionCreators(emailUpdate, dispatch),
  };
}

const SendDiscussBoxConn = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SendDiscussBox);

export default SendDiscussBoxConn;
