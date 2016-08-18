import style from './style.css';
import React, { Component, PropTypes } from 'react';
import { Input, Button, Form, Modal } from 'antd';
import utils from 'utility';
import classnames from 'classnames';

class SendDiscussBox extends Component {
  static propTypes = {
    isReply: PropTypes.bool,
    discussAdd: PropTypes.func,
    messageBoard: PropTypes.object.isRequired,
    emailUpdateFunc: PropTypes.func,
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      discussInput: '',
      modalVisible: false,
      emailInput: '',
    };
    this.handleDiscussInput = this.handleDiscussInput.bind(this);
    this.handleDiscussCommit = this.handleDiscussCommit.bind(this);

    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  getHeadUrl(email) {
    const md5 = utils.md5(email);
    return `https://www.gravatar.com/avatar/${md5}`;
  }

  handleDiscussCommit() {
    const { userEmail } = this.props.messageBoard.toJS();
    const email = userEmail;
    if (!email) {
      this.setState({
        modalVisible: true,
      });
    } else {
      this.props.discussAdd({
        email,
        date: Date.now(),
        comment: this.state.discussInput,
      });
      this.setState({
        discussInput: '',
      });
    }
  }

  handleDiscussInput(e) {
    this.setState({
      discussInput: e.target.value,
    });
  }

  handleEmailChange(e) {
    this.setState({ emailInput: e.target.value });
  }

  handleOk() {
    // 设置邮箱
    const email = this.state.emailInput;
    this.props.emailUpdateFunc(email);
    this.handleDiscussCommit();
    // 关闭模态框
    this.setState({
      modalVisible: false,
      emailInput: '',
    });
  }

  handleCancel() {
    this.setState({
      modalVisible: false,
      emailInput: '',
      commentInput: '',
    });
  }

  genModal() {
    const FormItem = Form.Item;
    return (
      <Modal
        title="设置您的邮箱"
        visible={this.state.modalVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <div
          className={style.WriterBox}
        >
          <Form horizontal>
            <FormItem
              className={style.zindexMax}
              id="control-input"
              label="邮箱"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
            >
              <Input
                id="control-input"
                placeholder="Please enter..."
                value={this.state.emailInput}
                onChange={this.handleEmailChange}
              />
            </FormItem>
          </Form>
        </div>
      </Modal>
    );
  }

  genCommitBtn() {
    const isReply = this.props.isReply;
    const replyBtnStyle = {
      top: '3px',
      right: '-56px',
    };
    if (isReply) {
      return (
        <Button
          className={style.discussBtn}
          type="primary" size="small"
          style={replyBtnStyle}
          onClick={this.handleDiscussCommit}
        >
        评论
        </Button>
      );
    }
    return (
      <Button
        className={style.discussBtn}
        type="primary"
        onClick={this.handleDiscussCommit}
        size="large"
      >
        评论
      </Button>
    );
  }

  render() {
    const { userEmail } = this.props.messageBoard.toJS();
    const isReply = this.props.isReply;
    const replyHeadStyle = {
      width: '35px',
      height: '35px',
      position: 'relative',
      top: '-5px',
    };
    return (
      <div
        className={style.postBox}
      >
        <div className={style.postBoxLeft}>
          <a className={style.userHeadUrl}>
            <img alt="userhead" style={replyHeadStyle} src={this.getHeadUrl(userEmail)} className={classnames({ [style.userHead]: !isReply, [style.replyHead]: isReply })} />
          </a>
        </div>
        <div className={style.textWrap}>
          <Input
            placeholder="您想评论一点什么呢.."
            type="textarea" rows={this.props.isReply ? 1 : 3}
            value={this.state.discussInput}
            onChange={this.handleDiscussInput}
          />
        {this.genCommitBtn()}
        </div>
        {this.genModal()}
      </div>
    );
  }
}

export default SendDiscussBox;
